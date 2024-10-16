import React, { useState, useEffect } from 'react';
import { Modal, Pressable, Text, View, Image } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getAllCouponsAction } from '../../store/actions/couponActions';
import { getAllBrandsAction } from '../../store/actions/brandActions';
import { useDispatch, useSelector } from 'react-redux';

const Header = ({
    onSearch,
    setSelectedBrand,
    setDiscountMin,
    setDiscountMax,
    setPriceMin,
    setPriceMax,
    
    setCouponType
}) => {
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [isBrandModalVisible, setBrandModalVisible] = useState(false);
    const [localDiscountMin, setLocalDiscountMin] = useState(0);
    const [localDiscountMax, setLocalDiscountMax] = useState(100);
    const [localPriceMin, setLocalPriceMin] = useState(0);
    const [localPriceMax, setLocalPriceMax] = useState(500);
    
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [localCouponType, setLocalCouponType] = useState('');
    const [localSelectedBrand, setLocalSelectedBrand] = useState('');

    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brand.brands);

    useEffect(() => {
        dispatch(getAllBrandsAction());
    }, [dispatch]);

    const applyFilters = () => {
        setDiscountMin(localDiscountMin);
        setDiscountMax(localDiscountMax);
        setPriceMin(localPriceMin);
        setPriceMax(localPriceMax);
        
        setCouponType(localCouponType);
        setSelectedBrand(localSelectedBrand);
        setFilterModalVisible(false);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || localExpirationDate;
        setShowDatePicker(false);
        setLocalExpirationDate(currentDate);
    };

    const handleBrandSelect = (brand) => {
        setLocalSelectedBrand(brand);
        setBrandModalVisible(false);
    };

    const reloadCoupons = () => {
        dispatch(getAllCouponsAction());
    };

    return (
        <HeaderContainer>
            <SearchBar
                placeholder="Search..."
                onChangeText={onSearch}
            />
            <ButtonGroup>
                <ReloadButton onPress={reloadCoupons}>
                    <MaterialIcons name="refresh" size={24} color="#000000" />
                </ReloadButton>
                <FilterButton onPress={() => setFilterModalVisible(true)}>
                    <MaterialCommunityIcons name="tune-vertical" size={24} color="#000000" />
                </FilterButton>
            </ButtonGroup>

            {/* Filter Modal */}
            <Modal
                visible={isFilterModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <ModalContainer>
                    <ModalContent>
                        <ModalHeader>
                            <ModalTitle>Filter Options</ModalTitle>
                            <CloseButton onPress={() => setFilterModalVisible(false)}>
                                <FontAwesome5 name="times" size={24} color="#000000" />
                            </CloseButton>
                        </ModalHeader>

                        {/* Discount Range */}
                        <FilterSection>
                            <FilterLabel>Discount Range (%)</FilterLabel>
                            <Slider
                                value={localDiscountMin}
                                onValueChange={value => setLocalDiscountMin(value)}
                                minimumValue={0}
                                maximumValue={100}
                                step={1}
                                minimumTrackTintColor="#6200b3"
                                maximumTrackTintColor="#ddd"
                                thumbTintColor="#6200b3"
                            />
                            <Slider
                                value={localDiscountMax}
                                onValueChange={value => setLocalDiscountMax(value)}
                                minimumValue={0}
                                maximumValue={100}
                                step={1}
                                minimumTrackTintColor="#6200b3"
                                maximumTrackTintColor="#ddd"
                                thumbTintColor="#6200b3"
                            />
                            <FilterValues>
                                <Text>Min: {Math.round(localDiscountMin)}%</Text>
                                <Text>Max: {Math.round(localDiscountMax)}%</Text>
                            </FilterValues>
                        </FilterSection>

                        {/* Price Range */}
                        <FilterSection>
                            <FilterLabel>Price Range ($)</FilterLabel>
                            <Slider
                                value={localPriceMin}
                                onValueChange={value => setLocalPriceMin(value)}
                                minimumValue={0}
                                maximumValue={500}
                                step={1}
                                minimumTrackTintColor="#6200b3"
                                maximumTrackTintColor="#ddd"
                                thumbTintColor="#6200b3"
                            />
                            <Slider
                                value={localPriceMax}
                                onValueChange={value => setLocalPriceMax(value)}
                                minimumValue={0}
                                maximumValue={500}
                                step={1}
                                minimumTrackTintColor="#6200b3"
                                maximumTrackTintColor="#ddd"
                                thumbTintColor="#6200b3"
                            />
                            <FilterValues>
                                <Text>Min: ${Math.round(localPriceMin)}</Text>
                                <Text>Max: ${Math.round(localPriceMax)}</Text>
                            </FilterValues>
                        </FilterSection>

                        {/* Expiration Date */}
                        

                        {/* Coupon Type */}
                        <FilterSection>
                            <FilterLabel>Coupon Type</FilterLabel>
                            <FilterButtonRow>
                                <CouponTypeButton
                                    selected={localCouponType === 'Coupon'}
                                    onPress={() => setLocalCouponType('Coupon')}
                                >
                                    <ButtonText selected={localCouponType === 'Coupon'}>Coupons</ButtonText>
                                </CouponTypeButton>
                                <CouponTypeButton
                                    selected={localCouponType === 'Deal'}
                                    onPress={() => setLocalCouponType('Deal')}
                                >
                                    <ButtonText selected={localCouponType === 'Deal'}>Deals</ButtonText>
                                </CouponTypeButton>
                            </FilterButtonRow>
                        </FilterSection>

                        {/* Select Brand */}
                        <FilterSection>
                            <FilterLabel>Select Brand</FilterLabel>
                            <SelectBrandButton onPress={() => setBrandModalVisible(true)}>
                                <Text>Select Brand</Text>
                            </SelectBrandButton>
                        </FilterSection>

                        {/* Apply Filters Button */}
                        <ApplyFiltersButton onPress={applyFilters}>
                            <ApplyButtonText>Apply Filters</ApplyButtonText>
                        </ApplyFiltersButton>
                    </ModalContent>
                </ModalContainer>
            </Modal>

            {/* Brand Modal */}
            <Modal
                visible={isBrandModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setBrandModalVisible(false)}
            >
                <ModalContainer>
                    <ModalContent>
                        <ModalHeader>
                            <ModalTitle>Select Brand</ModalTitle>
                            <CloseButton onPress={() => setBrandModalVisible(false)}>
                                <FontAwesome5 name="times" size={24} color="#000000" />
                            </CloseButton>
                        </ModalHeader>

                        <BrandList>
                            {brands.map((brand) => (
                                <Pressable
                                    key={brand._id}
                                    onPress={() => handleBrandSelect(brand)}
                                    style={{ marginBottom: 10 }}
                                >
                                    <BrandButton>
                                        <BrandLogo source={{ uri: brand.logoUrl }} />
                                        <BrandName>{brand.name}</BrandName>
                                    </BrandButton>
                                </Pressable>
                            ))}
                        </BrandList>
                    </ModalContent>
                </ModalContainer>
            </Modal>
        </HeaderContainer>
    );
};

export default Header;

// Styled Components
const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-radius: 15px;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 98%;
`;

const SearchBar = styled.TextInput`
  flex: 1;
  height: 40px;
  background-color: #fff;
  border-radius: 20px;
  padding: 0 16px;
  border: 1px solid #000000;
`;

const FilterButton = styled.TouchableOpacity`
  margin-left: 16px;
  border-radius: 50px;
  border: 1px solid #000000;
  padding: 5px;
  background-color: #f0f0f0;
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ReloadButton = styled.TouchableOpacity`
  margin-left: 16px;
  border-radius: 50px;
  border: 1px solid #000000;
  padding: 5px;
  background-color: #f0f0f0;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 100%;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 16px;
  min-height: 60%;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const CloseButton = styled.TouchableOpacity``;

const FilterSection = styled.View`
  margin-bottom: 16px;
`;

const FilterLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const FilterValues = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const DateButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-top: 8px;
`;

const DateButtonText = styled.Text`
  font-size: 16px;
  color: #000;
`;

const ApplyFiltersButton = styled.TouchableOpacity`
  background-color: #6200b3;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
`;

const ApplyButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const FilterButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

const CouponTypeButton = styled.TouchableOpacity`
  background-color: ${props => (props.selected ? '#6200b3' : '#f0f0f0')};
  padding: 8px 12px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: ${props => (props.selected ? '#fff' : '#000')};
`;

const BrandList = styled.View`
  flex: 1;
`;

const BrandButton = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
`;

const BrandLogo = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const BrandName = styled.Text`
  font-size: 16px;
`;

const SelectBrandButton = styled.TouchableOpacity`
   padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-top: 10px;
  
`
  
;