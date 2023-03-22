import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Drawer, Button, Badge, Dropdown, Tooltip, Switch, Avatar } from 'antd';
import '../../assets/styles/AppBar.css';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useTranslation, getI18n } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../@core/store';
import { signOut } from '../../slices/auth.slice';
import { containerStyle } from '../../assets/styles/globalStyle';
interface IProps {
  isDashboard?: boolean;
}

const AppBar: FC<IProps> = ({ isDashboard }) => {
  const { t } = useTranslation();
  const i18n = getI18n();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const cartItems = [1, 2, 3];
  const [theme, setTheme] = useState('dark');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const TABS = ['home', 'menu', 'sale off', 'contact us'];
  const [activeTab, setActiveTab] = useState('home');

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
          {TABS.map(tab => (
            <li className={`tab-item ${activeTab === tab ? 'active' : ''}`} key={tab} onClick={() => setActiveTab(tab)}>
              {t(tab).toUpperCase()}
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
            <Switch
              checked={theme === 'dark'}
              onChange={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
              // onChange={() =>dispatch(toggleTheme())}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
          </Tooltip>

          {!user && (
            <Button size="large" type="primary" shape="round" className="nav-btn" onClick={() => navigate('/auth')}>
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
      </div>
    </Layout.Header>
  );
};

export default AppBar;
