import * as React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, ImageBackground } from 'react-native';
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
      
        <View className="min-h-screen bg-white " >

          
            <View className='relative h-1/2 rounded-b-3xl bg-blue-600'>
              
              <View className='absolute mx-auto w-full max-w-md mt-36 px-6'>

                    <View className="mb-8 mt-4">
                      <Text className="mb-2 text-3xl font-bold text-white">Sign Up to Carline</Text>
                      <Text className="text-white">Welcome! Please enter your details.</Text>
                    </View>
              
                    <View className="flex flex-col gap-8">
                      <View className="space-y-2">
                        {/* <Text className="text-gray-700">Email</Text> */}
                        <View className="relative">
                          {/* <Mail style={{left:10, top:33, zIndex:10}} className="absolute left-3 top-3 h-5 w-5 text-gray-400" /> */}
                          
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
                        {/* <Text className='text-white'>Password</Text> */}
                        <View className="relative">
                          {/* <Lock style={{left:10, top:33, zIndex:10}} className="absolute left-3 top-3 h-5 w-5 text-white-400" /> */}
                          
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
                          {/* <Checkbox id="remember" />
                          <Text
                            
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                          >
                            Remember me
                          </Text> */}
                        </View>
                      
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
              
                    <View className="flex-row  gap-4">
                    <Button variant="outline" className=" w-1/2 h-12 rounded-xl border-gray-200  hover:bg-gray-50 ">
                    <Text className='text-gray-700 font-extrabold'> Google</Text>
                    <ImageBackground className='w-5 h-5' source={require("@/assets/logos/google.png")} style={[StyleSheet.absoluteFill, styles.google]} />
                    </Button>
                    <Button variant="outline" className="w-1/2 h-12 rounded-xl border-gray-200  hover:bg-gray-50">
                      <ImageBackground source={require("@/assets/logos/apple.png")} style={[StyleSheet.absoluteFill, styles.google]}/>
                      <Text className='text-gray-700  font-extrabold'>Apple </Text>
                      
                    </Button>
                  </View>
              
                    

                    <View className="flex-row gap-2 mt-auto pt-6 text-center text-sm">
                    <Text className="text-white-500">Already have an account?</Text>
                    <Link href="/login" className="font-semibold text-white hover:text-blue-500">
                      <Text className='text-blue-500'>Sign in</Text>
                    </Link>
                  </View>

              </View>
            </View>
        </View>
       
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
  google:{
    height:35,
    width:35
  }
})