import React from 'react';
import styled from 'styled-components/native';

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderText>Loading...</LoaderText>
    </LoaderContainer>
  );
};

export default Loader;

const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoaderText = styled.Text`
  font-size: 24px;
`;
