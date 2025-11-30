import React, { useState, useRef, useContext } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  Animated,
  Dimensions,
  Platform
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
import ThemeToggle from './ThemeToggle';
import { SignOutButton } from '@/components/SignOutButton';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { useRouter } from "expo-router";
import { useClerk } from '@clerk/clerk-expo';

// 1. CONSTANT WIDTH: Ensures animation and design match perfectly
const DRAWER_WIDTH = 300;

export default function LeftMenu() {
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current; 
//  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to your desired page
      router.replace('/')
    } catch (err) {
    
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const openMenu = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true, // Native driver is smoother for transforms
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    // 2. MATCH OFFSET: Slide from exactly -300 to 0
    outputRange: [-DRAWER_WIDTH, 0], 
  });

  const backdropOpacity = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const authState = useContext(AuthContext);
  const navigate = (url) => {
      router.push(url);

  }
  return (
    <View>
      {/* TRIGGER BUTTON */}
      <TouchableOpacity 
        onPress={openMenu}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-transparent shadow-md"
      >
        <Menu color="white" size={24} />
      </TouchableOpacity>

      {/* FULL SCREEN MODAL */}
      <Modal 
        transparent 
        visible={visible} 
        onRequestClose={closeMenu} 
        animationType="none"
        // Ensure the modal covers the status bar on Android
        statusBarTranslucent={true}
      >
        <View className="flex-1 relative z-50">
          
          {/* BACKDROP */}
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

          {/* SLIDING DRAWER */}
          <Animated.View 
            style={{ 
              transform: [{ translateX }], 
              width: DRAWER_WIDTH, // Fixed width
              height: '100%'       // '100%' works on Mobile & Web (unlike 100vh)
            }}
            className="absolute left-0 top-0 bottom-0 bg-white shadow-xl"
          >
            {/* 3. LAYOUT FIX: 
                'flex-col justify-between' pushes the top group up 
                and the bottom group down.
            */}
            <View 
              className="flex-1 p-6 flex-col justify-between bg-background-light dark:bg-background-dark"
              onStartShouldSetResponder={() => true}
            >
              
              {/* === TOP GROUP (Header + Links) === */}
              <View>
                {/* Header */}
                <View className="mb-8 flex-row items-center justify-between p-4 ">
                  <Text className="text-2xl font-bold text-slate-700 dark:text-slate-200">Carline</Text>
                  <TouchableOpacity 
                    onPress={closeMenu}
                    className="rounded-full p-2 bg-gray-50 active:bg-gray-200"
                  >
                    <X color="#9ca3af" size={24} />
                  </TouchableOpacity>
                </View>

                {/* Main Menu Links */}
                <View className="flex-col gap-4 p-4 ">
                  <MenuLink onPress={() => navigate("/car/1")} icon={<CarFront size={20} color="#2563eb" />} bg="bg-blue-100" label="Buy Car" />
                  <MenuLink onPress={() => navigate("/login")} icon={<Key size={20} color="#ea580c" />} bg="bg-orange-100" label="Rent Car" />
                  <MenuLink onPress={() => navigate("/services/servicepage")} icon={<FileText size={20} color="#9333ea" />} bg="bg-purple-100" label="Services" />
                  <MenuLink icon={<Gamepad2 size={20} color="#16a34a" />} bg="bg-green-100" label="Fun Zone" />
                  <ThemeToggle />
                  <View className="my-4 h-[1px] bg-gray-100" />

                  <SimpleLink icon={<Settings size={20} color="#4b5563" />} label="Settings" />
                  <SimpleLink icon={<HelpCircle size={20} color="#4b5563" />} label="Help & Support" />
                </View>
              </View>

              {/* === BOTTOM GROUP (Logout) === */}
              <View>
                 {/* This stays at the bottom because of justify-between */}
                <TouchableOpacity 
                  onPress={handleSignOut} 
                  className="flex-row items-center gap-4 rounded-xl p-3 active:bg-red-50"
                >
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
function MenuLink({ icon, bg, label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center gap-4 rounded-xl p-3 active:bg-gray-100">
      <View className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
        {icon}
      </View>
      <Text className="font-medium text-slate-700 dark:text-slate-200">{label}</Text>
    </TouchableOpacity>
  );
}

function SimpleLink({ icon, label }) {
  return (
    <TouchableOpacity className="flex-row items-center gap-4 rounded-xl p-3  active:bg-gray-100">
      {icon}
      <Text className="font-medium text-slate-700 dark:text-slate-200">{label}</Text>
    </TouchableOpacity>
  );
}