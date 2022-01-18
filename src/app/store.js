import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../features/reducers';


export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));
