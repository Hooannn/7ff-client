import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Input, Drawer, Button, Badge, Dropdown, Tooltip, Menu, Switch, Avatar } from 'antd';
import '../../assets/styles/AppBar.css';
import { inputStyle } from '../../assets/styles/globalStyle';
import { ShoppingCartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useTranslation, getI18n } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../@core/store';
import { signOut } from '../../slices/auth.slice';
interface IProps {
  isDashboard?: boolean;
}

const AppBar: FC<IProps> = ({ isDashboard }) => {
  const { t } = useTranslation();
  const i18n = getI18n();

  const navigate = useNavigate();
  // Fake data
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const cartItems = [1, 2, 3];
  const [theme, setTheme] = useState('light');

  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeKey, setActiveKey] = useState('home');

  const onSearch = (value: string) => console.log(value);
  const items: MenuProps['items'] = [
    {
      label: t('profile'),
      key: 'profile',
      onClick: () => navigate(`/profile/${user._id}`),
    },
    {
      label: t('my orders'),
      key: 'orders',
      onClick: () => navigate(`/orders/${user._id}`),
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
      <div className="logo-search">
        <div className="logo" onClick={() => navigate('/')}>
          <img src="../../../appbar-logo.png" className="logo-img" />
        </div>
        <div className="search-box">
          <Input.Search placeholder={t('search...').toString()} allowClear style={inputStyle} size="large" loading={loading} onSearch={onSearch} />
        </div>
      </div>

      <div className="tabs">
        <Menu
          mode="horizontal"
          selectedKeys={[activeKey]}
          onClick={e => setActiveKey(e.key)}
          items={[
            {
              label: t('home'),
              key: 'home',
            },
            {
              label: t('menu'),
              key: 'menu',
            },
            {
              label: t('sale off'),
              key: 'sale_off',
            },
            {
              label: t('contact us'),
              key: 'contact_us',
            },
          ]}
          style={{ flex: 'auto', minWidth: 0, display: 'flex', justifyContent: 'center' }}
        />
      </div>

      <div className="nav-btns">
        <Tooltip title={t('change language')}>
          {i18n.resolvedLanguage === 'en' && <Avatar onClick={() => i18n.changeLanguage('vi')} src="/en.jpg" style={{ cursor: 'pointer' }}></Avatar>}
          {i18n.resolvedLanguage === 'vi' && <Avatar onClick={() => i18n.changeLanguage('en')} src="/vn.jpg" style={{ cursor: 'pointer' }}></Avatar>}
        </Tooltip>

        <Tooltip title={t('toggle theme')}>
          <Switch
            checked={theme === 'dark'}
            onChange={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </Tooltip>

        {!user && (
          <Button size="large" type="primary" className="nav-btn" onClick={() => navigate('/auth')}>
            {t('sign in')}
          </Button>
        )}

        {/* {!isDashboard && user?.role === 'admin' && (
          <Button type="dashed" style={{ marginRight: '20px' }} onClick={() => navigate('/dashboard')}>
            Go to dashboard
          </Button>
        )} */}

        {user && (
          <>
            <Tooltip title={t('cart')}>
              <Badge count={cartItems.length}>
                <ShoppingCartOutlined onClick={() => setIsCartOpen(true)} className="nav-icon" />
              </Badge>
            </Tooltip>
            <Drawer
              open={isCartOpen}
              onClose={() => {
                setIsCartOpen(false);
              }}
              title={t('cart')}
              contentWrapperStyle={{ width: 600 }}
            >
              Display cart items && Checkout btn
            </Drawer>
            <Dropdown menu={{ items }}>
              <img src={user.avatar} className="user-avatar" />
            </Dropdown>
          </>
        )}
      </div>
    </Layout.Header>
  );
};

export default AppBar;
