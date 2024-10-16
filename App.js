import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import DeactivatedAccountNavigator from './navigation/DeactivedAccountNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, persistor } from './store/configreStore';
import { getUserByIdAction } from './store/actions/userActions'; // Ensure this path is correct
import './language/i18n';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const RootNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isActive = useSelector((state) => state.user.isActive);
  const userId = useSelector((state) => state.auth.user); // Ensure this path is correct

  useEffect(() => {
    if (isAuthenticated && userId) {
      dispatch(getUserByIdAction(userId)); // Fetch user data to get the latest isActive status
    }
  }, [dispatch, isAuthenticated, userId]);

  if (isAuthenticated) {
    return isActive ? <AppNavigator /> : <DeactivatedAccountNavigator />;
  } else {
    return <AuthNavigator />;
  }
};

export default App;
