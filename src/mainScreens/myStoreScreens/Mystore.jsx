import React, { useState, useRef, useCallback, use } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { styles, COLORS } from './MystoreStyling';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { getMyStores } from '../../api/Globalapi';

// ─── Icons (emoji-based, no extra lib needed) ────────────────────────────────
const StoreIcon = () => <Text style={{ fontSize: 18 }}>🏪</Text>;
const PhoneIcon = () => <Text style={{ fontSize: 11 }}>📞</Text>;
const LocationIcon = () => <Text style={{ fontSize: 11 }}>📍</Text>;
const EyeIcon = () => <Text style={{ fontSize: 10 }}>👁</Text>;
const PlusIcon = () => <Text style={{ fontSize: 10 }}>➕</Text>;
const RefreshIcon = () => <Text style={{ fontSize: 18 }}>🔄</Text>;



// ─── Animated Store Card ──────────────────────────────────────────────────────
const StoreCard = ({ item, index, onViewOrders, onCreateOrder, selectedId, onSelect }) => {
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  const isSelected = selectedId === item._id;
  const isWholesaler = item.storeType === 'WHOLESALER';

  // Entrance animation with stagger
  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 60,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 350,
        delay: index * 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.96,
      tension: 200,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      tension: 200,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        { transform: [{ scale: Animated.multiply(scaleAnim, pressAnim) }], opacity: opacityAnim },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onSelect(item._id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={[styles.card, isSelected && styles.cardSelected]}>
          {/* Card Header */}
          <View style={styles.cardHeaderRow}>
            <View style={styles.storeIconWrapper}>
              <StoreIcon />
            </View>
            <Text style={styles.storeName} numberOfLines={1}>
              {item.storeName}
            </Text>
          </View>

          {/* Owner */}
          <Text style={styles.ownerLabel}>
            Owner: <Text style={styles.ownerName}>{item.ownerName}</Text>
          </Text>

          {/* Phone */}
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <PhoneIcon />
            </View>
            <Text style={styles.infoText}>{item.phone}</Text>
          </View>

          {/* Address */}
          {item.address ? (
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <LocationIcon />
              </View>
              <Text style={styles.infoText} numberOfLines={2}>
                {item.address}
              </Text>
            </View>
          ) : (
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <LocationIcon />
              </View>
            </View>
          )}

          <View style={styles.divider} />

          {/* Badges */}
          <View style={styles.badgesRow}>
            <View style={[styles.badge, isWholesaler ? styles.wholesalerBadge : styles.retailerBadge]}>
              <Text style={[styles.badgeText, isWholesaler ? styles.wholesalerText : styles.retailerText]}>
                {item.storeType}
              </Text>
            </View>
            <View style={[styles.badge, styles.activeBadge]}>
              <Text style={[styles.badgeText, styles.activeText]}>{item.status}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.btnView}
              onPress={() => onViewOrders(item)}
              activeOpacity={0.75}
            >
              <EyeIcon />
              <Text style={styles.btnViewText}>VIEW{'\n'}ORDERS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnCreate}
              onPress={() => onCreateOrder(item)}
              activeOpacity={0.75}
            >
              <PlusIcon />
              <Text style={styles.btnCreateText}>CREATE{'\n'}ORDER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Text style={{ fontSize: 48 }}>🏪</Text>
    <Text style={styles.emptyText}>No Stores Found</Text>
    <Text style={styles.emptySubText}>Pull down to refresh</Text>
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const Mystore = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

 useFocusEffect(
    useCallback(() => {
      loadStores();
    }, [])
  );

  const loadStores = async () => {
    try {
      const data= await AsyncStorage.getItem('token');
      console.log("your_datasssss11==>",data)
      const res = await getMyStores(data);
      console.log('Fetched stores😎😎😎😎😎😎:', res);
      setStores(res?.data?.stores);
    } catch (err) {
      console.error('Failed to load stores:', err);
    } finally {
      setLoading(false);
    }
  };

  // onRefresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setSelectedId(null);
    try {
      const data= await AsyncStorage.getItem('token');
      const res = await getMyStores(data);
      setStores(res?.data?.stores);
    } catch (err) {
      console.error('Refresh failed:', err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleViewOrders = (item) => {
    console.log('View Orders:', item.storeName, item._id);
    // Navigate to order list screen: navigation.navigate('OrderList', { storeId: item._id })
  };

  const handleCreateOrder = (item) => {
    console.log('Create Order:', item.storeName, item._id);
    // Navigate to create order screen: navigation.navigate('CreateOrder', { store: item })
  };

  const handleSelect = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const renderItem = useCallback(
    ({ item, index }) => (
      <StoreCard
        item={item}
        index={index}
        selectedId={selectedId}
        onSelect={handleSelect}
        onViewOrders={handleViewOrders}
        onCreateOrder={handleCreateOrder}
      />
    ),
    [selectedId]
  );

  const keyExtractor = useCallback((item) => item._id, []);

  if (loading) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 12, color: COLORS.textSecondary, fontSize: 14 }}>
          Loading stores...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Stores</Text>
          <Text style={styles.headerSubtitle}>{stores?.length} stores registered</Text>
        </View>
        <View style={styles.headerIcon}>
          <RefreshIcon />
        </View>
      </View>

      {/* FlatList */}
      <FlatList
        data={stores}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={[
          styles.listContent,
          stores.length === 0 && { flex: 1 },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState />}
        // onRefresh with pull-to-refresh
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
            title="Refreshing stores..."
            titleColor={COLORS.textSecondary}
          />
        }
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={6}
        windowSize={10}
        initialNumToRender={6}
      />
    </View>
  );
};

export default Mystore;