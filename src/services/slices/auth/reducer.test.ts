import reducer, { initialState, setIsAuthChecked, setUser } from './authSlice';
import { loginApi, registrationApi, logoutApi, updateUserApi } from './actions';

describe('test reducer auth', () => {
  const mockUser = {
    email: 'test@mail.ru',
    name: 'test'
  };

  test('initializes correctly', () => {
    const state = reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  describe('test actions', () => {
    test('[setIsAuthChecked] test set isAuthChecked', () => {
      const state = reducer(initialState, setIsAuthChecked(true));
      const { isAuthChecked } = state;
      expect(isAuthChecked).toBeTruthy();
    });

    test('[setUser] test set user', () => {
      const state = reducer(initialState, setUser(mockUser));
      const { user } = state;
      expect(user).toEqual(mockUser);
    });
  });

  describe('test async actions', () => {
    describe('[registationApi] test registationApi', () => {
      test('test pending', () => {
        const action = { type: registrationApi.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: null });
      });

      test('test rejected', () => {
        const action = {
          type: registrationApi.rejected.type,
          error: { message: 'Test' }
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: 'Test' });
      });

      test('test fulfilled', () => {
        const action = {
          type: registrationApi.fulfilled.type,
          payload: mockUser
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          user: mockUser,
          isAuthChecked: true
        });
      });
    });

    describe('[loginApi] test loginApi', () => {
      test('test pending', () => {
        const action = { type: loginApi.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: null });
      });

      test('test rejected', () => {
        const action = {
          type: loginApi.rejected.type,
          error: { message: 'Test' }
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          error: 'Test',
          isAuthChecked: true
        });
      });

      test('test fulfilled', () => {
        const action = {
          type: loginApi.fulfilled.type,
          payload: mockUser
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          user: mockUser,
          isAuthChecked: true
        });
      });
    });

    describe('[logoutApi] test logoutApi', () => {
      test('test pending', () => {
        const action = { type: logoutApi.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: null });
      });

      test('test rejected', () => {
        const action = {
          type: logoutApi.rejected.type,
          error: { message: 'Test' }
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: 'Test' });
      });

      test('test fulfilled', () => {
        const action = {
          type: logoutApi.fulfilled.type
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          user: null
        });
      });
    });

    describe('[updateUserApi] test updateUserApi', () => {
      test('test pending', () => {
        const action = { type: registrationApi.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: null });
      });

      test('test rejected', () => {
        const action = {
          type: registrationApi.rejected.type,
          error: { message: 'Test' }
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({ ...initialState, error: 'Test' });
      });

      test('test fulfilled', () => {
        const action = {
          type: registrationApi.fulfilled.type,
          payload: mockUser
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
          ...initialState,
          user: mockUser,
          isAuthChecked: true
        });
      });
    });
  });
});
