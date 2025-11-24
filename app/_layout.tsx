import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/lib/authContext';
 import { tokenCache } from '@clerk/clerk-expo/token-cache';
import * as SecureStore from 'expo-secure-store';
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { Platform } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


// const tokenCache = {
//   async getToken(key: string) {
//     try {
//       return AsyncStorage.getItem(key);
//     } catch (error) {
//       return null;
//     }
//   },
//   async saveToken(key: string, value: string) {
//     try {
//       return AsyncStorage.setItem(key, value);
//     } catch (err) {
//       return;
//     }
//   },
// };

 /*const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log('No values stored under key: ' + key);
      }
      return item;
    } catch (error) {
      console.error('SecureStore get item error: ', error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};*/

/*const tokenCache = {
  async getToken(key: string) {
    try {
      // 2. If on Web, return null. Clerk handles web caching via Cookies automatically.
      if (Platform.OS === 'web') {
        return null;
      }
      
      // 3. If on Mobile, use the encrypted SecureStore
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      if (Platform.OS === 'web') {
        return;
      }
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};*/


const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (

     <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
   <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(protected)" 
            options={{ headerShown: false,
              animation: "none"
            }} />
              <Stack.Screen
            name='onboard'
            options={{
              animation:"none",
              headerShown: false,
            }}/>
            <Stack.Screen
            name='login'
            options={{
              animation:"none",
              headerShown: false,
            }}/>
            <Stack.Screen
            name='signup'
            options={{
              animation:"none",
              headerShown: false,
            }}/>
            {/* <Stack.Screen name="+not-found" /> */}
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      
     </ConvexProviderWithClerk>
     </ClerkProvider>


  );
}
