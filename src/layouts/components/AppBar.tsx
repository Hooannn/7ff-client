import { FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Drawer, Button, Badge, Dropdown, Tooltip, Switch, Avatar, Divider, Image, Space } from 'antd';
import '../../assets/styles/components/AppBar.css';
import { DashboardOutlined, DeleteOutlined, LockOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useTranslation, getI18n } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../@core/store';
import { signOut } from '../../slices/auth.slice';
import { containerStyle } from '../../assets/styles/globalStyle';
import { addToCart, decreaseCartItem, removeCartItem, resetCart, setTheme } from '../../slices/app.slice';

interface IProps {
  isDashboard?: boolean;
}

interface IDetailedItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

const TABS = [
  { label: 'home', to: '' },
  { label: 'menu', to: '/menu' },
  { label: 'about us', to: '/about' },
  { label: 'booking table', to: '/booking' },
];

// Fake data
const products = [
  {
    _id: 'hgh0001',
    name: 'Chicken burger',
    price: '30000',
    featuredImages: ['/food-images/burger-01.png'],
  },
  {
    _id: 'hgh0002',
    name: 'Fish burger',
    price: '35000',
    featuredImages: ['/food-images/burger-02.png'],
  },
  {
    _id: 'hgh0003',
    name: 'Beef burger',
    price: '40000',
    featuredImages: ['/food-images/burger-03.png'],
  },
];

const AppBar: FC<IProps> = ({ isDashboard }) => {
  const { t } = useTranslation();
  const i18n = getI18n();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const cartItems = useSelector((state: RootState) => state.app.cartItems);
  const { theme, activeTab } = useSelector((state: RootState) => state.app);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const DETAILED_CART_ITEMS = useMemo(() => {
    return cartItems.map((item: { productId: string; quantity: number }) => {
      // Products will be a global state fetched when app start
      // Or call api to get the product info
      const itemInfo = products.find(product => product._id === item.productId);
      return {
        ...item,
        name: itemInfo?.name,
        price: itemInfo?.price,
        image: itemInfo?.featuredImages[0],
      };
    });
  }, [cartItems]);
  const totalPrice = useMemo(() => {
    return DETAILED_CART_ITEMS.reduce((total: number, item: IDetailedItem) => {
      return (total += item.price * item.quantity);
    }, 0);
  }, [DETAILED_CART_ITEMS]);

  const items: MenuProps['items'] = [
    {
      label: t('profile'),
      key: 'profile',
      onClick: () => navigate('/profile'),
    },
    {
      label: t('my orders'),
      key: 'orders',
      onClick: () => navigate('/orders'),
    },
    {
      type: 'divider',
    },
    {
      label: t('sign out'),
      key: 'signOut',
      danger: true,
      onClick: () => dispatch(signOut()),
    },
  ];

  return (
    <Layout.Header className="app-bar">
      <div style={containerStyle} className="container">
        <div className="logo-search">
          <div className="logo" onClick={() => navigate('/')}>
            <img src="/appbar-logo.png" className="logo-img" />
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder={t('search...').toString()}
              className="search-input"
              spellCheck="false"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <SearchOutlined className="search-icon" />
          </div>
        </div>

        <ul className="tabs">
          {TABS.map(({ label, to }) => (
            <li className={`tab-item ${activeTab === label ? 'active' : ''}`} key={label} onClick={() => navigate(to)}>
              {t(label)}
            </li>
          ))}
        </ul>

        <div className="nav-btns">
          <Tooltip title={t('change language')}>
            {i18n.resolvedLanguage === 'en' && (
              <Avatar onClick={() => i18n.changeLanguage('vi')} src="/en.jpg" style={{ cursor: 'pointer' }}></Avatar>
            )}
            {i18n.resolvedLanguage === 'vi' && (
              <Avatar onClick={() => i18n.changeLanguage('en')} src="/vn.jpg" style={{ cursor: 'pointer' }}></Avatar>
            )}
          </Tooltip>

          <Tooltip title={t('toggle theme')}>
            <Switch checked={theme === 'dark'} onChange={() => dispatch(setTheme())} checkedChildren="Dark" unCheckedChildren="Light" />
          </Tooltip>

          {!user && (
            <Button size="large" type="primary" shape="round" className="nav-btn" onClick={() => navigate('/auth')}>
              {t('sign in')}
            </Button>
          )}

          {!isDashboard && user?.role === 'Admin' && (
            <Tooltip title={t('go to dashboard')}>
              <DashboardOutlined onClick={() => navigate('/dashboard')} className="nav-icon" style={{ color: 'white' }} />
            </Tooltip>
          )}

          {user && (
            <>
              <Tooltip title={t('cart')}>
                <Badge count={cartItems.length}>
                  <ShoppingCartOutlined onClick={() => setIsCartOpen(true)} className="nav-icon" style={{ color: 'white' }} />
                </Badge>
              </Tooltip>
              <Drawer
                open={isCartOpen}
                onClose={() => {
                  setIsCartOpen(false);
                }}
                title={t('cart')}
                contentWrapperStyle={{ width: 600 }}
                extra={cartItems.length !== 0 && <Button onClick={() => dispatch(resetCart())}>{t('reset cart')}</Button>}
              >
                <div className={`cart-content ${cartItems.length === 0 ? 'no-items' : ''}`}>
                  {cartItems.length === 0 ? (
                    <div style={{ marginTop: 45, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Avatar src="/empty-cart.png" size={340} />
                      <h4 className="heading">{t('your cart is empty')}</h4>
                      <Button
                        type="primary"
                        size="large"
                        shape="round"
                        className="continue-btn"
                        onClick={() => {
                          setIsCartOpen(false);
                          navigate('/menu');
                        }}
                      >
                        {t('see our menu')}
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="cart-items">
                        {DETAILED_CART_ITEMS.map((item: IDetailedItem) => (
                          <div key={item.productId} className="cart-item">
                            <div className="item-image">
                              <Image src={item.image} />
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                              <h4 className="item-name">{item.name}</h4>
                              <p className="item-price">{item.price * item.quantity}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                              <Space.Compact className="item-quantity">
                                <Button type="text" onClick={() => dispatch(decreaseCartItem(item.productId))}>
                                  -
                                </Button>
                                <span>{item.quantity}</span>
                                <Button type="text" onClick={() => dispatch(addToCart(item.productId))}>
                                  +
                                </Button>
                              </Space.Compact>
                              <Tooltip title={t('delete item')} placement="bottom">
                                <Button
                                  type="primary"
                                  danger
                                  shape="circle"
                                  icon={<DeleteOutlined />}
                                  onClick={() => dispatch(removeCartItem(item.productId))}
                                />
                              </Tooltip>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Divider style={{ borderColor: 'rgba(26, 26, 26, 0.12)' }} />
                      <div className="cart-footer">
                        <h5 className="total-price">
                          <span>{t('total')}:</span>
                          <span>{`${totalPrice.toLocaleString('en-US')} VND`}</span>
                        </h5>
                        <p>{t('VAT included, shipping fee not covered')}.</p>
                        <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
                          <Button type="primary" shape="round" className="see-cart-btn" onClick={() => navigate('/cart')}>
                            {t('view my cart')}
                          </Button>
                          <Button shape="round" className="checkout-btn" onClick={() => navigate('/checkout')}>
                            <LockOutlined />
                            {t('checkout')}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Drawer>
              <Dropdown menu={{ items }}>
                <img src={user.avatar} className="user-avatar" />
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </Layout.Header>
  );
};

export default AppBar;
