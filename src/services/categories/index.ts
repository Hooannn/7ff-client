import toastConfig from '../../configs/toast';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { onError } from '../../utils/error-handlers';
import { IResponseData, ICategory } from '../../types';
import { useEffect, useState } from 'react';
import useAxiosIns from '../../hooks/useAxiosIns';
const SORT_MAPPING = {
  '-createdAt': { createdAt: -1 },
  createdAt: { createdAt: 1 },
  '-updatedAt': { updatedAt: -1 },
  updatedAt: { updatedAt: 1 },
};
export default ({ enabledFetchCategories }: { enabledFetchCategories?: boolean }) => {
  const [itemPerPage, setItemPerPage] = useState<number>(8);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [total, setTotal] = useState<number>();
  const [current, setCurrent] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const queryClient = useQueryClient();
  const axios = useAxiosIns();

  const buildQuery = (values: {
    searchNameVi: string;
    searchNameEn: string;
    searchDescVi: string;
    searchDescEn: string;
    sort: string;
    range: string[] | any[] | undefined;
  }) => {
    const { searchNameVi, searchNameEn, searchDescVi, searchDescEn, sort, range } = values;
    const query: any = {};
    if (searchNameVi) query['name.vi'] = { $regex: `^${searchNameVi}` };
    if (searchNameEn) query['name.en'] = { $regex: `^${searchNameEn}` };
    if (searchDescVi) query['description.vi'] = { $regex: `^${searchDescVi}` };
    if (searchDescEn) query['description.en'] = { $regex: `^${searchDescEn}` };
    if (range)
      query.createdAt = {
        $gte: range[0],
        $lte: range[1],
      };
    setQuery(JSON.stringify(query));
    if (sort) setSort(JSON.stringify((SORT_MAPPING as any)[sort]));
  };

  const searchCategoriesQuery = useQuery(['search-categories', query, sort], {
    queryFn: () =>
      axios.get<IResponseData<ICategory[]>>(`/categories?skip=${itemPerPage * (current - 1)}&limit=${itemPerPage}&filter=${query}&sort=${sort}`),
    keepPreviousData: true,
    onError: onError,
    enabled: false,
    onSuccess: res => {
      const categories = res.data.data;
      const total = res.data.total;
      setTotal(total);
      setCategories(categories);
    },
  });

  const onResetFilterSearch = () => {
    setIsSearching(false);
    setQuery('');
    setSort('');
    setTimeout(() => fetchCategoriesQuery.refetch(), 300);
  };

  const onFilterSearch = () => {
    searchCategoriesQuery.refetch();
    setIsSearching(true);
  };

  useEffect(() => {
    if (isSearching) {
      searchCategoriesQuery.refetch();
    }
  }, [current, itemPerPage]);

  const fetchCategoriesQuery = useQuery(['categories', current, itemPerPage], {
    queryFn: () => {
      if (!isSearching) return axios.get<IResponseData<ICategory[]>>(`/categories?skip=${itemPerPage * (current - 1)}&limit=${itemPerPage}`);
    },
    keepPreviousData: true,
    onError: onError,
    enabled: enabledFetchCategories,
    onSuccess: res => {
      if (!res) return;
      const categories = res.data.data;
      const total = res.data.total;
      setTotal(total);
      setCategories(categories);
    },
  });

  const addCategoryMutation = useMutation({
    mutationFn: (data: ICategory) => axios.post<IResponseData<ICategory>>('/categories', data),
    onSuccess: res => {
      if (isSearching) {
        queryClient.invalidateQueries('search-categories');
        searchCategoriesQuery.refetch();
      } else queryClient.invalidateQueries('categories');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ categoryId, data }: { categoryId: string; data: ICategory }) =>
      axios.patch<IResponseData<ICategory>>(`/categories?id=${categoryId}`, data),
    onSuccess: res => {
      if (isSearching) {
        queryClient.invalidateQueries('search-categories');
        searchCategoriesQuery.refetch();
      } else queryClient.invalidateQueries('categories');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (categoryId: string) => axios.delete<IResponseData<unknown>>(`/categories?id=${categoryId}`),
    onSuccess: res => {
      if (isSearching) {
        queryClient.invalidateQueries('search-categories');
        searchCategoriesQuery.refetch();
      } else queryClient.invalidateQueries('categories');
      toast(res.data.message, toastConfig('success'));
    },
    onError: onError,
  });

  return {
    fetchCategoriesQuery,
    total,
    categories,
    current,
    setCurrent,
    addCategoryMutation,
    deleteCategoryMutation,
    updateCategoryMutation,
    buildQuery,
    onFilterSearch,
    onResetFilterSearch,
    searchCategoriesQuery,
    itemPerPage,
    setItemPerPage
  };
};