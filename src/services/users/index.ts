import axios from '../../libs/axios';
import toastConfig from '../../configs/toast';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { onError } from '../../utils/error-handlers';
import { IResponseData, IUser } from '../../types';
import { useState } from 'react';
export default () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const queryClient = useQueryClient();
  const fetchUsersQuery = useQuery('get-users', {
    queryFn: () => axios.get<IResponseData<IUser[]>>(`/users`),
    onError: onError,
    onSuccess: res => {
      const users = res.data.data;
      setUsers(users);
    },
  });

  const addUserMutation = useMutation({
    mutationFn: (data: IUser) => axios.post<IResponseData<IUser>>('/users', data),
    onSuccess: res => {
      queryClient.invalidateQueries('get-users');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: IUser }) => axios.patch<IResponseData<IUser>>(`/users?id=${userId}`, data),
    onSuccess: res => {
      queryClient.invalidateQueries('get-users');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => axios.delete<IResponseData<unknown>>(`/users?id=${userId}`),
    onSuccess: res => {
      queryClient.invalidateQueries('get-users');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  return { fetchUsersQuery, users, addUserMutation, deleteUserMutation, updateUserMutation };
};
