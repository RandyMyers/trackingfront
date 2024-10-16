import React from 'react';
import styled from 'styled-components/native';

const Error = ({ message }) => {
  return (
    <ErrorContainer>
      <ErrorText>{message}</ErrorText>
    </ErrorContainer>
  );
};

export default Error;

const ErrorContainer = styled.View`
  padding: 20px;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  border-width: 1px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const ErrorText = styled.Text`
  color: #721c24;
  font-size: 16px;
`;
