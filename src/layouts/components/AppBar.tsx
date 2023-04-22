import { FC, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation, getI18n } from 'react-i18next';
import { Layout, Button, Badge, Dropdown, Tooltip, Avatar, Modal } from 'antd';
import { CloseOutlined, DashboardOutlined, ExclamationCircleFilled, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import CartDrawer from './CartDrawer';
import useCart from '../../hooks/useCart';
import { RootState } from '../../@core/store';
import { signOut } from '../../slices/auth.slice';
import { buttonStyle, containerStyle } from '../../assets/styles/globalStyle';
import '../../assets/styles/components/AppBar.css';

interface IProps {
  isDashboard?: boolean;
}

const TABS = [
  { label: 'home', to: '/' },
  { label: 'menu', to: '/menu' },
  { label: 'about us', to: '/about' },
  { label: 'booking table', to: '/booking' },
];

const AppBar: FC<IProps> = ({ isDashboard }) => {
  const { t } = useTranslation();
  const i18n = getI18n();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const { detailedItems } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const location = useLocation();

  const items: MenuProps['items'] = [
    {
      label: t('profile'),
      key: 'profile',
      onClick: () => navigate('/profile/edit'),
    },
    {
      label: t('my orders'),
      key: 'orders',
      onClick: () => navigate('/profile/orders'),
    },
    {
      type: 'divider',
    },
    {
      label: t('sign out'),
      key: 'signOut',
      danger: true,
      onClick: () => onSignOutBtnClick(),
    },
  ];

  const onSignOutBtnClick = () => {
    Modal.confirm({
      icon: <ExclamationCircleFilled />,
      title: t('are you sure you want to sign out ?'),
      okText: t('sign out'),
      cancelText: t('cancel'),
      onOk: () => {
        dispatch(signOut());
      },
      okButtonProps: {
        danger: true,
        shape: 'round',
        style: { ...buttonStyle, width: '100px', marginLeft: '12px' },
      },
      cancelButtonProps: {
        type: 'text',
        shape: 'round',
        style: { ...buttonStyle, width: '100px' },
      },
    });
  };

  const searchInputRef = useRef<HTMLInputElement>(null);
  const handleTyping = (e: any) => {
    const searchInput = e.target.value;
    if (searchInput.startsWith(' ')) return;
    setSearchTerm(searchInput);
  };

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
              onChange={handleTyping}
              ref={searchInputRef}
            />
            {searchTerm ? (
              <CloseOutlined
                className="search-icon"
                onClick={() => {
                  setSearchTerm('');
                  setSearchResult([]);
                  searchInputRef.current?.focus();
                }}
              />
            ) : (
              <SearchOutlined className="search-icon" />
            )}
            {searchResult.length > 0 && <div className="search-result"></div>}
          </div>
        </div>

        <ul className="tabs">
          {TABS.map(({ label, to }) => (
            <li className={`tab-item ${location.pathname === to ? 'active' : ''}`} key={label} onClick={() => navigate(to)}>
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
                <Badge count={detailedItems.length}>
                  <ShoppingCartOutlined onClick={() => setIsCartOpen(true)} className="nav-icon" style={{ color: 'white' }} />
                </Badge>
              </Tooltip>
              <CartDrawer isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
              <Dropdown menu={{ items }} placement="bottom" arrow>
                <img src={user.avatar} className="user-avatar" onClick={() => navigate('/profile/edit')} />
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </Layout.Header>
  );
};

export default AppBar;
