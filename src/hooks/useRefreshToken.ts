import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import cookies from '../libs/cookies';
import toastConfig from '../configs/toast';
import { axiosIns } from './useAxiosIns';
import { signOut } from '../slices/auth.slice';

const useRefreshToken = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleError = () => {
    toast(t('login session expired, please login again', toastConfig('info')));
    dispatch(signOut());
    navigate('/auth');
  };

  const refreshToken = async () =>
    new Promise<string | null>((resolve, reject) => {
      axiosIns({
        url: '/auth/refresh',
        method: 'POST',
        validateStatus: null,
        data: {
          refreshToken: cookies.get('refresh_token') || localStorage.getItem('refresh_token'),
        },
      })
        .then(res => {
          const { accessToken } = res?.data?.data;
          if (accessToken) {
            cookies.set('access_token', accessToken);
            resolve(accessToken);
          } else {
            handleError();
            resolve(null);
          }
        })
        .catch(error => {
          handleError();
          reject(error);
        });
    });

  return refreshToken;
};

export default useRefreshToken;
