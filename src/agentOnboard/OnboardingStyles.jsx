/**
 * OnboardingStyles.js
 * All styles, colors, and responsive helpers for OnboardingScreen
 */

import {StyleSheet, Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

// ─── Responsive Helpers ───────────────────────────────────────────────────────
export const wp = p => (width * p) / 100;
export const hp = p => (height * p) / 100;

// ─── Color Palette ────────────────────────────────────────────────────────────
export const COLORS = {
  primary: '#E8620A',
  primaryLight: '#FF8534',
  primaryDark: '#C04E00',
  accent: '#FFB347',
  white: '#FFFFFF',
  offWhite: '#FFF8F3',
  cardBg: '#FFFFFF',
  border: '#F0D5C5',
  borderFocus: '#E8620A',
  text: '#1A0A00',
  subText: '#7A5A48',
  placeholder: '#BFA090',
  error: '#D9232D',
  errorBg: '#FFF0F0',
  success: '#2D9E5F',
  gradient1: '#FF9A3C',
  gradient2: '#E8620A',
  shadow: '#C0500020',
};

// ─── Stylesheet ───────────────────────────────────────────────────────────────
export const styles = StyleSheet.create({

  // ── Screen & Background ────────────────────────────────────────────────────
  screen: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
  bgCircle1: {
    position: 'absolute',
    width: wp(70),
    height: wp(70),
    borderRadius: wp(35),
    backgroundColor: COLORS.primary,
    opacity: 0.06,
    top: -wp(20),
    right: -wp(15),
  },
  bgCircle2: {
    position: 'absolute',
    width: wp(50),
    height: wp(50),
    borderRadius: wp(25),
    backgroundColor: COLORS.accent,
    opacity: 0.1,
    bottom: hp(15),
    left: -wp(15),
  },
  dotsContainer: {
    position: 'absolute',
    width: '100%',
    height: hp(30),
    overflow: 'hidden',
  },
  dot: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: COLORS.primary,
  },

  // ── Scroll ─────────────────────────────────────────────────────────────────
  scroll: {
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === 'ios' ? hp(6) : hp(3),
  },

  // ── Header ─────────────────────────────────────────────────────────────────
  header: {
    marginBottom: hp(2.5),
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  brandIcon: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  brandEmoji: {
    fontSize: wp(5.5),
  },
  brandName: {
    fontSize: wp(4.5),
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  brandTagline: {
    fontSize: wp(3),
    color: COLORS.subText,
    fontWeight: '500',
  },
  headingTitle: {
    fontSize: wp(7),
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -0.5,
    lineHeight: wp(8.5),
  },
  headingSubtitle: {
    fontSize: wp(3.6),
    color: COLORS.subText,
    marginTop: hp(0.5),
    marginBottom: hp(2),
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: wp(3),
    color: COLORS.subText,
    marginTop: hp(0.5),
  },

  // ── Card ───────────────────────────────────────────────────────────────────
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: wp(5),
    padding: wp(5.5),
    shadowColor: '#E8620A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },

  // ── Section Headers ────────────────────────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  sectionDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: COLORS.primary,
    marginRight: wp(2),
  },
  sectionTitle: {
    fontSize: wp(3.8),
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 0.3,
  },

  // ── Floating Input ─────────────────────────────────────────────────────────
  inputWrapper: {
    marginBottom: hp(1.5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.border,
    paddingBottom: hp(0.8),
    paddingTop: hp(2),
  },
  inputIcon: {
    fontSize: wp(4.5),
    marginRight: wp(2.5),
    marginBottom: hp(0.3),
  },
  inputInner: {
    flex: 1,
    position: 'relative',
  },
  floatingLabel: {
    position: 'absolute',
    left: 0,
    fontWeight: '600',
    zIndex: 1,
  },
  textInput: {
    fontSize: wp(4),
    color: COLORS.text,
    fontWeight: '500',
    paddingVertical: 0,
    paddingTop: hp(1.2),
    minHeight: hp(4),
  },
  errorText: {
    fontSize: wp(3.2),
    color: COLORS.error,
    marginTop: hp(0.4),
    fontWeight: '500',
  },

  // ── Upload Cards ───────────────────────────────────────────────────────────
  uploadCardWrapper: {
    marginBottom: hp(1),
  },
  uploadCardAnimContainer: {
    // container for scale animation — keep empty
  },
  uploadCard: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: wp(3.5),
    overflow: 'hidden',
    backgroundColor: '#FFF9F5',
  },
  uploadCardError: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.errorBg,
  },
  uploadPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2.5),
    paddingHorizontal: wp(3),
  },
  uploadIconCircle: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: '#FFE8D6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
  },
  uploadIcon: {
    fontSize: wp(5.5),
  },
  uploadLabel: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
  },
  uploadHint: {
    fontSize: wp(3),
    color: COLORS.subText,
    marginTop: hp(0.3),
  },
  uploadedImageContainer: {
    width: '100%',
    height: hp(15),
    position: 'relative',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
  },
  imageLabel: {
    fontSize: wp(3),
    color: COLORS.white,
    fontWeight: '500',
  },
  removeButton: {
    position: 'absolute',
    top: hp(0.8),
    right: wp(2.5),
  },
  removeButtonInner: {
    width: wp(7),
    height: wp(7),
    borderRadius: wp(3.5),
    backgroundColor: 'rgba(220,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  removeButtonText: {
    color: COLORS.white,
    fontSize: wp(3.5),
    fontWeight: '800',
  },
  uploadFull: {
    width: '100%',
  },
  uploadRow: {
    flexDirection: 'row',
    gap: wp(3),
  },
  uploadHalf: {
    flex: 1,
  },

  // ── Apply Button ───────────────────────────────────────────────────────────
  applyButton: {
    borderRadius: wp(4),
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  applyButtonDisabled: {
    opacity: 0.7,
  },
  applyButtonInner: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: wp(2),
  },
  applyButtonText: {
    color: COLORS.white,
    fontSize: wp(4.2),
    fontWeight: '900',
    letterSpacing: 2,
  },
  applyButtonArrow: {
    color: COLORS.white,
    fontSize: wp(4.5),
    fontWeight: '900',
  },
  applyButtonShine: {
    position: 'absolute',
    top: 0,
    left: wp(10),
    width: wp(20),
    height: '50%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    transform: [{skewX: '-20deg'}],
  },
  disclaimer: {
    fontSize: wp(3),
    color: COLORS.subText,
    textAlign: 'center',
    marginTop: hp(1.5),
    lineHeight: wp(4.5),
  },

  // ── Picker Modal ───────────────────────────────────────────────────────────
  // Semi-transparent backdrop — sits behind the sheet
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  // Bottom sheet — slides up from the bottom
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    paddingHorizontal: wp(6),
    paddingBottom: Platform.OS === 'ios' ? hp(4) : hp(3),
    paddingTop: hp(2),
  },
  modalHandle: {
    width: wp(12),
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0D0C8',
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  modalTitle: {
    fontSize: wp(5.5),
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: wp(3.5),
    color: COLORS.subText,
    textAlign: 'center',
    marginTop: hp(0.5),
    marginBottom: hp(3),
  },
  modalOptions: {
    flexDirection: 'row',
    gap: wp(4),
    marginBottom: hp(2),
  },
  modalOptionCamera: {
    flex: 1,
    backgroundColor: '#FFF3EC',
    borderRadius: wp(4),
    alignItems: 'center',
    paddingVertical: hp(2.5),
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  modalOptionGallery: {
    flex: 1,
    backgroundColor: '#F0F7FF',
    borderRadius: wp(4),
    alignItems: 'center',
    paddingVertical: hp(2.5),
    borderWidth: 1.5,
    borderColor: '#D0E4F5',
  },
  modalOptionIconBg: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    backgroundColor: 'rgba(232,98,10,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
  },
  modalOptionIcon: {
    marginBottom: hp(1),
  },
  modalOptionEmoji: {
    fontSize: wp(8),
  },
  modalOptionTitle: {
    fontSize: wp(4),
    fontWeight: '800',
    color: COLORS.text,
  },
  modalOptionSub: {
    fontSize: wp(3),
    color: COLORS.subText,
    marginTop: hp(0.3),
  },
  modalCancel: {
    alignItems: 'center',
    paddingVertical: hp(1.5),
    borderRadius: wp(3),
    backgroundColor: '#F5F0ED',
    marginTop: hp(0.5),
  },
  modalCancelText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: COLORS.subText,
  },
});