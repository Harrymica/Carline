import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import  Button  from "@/components/ui/button";
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import React from 'react';
import { Checkbox } from "expo-checkbox";
import { LinearGradient } from 'expo-linear-gradient';
import {Svg, Path} from "react-native-svg";
// import { useMutation } from "convex/react";
// import { api } from "../convex/_generated/api";
import { SignOutButton } from '@/components/SignOutButton';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { ImageBackground } from 'expo-image';


export default function loginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  //create user in convex
  const { user } = useUser();
  //const syncUser = useMutation(api.users.syncUser);

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      setIsLoading(true)
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        //save the clerk user to convex
        // if (user) {
        //       // Sync Clerk user to Convex DB
        //       syncUser({
        //         full_name: user.fullName || "",
        //         avatar_url: user.imageUrl,
        //         phone: user.primaryPhoneNumber?.phoneNumber,
        //       });
        //     }
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }


  // useEffect(() => {
  //   if (user) {
  //     // Sync Clerk user to Convex DB
  //     syncUser({
  //       full_name: user.fullName || "",
  //       avatar_url: user.imageUrl,
  //       phone: user.primaryPhoneNumber?.phoneNumber,
  //     });
  //   }
  // }, [user]);




  return (
    //   <LinearGradient colors={["#6a2af4", "#6a2af4", "#9262f8"]} style={styles.background}>
        
      
      <View className="min-h-screen bg-white ">
      <View className='relative h-1/2 rounded-b-3xl bg-blue-600'>
       
      <View className='absolute mx-auto w-full max-w-md mt-36 px-6'>

        <View className="mb-8 mt-4">
          <Text className="mb-2 text-3xl font-bold text-white">Sign in to Carline</Text>
          <Text className=" text-white">Welcome back! Please enter your details.</Text>
        </View>
  
        <View className="flex flex-col gap-6">
          <View className="space-y-2">
            {/* <Text className="text-gray-700">Email</Text> */}
            <View className="relative">
              {/* <Mail style={{left:10, top:33, zIndex:10}}  className="absolute left-3 top-3 h-5 w-5 text-gray-700" /> */}
              
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
            {/* <Text className='text-gray-700'>Password</Text> */}
            <View className="relative">
              {/* <Lock style={{left:10, top:33, zIndex:10}} className="absolute left-3 top-3 h-5 w-5 text-gray-700" /> */}
              
            <TextInput
              value={password}
              placeholder="Enter password"
              className="pl-10 pr-10 h-12 rounded-xl border-gray-200 bg-gray-50"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              />
              
            </View>
          </View>
  
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-2">
            </View>
            <Link href="/" className="text-sm font-medium text-white hover:text-blue-500">
              Forgot password?
            </Link>
          </View>
  
          <Button
            onPress={onSignInPress}
            className="h-12 w-full rounded-full bg-blue-600 text-lg font-semibold hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Sign In"}
          </Button>
          
        </View>
  
        <View className="my-8 flex-row items-center gap-4">
          <View className="h-px flex-1 bg-gray-200" />
          <View >
            <Text className="text-sm text-gray-700">Or continue with
              
            </Text>
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
          <View className="text-white">
            <Text>
              Don't have an account?</Text> 
          </View>
          <Link href="/signup" className="font-semibold text-blue-500 hover:text-blue-500">
            Sign Up
          </Link>
        </View>

                 {/* <View>
                      <SignedIn>
                        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
                        <SignOutButton />
                      </SignedIn>
                      <SignedOut>
                        <Link href="/login">
                          <Text>Sign in</Text>
                        </Link>
                        <Link href="/signup">
                          <Text>Sign up</Text>
                        </Link>
                      </SignedOut>
                    </View> */}

      </View>
       </View>
      </View>
    //   </LinearGradient>
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