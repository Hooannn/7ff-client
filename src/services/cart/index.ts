import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchCartItems, addCartItem, removeCartItem, resetCartItems } from '../../slices/app.slice';
import useAxiosIns from '../../hooks/useAxiosIns';
import { useDispatch } from 'react-redux';
export default ({ enabledFetchCartItems }: { enabledFetchCartItems: boolean }) => {
  const axios = useAxiosIns();
  const query = useQueryClient();
  const dispatch = useDispatch();
  const fetchCartItemsQuery = useQuery({
    queryKey: 'cartItems',
    queryFn: () => dispatch(fetchCartItems(axios) as any),
    enabled: enabledFetchCartItems,
    refetchOnWindowFocus: false,
  });

  const addCartItemMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      dispatch(addCartItem({ axios, productId: productId, quantity: quantity }) as any),
    onSuccess: () => query.invalidateQueries(['cartItems']),
  });

  const removeCartItemMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      dispatch(removeCartItem({ axios, productId: productId, quantity: quantity }) as any),
    onSuccess: () => query.invalidateQueries(['cartItems']),
  });

  const resetCartItemsMutation = useMutation({
    mutationFn: () => dispatch(resetCartItems(axios) as any),
    onSuccess: () => query.invalidateQueries(['cartItems']),
  });

  return { fetchCartItemsQuery, resetCartItemsMutation, removeCartItemMutation, addCartItemMutation };
};
