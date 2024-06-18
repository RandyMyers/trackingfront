import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { requestPasswordResetAction } from '../store/actions/authActions';
import { useNavigation } from '@react-navigation/native';

const PasswordResetRequestScreenContainer = styled.View`
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

const RequestResetButton = styled.TouchableOpacity`
  background-color: #3c096c;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
  width: 80%;
  margin-bottom: 10px;
`;

const RequestResetButtonText = styled.Text`
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

const PasswordResetRequestScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const { loading, error, resetCodeSent } = useSelector(state => state.auth);

  const handleRequestReset = () => {
    dispatch(requestPasswordResetAction(email));
  };

  useEffect(() => {
    if (resetCodeSent) {
      navigation.navigate('VerifyResetCode');
    }
  }, [resetCodeSent, navigation]);

  return (
    <PasswordResetRequestScreenContainer>
      <Title>Enter your email to reset your password</Title>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <RequestResetButton onPress={handleRequestReset}>
            <RequestResetButtonText>Request Reset</RequestResetButtonText>
          </RequestResetButton>
          <GoBackButton onPress={() => navigation.goBack()}>
            <GoBackButtonText>Go Back</GoBackButtonText>
          </GoBackButton>
        </>
      )}
    </PasswordResetRequestScreenContainer>
  );
};

export default PasswordResetRequestScreen;
