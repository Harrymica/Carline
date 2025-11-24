import { View, Text, ScrollView, Pressable, TextInput } from 'react-native'
import React from 'react'
import { Search, Bell, SlidersHorizontal, Heart } from "lucide-react-native"
import {Image} from "expo-image"



const brands = [
  { name: "Tesla", icon: require("@/assets/tesla-logo.jpg") },
  { name: "BMW", icon: require("@/assets/bmw-logo.jpg") },
  { name: "Mazda", icon: require("@/assets/mazda-logo.jpg") },
  { name: "Rolls Royce", icon: require("@/assets/rolls-royce-logo.jpg") },
]

const popularCars = [
  {
    id: 1,
    name: "Tesla Model 3",
    price: "$ 52,000",
    rating: 4.4,
    image: require("@/assets/tesla-model-3-white.jpg"),
  },
  {
    id: 2,
    name: "Tesla Model X",
    price: "$ 32,000",
    rating: 4.2,
    image: require("@/assets/tesla-model-x-black.jpg"),
  },
  {
    id: 3,
    name: "Tesla Model Y",
    price: "$ 45,000",
    rating: 4.5,
    image: require("@/assets/tesla-model-y-grey.jpg"),
  },
  {
    id: 4,
    name: "Tesla Model S",
    price: "$ 80,000",
    rating: 4.8,
    image: require("@/assets/tesla-model-s-red.jpg"),
  },
]
const explore = () => {
  return (
      <ScrollView className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <View className="px-6 pt-12 pb-6 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Image source="/user-avatar.jpg" alt="Profile"  className="rounded-full" /> 
            {/* style={{width={48} height={48}}} */}
            <View>
              <Text className="text-xs text-gray-500">Welcome 👋</Text>
              <Text className="font-bold text-lg">Mahendra Singh</Text>
            </View>
          </View>
          <Pressable className="bg-white p-2 rounded-full shadow-sm">
            <Bell className="h-6 w-6 text-gray-700" />
          </Pressable>
        </View>
  
        {/* Search */}
        <View className="px-6 mb-8">
          <View className="flex-row gap-3">
            <View className="flex-row bg-white rounded-full px-4 py-3 flex items-center gap-3 shadow-sm">
              <Search className="h-5 w-5 text-gray-400" />
              <TextInput
                keyboardType='default'
                placeholder="Search Your Car"
                className="flex-row bg-transparent outline-none text-gray-800"
              />
            </View>
            <Pressable className="bg-black text-white p-3 rounded-full aspect-square flex-row items-center justify-center">
              <SlidersHorizontal className="h-5 w-5" />
            </Pressable>
          </View>
        </View>
  
        {/* Brands */}
        <View className="px-6 mb-8">
          <View className="flex-row justify-between gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {brands.map((brand, index) => (
              <View key={index} className="flex flex-col items-center gap-2 min-w-[70px]">
                <View className="bg-black rounded-full p-4 h-16 w-16 flex-row items-center justify-center">
                  <Image
                    source={brand.icon || "/placeholder.svg"}
                    alt={brand.name}
                    
                    
                    className="invert h-64 w-64"
                  />
                </View>
                <Text className="text-xs font-medium text-gray-600">{brand.name}</Text>
              </View>
            ))}
          </View>
        </View>
  
        {/* Popular Cars */}
        <View className="bg-white rounded-t-[40px] px-6 pt-8 pb-6 min-h-[500px]">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="font-bold text-lg">Popular Car</Text>
            <Pressable className="text-gray-400 text-sm">View All</Pressable>
          </View>
  
          <View className="grid grid-cols-2 gap-4">
            {popularCars.map((car) => (
              <View key={car.id} className="bg-gray-50 p-3 rounded-3xl relative">
                <Pressable className="absolute top-3 left-3 z-10">
                  <Heart className="h-5 w-5 text-black fill-black" />
                </Pressable>
                <View className="mb-2 flex-row justify-center">
                  <Image
                    source={car.image || "/placeholder.svg"}
                    alt={car.name}
                    
                    className="object-contain "
                  />
                </View>
                <Text className="font-bold text-sm mb-1">{car.name}</Text>
                <View className="flex-row items-center justify-between">
                  <Text className="font-bold text-sm">{car.price}</Text>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-yellow-400 text-xs">★</Text>
                    <Text className="text-xs font-medium">{car.rating}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
  
        
      </ScrollView>
    )
}

export default explore