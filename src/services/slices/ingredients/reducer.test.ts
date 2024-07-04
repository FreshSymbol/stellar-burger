import { ingredientsApi } from './actions';
import reducer, {
  addIngredient,
  removeIngredient,
  resetBurger,
  moveIngredientDown,
  moveIngredientUp,
  initialState
} from './ingredientsSlice';

describe(' test reducer ingredients', () => {
  const mockBunIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    id: 0,
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const mockMainIngredient = {
    _id: '643d69a5c3f7b9001cfa094a',
    id: 14,
    name: 'Сыр с астероидной плесенью',
    type: 'main',
    proteins: 84,
    fat: 48,
    carbohydrates: 420,
    calories: 3377,
    price: 4142,
    image: 'https://code.s3.yandex.net/react/code/cheese.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png'
  };

  const mockSauceIngredient = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  const mockBurgerIngredients = [
    {
      _id: '643d69a5c3f7b9001cfa093e',
      id: '2',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      id: '3',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    }
  ];

  const expectMoveBurgerIngredient = [
    {
      _id: '643d69a5c3f7b9001cfa0942',
      id: '3',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      id: '2',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ];

  test('initializes correctly', () => {
    const state = reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('test actions', () => {
    describe('[addIngredient] test add ingredient', () => {
      test('test add buns', () => {
        const action = { type: addIngredient.type, payload: mockBunIngredient };
        const state = reducer(initialState, action);
        const { bun } = state.burger;
        expect(bun).not.toBeNull();
        expect(bun).toEqual(mockBunIngredient);
      });

      test('test add main or sauce ingredient', () => {
        const action = {
          type: addIngredient.type,
          payload: mockMainIngredient
        };
        const state = reducer(initialState, action);
        const { ingredients } = state.burger;
        expect(ingredients).toHaveLength(1);
        expect(ingredients).toContain(mockMainIngredient);
      });

      test('test add  sauce ingredient', () => {
        const action = {
          type: addIngredient.type,
          payload: mockSauceIngredient
        };
        const state = reducer(initialState, action);
        const { ingredients } = state.burger;
        expect(ingredients).toHaveLength(1);
        expect(ingredients).toContain(mockSauceIngredient);
      });
    });

    test('[removeIngredient] test remove ingredient', () => {
      const state = reducer(initialState, removeIngredient(0));
      const { ingredients } = state.burger;
      expect(ingredients).not.toContain(mockMainIngredient);
    });

    describe('moveIngredient', () => {
      test('[moveIngredientDown] test move down ingredient', () => {
        const action = { type: moveIngredientDown.type, payload: 0 };
        const state = reducer(
          {
            ...initialState,
            burger: {
              bun: null,
              ingredients: mockBurgerIngredients
            }
          },
          action
        );
        const { ingredients } = state.burger;
        expect(ingredients).toEqual(expectMoveBurgerIngredient);
      });

      test('[moveIngredientUp] test move up ingredient', () => {
        const action = { type: moveIngredientUp.type, payload: 1 };
        const state = reducer(
          {
            ...initialState,
            burger: {
              bun: null,
              ingredients: mockBurgerIngredients
            }
          },
          action
        );
        const { ingredients } = state.burger;
        expect(ingredients).toEqual(expectMoveBurgerIngredient);
      });
    });

    test('[resetBurger] test reset burger ingredient', () => {
      const state = reducer(initialState, resetBurger());
      const { bun, ingredients } = state.burger;
      expect(bun).toBeNull;
      expect(ingredients).toHaveLength(0);
    });
  });

  describe('test async actions', () => {
    describe('[ingredientsApi]', () => {
      test('test panding', () => {
        const action = { type: ingredientsApi.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          error: null,
          isLoading: true
        });
      });

      test('test rejected', () => {
        const action = {
          type: ingredientsApi.rejected.type,
          error: { message: 'Test' }
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          error: 'Test',
          isLoading: false
        });
      });

      test('test fulfilled', () => {
        const action = {
          type: ingredientsApi.fulfilled.type,
          payload: [mockBunIngredient, mockMainIngredient, mockSauceIngredient]
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          isLoading: false,
          ingredients: [
            mockBunIngredient,
            mockMainIngredient,
            mockSauceIngredient
          ],
          bun: [mockBunIngredient],
          main: [mockMainIngredient],
          sauce: [mockSauceIngredient]
        });
      });
    });
  });
});
