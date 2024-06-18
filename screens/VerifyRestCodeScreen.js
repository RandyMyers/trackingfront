import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { verifyResetCodeAction } from '../store/actions/authActions';
import { useNavigation } from '@react-navigation/native';

const VerifyResetCodeScreenContainer = styled.View`
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

const VerifyCodeButton = styled.TouchableOpacity`
  background-color: #3c096c;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
  width: 80%;
  margin-bottom: 10px;
`;

const VerifyCodeButtonText = styled.Text`
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

const VerifyResetCodeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [resetCode, setResetCode] = useState('');
  const { email, loading, error } = useSelector(state => state.auth);

  const handleVerifyCode = () => {
    if (!resetCode.trim()) {
      alert('Please enter the reset code');
      return;
    }
    let resetCodeData = {
      email,
      resetCode
    }
    dispatch(verifyResetCodeAction(resetCodeData));
    navigation.navigate('ResetPassword')
  };

  return (
    <VerifyResetCodeScreenContainer>
      <Title>Enter the reset code sent to your email</Title>

      <Input
        placeholder="Reset Code"
        value={resetCode}
        onChangeText={setResetCode}
        keyboardType="numeric"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <VerifyCodeButton onPress={handleVerifyCode}>
            <VerifyCodeButtonText>Verify Code</VerifyCodeButtonText>
          </VerifyCodeButton>
          <GoBackButton onPress={() => navigation.goBack()}>
            <GoBackButtonText>Go Back</GoBackButtonText>
          </GoBackButton>
        </>
      )}
    </VerifyResetCodeScreenContainer>
  );
};

export default VerifyResetCodeScreen;
