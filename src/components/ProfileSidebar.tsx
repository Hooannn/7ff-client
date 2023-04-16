import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Divider, Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { RootState } from '../@core/store';
import { signOut } from '../slices/auth.slice';
import { buttonStyle } from '../assets/styles/globalStyle';
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

  const onDeleteAccountBtnClick = () => {
    Modal.confirm({
      icon: <ExclamationCircleFilled />,
      title: t('are you sure you want to delete this account ? This operation cannot be undone'),
      okText: t('delete account'),
      cancelText: t('cancel'),
      onOk: () => {
        // require password (or reCaptcha) to confirm
        // delete credentials cookies and persist states
        // delete account on database
        // change all undone orders by this account to cancel status (on database)
      },
      okButtonProps: {
        danger: true,
        shape: 'round',
        style: { ...buttonStyle, width: '140px', marginLeft: '12px' },
      },
      cancelButtonProps: {
        type: 'text',
        shape: 'round',
        style: { ...buttonStyle, width: '100px' },
      },
    });
  };

  return (
    <div className="profile-sidebar">
      <img src="/appbar-logo.png" className="app-logo" />
      <h2 className="welcome-user">{`${t('welcome')}, ${user.lastName} ${user.firstName}`}</h2>
      <span className="sign-out-btn" onClick={onSignOutBtnClick}>
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
        <div className="profile-tab-item danger" onClick={onDeleteAccountBtnClick}>
          {t('delete account')}
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
