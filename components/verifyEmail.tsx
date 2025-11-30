import React, { useState, useEffect, useRef, useCallback, forwardRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  TextInput,
  Pressable,
  Clipboard, // Note: You might need to install @react-native-clipboard/clipboard
  Animated,
  I18nManager,
  AccessibilityInfo,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  AccessibilityRole,
} from 'react-native';
import { Mail, ArrowLeft, AlertCircle } from 'lucide-react-native';
import { OTPInput } from '@/components/ui/input-otp/index';

const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1E40AF',
  background: '#FFFFFF',
  text: '#0F172A',
  subText: '#64748B',
  inputBg: '#F8FAFC',
  inputBorder: '#E2E8F0',
  error: '#EF4444',
  success: '#22C55E',
  focusRing: '#DBEAFE', // Light blue ring for focus
};


// Styles specifically for your OTP Component to match the theme
const otpStyles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center' },
  inputContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  
  // Base Input Style
  input: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text,
    backgroundColor: COLORS.inputBg,
    borderColor: COLORS.inputBorder,
    borderWidth: 1.5,
    borderRadius: 12,
    width: 50,
    height: 60,
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  
  // State Styles
  inputActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFFFFF',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  inputFilled: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBD5E1',
  },
  inputError: {
    borderColor: COLORS.error,
    backgroundColor: '#FEF2F2',
    color: COLORS.error,
  },
  
  // Utils
  separator: {
    width: 10,
    height: 2,
    backgroundColor: COLORS.subText,
    alignSelf: 'center',
    marginHorizontal: 4
  },
});

type OTPInputRef = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
};


export default function EmailVerificationScreen({ navigation }: { navigation: any }) {
  const [code, setCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(60);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const otpRef = useRef<OTPInputRef>(null);

  // Mock user email
  const userEmail = "user@example.com";

  // Timer Logic
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle Verify
  const handleVerify = () => {
    if (code.length < 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // SIMULATE API CALL
    setTimeout(() => {
      setIsLoading(false);
      if (code === "123456") {
        alert("Email Verified Successfully!");
      } else {
        setError("Invalid code. Please try again.");
      }
    }, 1500);
  };

  // Handle Resend
  const handleResend = () => {
    if (timer === 0) {
      setTimer(60);
      setError(null);
      setCode(''); // Clear code using state
      otpRef.current?.clear(); // Clear inputs using ref
      alert("New code sent!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        className='max-h-screen'
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.contentContainer}>
            
            {/* --- HEADER --- */}
            <View style={styles.header}>
              <TouchableOpacity 
                onPress={() => navigation?.goBack()} 
                style={styles.backButton}
              >
                <ArrowLeft size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            {/* --- ICONOGRAPHY --- */}
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <Mail size={32} color={COLORS.primary} strokeWidth={2.5} />
              </View>
            </View>
            
            

            {/* --- TEXT CONTENT --- */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>Check your email</Text>
              <Text style={styles.subtitle}>
                We sent a verification code to{'\n'}
                <Text style={styles.emailHighlight}>{userEmail}</Text>
              </Text>
            </View>

            {/* --- CUSTOM OTP INPUT INTEGRATION --- */}
            <View style={styles.inputWrapper}>
              <OTPInput
                ref={otpRef}
                length={6}
                value={code}
                onChange={(val) => {
                  setCode(val);
                  if (error) setError(null);
                }}
                onComplete={() => {
                  // Optional: Auto submit logic
                  // handleVerify();
                }}
                error={!!error}
                autoFocus={true}
                // Custom sizing logic is handled in the component's internal styles now
              />
            </View>

            {/* --- ERROR MESSAGE --- */}
            {error && (
              <View style={styles.errorContainer}>
                <AlertCircle size={16} color={COLORS.error} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* --- SUBMIT BUTTON --- */}
            <TouchableOpacity 
              style={[styles.button, isLoading && styles.buttonDisabled]} 
              onPress={handleVerify}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Verify Email</Text>
              )}
            </TouchableOpacity>

            {/* --- RESEND TIMER --- */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive the email? </Text>
              <TouchableOpacity 
                onPress={handleResend} 
                disabled={timer > 0}
              >
                <Text style={[
                  styles.resendLink, 
                  timer > 0 && styles.resendLinkDisabled
                ]}>
                  {timer > 0 ? `Resend in ${timer}s` : 'Click to resend'}
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- SCREEN SPECIFIC STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.subText,
    textAlign: 'center',
    lineHeight: 24,
  },
  emailHighlight: {
    color: COLORS.text,
    fontWeight: '600',
  },
  inputWrapper: {
    marginBottom: 20,
    height: 70, // Reserve height for input to prevent jumping
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  resendText: {
    color: COLORS.subText,
    fontSize: 14,
  },
  resendLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  resendLinkDisabled: {
    color: COLORS.subText,
    opacity: 0.7,
  },
});