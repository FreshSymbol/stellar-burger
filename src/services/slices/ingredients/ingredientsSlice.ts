import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { ingredientsApi } from './actions';

type TConstructorBurger = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TInitialState = {
  isLoading: boolean;
  ingredients: TIngredient[];
  bun: TIngredient[];
  main: TIngredient[];
  sauce: TIngredient[];
  burger: TConstructorBurger;
  orderRequest: boolean;
  error?: string | null;
  ingredientDetails?: TIngredient | null;
};

export const initialState: TInitialState = {
  isLoading: false,
  ingredients: [],
  bun: [],
  main: [],
  sauce: [],
  burger: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  error: null,
  ingredientDetails: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, actions: PayloadAction<TConstructorIngredient>) => {
        actions.payload.type === 'bun'
          ? (state.burger.bun = actions.payload)
          : state.burger.ingredients.push(actions.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, actions: PayloadAction<number>) => {
      state.burger.ingredients.splice(actions.payload, 1);
    },
    moveIngredientDown: (state, actions: PayloadAction<number>) => {
      const temp = state.burger.ingredients[actions.payload];
      state.burger.ingredients[actions.payload] =
        state.burger.ingredients[actions.payload + 1];
      state.burger.ingredients[actions.payload + 1] = temp;
    },
    moveIngredientUp: (state, actions: PayloadAction<number>) => {
      const temp = state.burger.ingredients[actions.payload];
      state.burger.ingredients[actions.payload] =
        state.burger.ingredients[actions.payload - 1];
      state.burger.ingredients[actions.payload - 1] = temp;
    },
    resetBurger: (state) => {
      (state.burger.bun = null), (state.burger.ingredients = []);
    }
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getBuns: (state) => state.bun,
    getMains: (state) => state.main,
    getSauces: (state) => state.sauce,
    getBurger: (state) => state.burger,
    getIsLoading: (state) => state.isLoading,
    getIngredientDetails: (state) => state.ingredientDetails
  },
  extraReducers: (builder) => {
    builder
      .addCase(ingredientsApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ingredientsApi.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = actions.error.message;
      })
      .addCase(ingredientsApi.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.ingredients = actions.payload;

        state.bun = state.ingredients.filter(
          (ingredient) => ingredient.type === 'bun'
        );
        state.main = state.ingredients.filter(
          (ingredient) => ingredient.type === 'main'
        );
        state.sauce = state.ingredients.filter(
          (ingredient) => ingredient.type === 'sauce'
        );
      });
  }
});
export const {
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp,
  resetBurger
} = ingredientsSlice.actions;
export const {
  getIngredients,
  getBuns,
  getMains,
  getSauces,
  getBurger,
  getIsLoading,
  getIngredientDetails
} = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
