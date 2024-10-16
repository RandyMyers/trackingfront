import React from 'react';
import styled from 'styled-components/native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const PaymentCard = ({ payment }) => {
  // Determine status icon and color
  const getStatusDetails = (status) => {
    if (status.toLowerCase() === 'paid') {
      return { icon: 'check-circle', color: 'green' };
    } else if (status.toLowerCase() === 'pending') {
      return { icon: 'clock', color: 'orange' }; // Pending status (using clock icon and orange color)
    } else {
      return { icon: 'alert-circle', color: 'red' }; // Failed or any other status (using alert icon and red color)
    }
  };

  const { icon, color } = getStatusDetails(payment.status);

  return (
    <Card>
      {/* Top Row: Plan and Date */}
      <TopRow>
        <PlanName>{payment.planId.name}</PlanName>
        <DateText>{new Date(payment.createdAt).toLocaleDateString()}</DateText>
      </TopRow>

      {/* Middle Row: Payment method and Status */}
      <Row>
        <RowItem>
          <Feather name="credit-card" size={20} color="#6200b3" />
          <RowText>
            {payment.paymentMethodId ? payment.paymentMethodId.type : 'Not Available'}
          </RowText>
        </RowItem>
        <RowItem>
          <Feather name={icon} size={20} color={color} />
          <RowText style={{ color }}>{payment.status}</RowText>
        </RowItem>
      </Row>

      {/* Bottom Row: Amount */}
      <AmountRow>
      <MaterialIcons name="attach-money" size={20} color="#6200b3" />
        <AmountText>{payment.amount.toFixed(2)}</AmountText>
      </AmountRow>
    </Card>
  );
};

export default PaymentCard;

const Card = styled.View`
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

/* Top row: Plan name and date */
const TopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PlanName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const DateText = styled.Text`
  font-size: 14px;
  color: #888;
`;

/* Generic Row for icons and text */
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const RowItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowText = styled.Text`
  font-size: 16px;
  margin-left: 8px;
`;

/* Row for Amount display */
const AmountRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 5px;
`;

const AmountText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #6200b3;
  margin-left: 8px;
`;
