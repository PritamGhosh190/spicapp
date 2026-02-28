import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from '../../constants/GlobalTost';
import styles, { COLORS } from './LoginStyles';
import { userloginmobile } from '../../api/Globalapi';
import { useNavigation } from '@react-navigation/native';

// ─── VALIDATION ───────────────────────────────────────────────────────────────
// Agent ID format: 2 uppercase letters + 4 digits + hyphen + 3 digits  e.g. BS2026-001
const AGENT_ID_REGEX = /^[A-Z]{2}\d{4}-\d{3}$/;
// Password: min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;

// ─── PASSWORD STRENGTH HELPER ─────────────────────────────────────────────────
const getPasswordStrength = pwd => {
  if (!pwd) return { level: 0, label: '' };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[@$!%*?&#^]/.test(pwd)) score++;
  if (pwd.length >= 12) score++;
  if (score <= 2) return { level: 1, label: 'Weak' };
  if (score === 3) return { level: 2, label: 'Fair' };
  if (score === 4) return { level: 3, label: 'Good' };
  return { level: 4, label: 'Strong' };
};

// ─── STRENGTH BAR ─────────────────────────────────────────────────────────────
const StrengthBars = ({ password }) => {
  const { level, label } = getPasswordStrength(password);
  if (!password) return null;

  const barColor = idx => {
    if (idx >= level) return styles.strengthBar;
    if (level === 1) return [styles.strengthBar, styles.strengthBarWeak];
    if (level === 2) return [styles.strengthBar, styles.strengthBarMed];
    return [styles.strengthBar, styles.strengthBarStrong];
  };

  return (
    <View style={styles.strengthRow}>
      {[0, 1, 2, 3].map(i => (
        <View key={i} style={barColor(i)} />
      ))}
      <Text style={styles.strengthLabel}>{label}</Text>
    </View>
  );
};

// ─── HERO BACKGROUND PATTERN ──────────────────────────────────────────────────
const HeroPattern = () => (
  <>
    <View style={styles.heroDiagonal1} />
    <View style={styles.heroDiagonal2} />
  </>
);

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
const LoginScreen = () => {
  const { showToast } = useToast();
  const navigation = useNavigation();

  const [agentId, setAgentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agentIdFocused, setAgentIdFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [agentIdError, setAgentIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef(null);

  // ── Entrance animations ──
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const statsTranslate = useRef(new Animated.Value(30)).current;
  const statsOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslate = useRef(new Animated.Value(40)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.stagger(80, [
      Animated.timing(heroOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(statsTranslate, {
          toValue: 0,
          tension: 60,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(statsOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(cardTranslate, {
          toValue: 0,
          tension: 55,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  // ── Field validation ──
  const validateAgentId = useCallback(value => {
    if (!value.trim()) {
      setAgentIdError('Agent ID is required');
      return false;
    }
    if (!AGENT_ID_REGEX.test(value.trim())) {
      setAgentIdError('Format: XX0000-000  (e.g. BS2026-001)');
      return false;
    }
    setAgentIdError('');
    return true;
  }, []);

  const validatePassword = useCallback(value => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    if (value.length < 8) {
      setPasswordError('Minimum 8 characters required');
      return false;
    }
    if (!PASSWORD_REGEX.test(value)) {
      setPasswordError('Need uppercase, lowercase, number & special char');
      return false;
    }
    setPasswordError('');
    return true;
  }, []);

  // ── handleLogin ───────────────────────────────────────────────────────────


  const handleLogin = async () => {
   const isAgentEmpty = !agentId.trim();
  const isPasswordEmpty = !password;

  // Both empty
  if (isAgentEmpty && isPasswordEmpty) {
    showToast({
      type: 'error',
      title: 'Fields Required',
      message: 'Enter your Agent ID and Password to sign in.',
    });
    return;
  }

  // Agent ID missing
  if (isAgentEmpty) {
    showToast({
      type: 'error',
      title: 'Agent ID Missing',
      message: 'Please enter your Agent ID to continue.',
    });
    return;
  }

  // Password missing ✅ FIX
  if (isPasswordEmpty) {
    showToast({
      type: 'error',
      title: 'Password Missing',
      message: 'Please enter your password to sign in.',
    });
    return;
  }

  // Agent ID format check
  if (!validateAgentId(agentId)) {
    showToast({
      type: 'warning',
      title: 'Invalid Agent ID',
      message: 'Use format XX0000-000, e.g. BS2026-001.',
    });
    return;
  }

  setLoading(true);
  try {
      const loginData = {
        agentId: agentId.trim(),
        password: password,
      };
      // console.log('Login data:😎😎😎😎😎😎', loginData); // Debug log
    const response = await userloginmobile(loginData);

    console.log('Login response:😎😎😎😎😎😎', response); // Debug log

    if (response.status === 200) {
      showToast({
        type: 'success',
        title: 'Login Successful',
        message: `Welcome back, Agent ${agentId.trim()}!`,
      });
    }
  } catch (error) {
    showToast({
      type: 'error',
      title: 'Sign In Failed',
      message: 'Unable to authenticate. Please try again.',
    });
  } finally {
    setLoading(false);
  }
};

  const onButtonPressIn = () =>
    Animated.spring(buttonScale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 60,
    }).start();
  const onButtonPressOut = () =>
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 60,
    }).start();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* ─── HERO BANNER ─────────────────────────────────────────────── */}
          <Animated.View style={[styles.heroBanner, { opacity: heroOpacity }]}>
            <HeroPattern />

            <View style={styles.heroLogoRow}>
              <View style={styles.heroLogoIcon}>
                <Text style={styles.heroLogoIconText}>🛍</Text>
              </View>
              <Text style={styles.heroLogoName}>
                Bengol<Text style={styles.heroLogoAccent}>Spices</Text>
              </Text>
            </View>

            <View style={styles.heroBadge}>
              <View style={styles.heroBadgeDot} />
              <Text style={styles.heroBadgeText}>Agent Portal</Text>
            </View>

            <Text style={styles.heroTagline}>
              Manage orders · Track inventory · Drive sales
            </Text>
          </Animated.View>

          {/* ─── STATS TRUST CARD ─────────────────────────────────────────── */}
          <Animated.View
            style={[
              styles.statsRow,
              {
                opacity: statsOpacity,
                transform: [{ translateY: statsTranslate }],
              },
            ]}
          >
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12K+</Text>
              <Text style={styles.statLabel}>Products</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>98%</Text>
              <Text style={styles.statLabel}>Uptime</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.9★</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </Animated.View>

          {/* ─── FORM CARD ────────────────────────────────────────────────── */}
          <Animated.View
            style={[
              styles.formCard,
              {
                opacity: cardOpacity,
                transform: [{ translateY: cardTranslate }],
              },
            ]}
          >
            {/* Top brand accent line */}
            <View style={styles.cardAccentLine} />

            <Text style={styles.formCardTitle}>Agent Sign In</Text>
            <Text style={styles.formCardSubtitle}>
              Access your sales dashboard, manage listings and track real-time
              orders.
            </Text>

            {/* ── AGENT ID ── */}
            <View style={styles.fieldContainer}>
              <View style={styles.fieldLabelRow}>
                <Text style={styles.fieldLabel}>Agent ID</Text>
                <Text style={styles.fieldRequired}>*</Text>
              </View>

              <View
                style={[
                  styles.inputWrapper,
                  agentIdFocused && styles.inputWrapperFocused,
                  agentIdError ? styles.inputWrapperError : null,
                ]}
              >
                {/* Prefix badge */}
                <View style={styles.inputPrefixBox}>
                  <Text style={styles.inputPrefixText}>ID</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="BS2026-001"
                  placeholderTextColor={COLORS.textPlaceholder}
                  value={agentId}
                  onChangeText={text => {
                    setAgentId(text.toUpperCase());
                    if (agentIdError) validateAgentId(text.toUpperCase());
                  }}
                  onFocus={() => setAgentIdFocused(true)}
                  onBlur={() => {
                    setAgentIdFocused(false);
                    if (agentId) validateAgentId(agentId);
                  }}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  returnKeyType="next"
                  autoCapitalize="characters"
                  autoCorrect={false}
                  maxLength={10}
                  accessibilityLabel="Agent ID input"
                />
              </View>
              {agentIdError ? (
                <Text style={styles.errorText}>⚠ {agentIdError}</Text>
              ) : null}
            </View>

            {/* ── PASSWORD ── */}
            <View style={styles.fieldContainer}>
              <View style={styles.fieldLabelRow}>
                <Text style={styles.fieldLabel}>Password</Text>
                <Text style={styles.fieldRequired}>*</Text>
              </View>

              <View
                style={[
                  styles.inputWrapper,
                  passwordFocused && styles.inputWrapperFocused,
                  passwordError ? styles.inputWrapperError : null,
                ]}
              >
                <Text style={styles.inputIconLeft}>🔒</Text>
                <TextInput
                  ref={passwordRef}
                  style={styles.textInput}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.textPlaceholder}
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    if (passwordError) validatePassword(text);
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => {
                    setPasswordFocused(false);
                    if (password) validatePassword(password);
                  }}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel="Password input"
                />

                {/* Eye icon — security toggle */}
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(p => !p)}
                  activeOpacity={0.7}
                  accessibilityLabel={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                  accessibilityRole="button"
                >
                  <Text style={styles.eyeIconText}>
                    {showPassword ? '👁' : '🙈'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Password strength bars */}
              <StrengthBars password={password} />

              {passwordError ? (
                <Text style={styles.errorText}>⚠ {passwordError}</Text>
              ) : null}
            </View>

            {/* Forgot password */}
            <TouchableOpacity
              style={styles.forgotRow}
              onPress={() =>
                showToast({
                  type: 'info',
                  title: 'Password Reset',
                  message: 'Contact your admin at support@merchhub.com',
                })
              }
              activeOpacity={0.7}
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* ── LOGIN BUTTON ── */}
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[styles.loginButton, loading && { opacity: 0.78 }]}
                // onPress={handleLogin}
                onPress={() => navigation.navigate('BottomNav')}
                onPressIn={onButtonPressIn}
                onPressOut={onButtonPressOut}
                disabled={loading}
                activeOpacity={1}
                accessibilityLabel="Sign in button"
                accessibilityRole="button"
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <>
                    <Text style={styles.loginButtonText}>Sign In</Text>
                    <Text style={styles.loginButtonArrow}>→</Text>
                  </>
                )}
              </TouchableOpacity>
            </Animated.View>


            <View style={styles.signupRow}>
              <Text style={styles.signupText}>Not an agent yet?</Text> 
              <TouchableOpacity
                onPress={() =>
                  // showToast({
                  //   type: 'info',
                  //   title: 'Sign Up',
                  //   message: 'Please contact your administrator to create an account.', 
                  // })
                  navigation.navigate('OnboardingScreen')
                }
                activeOpacity={0.7}
                accessibilityLabel="Sign up link"
                accessibilityRole="button"
              >
                <Text style={styles.signupLink}>Apply Now</Text>
              </TouchableOpacity>
            </View>
            
          </Animated.View>

          {/* ─── TRUST STRIP ──────────────────────────────────────────────── */}
          <View style={styles.trustRow}>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>🔐</Text>
              <Text style={styles.trustText}>SSL Encrypted</Text>
            </View>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>🛡</Text>
              <Text style={styles.trustText}>PCI Compliant</Text>
            </View>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>✓</Text>
              <Text style={styles.trustText}>SOC2 Certified</Text>
            </View>
          </View>

          {/* ─── WATERMARK ────────────────────────────────────────────────── */}
          <View style={styles.watermark}>
            <Text style={styles.watermarkText}>© 2026 MerchHub · v2.6.1</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
