import React, { useState, useRef, useContext } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  Animated
} from 'react-native';
import { 
  Menu, 
  CarFront, 
  Key, 
  FileText, 
  Gamepad2, 
  Settings, 
  HelpCircle, 
  LogOut, 
  X 
} from 'lucide-react-native';
import { AuthContext } from '@/lib/authContext';
import { SignOutButton } from '@/components/SignOutButton';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import {Link} from "expo-router";

export default function LeftMenu() {
  const [visible, setVisible] = useState(false);
  const { user } = useUser();
  const slideAnim = useRef(new Animated.Value(0)).current; // 0 = closed, 1 = open
 
  const openMenu = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  // Interpolate animation values
  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0], // Slide from -300px (offscreen) to 0px
  });

  const backdropOpacity = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const authState = useContext(AuthContext);

  return (
    <View>
      {/* 1. TRIGGER BUTTON */}
      <TouchableOpacity 
        onPress={openMenu}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-transparent shadow-md"
      >
        <Menu color="white" size={24} />
      </TouchableOpacity>

      {/* 2. FULL SCREEN MODAL */}
      <Modal transparent visible={visible} onRequestClose={closeMenu} animationType="none">
        <View className="flex-1 relative">
          
          {/* BACKDROP: Absolute & Full Screen. 
              Placed BEFORE the drawer so it sits behind it. 
              The 'activeOpacity={1}' prevents the flicker effect when tapping.
          */}
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={closeMenu}
            className="absolute inset-0 h-full w-full"
          >
            <Animated.View 
              style={{ opacity: backdropOpacity }}
              className="flex-1 bg-black" 
            />
          </TouchableOpacity>

          {/* SLIDING DRAWER: Renders on top of the backdrop */}
          <Animated.View 
            style={{ transform: [{ translateX }], width:"50%", height:"100vh" }}
            className="h-full  bg-white shadow-xl"
          >
            {/* Using a View here ensures touches on the menu don't fall through to the backdrop */}
            <View className="flex-1 p-6 bg-white" onStartShouldSetResponder={() => true}>
              
              {/* Header with Close Button */}
              <View className="mb-8 flex-row items-center justify-between">
                <Text className="text-2xl font-bold text-blue-600">Carline</Text>
                <TouchableOpacity 
                  onPress={closeMenu}
                  className="rounded-full p-2 bg-gray-50 active:bg-gray-200"
                >
                  <X color="#9ca3af" size={24} />
                </TouchableOpacity>
              </View>

              {/* Menu Links */}
              <View className="flex-col gap-2">
                <MenuLink 
                  icon={<CarFront size={20} color="#2563eb" />} 
                  bg="bg-blue-100"
                  label="Buy Car"
                />
                <MenuLink 
                  icon={<Key size={20} color="#ea580c" />} 
                  bg="bg-orange-100"
                  label="Rent Car"
                />
                <MenuLink 
                  icon={<FileText size={20} color="#9333ea" />} 
                  bg="bg-purple-100"
                  label="Services"
                />
                <MenuLink 
                  icon={<Gamepad2 size={20} color="#16a34a" />} 
                  bg="bg-green-100"
                  label="Fun Zone"
                />

                <View className="my-4 h-[1px] bg-gray-100" />

                <SimpleLink icon={<Settings size={20} color="#4b5563" />} label="Settings" />
                <SimpleLink icon={<HelpCircle size={20} color="#4b5563" />} label="Help & Support" />
                
                 <View>
              <SignedIn>
                <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
                <SignOutButton />
              </SignedIn>
              <SignedOut>
                <Link href="/login">
                  <Text>Sign in</Text>
                </Link>
                <Link href="/sign-up">
                  <Text>Sign up</Text>
                </Link>
              </SignedOut>
            </View>
                <TouchableOpacity onPress={authState.logOut}  className="flex-row items-center gap-4 rounded-xl p-3 mt-2 active:bg-red-50">
                  <LogOut size={20} color="#ef4444"/>
                  <Text className="font-medium text-red-500">Log Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

// Helper Components
function MenuLink({ icon, bg, label }) {
  return (
    <TouchableOpacity className="flex-row items-center gap-4 rounded-xl p-3 active:bg-gray-100">
      <View className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
        {icon}
      </View>
      <Text className="font-medium text-gray-600">{label}</Text>
    </TouchableOpacity>
  );
}

function SimpleLink({ icon, label }) {
  return (
    <TouchableOpacity className="flex-row items-center gap-4 rounded-xl p-3 active:bg-gray-100">
      {icon}
      <Text className="font-medium text-gray-600">{label}</Text>
    </TouchableOpacity>
  );
}