import * as React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import Button from '@/components/ui/button';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import Checkbox from 'expo-checkbox';
import {LinearGradient} from "expo-linear-gradient";
import {Svg, Path} from "react-native-svg";


export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
        setIsLoading(true)
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    )
  }

  return (
          <LinearGradient colors={["#6a2af4", "#6a2af4", "#9262f8"]} style={styles.background}>
        <ScrollView className="flex min-h-screen flex-col px-6 py-12" >

          
    
          <View className="mb-8">
            <Text className="mb-2 text-3xl font-bold text-white">Sign Up to Carline</Text>
            <Text className="text-white">Welcome back! Please enter your details.</Text>
          </View>
    
          <View className="flex flex-col gap-6">
            <View className="space-y-2">
              <Text className="text-white">Email</Text>
              <View className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                
                <TextInput
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="Enter email"
                  onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                  className="pl-10 h-12 rounded-xl border-gray-200 bg-gray-50"
                />

                
              </View>
            </View>
    
            <View className="space-y-2">
              <Text className='text-white'>Password</Text>
              <View className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-white-400" />
                
              <TextInput
                value={password}
                placeholder="Enter password"
                className="pl-10 pr-10 h-12 rounded-xl border-gray-200 bg-gray-50"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                />
                {/* <Button
                  
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-0 text-white-400 hover:text-white-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button> */}
              </View>
            </View>
    
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-2">
                <Checkbox id="remember" />
                <Text
                  
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                >
                  Remember me
                </Text>
              </View>
              <Link href="/auth/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </View>
    
            <Button
              onPress={onSignUpPress}
              className="h-12 w-full rounded-full bg-blue-600 text-lg font-semibold hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Sign Up"}
            </Button>
            
          </View>
    
          <View className="my-8 flex-row items-center gap-4">
            <View className="h-px flex-1 bg-gray-200" />
            <View className="text-sm text-white">
              <Text>Or continue with</Text>
              </View>
            <View className="h-px flex-1 bg-gray-200" />
          </View>
    
          <View className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-12 rounded-xl border-gray-200 hover:bg-gray-50 ">
                      <Svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                        <Path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <Path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <Path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <Path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </Svg>
                      Google
                    </Button>
                    <Button variant="outline" className="h-12 rounded-xl border-gray-200 hover:bg-gray-50">
                      <Svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <Path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.06 2.74.79 3.5 1.99-3.14 1.85-2.55 6.12.56 7.45-.68 1.74-1.61 3.45-2.65 3.59zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                      </Svg>
                      Apple
                    </Button>
                  </View>
    
          

          <View className="mt-auto pt-6 text-center text-sm">
          <Text className="text-white-500">Already have an account?</Text>
          <Link href="/login" className="font-semibold text-white hover:text-blue-500">
            <Text>Sign in</Text>
          </Link>
        </View>
        </ScrollView>
        </LinearGradient>
      )
      
}

const styles = StyleSheet.create({
    background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
})