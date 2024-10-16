import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';
import { getAllCategoriesAction } from '../store/actions/categoryActions';
import { getAllCouponsAction } from '../store/actions/couponActions';
import CouponCard from '../components/coupon/couponCard';
import Header from '../components/coupon/Header';
import { getAllBrandsAction } from '../store/actions/brandActions';

const CouponScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const categoryLoading = useSelector((state) => state.category.loading);
  const categoryError = useSelector((state) => state.category.error);

  const coupons = useSelector((state) => state.deal.coupons);
  const couponLoading = useSelector((state) => state.deal.loading);
  const couponError = useSelector((state) => state.deal.error);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [filteredCoupons, setFilteredCoupons] = useState([]);

  // Filter state variables
  const [discountMin, setDiscountMin] = useState(0);
  const [discountMax, setDiscountMax] = useState(100);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);
  const [couponType, setCouponType] = useState('');

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllCouponsAction());
    dispatch(getAllBrandsAction());
  }, [dispatch]);

  useEffect(() => {
    // Filter coupons based on selected filters
    const applyFilters = () => {
        let filtered = coupons;

        console.log('Original coupons:', coupons);

        // Apply category filter if selected
        if (selectedCategory) {
            filtered = filtered.filter(coupon => coupon.category.name === selectedCategory);
            console.log('After category filter:', filtered);
        }

        // Apply discount range filter only if user has interacted with it
        if (discountMin !== 0 || discountMax !== 100) {
            filtered = filtered.filter(coupon =>
                coupon.discountPercentage >= discountMin && coupon.discountPercentage <= discountMax
            );
            console.log('After discount filter:', filtered);
        }

         // Apply brand filter if selected
         if (selectedBrand) {
          filtered = filtered.filter(coupon => coupon.brand.name === selectedBrand);
          console.log('After brand filter:', filtered);
      }

        // Apply price range filter only if user has interacted with it
        if (priceMin !== 0 || priceMax !== 500) {
            filtered = filtered.filter(coupon =>
                coupon.actualPrice >= priceMin && coupon.actualPrice <= priceMax
            );
            console.log('After price filter:', filtered);
        }

       

        // Apply coupon type filter only if selected
        if (couponType) {
            filtered = filtered.filter(coupon => coupon.couponType === couponType);
            console.log('After coupon type filter:', filtered);
        }

        setFilteredCoupons(filtered);
        console.log('Final filtered coupons:', filtered);
    };

    // Apply filters if coupons are loaded
    if (coupons.length > 0) {
        applyFilters();
    }
}, [selectedCategory, discountMin, discountMax, priceMin, priceMax, couponType, coupons]);

  const handleSearch = (text) => {
    // Implement search logic here
  };

  if (categoryLoading || couponLoading) {
    return (
      <CenteredView>
        <ActivityIndicator size="large" color="#6200b3" />
      </CenteredView>
    );
  }

  if (categoryError || couponError) {
    return (
      <CenteredView>
        <ErrorText>
          {categoryError ? 'Failed to load categories.' : ''}
          {couponError ? ' Failed to load coupons.' : ''}
        </ErrorText>
      </CenteredView>
    );
  }

  return (
    <Container>
      <Header
        onSearch={handleSearch}
        setSelectedCategory={setSelectedCategory}
        setDiscountMin={setDiscountMin}
        setDiscountMax={setDiscountMax}
        setPriceMin={setPriceMin}
        setPriceMax={setPriceMax}
        setCouponType={setCouponType}
        setSelectedBrand={setSelectedBrand}
      />

      {/* Category Filters */}
      <HorizontalScrollView horizontal showsHorizontalScrollIndicator={false}>
        <CategoryButton
          selected={selectedCategory === ''}
          onPress={() => setSelectedCategory('')}
        >
          <CategoryButtonText selected={selectedCategory === ''}>All</CategoryButtonText>
        </CategoryButton>
        {categories.map((category) => (
          <CategoryButton
            key={category._id}
            selected={selectedCategory === category.name}
            onPress={() => setSelectedCategory(category.name)}
          >
            <CategoryButtonText selected={selectedCategory === category.name}>
              {category.name}
            </CategoryButtonText>
          </CategoryButton>
        ))}
      </HorizontalScrollView>

      {/* Displaying Coupons in a Row */}
      <ScrollView>
        <CardRow>
          {filteredCoupons.length > 0 ? (
            filteredCoupons.map((coupon) => (
              <CouponCard key={coupon._id} coupon={coupon} navigation={navigation} />
            ))
          ) : (
            <CenteredText>No coupons available.</CenteredText>
          )}
        </CardRow>
      </ScrollView>
    </Container>
  );
};

export default CouponScreen;

// Styled Components
const Container = styled.View`
  padding: 16px;
`;

const HorizontalScrollView = styled(ScrollView)`
  margin-bottom: 16px;
`;

const CardRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CategoryButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${(props) => (props.selected ? '#6200b3' : '#ddd')};
  border-radius: 20px;
  margin-right: 8px;
  height: 40px;
`;

const CategoryButtonText = styled.Text`
  color: ${(props) => (props.selected ? '#fff' : '#000')};
`;

const ErrorText = styled.Text`
  color: red;
`;

const CenteredText = styled.Text`
  text-align: center;
  margin-top: 20px;
`;
