/**
 * OnboardingScreen.js
 * BengolSpices Partner Onboarding — React Native CLI
 *
 * Dependencies:
 *   npm install react-native-image-crop-picker
 *   npx pod-install  (iOS)
 *
 * Android — AndroidManifest.xml:
 *   <uses-permission android:name="android.permission.CAMERA"/>
 *   <uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>
 *
 * iOS — Info.plist:
 *   NSCameraUsageDescription
 *   NSPhotoLibraryUsageDescription
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
  StatusBar,
  Animated,
  KeyboardAvoidingView,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { styles, COLORS, wp, hp } from './OnboardingStyles';
import { agentApply } from '../api/Globalapi';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.38; // approximate sheet height

// ─── Animated error label ─────────────────────────────────────────────────────
const ErrorText = ({ message }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.Text
      style={[
        styles.errorText,
        {
          opacity: anim,
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [-5, 0],
              }),
            },
          ],
        },
      ]}
    >
      ⚠ {message}
    </Animated.Text>
  );
};

// ─── Camera / Gallery Bottom Sheet ───────────────────────────────────────────
// The Modal stays mounted at all times. We use translateY to show/hide the
// sheet and opacity for the backdrop — this avoids the RN Modal unmount bug.
const PickerModal = ({ isVisible, onClose, onCamera, onGallery }) => {
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetY = useRef(new Animated.Value(MODAL_HEIGHT)).current;
  // Track whether modal should be "rendered" at all (keeps it in the tree)
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true); // mount first
      // then animate in on next frame
      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.timing(backdropOpacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.spring(sheetY, {
            toValue: 0,
            friction: 8,
            tension: 65,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      // animate out first, then unmount
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sheetY, {
          toValue: MODAL_HEIGHT,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false); // unmount after animation
      });
    }
  }, [isVisible]);

  if (!modalVisible) return null;

  return (
    <Modal
      visible={true} // always true while mounted
      transparent={true}
      animationType="none" // we handle animation ourselves
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[styles.modalBackdrop, { opacity: backdropOpacity }]}
        />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet */}
      <Animated.View
        style={[styles.modalContainer, { transform: [{ translateY: sheetY }] }]}
      >
        {/* Drag handle */}
        <View style={styles.modalHandle} />

        <Text style={styles.modalTitle}>Choose Source</Text>
        <Text style={styles.modalSubtitle}>How would you like to upload?</Text>

        <View style={styles.modalOptions}>
          {/* Camera */}
          <TouchableOpacity
            style={styles.modalOptionCamera}
            onPress={onCamera}
            activeOpacity={0.82}
          >
            <View style={styles.modalOptionIconBg}>
              <Text style={styles.modalOptionEmoji}>📷</Text>
            </View>
            <Text style={styles.modalOptionTitle}>Camera</Text>
            <Text style={styles.modalOptionSub}>Take a photo</Text>
          </TouchableOpacity>

          {/* Gallery */}
          <TouchableOpacity
            style={styles.modalOptionGallery}
            onPress={onGallery}
            activeOpacity={0.82}
          >
            <View style={styles.modalOptionIconBg}>
              <Text style={styles.modalOptionEmoji}>🖼️</Text>
            </View>
            <Text style={styles.modalOptionTitle}>Gallery</Text>
            <Text style={styles.modalOptionSub}>Choose from library</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.modalCancel} onPress={onClose}>
          <Text style={styles.modalCancelText}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

// ─── Upload Card ──────────────────────────────────────────────────────────────
const UploadCard = ({
  label,
  icon,
  image,
  onPress,
  onRemove,
  error,
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () =>
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: image ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [image]);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.border, COLORS.primary],
  });

  return (
    <View style={[styles.uploadCardWrapper, style]}>
      <Animated.View
        style={[
          styles.uploadCardAnimContainer,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View
            style={[
              styles.uploadCard,
              { borderColor },
              error ? styles.uploadCardError : null,
            ]}
          >
            {image ? (
              <View style={styles.uploadedImageContainer}>
                <Image
                  source={{ uri: image.uri }}
                  style={styles.uploadedImage}
                  resizeMode="cover"
                />
                <View style={styles.imageOverlay}>
                  <Text style={styles.imageLabel} numberOfLines={1}>
                    {image.fileName || 'Selected'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={onRemove}
                  hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                >
                  <View style={styles.removeButtonInner}>
                    <Text style={styles.removeButtonText}>✕</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.uploadPlaceholder}>
                <View style={styles.uploadIconCircle}>
                  <Text style={styles.uploadIcon}>{icon}</Text>
                </View>
                <Text style={styles.uploadLabel}>{label}</Text>
                <Text style={styles.uploadHint}>Tap to upload</Text>
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
      {error ? <ErrorText message={error} /> : null}
    </View>
  );
};

// ─── Floating Label Input ─────────────────────────────────────────────────────
const FloatingInput = ({
  label,
  value,
  onChangeText,
  error,
  keyboardType,
  icon,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: focused || value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
    Animated.timing(borderAnim, {
      toValue: focused ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [focused, value]);

  const labelTop = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [hp(1.8), hp(-1.2)],
  });
  const labelSize = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [wp(3.8), wp(3.2)],
  });
  const labelColor = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.placeholder, COLORS.primary],
  });
  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [error ? COLORS.error : COLORS.border, COLORS.primary],
  });

  return (
    <View style={styles.inputWrapper}>
      <Animated.View
        style={[styles.inputContainer, { borderBottomColor: borderColor }]}
      >
        <Text style={styles.inputIcon}>{icon}</Text>
        <View style={styles.inputInner}>
          <Animated.Text
            style={[
              styles.floatingLabel,
              { top: labelTop, fontSize: labelSize, color: labelColor },
            ]}
          >
            {label}
          </Animated.Text>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            keyboardType={keyboardType || 'default'}
            placeholderTextColor="transparent"
            {...rest}
          />
        </View>
      </Animated.View>
      {error ? <ErrorText message={error} /> : null}
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const OnboardingScreen = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [images, setImages] = useState({
    profile: null,
    aadhaar: null,
    pan: null,
  });
  const [errors, setErrors] = useState({});
  const [pickerTarget, setPickerTarget] = useState(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const headerAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.stagger(200, [
      Animated.spring(headerAnim, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.spring(formAnim, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // ── Open/close picker ───────────────────────────────────────────────────────
  const openPicker = useCallback(target => {
    setPickerTarget(target);
    setPickerVisible(true);
  }, []);

  const closePicker = useCallback(() => {
    setPickerVisible(false);
    // don't clear target immediately — let close animation finish
  }, []);

  // ── Camera ──────────────────────────────────────────────────────────────────
  const handleCamera = useCallback(async () => {
    const target = pickerTarget;
    closePicker();
    // wait for modal close animation before opening camera
    await new Promise(resolve => setTimeout(resolve, 350));
    try {
      const image = await ImageCropPicker.openCamera({
        mediaType: 'photo',
        cropping: true,
        cropperCircleOverlay: target === 'profile', // circle for profile, rect for docs
        freeStyleCropEnabled: true, // ✅ user can resize crop box freely
        quality: 0.8,
        compressImageQuality: 0.8,
        includeBase64: false,
        // Do NOT set width/height — that locks aspect ratio and disables free crop
        cropperToolbarTitle: 'Adjust Crop',
        cropperActiveWidgetColor: '#E8620A',
        cropperStatusBarColor: '#E8620A',
        cropperToolbarColor: '#E8620A',
        cropperToolbarWidgetColor: '#FFFFFF',
      });
      // image-crop-picker returns { path, mime, filename, size, width, height }
      const asset = {
        uri: image.path,
        type: image.mime,
        fileName: image.filename || `${target}_${Date.now()}.jpg`,
        width: image.width,
        height: image.height,
        fileSize: image.size,
      };
      setImages(p => ({ ...p, [target]: asset }));
      setErrors(p => ({ ...p, [target]: null }));
    } catch (err) {
      // user cancelled — crop-picker throws with code E_PICKER_CANCELLED
      if (err?.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Camera Error', 'Could not open camera. Please try again.');
        console.log('Camera error:', err);
      }
    }
  }, [pickerTarget]);

  // ── Gallery ─────────────────────────────────────────────────────────────────
  const handleGallery = useCallback(async () => {
    const target = pickerTarget;
    closePicker();
    await new Promise(resolve => setTimeout(resolve, 350));
    try {
      const image = await ImageCropPicker.openPicker({
        mediaType: 'photo',
        cropping: true,
        cropperCircleOverlay: target === 'profile', // circle for profile, rect for docs
        freeStyleCropEnabled: true, // ✅ user can resize crop box freely
        quality: 0.8,
        compressImageQuality: 0.8,
        includeBase64: false,
        // Do NOT set width/height — that locks aspect ratio and disables free crop
        cropperToolbarTitle: 'Adjust Crop',
        cropperActiveWidgetColor: '#E8620A',
        cropperStatusBarColor: '#E8620A',
        cropperToolbarColor: '#E8620A',
        cropperToolbarWidgetColor: '#FFFFFF',
      });
      const asset = {
        uri: image.path,
        type: image.mime,
        fileName: image.filename || `${target}_${Date.now()}.jpg`,
        width: image.width,
        height: image.height,
        fileSize: image.size,
      };
      setImages(p => ({ ...p, [target]: asset }));
      setErrors(p => ({ ...p, [target]: null }));
    } catch (err) {
      if (err?.code !== 'E_PICKER_CANCELLED') {
        Alert.alert(
          'Gallery Error',
          'Could not open gallery. Please try again.',
        );
        console.log('Gallery error:', err);
      }
    }
  }, [pickerTarget]);

  const removeImage = key => setImages(p => ({ ...p, [key]: null }));

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim()) {
      e.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      e.email = 'Enter a valid email address';
    }
    if (!form.phone.trim()) {
      e.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(form.phone.replace(/\s/g, ''))) {
      e.phone = 'Enter a valid 10-digit phone number';
    }
    if (!form.address.trim()) e.address = 'Address is required';
    if (!images.profile) e.profile = 'Profile photo is required';
    if (!images.aadhaar) e.aadhaar = 'Aadhaar document is required';
    if (!images.pan) e.pan = 'PAN document is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const submitFormData = async formData => {
    console.log('====== FORM DATA SUBMITTED ======');
    console.log(
      'Full Name😎😎😎😎😎 :',
      form.fullName,
      form.email,
      form.phone,
      form.address,
      images.profile,
      images.aadhaar,
      images.pan,
    );
    // console.log('Email     :', form.email);
    // console.log('Phone     :', form.phone);
    // console.log('Address   :', form.address);
    // console.log('Profile   :', images.profile?.fileName, '|', images.profile?.uri);
    // console.log('Aadhaar   :', images.aadhaar?.fileName, '|', images.aadhaar?.uri);
    // console.log('PAN       :', images.pan?.fileName,     '|', images.pan?.uri);
    console.log('=================================');

    // const response = await fetch('https://your-api-endpoint.com/api/onboard', {
    //   method: 'POST',
    //   headers: {Accept: 'application/json', 'Content-Type': 'multipart/form-data'},
    //   body: formData,
    // });
    // return response.json();
  };

  const handleApply = async () => {
    if (!validate()) {
      Alert.alert('Incomplete Form', 'Please fill all required fields.');
      return;
    }

    Animated.sequence([
      Animated.timing(buttonAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setLoading(true);
    const formData = new FormData();
    formData.append('name', form.fullName);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('address', form.address);

    const appendImage = (key, asset, filename) => {
      if (asset) {
        formData.append(key, {
          uri: asset.uri,
          type: asset.type || 'image/jpeg',
          name: asset.fileName || filename,
        });
      }
    };
    appendImage('photo', images.profile);
    appendImage('aadhaar', images.aadhaar);
    appendImage('pan', images.pan);

    try {
      const result = await agentApply(formData);
      console.log('API Response:', result);
      Alert.alert('🎉 Success!', 'Your application has been submitted!', [
        { text: 'Done' },
      ]);
    } catch (err) {
      console.log('API Error:', err);
      Alert.alert(
        'Submission Failed',
        'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.offWhite} />
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: headerAnim,
                transform: [
                  {
                    translateY: headerAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.brandRow}>
              <View style={styles.brandIcon}>
                <Text style={styles.brandEmoji}>🌶️</Text>
              </View>
              <View>
                <Text style={styles.brandName}>Bengol Spices</Text>
                <Text style={styles.brandTagline}>Authentic Flavours</Text>
              </View>
            </View>
            <Text style={styles.headingTitle}>Partner Onboarding</Text>
            <Text style={styles.headingSubtitle}>
              Join our family of authentic spice merchants
            </Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.progressLabel}>
              Step 1 of 1 — Personal Details
            </Text>
          </Animated.View>

          {/* Form Card */}
          <Animated.View
            style={[
              styles.card,
              {
                opacity: formAnim,
                transform: [
                  {
                    translateY: formAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [40, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>Personal Information</Text>
            </View>

            <FloatingInput
              label="Full Name"
              icon="👤"
              value={form.fullName}
              onChangeText={v => {
                setForm(p => ({ ...p, fullName: v }));
                if (v.trim()) setErrors(p => ({ ...p, fullName: null }));
              }}
              error={errors.fullName}
              returnKeyType="next"
            />
            <FloatingInput
              label="Email Address"
              icon="✉️"
              value={form.email}
              onChangeText={v => {
                setForm(p => ({ ...p, email: v }));
                if (v.trim()) setErrors(p => ({ ...p, email: null }));
              }}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
            <FloatingInput
              label="Phone Number"
              icon="📱"
              value={form.phone}
              onChangeText={v => {
                setForm(p => ({ ...p, phone: v }));
                if (v.trim()) setErrors(p => ({ ...p, phone: null }));
              }}
              error={errors.phone}
              keyboardType="phone-pad"
              maxLength={10}
              returnKeyType="next"
            />
            <FloatingInput
              label="Full Address"
              icon="📍"
              value={form.address}
              onChangeText={v => {
                setForm(p => ({ ...p, address: v }));
                if (v.trim()) setErrors(p => ({ ...p, address: null }));
              }}
              error={errors.address}
              multiline
              numberOfLines={2}
              returnKeyType="done"
            />

            <View style={[styles.sectionHeader, { marginTop: hp(2.5) }]}>
              <View style={styles.sectionDot} />
              <Text style={styles.sectionTitle}>Documents & Photo</Text>
            </View>

            <UploadCard
              label="Profile Photo"
              icon="🤳"
              image={images.profile}
              onPress={() => openPicker('profile')}
              onRemove={() => removeImage('profile')}
              error={errors.profile}
              style={styles.uploadFull}
            />

            <View style={styles.uploadRow}>
              <UploadCard
                label="Aadhaar Card"
                icon="🪪"
                image={images.aadhaar}
                onPress={() => openPicker('aadhaar')}
                onRemove={() => removeImage('aadhaar')}
                error={errors.aadhaar}
                style={styles.uploadHalf}
              />
              <UploadCard
                label="PAN Card"
                icon="📋"
                image={images.pan}
                onPress={() => openPicker('pan')}
                onRemove={() => removeImage('pan')}
                error={errors.pan}
                style={styles.uploadHalf}
              />
            </View>

            <Animated.View
              style={{ transform: [{ scale: buttonAnim }], marginTop: hp(3) }}
            >
              <TouchableOpacity
                style={[
                  styles.applyButton,
                  loading && styles.applyButtonDisabled,
                ]}
                onPress={handleApply}
                activeOpacity={0.88}
                disabled={loading}
              >
                <View style={styles.applyButtonInner}>
                  {loading ? (
                    <ActivityIndicator color={COLORS.white} size="small" />
                  ) : (
                    <>
                      <Text style={styles.applyButtonText}>APPLY NOW</Text>
                      <Text style={styles.applyButtonArrow}>→</Text>
                    </>
                  )}
                </View>
                <View style={styles.applyButtonShine} />
              </TouchableOpacity>
            </Animated.View>

            <Text style={styles.disclaimer}>
              By applying, you agree to our Terms & Privacy Policy. Your
              documents are encrypted and stored securely.
            </Text>
          </Animated.View>

          <View style={{ height: hp(4) }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal lives OUTSIDE ScrollView so it can cover full screen */}
      <PickerModal
        isVisible={pickerVisible}
        onClose={closePicker}
        onCamera={handleCamera}
        onGallery={handleGallery}
      />
    </View>
  );
};

export default OnboardingScreen;
