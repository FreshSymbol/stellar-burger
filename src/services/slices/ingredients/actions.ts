import { getIngredientsApi } from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const ingredientsApi = createAsyncThunk(
  'ingredients/ingredientsApi',
  async () => getIngredientsApi()
);
