import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import Loader from '../components/common/Loader';
import Error from '../components/common/Error';
import PaymentCard from '../components/payment/paymentCard';
import { fetchPaymentsByUserAction } from '../store/actions/paymentActions';

const PaymentsScreen = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user);
  const payments = useSelector((state) => state.payments.payments);
  const loading = useSelector((state) => state.payments.loading);
  const error = useSelector((state) => state.payments.error);

  useEffect(() => {
    dispatch(fetchPaymentsByUserAction(userId));
  }, [dispatch, userId]);

  // Sort payments by createdAt in descending order (latest first)
  const sortedPayments = [...payments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <Container>
      {loading && <Loader />}
      {error && <Error message={error} />}
      {payments.length === 0 && !loading && !error ? (
        <NoPaymentsMessage>No payments yet</NoPaymentsMessage>
      ) : (
        <PaymentsGrid>
          {sortedPayments.map((payment) => (
            <PaymentCard key={payment._id} payment={payment} />
          ))}
        </PaymentsGrid>
      )}
    </Container>
  );
};

export default PaymentsScreen;

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

const PaymentsGrid = styled.ScrollView`
  flex: 1;
`;

const NoPaymentsMessage = styled.Text`
  font-size: 18px;
  color: #888;
  text-align: center;
  margin-top: 20px;
`;
