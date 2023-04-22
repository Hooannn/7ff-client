import toastConfig from '../../configs/toast';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { onError } from '../../utils/error-handlers';
import { IResponseData, IUser } from '../../types';
import { useEffect, useState } from 'react';
import useAxiosIns from '../../hooks/useAxiosIns';
const SORT_MAPPING = {
  '-createdAt': { createdAt: -1 },
  createdAt: { createdAt: 1 },
  '-updatedAt': { updatedAt: -1 },
  updatedAt: { updatedAt: 1 },
};
export default ({ enabledFetchUsers }: { enabledFetchUsers?: boolean }) => {
  const [itemPerPage, setItemPerPage] = useState<number>(8);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [total, setTotal] = useState<number>();
  const [current, setCurrent] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const queryClient = useQueryClient();
  const axios = useAxiosIns();

  const buildQuery = (values: { searchString: string; sort: string; role: string; range: string[] | any[] | undefined }) => {
    const { searchString, sort, role, range } = values;
    const query: any = {};
    if (searchString) query.email = { $regex: `^${searchString}` };
    if (role) query.role = role !== 'All' ? role : undefined;
    if (range)
      query.createdAt = {
        $gte: range[0],
        $lte: range[1],
      };
    setQuery(JSON.stringify(query));
    if (sort) setSort(JSON.stringify((SORT_MAPPING as any)[sort]));
  };

  const searchUsersQuery = useQuery(['search-users', query, sort, itemPerPage], {
    queryFn: () => axios.get<IResponseData<IUser[]>>(`/users?skip=${itemPerPage * (current - 1)}&limit=${itemPerPage}&filter=${query}&sort=${sort}`),
    keepPreviousData: true,
    onError: onError,
    enabled: false,
    onSuccess: res => {
      const users = res.data.data;
      const total = res.data.total;
      setTotal(total);
      setUsers(users);
    },
  });

  const onResetFilterSearch = () => {
    setIsSearching(false);
    setQuery('');
    setSort('');
    setTimeout(() => fetchUsersQuery.refetch(), 300);
  };

  const onFilterSearch = () => {
    searchUsersQuery.refetch();
    setIsSearching(true);
  };

  useEffect(() => {
    if (isSearching) {
      searchUsersQuery.refetch();
    }
  }, [current, itemPerPage]);

  const fetchUsersQuery = useQuery(['users', current, itemPerPage], {
    queryFn: () => {
      if (!isSearching) return axios.get<IResponseData<IUser[]>>(`/users?skip=${itemPerPage * (current - 1)}&limit=${itemPerPage}`);
    },
    keepPreviousData: true,
    onError: onError,
    enabled: enabledFetchUsers,
    onSuccess: res => {
      if (!res) return;
      const users = res.data.data;
      const total = res.data.total;
      setTotal(total);
      setUsers(users);
    },
  });

  const addUserMutation = useMutation({
    mutationFn: (data: IUser) => axios.post<IResponseData<IUser>>('/users', data),
    onSuccess: res => {
      if (isSearching) {
        queryClient.invalidateQueries('search-users');
        searchUsersQuery.refetch();
      } else queryClient.invalidateQueries('users');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: IUser }) => axios.patch<IResponseData<IUser>>(`/users?id=${userId}`, data),
    onSuccess: res => {
      if (isSearching) {
        queryClient.invalidateQueries('search-users');
        searchUsersQuery.refetch();
      } else queryClient.invalidateQueries('users');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  const updateProfileMutation = useMutation({
    mutationFn: ({ data }: { data: IUser }) => axios.patch<IResponseData<IUser>>(`/users/profile`, data),
    onSuccess: res => {
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  const updatePasswordMutation = useMutation({
    mutationFn: ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) =>
      axios.patch<IResponseData<IUser>>(`/users/change-password`, { currentPassword, newPassword }),
    onSuccess: res => {
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => axios.delete<IResponseData<unknown>>(`/users?id=${userId}`),
    onSuccess: res => {
      if (isSearching) {
        queryClient.invalidateQueries('search-users');
        searchUsersQuery.refetch();
      } else queryClient.invalidateQueries('users');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  return {
    fetchUsersQuery,
    total,
    users,
    current,
    setCurrent,
    addUserMutation,
    deleteUserMutation,
    updateUserMutation,
    buildQuery,
    onFilterSearch,
    onResetFilterSearch,
    updateProfileMutation,
    updatePasswordMutation,
    searchUsersQuery,
    itemPerPage,
    setItemPerPage,
  };
};
