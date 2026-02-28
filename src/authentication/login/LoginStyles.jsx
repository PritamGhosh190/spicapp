/**
 * LoginStyles.js
 * Ecommerce Agent Portal — Warm Commerce Aesthetic
 * Premium marketplace feel: warm cream, deep navy, energetic brand orange
 */

import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const scale = size => (width / 375) * size;
export const verticalScale = size => (height / 812) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const COLORS = {
  bg: '#F7F3EE',
  bgDeep: '#EDE7DD',
  cardBg: '#FFFFFF',
  cardShadow: 'rgba(62,44,28,0.14)',
  brand: '#C8410B',
  brandDark: '#9E3209',
  brandLight: 'rgba(200,65,11,0.10)',
  brandGlow: 'rgba(200,65,11,0.22)',
  gold: '#C9962A',
  goldLight: 'rgba(201,150,42,0.15)',
  navy: '#1A2540',
  navyMid: '#2C3E60',
  navyLight: 'rgba(26,37,64,0.08)',
  textPrimary: '#1A1410',
  textSecondary: '#7A6A58',
  textPlaceholder: '#B8AA98',
  textLabel: '#5A4A38',
  inputBg: '#FDFAF7',
  inputBorder: '#DDD5C8',
  inputFocusBorder: '#C8410B',
  inputErrorBorder: '#E53935',
  white: '#FFFFFF',
  error: '#E53935',
  success: '#2E7D32',
  divider: '#E8DFD4',
};

export const FONTS = {
  serif: Platform.select({ ios: 'Georgia', android: 'serif' }),
  sans: Platform.select({ ios: 'Helvetica Neue', android: 'sans-serif' }),
  sansMed: Platform.select({ ios: 'Helvetica Neue', android: 'sans-serif-medium' }),
  mono: Platform.select({ ios: 'Courier New', android: 'monospace' }),
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: COLORS.bg,
  },

  // ─── HERO ─────────────────────────────────────────────────────────────────
  heroBanner: {
    width: '100%',
    backgroundColor: COLORS.navy,
    paddingTop: verticalScale(52),
    paddingBottom: verticalScale(52),
    paddingHorizontal: scale(24),
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    // Curved bottom edge — replaces the broken diagonal strip
    borderBottomLeftRadius: scale(32),
    borderBottomRightRadius: scale(32),
  },
  heroDiagonal1: {
    position: 'absolute',
    top: -scale(40),
    right: -scale(50),
    width: scale(190),
    height: scale(190),
    backgroundColor: 'rgba(200,65,11,0.12)',
    transform: [{ rotate: '35deg' }],
    borderRadius: scale(30),
  },
  heroDiagonal2: {
    position: 'absolute',
    bottom: -scale(20),
    left: -scale(40),
    width: scale(150),
    height: scale(150),
    backgroundColor: 'rgba(201,150,42,0.08)',
    transform: [{ rotate: '-20deg' }],
    borderRadius: scale(30),
  },
  heroLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  heroLogoIcon: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(12),
    backgroundColor: COLORS.brand,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
    shadowColor: COLORS.brand,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.55,
    shadowRadius: 10,
    elevation: 10,
  },
  heroLogoIconText: {
    fontSize: scale(24),
  },
  heroLogoName: {
    fontFamily: FONTS.serif,
    fontSize: moderateScale(28),
    color: COLORS.white,
    fontWeight: '700',
    letterSpacing: scale(0.3),
  },
  heroLogoAccent: {
    color: COLORS.gold,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201,150,42,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(201,150,42,0.38)',
    borderRadius: scale(20),
    paddingHorizontal: scale(14),
    paddingVertical: scale(5),
    marginBottom: verticalScale(8),
  },
  heroBadgeDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: COLORS.gold,
    marginRight: scale(7),
  },
  heroBadgeText: {
    fontFamily: FONTS.mono,
    fontSize: moderateScale(10),
    color: COLORS.gold,
    letterSpacing: scale(1.2),
    textTransform: 'uppercase',
  },
  heroTagline: {
    fontFamily: FONTS.sans,
    fontSize: moderateScale(12),
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: scale(0.3),
    textAlign: 'center',
  },
  // heroStrip removed — hero bottom curve handled by borderBottomRadius on heroBanner

  // ─── STATS CARD ───────────────────────────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -verticalScale(26),
    marginHorizontal: scale(20),
    backgroundColor: COLORS.cardBg,
    borderRadius: scale(16),
    paddingVertical: verticalScale(14),
    // Explicit left/right padding so nothing clips at edges
    paddingLeft: scale(12),
    paddingRight: scale(12),
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 14,
    zIndex: 10,
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: scale(4),
  },
  statDivider: {
    width: 1,
    height: verticalScale(36),
    backgroundColor: COLORS.divider,
    flexShrink: 0,
  },
  statValue: {
    fontFamily: FONTS.serif,
    fontSize: moderateScale(17),
    fontWeight: '700',
    color: COLORS.brand,
  },
  statLabel: {
    fontFamily: FONTS.sans,
    fontSize: moderateScale(9),
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: scale(0.7),
    marginTop: scale(2),
  },

  // ─── FORM CARD ────────────────────────────────────────────────────────────
  formCard: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(22),
    marginBottom: verticalScale(16),
    backgroundColor: COLORS.cardBg,
    borderRadius: scale(20),
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(28),
    paddingBottom: verticalScale(24),
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 22,
    elevation: 10,
    borderWidth: 1,
    borderColor: COLORS.divider,
    overflow: 'hidden',
  },
  cardAccentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: scale(4),
    backgroundColor: COLORS.brand,
  },
  formCardTitle: {
    fontFamily: FONTS.serif,
    fontSize: moderateScale(21),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(4),
  },
  formCardSubtitle: {
    fontFamily: FONTS.sans,
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    lineHeight: moderateScale(19),
    marginBottom: verticalScale(22),
  },

  // ─── FIELD ────────────────────────────────────────────────────────────────
  fieldContainer: {
    marginBottom: verticalScale(18),
  },
  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  fieldLabel: {
    fontFamily: FONTS.sansMed,
    fontSize: moderateScale(12),
    color: COLORS.textLabel,
    letterSpacing: scale(0.3),
    fontWeight: '600',
  },
  fieldRequired: {
    color: COLORS.brand,
    marginLeft: scale(2),
    fontSize: moderateScale(14),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    height: verticalScale(52),
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputWrapperFocused: {
    borderColor: COLORS.brand,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.brandGlow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6,
  },
  inputWrapperError: {
    borderColor: COLORS.error,
    shadowColor: 'rgba(229,57,53,0.2)',
    shadowRadius: 8,
    elevation: 4,
  },
  inputPrefixBox: {
    paddingRight: scale(10),
    borderRightWidth: 1,
    borderRightColor: COLORS.divider,
    marginRight: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
  },
  inputPrefixText: {
    fontFamily: FONTS.mono,
    fontSize: moderateScale(11),
    color: COLORS.textSecondary,
    letterSpacing: scale(0.4),
  },
  inputIconLeft: {
    marginRight: scale(10),
    fontSize: scale(16),
  },
  textInput: {
    flex: 1,
    fontFamily: FONTS.sans,
    fontSize: moderateScale(15),
    color: COLORS.textPrimary,
    height: '100%',
    paddingVertical: 0,
    letterSpacing: scale(0.3),
  },
  eyeButton: {
    padding: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconText: {
    fontSize: scale(18),
    color: COLORS.textSecondary,
  },
  errorText: {
    fontFamily: FONTS.sans,
    fontSize: moderateScale(11),
    color: COLORS.error,
    marginTop: verticalScale(5),
  },

  // Password strength bars
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  strengthBar: {
    flex: 1,
    height: scale(3),
    borderRadius: scale(2),
    backgroundColor: COLORS.divider,
    marginRight: scale(3),
  },
  strengthBarWeak: { backgroundColor: COLORS.error },
  strengthBarMed: { backgroundColor: COLORS.gold },
  strengthBarStrong: { backgroundColor: COLORS.success },
  strengthLabel: {
    fontFamily: FONTS.mono,
    fontSize: moderateScale(9),
    color: COLORS.textSecondary,
    marginLeft: scale(6),
    textTransform: 'uppercase',
    letterSpacing: scale(0.8),
    minWidth: scale(38),
    textAlign: 'right',
  },

  // Forgot password
  forgotRow: {
    alignItems: 'flex-end',
    marginTop: -verticalScale(10),
    marginBottom: verticalScale(20),
  },
  forgotText: {
    fontFamily: FONTS.sans,
    fontSize: moderateScale(12),
    color: COLORS.brand,
  },

  // ─── LOGIN BUTTON ─────────────────────────────────────────────────────────
  loginButton: {
    height: verticalScale(54),
    borderRadius: scale(14),
    backgroundColor: COLORS.brand,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.brand,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.42,
    shadowRadius: 14,
    elevation: 10,
    borderBottomWidth: scale(3),
    borderBottomColor: COLORS.brandDark,
  },
  loginButtonText: {
    fontFamily: FONTS.sansMed,
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: scale(1.2),
    textTransform: 'uppercase',
  },
  loginButtonArrow: {
    fontSize: scale(18),
    color: COLORS.white,
    marginLeft: scale(10),
  },

  // ─── TRUST STRIP ──────────────────────────────────────────────────────────
  trustRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(20),
    marginBottom: verticalScale(8),
    flexWrap: 'wrap',
    gap: scale(14),
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  trustIcon: { fontSize: scale(11) },
  trustText: {
    fontFamily: FONTS.sans,
    fontSize: moderateScale(10),
    color: COLORS.textSecondary,
  },

  // ─── WATERMARK ────────────────────────────────────────────────────────────
  watermark: {
    alignItems: 'center',
    paddingBottom: verticalScale(28),
    paddingTop: verticalScale(4),
  },
  watermarkText: {
    fontFamily: FONTS.mono,
    fontSize: moderateScale(9),
    color: COLORS.textPlaceholder,
    letterSpacing: scale(1),
    textTransform: 'uppercase',
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(12),
  },
  signupText: {
    fontFamily: FONTS.sans,
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
  },
  signupLink: {
    fontFamily: FONTS.sans,
    fontSize: moderateScale(12),
    color: COLORS.brand,
    marginLeft: scale(4),
  },
});

export default styles;