import axios from '../../libs/axios';
import toastConfig from '../../configs/toast';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { onError } from '../../utils/error-handlers';
import { IResponseData, IUser } from '../../types';
import { useState } from 'react';
export default () => {
  const ITEM_PER_PAGE = 8; // default
  const [users, setUsers] = useState<IUser[]>([]);
  const [total, setTotal] = useState<number>();
  const [current, setCurrent] = useState<number>(1);
  const queryClient = useQueryClient();
  const fetchUsersQuery = useQuery(['users', current], {
    queryFn: () => axios.get<IResponseData<IUser[]>>(`/users?skip=${ITEM_PER_PAGE * (current - 1)}&limit=${ITEM_PER_PAGE}`),
    keepPreviousData: true,
    onError: onError,
    onSuccess: res => {
      const users = res.data.data;
      const total = res.data.total;
      setTotal(total);
      setUsers(users);
    },
  });

  const addUserMutation = useMutation({
    mutationFn: (data: IUser) => axios.post<IResponseData<IUser>>('/users', data),
    onSuccess: res => {
      queryClient.invalidateQueries('users');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: IUser }) => axios.patch<IResponseData<IUser>>(`/users?id=${userId}`, data),
    onSuccess: res => {
      queryClient.invalidateQueries('users');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => axios.delete<IResponseData<unknown>>(`/users?id=${userId}`),
    onSuccess: res => {
      queryClient.invalidateQueries('users');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  return { fetchUsersQuery, total, users, current, setCurrent, addUserMutation, deleteUserMutation, updateUserMutation };
};
