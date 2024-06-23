import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { Params, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  getAllOrders,
  setOrderData
} from '../../services/slices/orders/ordersSlice';
import { getIngredients } from '../../services/slices/ingredients/ingredientsSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<Params>();
  const dispatch = useDispatch();
  const orders = useSelector(getAllOrders);
  const currentOrder = orders.find((order) => order.number === +number!);

  useEffect(() => {
    dispatch(setOrderData(currentOrder!));
  }, []);

  const ingredients: TIngredient[] = useSelector(getIngredients);
  const orderData = currentOrder;

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
