import toastConfig from '../../configs/toast';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { onError } from '../../utils/error-handlers';
import { IResponseData, IVoucher } from '../../types';
import { useEffect, useState } from 'react';
import useAxiosIns from '../../hooks/useAxiosIns';
const SORT_MAPPING = {
  '-createdAt': { createdAt: -1 },
  createdAt: { createdAt: 1 },
  '-updatedAt': { updatedAt: -1 },
  updatedAt: { updatedAt: 1 },
};
export default ({ enabledFetchVouchers }: { enabledFetchVouchers?: boolean }) => {
  const ITEM_PER_PAGE = 8; // default
  const [vouchers, setVouchers] = useState<IVoucher[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [total, setTotal] = useState<number>();
  const [current, setCurrent] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const queryClient = useQueryClient();
  const axios = useAxiosIns();

  const buildQuery = (values: { searchString: string; sort: string; discountType: string; range: string[] | any[] | undefined }) => {
    const { searchString, sort, discountType, range } = values;
    const query: any = {};
    if (searchString) query.code = { $regex: `^${searchString.toUpperCase()}` };
    if (discountType) {
      query.discountType = discountType !== 'All' ? discountType : undefined;
    }
    if (range)
      query.createdAt = {
        $gte: range[0],
        $lte: range[1],
      };
    setQuery(JSON.stringify(query));
    if (sort) setSort(JSON.stringify((SORT_MAPPING as any)[sort]));
  };

  const searchVouchersQuery = useQuery(['search-vouchers', query, sort], {
    queryFn: () =>
      axios.get<IResponseData<IVoucher[]>>(`/vouchers?skip=${ITEM_PER_PAGE * (current - 1)}&limit=${ITEM_PER_PAGE}&filter=${query}&sort=${sort}`),
    keepPreviousData: true,
    onError: onError,
    enabled: false,
    onSuccess: res => {
      const vouchers = res.data.data;
      const total = res.data.total;
      setTotal(total);
      setVouchers(vouchers);
    },
  });

  const onResetFilterSearch = () => {
    setIsSearching(false);
    setQuery('');
    setSort('');
    setTimeout(() => fetchVouchersQuery.refetch(), 300);
  };

  const onFilterSearch = () => {
    searchVouchersQuery.refetch();
    setIsSearching(true);
  };

  useEffect(() => {
    if (isSearching) {
      searchVouchersQuery.refetch();
    }
  }, [current]);

  const fetchVouchersQuery = useQuery(['vouchers', current], {
    queryFn: () => {
      if (!isSearching) return axios.get<IResponseData<IVoucher[]>>(`/vouchers?skip=${ITEM_PER_PAGE * (current - 1)}&limit=${ITEM_PER_PAGE}`);
    },
    keepPreviousData: true,
    onError: onError,
    enabled: enabledFetchVouchers,
    onSuccess: res => {
      if (!res) return;
      const vouchers = res.data.data;
      const total = res.data.total;
      setTotal(total);
      setVouchers(vouchers);
    },
  });

  const addVoucherMutation = useMutation({
    mutationFn: (data: IVoucher) => axios.post<IResponseData<IVoucher>>('/vouchers', data),
    onSuccess: res => {
      queryClient.invalidateQueries('vouchers');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  const updateVoucherMutation = useMutation({
    mutationFn: ({ voucherId, data }: { voucherId: string; data: IVoucher }) =>
      axios.patch<IResponseData<IVoucher>>(`/vouchers?id=${voucherId}`, data),
    onSuccess: res => {
      queryClient.invalidateQueries('vouchers');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  const verifyVoucherMutation = useMutation({
    mutationFn: (code: string) => axios.get<IResponseData<IVoucher>>(`/vouchers/validate?code=${code}`),
    onSuccess: res => {
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  const deleteVoucherMutation = useMutation({
    mutationFn: (voucherId: string) => axios.delete<IResponseData<unknown>>(`/vouchers?id=${voucherId}`),
    onSuccess: res => {
      queryClient.invalidateQueries('vouchers');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  return {
    fetchVouchersQuery,
    total,
    vouchers,
    current,
    setCurrent,
    addVoucherMutation,
    deleteVoucherMutation,
    updateVoucherMutation,
    buildQuery,
    onFilterSearch,
    onResetFilterSearch,
    verifyVoucherMutation,
    searchVouchersQuery,
  };
};
