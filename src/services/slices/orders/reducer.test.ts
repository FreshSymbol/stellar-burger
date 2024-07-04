import { createOrderApi, feedsApi, ordersApi } from './actions';
import reducer, {
  resetNewOrderData,
  setOrderData,
  setOrderRequest,
  initialState
} from './ordersSlice';

describe('test reducer orders', () => {
  const mockOrderData = {
    _id: '4322',
    status: 'done',
    name: 'Test Burger',
    createdAt: '22-07-2024',
    updatedAt: '22-07-2-24',
    number: 3443522,
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e'
    ]
  };

  const mockOrders = [
    {
      _id: '6683fdfd856777001bb1f281',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-07-02T13:17:49.768Z',
      updatedAt: '2024-07-02T13:17:50.151Z',
      number: 44795
    },
    {
      _id: '6683fc9d856777001bb1f27c',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Экзо-плантаго флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2024-07-02T13:11:57.545Z',
      updatedAt: '2024-07-02T13:11:58.011Z',
      number: 44794
    }
  ];

  const mockFeeds = {
    success: true,
    orders: mockOrders,
    total: 2,
    totalToday: 2
  };

  const mockOrder = {
    success: true,
    name: 'Флюоресцентный люминесцентный бургер',
    order: {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0
        }
      ],
      _id: '668413d0856777001bb1f2f6',
      owner: {
        name: 'Mount',
        email: 'senbonzakurak66@gmail.com',
        createdAt: '2024-06-21T15:10:22.299Z',
        updatedAt: '2024-06-21T20:03:24.426Z'
      },
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-07-02T14:50:56.172Z',
      updatedAt: '2024-07-02T14:50:56.544Z',
      number: 44810,
      price: 2964
    }
  };

  test('initializes correctly', () => {
    const state = reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('test actions', () => {
    test('[setOrderData] test set order data ', () => {
      const state = reducer(initialState, setOrderData(mockOrderData));
      const { orderData } = state;
      expect(orderData).toEqual(mockOrderData);
    });

    test('[setOrderRequest] test set order request ', () => {
      const state = reducer(initialState, setOrderRequest(true));
      const { orderRequest } = state;
      expect(orderRequest).toBeTruthy();
    });

    test('[resetNewOrderData] test reset order data ', () => {
      const state = reducer(initialState, resetNewOrderData());
      const { orderData } = state;
      expect(orderData).toBeNull();
    });
  });

  describe('test async actions', () => {
    describe('[ordersApi] test orderApi', () => {
      test('test pending', () => {
        const action = { type: ordersApi.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: null });
      });

      test('test rejected', () => {
        const action = {
          type: ordersApi.rejected.type,
          error: { message: 'Test' }
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: 'Test' });
      });

      test('test fulfilled', () => {
        const action = {
          type: ordersApi.fulfilled.type,
          payload: mockOrders
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, orders: mockOrders });
      });
    });

    describe('[feedsApi]', () => {
      test('test pending', () => {
        const action = { type: feedsApi.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: null });
      });

      test('test rejected', () => {
        const action = {
          type: feedsApi.rejected.type,
          error: { message: 'Test' }
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: 'Test' });
      });

      test('test fulfilled', () => {
        const action = {
          type: feedsApi.fulfilled.type,
          payload: mockFeeds
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, feeds: mockFeeds });
      });
    });

    describe('[createOrderApi]', () => {
      test('test pending', () => {
        const action = { type: createOrderApi.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: null });
      });

      test('test rejected', () => {
        const action = {
          type: createOrderApi.rejected.type,
          error: { message: 'Test' }
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: 'Test' });
      });

      test('test fulfilled', () => {
        const action = {
          type: createOrderApi.fulfilled.type,
          payload: mockOrder
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          newOrderData: mockOrder.order
        });
      });
    });
  });
});
