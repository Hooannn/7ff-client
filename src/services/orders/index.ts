import axios from '../../libs/axios';
import toastConfig from '../../configs/toast';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { onError } from '../../utils/error-handlers';
import { IResponseData, IOrder } from '../../types';
import { useEffect, useState } from 'react';
import useAxiosIns from '../../hooks/useAxiosIns';
const SORT_MAPPING = {
  '-createdAt': { createdAt: -1 },
  createdAt: { createdAt: 1 },
  '-updatedAt': { updatedAt: -1 },
  updatedAt: { updatedAt: 1 },
};
export default ({ enabledFetchOrders }: { enabledFetchOrders?: boolean }) => {
  const ITEM_PER_PAGE = 8; // default
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [total, setTotal] = useState<number>();
  const [current, setCurrent] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const queryClient = useQueryClient();
  const axios2 = useAxiosIns();

  const buildQuery = (values: { customerId: string; status: IOrder['status'] | string; sort: string; range: string[] | any[] | undefined }) => {
    const { customerId, sort, range, status } = values;
    const query: any = {};
    if (customerId) query.customerId = customerId;
    if (status) query.status = status;
    if (range)
      query.createdAt = {
        $gte: range[0],
        $lte: range[1],
      };
    setQuery(JSON.stringify(query));
    if (sort) setSort(JSON.stringify((SORT_MAPPING as any)[sort]));
  };

  const searchOrdersQuery = useQuery(['search-orders', query, sort], {
    queryFn: () =>
      axios.get<IResponseData<IOrder[]>>(`/orders?skip=${ITEM_PER_PAGE * (current - 1)}&limit=${ITEM_PER_PAGE}&filter=${query}&sort=${sort}`),
    keepPreviousData: true,
    onError: onError,
    enabled: false,
    onSuccess: res => {
      const orders = res.data.data;
      const total = res.data.total;
      setTotal(total);
      setOrders(orders);
    },
  });

  const onResetFilterSearch = () => {
    setIsSearching(false);
    setQuery('');
    setSort('');
    setTimeout(() => fetchOrdersQuery.refetch(), 300);
  };

  const onFilterSearch = () => {
    searchOrdersQuery.refetch();
    setIsSearching(true);
  };

  useEffect(() => {
    if (isSearching) {
      searchOrdersQuery.refetch();
    }
  }, [current]);

  const fetchOrdersQuery = useQuery(['orders', current], {
    queryFn: () => {
      if (!isSearching) return axios2.get<IResponseData<IOrder[]>>(`/orders?skip=${ITEM_PER_PAGE * (current - 1)}&limit=${ITEM_PER_PAGE}`);
    },
    keepPreviousData: true,
    onError: onError,
    enabled: enabledFetchOrders,
    onSuccess: res => {
      if (!res) return;
      const orders = res.data.data;
      const total = res.data.total;
      setTotal(total);
      setOrders(orders);
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ orderId, data }: { orderId: string; data: IOrder }) => axios.patch<IResponseData<IOrder>>(`/orders?id=${orderId}`, data),
    onSuccess: res => {
      queryClient.invalidateQueries('orders');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  const deleteOrderMutation = useMutation({
    mutationFn: (orderId: string) => axios.delete<IResponseData<unknown>>(`/orders?id=${orderId}`),
    onSuccess: res => {
      queryClient.invalidateQueries('orders');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  return {
    fetchOrdersQuery,
    total,
    orders,
    current,
    setCurrent,
    updateOrderMutation,
    deleteOrderMutation,
    buildQuery,
    onFilterSearch,
    onResetFilterSearch,
    searchOrdersQuery,
  };
};