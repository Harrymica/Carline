import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Moon, Sun } from 'lucide-react-native';

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <TouchableOpacity 
      onPress={toggleColorScheme}
      className="flex-row items-center justify-between rounded-xl p-3 bg-gray-100 dark:bg-slate-800 active:opacity-80"
    >
      <View className="flex-row items-center gap-3">
        {/* Icon changes based on theme */}
        {colorScheme === 'dark' ? (
          <Moon size={20} color="#818cf8" /> // Light Indigo
        ) : (
          <Sun size={20} color="#4F46E5" />  // Electric Indigo
        )}
        
        <Text className="font-medium text-slate-700 dark:text-slate-200">
          {colorScheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </Text>
      </View>

      <Switch
        value={colorScheme === 'dark'}
        onValueChange={toggleColorScheme}
        trackColor={{ false: '#cbd5e1', true: '#4F46E5' }}
        thumbColor={'#ffffff'}
      />
    </TouchableOpacity>
  );
}