import axios from '../../libs/axios';
import toastConfig from '../../configs/toast';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { onError } from '../../utils/error-handlers';
import { IResponseData, IUser } from '../../types';
import { useEffect, useState } from 'react';
const SORT_MAPPING = {
  '-createdAt': { createdAt: -1 },
  createdAt: { createdAt: 1 },
  '-updatedAt': { updatedAt: -1 },
  updatedAt: { updatedAt: 1 },
};
export default () => {
  const ITEM_PER_PAGE = 8; // default
  const [users, setUsers] = useState<IUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [total, setTotal] = useState<number>();
  const [current, setCurrent] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const queryClient = useQueryClient();

  const buildQuery = (values: { searchString: string; sort: string; role: string; range: string[] | any[] | undefined }) => {
    const { searchString, sort, role, range } = values;
    const query: any = {};
    if (searchString) query.email = { $regex: `^${searchString}` };
    if (role && role !== 'All') query.role = role;
    if (range)
      query.createdAt = {
        $gte: range[0],
        $lte: range[1],
      };
    setQuery(JSON.stringify(query));
    if (sort) setSort(JSON.stringify((SORT_MAPPING as any)[sort]));
  };

  const searchUsersQuery = useQuery(['search-users', query, sort], {
    queryFn: () =>
      axios.get<IResponseData<IUser[]>>(`/users?skip=${ITEM_PER_PAGE * (current - 1)}&limit=${ITEM_PER_PAGE}&filter=${query}&sort=${sort}`),
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
  }, [current]);

  const fetchUsersQuery = useQuery(['users', current], {
    queryFn: () => {
      if (!isSearching) return axios.get<IResponseData<IUser[]>>(`/users?skip=${ITEM_PER_PAGE * (current - 1)}&limit=${ITEM_PER_PAGE}`);
    },
    keepPreviousData: true,
    onError: onError,
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
    searchUsersQuery,
  };
};
