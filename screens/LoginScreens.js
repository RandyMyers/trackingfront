import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastAndroid } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { loginUserAction } from '../store/actions/authActions';

const LoginScreenContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  height: 40px;
  width: 100%;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #3c096c;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
  width: 100%;
`;

const LoginButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
`;

const RegisterLink = styled.Text`
  color: #3498db;
  text-decoration-line: underline;
  margin-top: 20px;
`;

const ForgotPasswordLink = styled.Text`
  color: #3498db;
  text-decoration-line: underline;
  margin-top: 10px;
`;

const LogoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 80px;
`;

const PackageIcon = styled(Feather)`
  color: #fb8500;
  font-size: 50px;
  margin-bottom: 20px;
`;

const LogoText = styled.Text`
  font-size: 24px;
  font-weight: 800;
  padding-bottom: 14px;
  align-items: center;
  color: #3c096c;
`;

const ErrorMessage = styled.Text`
  color: red;
  margin-bottom: 15px;
`;

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const error = useSelector(state => state.auth.error);
  const message = useSelector(state => state.auth.message);

  useEffect(() => {
    if (message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }, [message]);
  

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }, [error]);
  

  const handleLogin = () => {
    const userData = {
      username,
      password,
    };
    dispatch(loginUserAction(userData));
    
  };

  return (
    <LoginScreenContainer>
      
      <LogoContainer>
        <PackageIcon name="box" />
        <LogoText>Track4u</LogoText>
      </LogoContainer>

      <Title>Login</Title>



      <Input
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <LoginButton onPress={handleLogin}>
        <LoginButtonText>Login</LoginButtonText>
      </LoginButton>
      <ForgotPasswordLink onPress={() => navigation.navigate('PasswordResetRequest')}>
        Forgot Password?
      </ForgotPasswordLink>
      <RegisterLink onPress={() => navigation.navigate('Register')}>
        Don't have an account? Register here
      </RegisterLink>
    </LoginScreenContainer>
  );
};

export default LoginScreen;
