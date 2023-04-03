import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../@core/store';
import { signOut } from '../slices/auth.slice';
import { Divider } from 'antd';
import '../assets/styles/components/ProfileSidebar.css';

const TABS = [
  { label: 'account details', to: '/profile/edit' },
  { label: 'my orders', to: '/profile/orders' },
  { label: 'change avatar', to: '/profile/change-avatar' },
  { label: 'change password', to: '/profile/change-password' },
];

const ProfileSidebar: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="profile-sidebar">
      <img src="/appbar-logo.png" className="app-logo" />
      <h2 className="welcome-user">{`${t('welcome')}, ${user.lastName} ${user.firstName}`}</h2>
      <span className="sign-out-btn" onClick={() => dispatch(signOut())}>
        {t('sign out')}
      </span>
      <div className="profile-tabs">
        {TABS.map(({ label, to }) => {
          return (
            <div className={`profile-tab-item ${location.pathname === to ? 'active' : ''}`} key={label} onClick={() => navigate(to)}>
              {t(label)}
            </div>
          );
        })}
        <Divider style={{ margin: '18px 0 9px', borderColor: 'rgba(255, 255, 255, 0.5)' }} />
        <div className="profile-tab-item danger">{t('delete account')}</div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
