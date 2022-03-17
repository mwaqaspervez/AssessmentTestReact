import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import loginReducer from '../account/login';
import ticketDetailReducer from '../deliveries/TicketsDetail';

const reducer = combineReducers({
  loginReducer,
  ticketDetailReducer,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
