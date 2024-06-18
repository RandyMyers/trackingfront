import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
  const selectedPlan = useSelector(state => state.plans.selectedPlan);

  const calculateTotalCost = () => {
    // Extract price and billing interval from selectedPlan
    const { monthlyPrice, billingInterval } = selectedPlan;
  
    // Convert monthly price to number
    const price = parseFloat(monthlyPrice);
  
    // Calculate total cost based on billing interval
    let totalCost;
    if (billingInterval === 'monthly') {
      totalCost = price; // For monthly subscription, total cost equals monthly price
    } else if (billingInterval === 'yearly') {
      totalCost = price * 12; // For yearly subscription, total cost equals yearly price (monthly price * 12)
    } else {
      totalCost = price; // Default to monthly price if no valid billing interval is provided
    }
  
    // Format total cost as currency string
    return '$' + totalCost.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.summaryTitle}>Order Summary</Text>
      
      <View style={styles.item}>
         <Text style={styles.label}>Name:</Text>
         <Text>{selectedPlan.name}</Text>
      </View>

      <View style={styles.item}>
         <Text style={styles.label}>Price:</Text>
        <Text>{selectedPlan.monthlyPrice}</Text>
      </View>

      <View style={styles.item}>
         <Text style={styles.label}>Currency:</Text>
         <Text>{selectedPlan.currency}</Text>
      </View>
      
      <View style={styles.item}>
        <Text style={styles.label}>Billing Cycle:</Text>
        <Text>{selectedPlan.billingInterval}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Total Cost:</Text>
        <Text>{calculateTotalCost()}</Text>
      </View>

      {/* Add discounts or promotions if applicable */}
      {/* Add payment method if applicable */}

      <View style={styles.visualElements}>
        {/* Add visual elements such as icons or images */}
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 20,
    marginLeft:15,
    marginTop:30,
    padding: 10,
    borderRadius: 10,
    width:'90%'
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  visualElements: {
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default OrderSummary;
