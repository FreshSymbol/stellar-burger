import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getBurger,
  resetBurger
} from '../../services/slices/ingredients/ingredientsSlice';
import {
  getNewOrderData,
  getOrderRequest,
  resetNewOrderData,
  setOrderRequest
} from '../../services/slices/orders/ordersSlice';
import { createOrderApi } from '../../services/slices/orders/actions';
import { getUser } from '../../services/slices/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getBurger);
  const dispatch = useDispatch();
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getNewOrderData)!;
  const orderData: string[] = [];
  const user = useSelector(getUser);
  const navigate = useNavigate();

  useMemo(() => {
    if (constructorItems.bun)
      orderData.push(constructorItems.bun?._id, constructorItems.bun?._id);
    constructorItems.ingredients.forEach((ingredient) =>
      orderData.push(ingredient._id)
    );
  }, [constructorItems]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) navigate('/login');
    else {
      dispatch(createOrderApi(orderData));
      dispatch(setOrderRequest(true));
    }
  };

  const closeOrderModal = () => {
    dispatch(setOrderRequest(false));
    dispatch(resetNewOrderData());
    dispatch(resetBurger());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
