import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { COLORS } from '@/constants/colors';
import { useCart } from '@/context/CartContext';

export default function ShoppingCartScreen() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cardType, setCardType] = useState('visa');
  const [upiApp, setUpiApp] = useState('googlepay');
  const [showMapModal, setShowMapModal] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [savedCards, setSavedCards] = useState<any[]>([]);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false,
  });

  const total = getTotalPrice();

  useEffect(() => {
    if (snackbar.visible) {
      const timer = setTimeout(() => {
        setSnackbar((prev) => ({ ...prev, visible: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [snackbar.visible]);

  const showSnackbar = (message: string, type: 'success' | 'error' = 'success') => {
    setSnackbar({ message, type, visible: true });
  };

  const reverseGeocodeLocation = async (lat: number, lon: number) => {
    try {
      const geocodeResult = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lon,
      });

      if (geocodeResult.length > 0) {
        const result = geocodeResult[0];
        const formattedAddress = [
          result.streetNumber,
          result.street,
          result.city,
          result.region,
          result.postalCode,
          result.country,
        ]
          .filter(Boolean)
          .join(', ');
        return formattedAddress;
      } else {
        return `Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(4)}`;
      }
    } catch {
      return `Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(4)}`;
    }
  };

  const handleGetCurrentLocation = async () => {
    try {
      setLocationLoading(true);

      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        showSnackbar('Location permission is required to use this feature', 'error');
        setLocationLoading(false);
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const lat = location.coords.latitude;
      const lon = location.coords.longitude;

      setLatitude(lat.toFixed(6));
      setLongitude(lon.toFixed(6));
      showSnackbar('Location detected!', 'success');
    } catch {
      showSnackbar('Failed to get location. Please try again.', 'error');
    } finally {
      setLocationLoading(false);
    }
  };

  const handleConfirmLocation = async () => {
    if (!latitude.trim() || !longitude.trim()) {
      showSnackbar('Please enter latitude and longitude', 'error');
      return;
    }

    try {
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);

      if (isNaN(lat) || isNaN(lon)) {
        showSnackbar('Please enter valid numbers for latitude and longitude', 'error');
        return;
      }

      setLocationLoading(true);
      const formattedAddress = await reverseGeocodeLocation(lat, lon);
      setAddress(formattedAddress);
      setShowMapModal(false);
      showSnackbar('Location confirmed!', 'success');
    } catch {
      showSnackbar('Failed to get address. Please try again.', 'error');
    } finally {
      setLocationLoading(false);
    }
  };


  const handleRemoveItem = async (productId: string) => {
    await removeFromCart(productId);
  };

  const handleQuantityChange = async (productId: string, quantity: number) => {
    await updateQuantity(productId, quantity);
  };

  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) {
      showSnackbar('Your cart is empty', 'error');
      return;
    }

    if (!address.trim()) {
      showSnackbar('Please enter a delivery address', 'error');
      return;
    }

    setShowOrderSuccess(true);
    showSnackbar('Order placed successfully!', 'success');
  };

  const handleCloseOrderSuccess = async () => {
    setShowOrderSuccess(false);
    await clearCart();
    setAddress('');
    setPaymentMethod('cod');
    setCardType('visa');
    setUpiApp('googlepay');
    setLatitude('');
    setLongitude('');
  };

  const handleAddCard = () => {
    if (!cardNumber.trim() || !cardHolder.trim() || !expiry.trim() || !cvv.trim()) {
      showSnackbar('Please fill all card details', 'error');
      return;
    }

    if (cardNumber.length < 13 || cardNumber.length > 19) {
      showSnackbar('Card number must be 13-19 digits', 'error');
      return;
    }

    if (cvv.length < 3 || cvv.length > 4) {
      showSnackbar('CVV must be 3-4 digits', 'error');
      return;
    }

    const lastFour = cardNumber.slice(-4);
    const newCard = {
      id: `card_${Date.now()}`,
      number: cardNumber,
      holder: cardHolder,
      expiry: expiry,
      lastFour: lastFour,
    };

    setSavedCards([...savedCards, newCard]);
    setCardType(newCard.id);
    setCardNumber('');
    setCardHolder('');
    setExpiry('');
    setCvv('');
    setShowAddCardModal(false);
    showSnackbar('Card added successfully!', 'success');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>

      {/* Cart Items */}
      <View style={styles.section}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty</Text>
        ) : (
          cartItems.map((item) => (
            <View key={item.productId} style={styles.cartItem}>
              <View style={styles.itemIcon}>
                <MaterialIcons name={item.icon as any} size={32} color={COLORS.primary} />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.productName}</Text>
                <Text style={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
              </View>
              <View style={styles.itemControls}>
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    style={styles.quantityBtn}
                    onPress={() => handleQuantityChange(item.productId, item.quantity - 1)}
                  >
                    <MaterialIcons name="remove" size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityBtn}
                    onPress={() => handleQuantityChange(item.productId, item.quantity + 1)}
                  >
                    <MaterialIcons name="add" size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => handleRemoveItem(item.productId)}
                >
                  <MaterialIcons name="close" size={20} color={COLORS.danger} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Order Section */}
      <View style={styles.section}>
        <View style={styles.addressHeaderRow}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => setShowMapModal(true)}
          >
            <MaterialIcons name="location-on" size={18} color={COLORS.white} />
            <Text style={styles.mapButtonText}>Map</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter delivery address or tap Map button"
          value={address}
          onChangeText={setAddress}
          multiline
          numberOfLines={3}
          placeholderTextColor={COLORS.textLight}
        />
      </View>

      {/* Location Selection Modal */}
      <Modal
        visible={showMapModal}
        animationType="slide"
        onRequestClose={() => setShowMapModal(false)}
      >
        <LinearGradient
          colors={['#1e3c72', '#2a5298']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.mapModalContainer}
        >
          <View style={styles.mapHeader}>
            <Text style={styles.mapHeaderTitle}>Select Location</Text>
            <TouchableOpacity onPress={() => setShowMapModal(false)}>
              <MaterialIcons name="close" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Location</Text>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleGetCurrentLocation}
                disabled={locationLoading}
              >
                {locationLoading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <>
                    <MaterialIcons name="my-location" size={20} color={COLORS.white} />
                    <Text style={styles.buttonText}>Get Current Location</Text>
                  </>
                )}
              </TouchableOpacity>
              <Text style={styles.helperText}>Get your GPS location in one tap</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Or Enter Coordinates</Text>

              <View>
                <Text style={styles.label}>Latitude</Text>
                <TextInput
                  style={styles.coordinateInput}
                  placeholder="e.g., 28.7041"
                  placeholderTextColor={COLORS.textLight}
                  value={latitude}
                  onChangeText={setLatitude}
                  keyboardType="decimal-pad"
                  editable={!locationLoading}
                />
              </View>

              <View style={{ marginTop: 12 }}>
                <Text style={styles.label}>Longitude</Text>
                <TextInput
                  style={styles.coordinateInput}
                  placeholder="e.g., 77.1025"
                  placeholderTextColor={COLORS.textLight}
                  value={longitude}
                  onChangeText={setLongitude}
                  keyboardType="decimal-pad"
                  editable={!locationLoading}
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.secondaryButton,
                  (!latitude || !longitude) && styles.disabledButton,
                ]}
                onPress={handleConfirmLocation}
                disabled={!latitude || !longitude || locationLoading}
              >
                {locationLoading ? (
                  <ActivityIndicator color={COLORS.primary} />
                ) : (
                  <>
                    <MaterialIcons name="check" size={20} color={COLORS.primary} />
                    <Text style={styles.secondaryButtonText}>Confirm Location</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.infoText}>
                {`📍 How to find coordinates:\n\n1. Open Google Maps\n2. Right-click on a location\n3. Select "What's here?"\n4. Copy the coordinates shown at bottom\n\nExample: 28.7041, 77.1025`}
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </Modal>

      {/* Order Success Modal */}
      <Modal
        visible={showOrderSuccess}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={styles.successModalOverlay}>
          <View style={styles.successModalContent}>
            <View style={styles.successIconContainer}>
              <MaterialIcons name="check-circle" size={80} color={COLORS.primary} />
            </View>

            <Text style={styles.successTitle}>Order Confirmed!</Text>
            <Text style={styles.successMessage}>
              Your order has been successfully placed
            </Text>

            <View style={styles.orderSummary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Order Total:</Text>
                <Text style={styles.summaryValue}>₹{total}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Payment Method:</Text>
                <Text style={styles.summaryValue}>
                  {paymentMethod === 'cod'
                    ? 'Cash on Delivery'
                    : paymentMethod === 'card'
                    ? `Card - ${cardType.charAt(0).toUpperCase() + cardType.slice(1)}`
                    : paymentMethod === 'upi'
                    ? `UPI - ${
                        upiApp === 'googlepay'
                          ? 'Google Pay'
                          : upiApp === 'phonepe'
                          ? 'PhonePe'
                          : upiApp === 'paytm'
                          ? 'Paytm'
                          : 'BHIM'
                      }`
                    : 'Unknown'}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Address:</Text>
                <Text style={styles.summaryAddress}>{address}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.successButton}
              onPress={handleCloseOrderSuccess}
            >
              <Text style={styles.successButtonText}>Place New Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>

        {/* Cash on Delivery */}
        <PaymentOption
          label="Cash on Delivery"
          icon="money"
          selected={paymentMethod === 'cod'}
          onPress={() => setPaymentMethod('cod')}
        />

        {/* Card Payment Section */}
        <TouchableOpacity
          style={[
            styles.paymentCategoryHeader,
            paymentMethod === 'card' && styles.paymentCategoryHeaderActive,
          ]}
          onPress={() => setPaymentMethod('card')}
        >
          <View style={styles.paymentCategoryLeft}>
            <MaterialIcons name="credit-card" size={24} color={paymentMethod === 'card' ? '#16a34a' : COLORS.text} />
            <Text style={[styles.paymentCategoryTitle, paymentMethod === 'card' && styles.paymentCategoryTitleActive]}>
              Debit / Credit Card
            </Text>
          </View>
          <View style={styles.radio}>
            {paymentMethod === 'card' && <View style={styles.radioSelected} />}
          </View>
        </TouchableOpacity>

        {paymentMethod === 'card' && (
          <View style={styles.cardOptionsContainer}>
            {[
              { name: 'Visa', id: 'visa', icon: '💳' },
              { name: 'Mastercard', id: 'mastercard', icon: '💳' },
              { name: 'American Express', id: 'americanexpress', icon: '💳' },
              { name: 'RuPay', id: 'rupay', icon: '💳' },
              ...savedCards.map((card) => ({
                name: card.holder,
                id: card.id,
                icon: '💳',
                lastFour: card.lastFour,
              })),
            ].map((card) => (
              <TouchableOpacity
                key={card.id}
                style={[styles.cardOption, cardType === card.id && styles.cardOptionSelected]}
                onPress={() => setCardType(card.id)}
              >
                <View style={styles.cardOptionContent}>
                  <Text style={styles.cardIcon}>{card.icon}</Text>
                  <View style={styles.cardInfo}>
                    <Text style={[styles.cardName, cardType === card.id && styles.cardNameSelected]}>
                      {card.name}
                    </Text>
                    <Text style={styles.cardNumber}>
                      {(card as any).lastFour ? `•••• •••• •••• ${(card as any).lastFour}` : '•••• •••• •••• 1234'}
                    </Text>
                  </View>
                </View>
                {cardType === card.id && (
                  <MaterialIcons name="check-circle" size={24} color="#16a34a" />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.addNewCard} onPress={() => setShowAddCardModal(true)}>
              <MaterialIcons name="add-circle-outline" size={20} color={COLORS.primary} />
              <Text style={styles.addNewCardText}>Add New Card</Text>
            </TouchableOpacity>
          </View>
        )}

      {/* Add Card Modal */}
      <Modal
        visible={showAddCardModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddCardModal(false)}
      >
        <View style={styles.addCardModalOverlay}>
          <View style={styles.addCardModalContent}>
            <View style={styles.addCardModalHeader}>
              <Text style={styles.addCardModalTitle}>Add New Card</Text>
              <TouchableOpacity onPress={() => setShowAddCardModal(false)}>
                <MaterialIcons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.addCardForm}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Card Number</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor={COLORS.textLight}
                  value={cardNumber}
                  onChangeText={(text) => setCardNumber(text.replace(/\D/g, ''))}
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Cardholder Name</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="John Doe"
                  placeholderTextColor={COLORS.textLight}
                  value={cardHolder}
                  onChangeText={setCardHolder}
                />
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.formLabel}>Expiry (MM/YY)</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="12/25"
                    placeholderTextColor={COLORS.textLight}
                    value={expiry}
                    onChangeText={(text) => {
                      let cleaned = text.replace(/\D/g, '');
                      if (cleaned.length >= 2) {
                        cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
                      }
                      setExpiry(cleaned);
                    }}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.formLabel}>CVV</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="123"
                    placeholderTextColor={COLORS.textLight}
                    value={cvv}
                    onChangeText={(text) => setCvv(text.replace(/\D/g, ''))}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.addCardButton} onPress={handleAddCard}>
                <Text style={styles.addCardButtonText}>Add Card</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

        {/* UPI Payment Section */}
        <TouchableOpacity
          style={[
            styles.paymentCategoryHeader,
            paymentMethod === 'upi' && styles.paymentCategoryHeaderActive,
          ]}
          onPress={() => setPaymentMethod('upi')}
        >
          <View style={styles.paymentCategoryLeft}>
            <MaterialIcons name="phone-android" size={24} color={paymentMethod === 'upi' ? '#16a34a' : COLORS.text} />
            <Text style={[styles.paymentCategoryTitle, paymentMethod === 'upi' && styles.paymentCategoryTitleActive]}>
              UPI
            </Text>
          </View>
          <View style={styles.radio}>
            {paymentMethod === 'upi' && <View style={styles.radioSelected} />}
          </View>
        </TouchableOpacity>

        {paymentMethod === 'upi' && (
          <View style={styles.upiOptionsContainer}>
            {[
              { name: 'Google Pay', id: 'googlepay', logo: 'G', bgColor: '#4285F4', textColor: '#FFFFFF' },
              { name: 'PhonePe', id: 'phonepe', logo: 'P', bgColor: '#6C40C7', textColor: '#FFFFFF' },
            ].map((app) => (
              <TouchableOpacity
                key={app.id}
                style={[styles.upiOption, upiApp === app.id && styles.upiOptionSelected]}
                onPress={() => setUpiApp(app.id)}
              >
                <View style={styles.upiOptionContent}>
                  <View style={[styles.upiOfficialLogo, { backgroundColor: app.bgColor }]}>
                    <Text style={[styles.upiLogoText, { color: app.textColor }]}>
                      {app.logo}
                    </Text>
                  </View>
                  <Text style={[styles.upiAppName, upiApp === app.id && styles.upiAppNameSelected]}>
                    {app.name}
                  </Text>
                </View>
                {upiApp === app.id && (
                  <MaterialIcons name="check-circle" size={24} color="#16a34a" />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.addUpiId}>
              <MaterialIcons name="add-circle-outline" size={20} color={COLORS.primary} />
              <Text style={styles.addUpiIdText}>Add UPI ID</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Order Total */}
      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Order Total</Text>
        <Text style={styles.totalAmount}>₹{total}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
        <LinearGradient
          colors={['#22c55e', '#16a34a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.confirmBtn}
        >
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={handleConfirmOrder}
          >
            <Text style={styles.confirmBtnText}>Confirm Order</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>

    {/* Snackbar */}
    {snackbar.visible && (
      <View style={[
        styles.snackbar,
        snackbar.type === 'error' ? styles.snackbarError : styles.snackbarSuccess
      ]}>
        <View style={styles.snackbarContent}>
          <MaterialIcons
            name={snackbar.type === 'error' ? 'error' : 'check-circle'}
            size={20}
            color="white"
          />
          <Text style={styles.snackbarText}>{snackbar.message}</Text>
        </View>
      </View>
    )}
    </View>
  );
}

function PaymentOption({
  label,
  icon,
  selected,
  onPress,
}: {
  label: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.paymentOption, selected && styles.paymentOptionSelected]}
      onPress={onPress}
    >
      <View style={styles.radio}>
        {selected && <View style={styles.radioSelected} />}
      </View>
      <MaterialIcons name={icon as any} size={20} color={COLORS.text} />
      <Text style={styles.paymentLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    gap: 12,
  },
  itemIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  itemPrice: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
  },
  itemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quantityBtn: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.text,
    minWidth: 28,
    textAlign: 'center',
  },
  removeBtn: {
    padding: 4,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    paddingVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    textAlignVertical: 'top',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  paymentOptionSelected: {
    backgroundColor: '#dcfce7',
    borderColor: '#16a34a',
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#16a34a',
  },
  paymentLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginLeft: 8,
  },
  totalSection: {
    backgroundColor: COLORS.secondary + '25',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  addressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mapButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    gap: 6,
  },
  mapButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  mapModalContainer: {
    flex: 1,
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  mapHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  openMapButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  openMapButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 12,
  },
  mapControls: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  mapControlButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  mapControlButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  confirmMapButton: {
    backgroundColor: COLORS.secondary,
  },
  disabledButton: {
    backgroundColor: COLORS.border,
    opacity: 0.5,
  },
  mapInfo: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  mapInfoText: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  secondaryButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  coordinateInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 20,
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  helperText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  successModalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 24,
    textAlign: 'center',
  },
  orderSummary: {
    width: '100%',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryRow: {
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textLight,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  summaryAddress: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    lineHeight: 20,
  },
  successButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  successButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  subOptionsContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    marginBottom: 12,
  },
  subOptionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  subOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subOption: {
    flex: 1,
    minWidth: '48%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subOptionSelected: {
    backgroundColor: COLORS.primary + '20',
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  subOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
  },
  subOptionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  paymentCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  paymentCategoryHeaderActive: {
    borderColor: '#16a34a',
    backgroundColor: '#16a34a' + '20',
    borderWidth: 2,
  },
  paymentCategoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  paymentCategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  paymentCategoryTitleActive: {
    color: '#16a34a',
  },
  cardOptionsContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  cardOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardOptionSelected: {
    borderColor: '#16a34a',
    borderWidth: 2,
    backgroundColor: '#16a34a' + '20',
  },
  cardOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  cardIcon: {
    fontSize: 32,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  cardNameSelected: {
    color: '#16a34a',
  },
  cardNumber: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  addNewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    backgroundColor: COLORS.primary + '10',
  },
  addNewCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  upiOptionsContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  upiOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  upiOptionSelected: {
    borderColor: '#16a34a',
    borderWidth: 2,
    backgroundColor: '#16a34a' + '20',
  },
  upiOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  upiOfficialLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  upiLogoText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  upiAppName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  upiAppNameSelected: {
    color: '#16a34a',
  },
  addUpiId: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    backgroundColor: COLORS.primary + '10',
  },
  addUpiIdText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  addCardModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  addCardModalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
    maxHeight: '85%',
  },
  addCardModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addCardModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  addCardForm: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  formRow: {
    flexDirection: 'row',
    gap: 8,
  },
  addCardButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addCardButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  snackbar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  snackbarSuccess: {
    backgroundColor: '#22c55e',
  },
  snackbarError: {
    backgroundColor: '#ef4444',
  },
  snackbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  snackbarText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '500',
    flex: 1,
  },
});
