import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { changeSubscriptionPlanAction, fetchUsedTracksAction, renewSubscriptionAction } from '../store/actions/subscriptionActions';
import { capturePayPalPaymentAction, updatePaymentAction } from '../store/actions/paymentActions';

const PayPalCheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user);
  const paymentId = useSelector((state) => state.payments.paymentId);
  const paypalId = useSelector((state) => state.payments.paypalId);
  const checkoutUrl = useSelector((state) => state.payments.approvalUrl);
  const subscription = useSelector((state) => state.subscription.subscriptionDetails);
  const plan = useSelector((state) => state.plans.selectedPlan);
  const subscriptionAction = useSelector((state) => state.subscription.subscriptionAction);
  const paymentMethod = useSelector((state) => state.paymentMethod.selectedPaymentMethod);


  const paymentMethodId = paymentMethod._id;

  const handleNavigationChange = (navState) => {
    const { url } = navState;

    if (url.includes('payment/success')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const payerId = urlParams.get('PayerID');
      console.log('the PayPal URL', payerId, paymentId);

      if (payerId) {
        dispatch(capturePayPalPaymentAction(paymentId, payerId, paypalId, paymentMethodId))
          .then(() => {
            const subscriptionData = {

              subscriptionId: subscription._id,
              paymentStatus: 'paid'
              
            };

            if (subscriptionAction === 'renew') {
              dispatch(renewSubscriptionAction(subscriptionData));
            } else {
              const newPlanData = {
                ...subscriptionData,
                newPlanId: plan._id
              };
              dispatch(changeSubscriptionPlanAction(newPlanData));
            }

              const paymentData = {
                status : 'paid'
              }
             dispatch(updatePaymentAction(paymentId, paymentData));
             dispatch(fetchUsedTracksAction(userId));

            navigation.navigate('PayPalSuccess'); // Navigate to success screen
          })
          .catch((error) => {
            console.error('Payment failed:', error);
            navigation.navigate('PayPalFailure'); // Navigate to failure screen
          });
      }
    }

    if (url.includes('payment/cancel')) {
      navigation.navigate('PaymentFailure'); // Navigate to failure screen
    }
  };

  if (!checkoutUrl) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200b3" />
      </View>
    );
  }

  return (
    <WebView
      source={{ uri: checkoutUrl }}
      style={styles.webview}
      startInLoadingState={true}
      renderLoading={() => (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200b3" />
        </View>
      )}
      onNavigationStateChange={handleNavigationChange}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
  },
});

export default PayPalCheckoutScreen;
