import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { registerUserAction } from '../store/actions/authActions';

const RegisterScreenContainer = styled.View`
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

const RegisterButton = styled.TouchableOpacity`
  background-color: #3c096c;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
  width: 100%;
`;

const RegisterButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
`;

const BackToLogin = styled.TouchableOpacity`
  margin-top: 20px;
`;

const BackToLoginText = styled.Text`
  color: #3498db;
  text-decoration-line: underline;
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

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const userData = {
      username,
      email: email.toLowerCase(),
      password,
    };

    dispatch(registerUserAction(userData));

    navigation.navigate('Login');
  };

  return (
    <RegisterScreenContainer>
      <LogoContainer>
        <PackageIcon name="box" />
        <LogoText>TrackMate</LogoText>
      </LogoContainer>

      <Title>Create an Account</Title>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        keyboardType="email-address"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
      <RegisterButton onPress={handleRegister}>
        <RegisterButtonText>Register</RegisterButtonText>
      </RegisterButton>
      <BackToLogin onPress={() => navigation.navigate('Login')}>
        <BackToLoginText>Back to Login</BackToLoginText>
      </BackToLogin>
    </RegisterScreenContainer>
  );
};


export default RegisterScreen;
