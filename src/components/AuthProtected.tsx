import axios from 'axios';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import cookies from '../libs/cookies';
import { setLogged, setUser } from '../slices/auth.slice';
import { IResponseData, IUser } from '../types';
export default function AuthProtected({ children, redirect }: { children: JSX.Element; redirect: string }) {
  const accessToken = cookies.get('access_token') || localStorage.getItem('access_token');
  const dispatch = useDispatch();
  const getUserQuery = useQuery('auth-user', {
    queryFn: () => axios.get<IResponseData<IUser>>(`/auth/user?access_token=${accessToken}`),
    onSuccess: res => {
      const user = res.data.data;
      dispatch(setLogged(true));
      dispatch(setUser(user));
    },
  });
  const location = useLocation();

  return <div>AuthProtected</div>;
}
