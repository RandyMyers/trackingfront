import React from 'react';
import { View, Text, Linking, Alert } from 'react-native';
import styled from 'styled-components/native';
import * as Clipboard from 'expo-clipboard';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';


// Styled components
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ContentWrapper = styled.ScrollView`
  flex: 1;
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: 16px;
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const CouponImage = styled.Image`
  object-fit: cover;
  height: 180px;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const CouponCodeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 8px;
`;

const CodeContainer = styled.View`
  flex: 1;
  border: 2px dotted #6200b3;
  border-radius: 8px;
  padding: 8px;
  justify-content: center;
  align-items: center;
`;

const CouponCode = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #6200b3;
  text-align: center;
`;

const ExpirationCard = styled.View`
  background-color: #f1f8ff;
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
  align-items: center;
`;

const ExpirationTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const ExpirationDates = styled.Text`
  font-size: 16px;
  color: #555;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #333;
  line-height: 24px;
  margin-top: 10px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-top: 16px;
`;

const TermsList = styled.View`
  margin-top: 8px;
  margin-bottom: 150px;
`;

const TermItem = styled.Text`
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
`;

const ProductLinkContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #ddd;
`;

const ProductLink = styled.TouchableOpacity`
  background-color: #6200b3;
  border-radius: 20px;
  padding: 12px 24px;
  align-items: center;
  justify-content: center;
`;

const ProductLinkText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const CopyButton = styled.TouchableOpacity`
  background-color: #6200b3;
  border-radius: 8px;
  padding: 12px;
  margin-left: 8px;
  align-items: center;
  justify-content: center;
`;

const DiscountCard = styled.View`
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 16px;
  flex-direction: row;
  gap: 20px;
  margin-top: 16px;
  align-items: center;
`;

const DiscountHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DiscountIcon = styled(FontAwesome5)`
  color: #ff5722;
  margin-right: 8px;
`;

const DiscountText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #ff5722;
`;

const SaveAmountText = styled.Text`
  font-size: 18px;
  color: #4caf50;
  margin-top: 8px;
`;

const OriginalPriceContainer = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
`;

const OriginalPriceText = styled.Text`
  font-size: 16px;
  color: #999;
  text-decoration: line-through;
`;

const FinalPriceText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-top: 8px;
`;

const BrandContainer = styled.View`
  margin-bottom: 16px;
  align-items: center;
`;

const BrandName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const BrandImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  object-fit: contain;
`;


// CouponDetailScreen component
const CouponDetailScreen = ({ route }) => {
  const { coupon } = route.params;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(coupon.couponCode);
    Alert.alert('Copied', 'Coupon code copied to clipboard!');
  };

  return (
    <Container>
      <ContentWrapper>
        <Content>
          <ImageContainer>
              {coupon.imageUrl && <CouponImage source={{ uri: coupon.imageUrl }} />}
          </ImageContainer>
          
          <Title>{coupon.title}</Title>

          
          <Label>Discount:</Label>
          <DiscountCard>
            <DiscountHeader>
              <DiscountIcon name="tags" size={24} />
              <DiscountText>{coupon.discountPercentage}% off</DiscountText>
            </DiscountHeader>
            {coupon.discountAmount && (
              <SaveAmountText>Save: ${coupon.discountAmount}</SaveAmountText>
            )}
            {coupon.actualPrice && (
              <OriginalPriceContainer>
                <OriginalPriceText>Original Price: ${coupon.actualPrice}</OriginalPriceText>
              </OriginalPriceContainer>
            )}
            {coupon.finalPrice && (
              <FinalPriceText>Now: ${coupon.finalPrice}</FinalPriceText>
            )}
          </DiscountCard>
          <Label>Coupon Code</Label>
          <CouponCodeContainer>
            <CodeContainer>
              <CouponCode>{coupon.couponCode}</CouponCode>
            </CodeContainer>
            <CopyButton onPress={copyToClipboard}>
              <MaterialIcons name="content-copy" size={24} color="#fff" />
            </CopyButton>
          </CouponCodeContainer>
           {/* Brand Section */}
           <BrandContainer>
            <Label>Shop - {coupon.brand.name}</Label>
            {coupon.brand.logoUrl && (
              <BrandImage source={{ uri: coupon.brand.logoUrl }} />
            )}
          </BrandContainer>
          <ExpirationCard>
            <ExpirationTitle>Expiry Date</ExpirationTitle>
            <ExpirationDates>
              Valid from {new Date(coupon.startDate).toLocaleDateString()} to {new Date(coupon.endDate).toLocaleDateString()}
            </ExpirationDates>
          </ExpirationCard>
          <Description>{coupon.description}</Description>

          <Label>Category:</Label>
          <Text>{coupon.category.name}</Text>

          <Label>Terms and Conditions:</Label>
          <TermsList>
            {coupon.termsAndConditions && coupon.termsAndConditions.map((term, index) => (
              <TermItem key={index}>{term}</TermItem>
            ))}
          </TermsList>
        </Content>
      </ContentWrapper>
      {coupon.productUrl && (
        <ProductLinkContainer>
          <ProductLink onPress={() => Linking.openURL(coupon.productUrl)}>
            <ProductLinkText>View Product</ProductLinkText>
          </ProductLink>
        </ProductLinkContainer>
      )}
    </Container>
  );
};

export default CouponDetailScreen;
