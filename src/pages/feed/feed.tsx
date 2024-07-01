import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { getAllOrders } from '../../services/slices/orders/ordersSlice';
import { useDispatch, useSelector } from '../../services/store';
import { feedsApi } from '../../services/slices/orders/actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    dispatch(feedsApi());
  }, [refresh]);

  const orders: TOrder[] = useSelector(getAllOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => setRefresh((state) => state + 1)}
    />
  );
};
