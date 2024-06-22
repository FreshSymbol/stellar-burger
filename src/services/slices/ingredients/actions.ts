import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const ingredientsApi = createAsyncThunk(
  'ingredients/ingredientsApi',
  async () => getIngredientsApi()
);
