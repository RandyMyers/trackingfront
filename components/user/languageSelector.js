import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const flags = {
  en: 'https://flagcdn.com/us.svg',
  de: 'https://flagcdn.com/de.svg',
  es: 'https://flagcdn.com/es.svg',
  fr: 'https://flagcdn.com/fr.svg',
  sv: 'https://flagcdn.com/se.svg',
  no: 'https://flagcdn.com/no.svg',
  fi: 'https://flagcdn.com/fi.svg',
};

const Container = styled.View`
  padding: 20px;
`;

const TitleText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #10002b;
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const LanguageButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  width: 98%;
  justify-content: space-between;
`;

const ButtonText = styled(Text)`
  color: #10002b;
  font-size: 16px;
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const navigation = useNavigation();  // Initialize navigation

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    navigation.navigate('Main');  // Navigate to HomeScreen
  };

  return (
    <Container>
      <TitleText>Select Your Language</TitleText>
      <ButtonContainer>
        {Object.entries(flags).map(([code, imgSrc]) => (
          <LanguageButton key={code} onPress={() => handleChangeLanguage(code)}>
            <SvgUri uri={imgSrc} width="32" height="20" />
            <ButtonText>{code.toUpperCase()}</ButtonText>
            <MaterialIcons name="chevron-right" size={24} color="#10002b" />
          </LanguageButton>
        ))}
      </ButtonContainer>
    </Container>
  );
};

export default LanguageSelector;
