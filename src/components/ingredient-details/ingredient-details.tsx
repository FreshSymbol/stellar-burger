import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Params, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  findIngredient,
  getIngredientDetails
} from '../../services/slices/ingredients/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<Params>();
  const dispatch = useDispatch();

  dispatch(findIngredient(id!));
  const ingredientData = useSelector(getIngredientDetails);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
