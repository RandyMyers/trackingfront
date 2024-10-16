import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducers from './reducers/authReducers';
import userReducers from './reducers/userReducers';
import paymentReducer from './reducers/paymentReducers';
import packageReducers from './reducers/packageReducers';
import templateReducer from './reducers/templateReducer';
import subscriptionPlanReducer from './reducers/subscriptionPlanReducers';
import subscriptionReducer from './reducers/subscriptionReducers';


import notificationReducer from './reducers/notificationReducers';
import paymentMethodReducer from './reducers/paymentMethodReducer';
import couponReducer from './reducers/couponReducers';
import categoryReducer from './reducers/categoryReducers';
import brandReducer from './reducers/brandReducer';
import feedbackReducer from './reducers/feedbackReducers';

const rootReducer = combineReducers({
  auth: authReducers,
  user: userReducers,
  package: packageReducers,
  email: templateReducer,
  plans: subscriptionPlanReducer,
  subscription: subscriptionReducer,
  payments: paymentReducer,
  note: notificationReducer,
  paymentMethod: paymentMethodReducer,
  deal: couponReducer,
  category: categoryReducer,
  brand: brandReducer,
  feedback: feedbackReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'plans','subscription','user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
