// src/components/UsageTracker.js
import React from 'react';
import { View, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';

const Container = styled.View`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-vertical: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const UsageText = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
`;

const RemainingDaysText = styled.Text`
  font-size: 14px;
  margin-bottom: 5px;
  color: #333333;
`;

const ProgressBarContainer = styled.View`
  height: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const UsageTracker = ({ used, total, plan, remainingDays }) => {
  const { t } = useTranslation();
  const percentageUsed = (used / total) * 100;

  return (
    <Container>
      <UsageText>
        {t('usageTracker.used', { used, total, percentageUsed: percentageUsed.toFixed(0), plan })}
      </UsageText>
      <RemainingDaysText>
        {t('usageTracker.remainingDays', { remainingDays })}
      </RemainingDaysText>
      <ProgressBarContainer>
        <ProgressBar
          progress={percentageUsed / 100}
          color="#6200b3"
        />
      </ProgressBarContainer>
    </Container>
  );
};

export default UsageTracker;
