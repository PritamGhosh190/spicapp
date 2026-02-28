
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const scale = size => (width / 375) * size;

// ─── THEME ────────────────────────────────────────────────────
const TOAST_THEME = {
  success: {
    bg: '#0D2B1F',
    border: '#00C853',
    iconBg: 'rgba(0,200,83,0.18)',
    bar: '#00C853',
    titleColor: '#00C853',
    icon: '✓',
  },
  error: {
    bg: '#2B0D0D',
    border: '#FF3D3D',
    iconBg: 'rgba(255,61,61,0.18)',
    bar: '#FF3D3D',
    titleColor: '#FF3D3D',
    icon: '✕',
  },
  warning: {
    bg: '#2B1E00',
    border: '#FFB300',
    iconBg: 'rgba(255,179,0,0.18)',
    bar: '#FFB300',
    titleColor: '#FFB300',
    icon: '!',
  },
  info: {
    bg: '#0D1A2B',
    border: '#2196F3',
    iconBg: 'rgba(33,150,243,0.18)',
    bar: '#2196F3',
    titleColor: '#2196F3',
    icon: 'i',
  },
};

// ─── CONTEXT ─────────────────────────────────────────────────
const ToastContext = createContext(null);

// ─── HOOK ────────────────────────────────────────────────────
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used inside <ToastProvider>');
  }
  return ctx;
};

// ─── SINGLE TOAST ITEM ────────────────────────────────────────
const ToastItem = ({ id, type, title, message, duration, onDismiss }) => {
  const theme = TOAST_THEME[type] || TOAST_THEME.info;
  const translateY = useRef(new Animated.Value(-110)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.88)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const dismissedRef = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    Animated.parallel([
      Animated.timing(translateY, { toValue: -110, duration: 280, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 280, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 0.9, duration: 280, useNativeDriver: true }),
    ]).start(() => onDismiss(id));
  }, [id, onDismiss]);

  React.useEffect(() => {
    // Entrance
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        tension: 72,
        friction: 11,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, { toValue: 1, duration: 240, useNativeDriver: true }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 72,
        friction: 11,
        useNativeDriver: true,
      }),
    ]).start();

    // Progress bar
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[
        toastStyles.wrapper,
        {
          opacity,
          transform: [{ translateY }, { scale: scaleAnim }],
          backgroundColor: theme.bg,
          borderColor: theme.border,
        },
      ]}>
      {/* Icon */}
      <View style={[toastStyles.iconBox, { backgroundColor: theme.iconBg }]}>
        <Text style={[toastStyles.iconText, { color: theme.titleColor }]}>
          {theme.icon}
        </Text>
      </View>

      {/* Text */}
      <View style={toastStyles.textBox}>
        <Text style={[toastStyles.title, { color: theme.titleColor }]} numberOfLines={1}>
          {title}
        </Text>
        {!!message && (
          <Text style={toastStyles.message} numberOfLines={2}>
            {message}
          </Text>
        )}
      </View>

      {/* Close */}
      <TouchableOpacity onPress={dismiss} style={toastStyles.closeBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Text style={toastStyles.closeText}>×</Text>
      </TouchableOpacity>

      {/* Progress bar */}
      <Animated.View
        style={[
          toastStyles.progressBar,
          { backgroundColor: theme.bar },
          {
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['100%', '0%'],
            }),
          },
        ]}
      />
    </Animated.View>
  );
};

// ─── PROVIDER ────────────────────────────────────────────────
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const counterRef = useRef(0);

  const showToast = useCallback(
    ({ type = 'info', title = '', message = '', duration = 3500 }) => {
      const id = `toast_${counterRef.current++}_${Date.now()}`;
      setToasts(prev => {
        // max 3 visible at once — drop oldest
        const next = prev.length >= 3 ? prev.slice(1) : prev;
        return [...next, { id, type, title, message, duration }];
      });
    },
    [],
  );

  const dismissToast = useCallback(id => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Stack — absolutely positioned over everything */}
      <View style={toastStyles.stack} pointerEvents="box-none">
        {toasts.map((toast, index) => (
          <ToastItem
            key={toast.id}
            {...toast}
            onDismiss={dismissToast}
          />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

// ─── STYLES ──────────────────────────────────────────────────
const toastStyles = StyleSheet.create({
  stack: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 54 : 48,
    left: scale(12),
    right: scale(12),
    zIndex: 99999,
    elevation: 99999,
    gap: scale(8),
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(14),
    borderWidth: 1,
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 14,
    elevation: 18,
    marginBottom: scale(0),
  },
  iconBox: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
    flexShrink: 0,
  },
  iconText: {
    fontSize: scale(16),
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
  },
  textBox: {
    flex: 1,
  },
  title: {
    fontSize: scale(13),
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: scale(2),
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
  },
  message: {
    fontSize: scale(12),
    color: '#8FA8C0',
    lineHeight: scale(16),
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  closeBtn: {
    paddingLeft: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: scale(20),
    color: '#556070',
    lineHeight: scale(22),
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: scale(3),
    borderBottomLeftRadius: scale(14),
  },
});

export default ToastProvider;