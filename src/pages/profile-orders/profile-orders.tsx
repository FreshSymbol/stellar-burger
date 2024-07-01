import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/slices/orders/ordersSlice';
import { ordersApi } from '../..//services/slices/orders/actions';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ordersApi());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
