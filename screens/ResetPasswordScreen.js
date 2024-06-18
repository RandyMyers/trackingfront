import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { resetPasswordAction } from '../store/actions/authActions';
import { useNavigation } from '@react-navigation/native';

const ResetPasswordScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const Input = styled.TextInput`
  height: 40px;
  width: 80%;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
`;

const ResetPasswordButton = styled.TouchableOpacity`
  background-color: #3c096c;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
  width: 80%;
  margin-bottom: 10px;
`;

const ResetPasswordButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
`;

const GoBackButton = styled.TouchableOpacity`
  background-color: #ccc;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
  width: 80%;
`;

const GoBackButtonText = styled.Text`
  color: #000;
  font-size: 18px;
`;

const ErrorMessage = styled.Text`
  color: red;
  margin-bottom: 15px;
  text-align: center;
`;

const ResetPasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { email, resetCode, loading, error } = useSelector(state => state.auth);

  const handleResetPassword = () => {
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please enter them again.");
      return;
    }

    let resetPasswordData = {
      email,
      newPassword
    }

    dispatch(resetPasswordAction(resetPasswordData));
    navigation.navigate('Login');
  };

  return (
    <ResetPasswordScreenContainer>
      <Title>Enter your new password</Title>

      <Input
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <Input
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ResetPasswordButton onPress={handleResetPassword}>
            <ResetPasswordButtonText>Reset Password</ResetPasswordButtonText>
          </ResetPasswordButton>
          <GoBackButton onPress={() => navigation.goBack()}>
            <GoBackButtonText>Go Back</GoBackButtonText>
          </GoBackButton>
        </>
      )}
    </ResetPasswordScreenContainer>
  );
};

export default ResetPasswordScreen;
