import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'; // Import FontAwesome5 icons
import { RadioButton } from 'react-native-paper'; // Import RadioButton from react-native-paper
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { createPaymentIntentAction } from '../../store/actions/paymentActions';
import { selectPlanAction } from '../../store/actions/subscriptionPlanActions';
import { setSubscriptionAction } from '../../store/actions/subscriptionActions';

const SubscriptionPlans = ({ plans }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  

  const handleSubscribe = (plan) => {
    
    setSelectedPlan(plan);
    
    setModalVisible(true);
  };

  const handlePay = () => {
    // Dispatch createPaymentIntent action with payment data
    let planId = selectedPlan._id;
    
    let actionType = 'upgrade';
    dispatch(setSubscriptionAction(actionType));
    dispatch(selectPlanAction(planId));
    setModalVisible(false); // Close the modal
    navigation.navigate('PaymentMethod'); // Navigate to Payment screen
  };


  const renderIcon = (planName) => {
    console.log('The Plan', planName);
    switch (planName) {
      case 'Basic':
        return <FontAwesome5 name="cog" size={24} color="#6200b3" style={styles.icon} />;
      case 'Pro':
        return <FontAwesome5 name="rocket" size={24} color="#6200b3" style={styles.icon} />;
      case 'Premium':
        return <FontAwesome name="diamond" size={24} color="#6200b3" style={styles.icon} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {plans.map((plan, index) => (
        <View key={index} style={styles.planContainer}>
          <View style={styles.header}>
            {renderIcon(plan.name)}
            <Text style={styles.planName}>{plan.name}</Text>
          </View>
          <Text style={styles.planPrice}>${plan.monthlyPrice} per {plan.billingInterval}</Text>
          <View style={styles.featuresContainer}>
            {plan.features.map((feature, idx) => (
              <Text key={idx} style={styles.feature}>{feature}</Text>
            ))}
          </View>
          <TouchableOpacity style={styles.subscribeButton} onPress={() => handleSubscribe(plan)}>
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      ))}

<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
        <FontAwesome5 name="times" size={24} color="#666" />
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Selected Subscription</Text>
      <View style={styles.selectedPlanContainer}>
        <Text style={styles.selectedPlanText}>{selectedPlan?.name} Plan</Text>
        <Text style={styles.selectedPlanPrice}>${selectedPlan?.monthlyPrice}</Text>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePay}>
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  planContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  featuresContainer: {
    marginLeft: 10,
  },
  feature: {
    fontSize: 14,
    marginBottom: 5,
  },
  subscribeButton: {
    backgroundColor: '#6200b3',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  subscribeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedPlanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedPlanText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  selectedPlanPrice: {
    fontSize: 16,
    color: '#666',
  },
  payButton: {
    backgroundColor: '#FFA500',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    width: '80%',
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  paymentHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentOptions: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedPaymentOption: {
    backgroundColor: '#6200b3',
    borderColor: '#6200b3',
  },
});

export default SubscriptionPlans;
