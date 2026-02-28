import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
// Standard Icon Library
import Icon from '@react-native-vector-icons/ionicons';

// Screens (Ensure these paths match your new app structure)
import Mystore from '../mainScreens/myStoreScreens/Mystore';
import OverView from '../mainScreens/overviewScreens/OverView';
import StoreCreation from '../mainScreens/storeScreens/StoreCreation';
import Payment from '../mainScreens/paymentScreens/Payment';

const { width } = Dimensions.get('window');
const Bottomstack = createBottomTabNavigator();

// --- Configuration Constants ---
const PRIMARY_COLOR = '#FFD700'; // Your highlight color (Yellow)
const INACTIVE_COLOR = '#8E8E93'; // Gray for inactive
const BG_COLOR = '#111111';      // Dark background

const CREATE_OPTIONS = [
  { name: 'Post', icon: 'create-outline' },
  { name: 'Free form', icon: 'document-text-outline' },
  { name: 'Poll', icon: 'stats-chart-outline' },
  { name: 'Trip post', icon: 'map-outline' },
  { name: 'Itinerary', icon: 'list-outline' },
  { name: 'Reviews', icon: 'star-outline' },
];

const CustomTabBarButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.createButtonContainer}
    onPress={onPress}>
    <View style={styles.createButtonOutline}>
      <Icon name="add" size={30} color={PRIMARY_COLOR} />
      <Text style={styles.createButtonText}>Create</Text>
    </View>
  </TouchableOpacity>
);

const BottomNav = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Bottomstack.Navigator
        initialRouteName="OverView"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            const color = focused ? PRIMARY_COLOR : INACTIVE_COLOR;

            if (route.name === 'OverView') iconName = 'home-outline';
            else if (route.name === 'Store') iconName = 'compass-outline';
            else if (route.name === 'Mystore') iconName = 'cart-outline';
            else if (route.name === 'Payment') iconName = 'notifications-outline';

            return <Icon name={iconName} size={26} color={color} />;
          },
          tabBarShowLabel: true,
          tabBarLabel: ({ focused }) => {
            if (route.name === 'Create') return null;
            return (
              <Text style={{
                color: focused ? PRIMARY_COLOR : INACTIVE_COLOR,
                fontSize: 12,
                marginBottom: 3,
              }}>
                {route.name}
              </Text>
            );
          },
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
        })}
      >
        <Bottomstack.Screen name="OverView" component={OverView} options={{ headerShown: false }} />
        <Bottomstack.Screen name="Store" component={StoreCreation} options={{ headerShown: false }} />
        
        {/* The Central Create Button logic remains via a dummy screen or custom button */}
        <Bottomstack.Screen 
          name="Create" 
          component={OverView} // Placeholder
          options={{
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} onPress={() => setModalVisible(true)} />
            ),
          }}
        />

        <Bottomstack.Screen name="Mystore" component={Mystore} options={{ headerShown: false }} />
        <Bottomstack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
      </Bottomstack.Navigator>

      {/* Basic Creation Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New</Text>
            <TouchableOpacity 
                style={styles.modalCloseButton} 
                onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={20} color="#fff" />
            </TouchableOpacity>
            
            <FlatList
              data={CREATE_OPTIONS}
              numColumns={3}
              contentContainerStyle={styles.flatListContainer}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem}>
                  <View style={styles.modalIconContainer}>
                    <Icon name={item.icon} size={30} color="#fff" />
                  </View>
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.name}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

// --- Styles ---
const TAB_BAR_HEIGHT = 85;
const BUTTON_OUTLINE_SIZE = 75;
const BUTTON_OUTLINE_Inner_SIZE = 65;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: BG_COLOR,
    height: TAB_BAR_HEIGHT,
    borderTopWidth: 0,
    elevation: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 10,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  tabBarItem: {
    paddingBottom: 5,
  },
  createButtonContainer: {
    top: -28,
    width: BUTTON_OUTLINE_SIZE,
    height: BUTTON_OUTLINE_SIZE,
    borderRadius: BUTTON_OUTLINE_SIZE / 2,
    backgroundColor: BG_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonOutline: {
    width: BUTTON_OUTLINE_Inner_SIZE,
    height: BUTTON_OUTLINE_Inner_SIZE,
    borderRadius: BUTTON_OUTLINE_Inner_SIZE / 2,
    backgroundColor: BG_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 10,
    marginVertical: 2
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    width: width,
    paddingTop: 15,
    paddingBottom: 40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    borderWidth: 1,
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  flatListContainer: {
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  modalItem: {
    width: width / 3 - 20,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  modalIconContainer: {
    backgroundColor: '#3A3A3C',
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  modalItemText: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default BottomNav;