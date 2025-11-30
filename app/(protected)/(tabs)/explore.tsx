import { View, Text, ScrollView, Pressable, TextInput,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Search, Bell, SlidersHorizontal, Heart } from "lucide-react-native"
import {Image} from "expo-image"
import { Button } from '@react-navigation/elements'
import Filtermodel from '@/components/filtermodel'



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
  {
    id: 5,
    name: "Tesla Model 3",
    price: "$ 52,000",
    rating: 4.4,
    image: require("@/assets/tesla-model-3-white.jpg"),
  },
  {
    id: 6,
    name: "Tesla Model X",
    price: "$ 32,000",
    rating: 4.2,
    image: require("@/assets/tesla-model-x-black.jpg"),
  },
  {
    id: 7,
    name: "Tesla Model Y",
    price: "$ 45,000",
    rating: 4.5,
    image: require("@/assets/tesla-model-y-grey.jpg"),
  },
  {
    id: 8,
    name: "Tesla Model S",
    price: "$ 80,000",
    rating: 4.8,
    image: require("@/assets/tesla-model-s-red.jpg"),
  },
   {
    id: 9,
    name: "Tesla Model 3",
    price: "$ 52,000",
    rating: 4.4,
    image: require("@/assets/tesla-model-3-white.jpg"),
  },
  {
    id: 10,
    name: "Tesla Model X",
    price: "$ 32,000",
    rating: 4.2,
    image: require("@/assets/tesla-model-x-black.jpg"),
  },
  {
    id: 11,
    name: "Tesla Model Y",
    price: "$ 45,000",
    rating: 4.5,
    image: require("@/assets/tesla-model-y-grey.jpg"),
  },
  {
    id: 12,
    name: "Tesla Model S",
    price: "$ 80,000",
    rating: 4.8,
    image: require("@/assets/tesla-model-s-red.jpg"),
  },
  
]
const explore = () => {

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    // stickyHeaderIndices={[0]}
      <View  className="min-h-screen bg-blue-900 dark:bg-background-dark pb-24">
        
        <View className='bg-blue-900 dark:bg-background-dark z-auto '>

       
              {/* Header */}
              <View className="px-6 pt-12 pb-6 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <Image source="/user-avatar.jpg" alt="Profile" className="rounded-full" /> 
                  {/* style={{width={48} height={48}}} */}
                  <View>
                    <Text className="text-xs text-slate-700 dark:text-slate-200">Welcome 👋</Text>
                    <Text className="font-bold text-lg text-slate-700 dark:text-slate-200">Mahendra Singh</Text>
                  </View>
                </View>
                <Pressable className="p-2 rounded-full shadow-sm">
                  <Bell className="h-6 w-6" color="white" fill="white" />
                </Pressable>
              </View>
        
              {/* Search */}
              <View className="px-6 mb-8 w-full">
                <View className="flex-row gap-3">
                  <View className="flex-row bg-white rounded-full px-4 py-3 flex items-center gap-3 shadow-sm">
                    <Search className="h-5 w-5 text-gray-400" />
                    <TextInput
                      keyboardType='default'
                      placeholder="Search Your Car"
                      className="flex-row bg-transparent h-5 w-60 outline-none text-gray-800"
                    />
                  </View>
                  <Pressable onPress={() => setIsFilterOpen(true)} className=" text-white bg-gray-200 dark:bg-white p-3 rounded-full aspect-square flex-row items-center justify-center">
                    <SlidersHorizontal className="h-5 w-5 text-white" />
                  </Pressable>
                </View>
              </View>
              
              {/* Brands */}
              <View className="px-6 mb-8">
                <View className="flex-row justify-between gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {brands.map((brand, index) => (
                    <View key={index} className="flex flex-col items-center gap-2 min-w-[70px]">
                      <View className="bg-black dark:bg-white rounded-full p-4 h-16 w-16 flex-row items-center justify-center">
                        <Image
                          source={brand.icon || "/placeholder.svg"}
                          alt={brand.name}
                          style={[StyleSheet.absoluteFill, styles.brands]} contentFit="cover"
                          className="invert h-64 w-64" 
                        />
                      </View>
                      <Text className="text-xs font-medium text-slate-700 dark:text-slate-200">{brand.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
        </View>

        {/* Popular Cars  stickyHeaderIndices={[0]}*/}
        <ScrollView    className="bg-white rounded-t-[40px] px-6 pt-8 pb-6 min-h-[500px]" >
          <View className="flex-row items-center justify-between mb-6 bg-white">
            <Text className="font-bold text-lg z-10">Popular Car</Text>
            <Button  className="text-slate-700 dark:text-slate-200 text-sm">View All</Button>
          </View>
           <View style={{marginBottom:60}}>
            
              <View className="flex flex-row flex-wrap justify-between gap-y-4">
                {popularCars.map((car) => (
                
                  <View key={car.id} className="bg-gray-50 p-3 rounded-3xl relative w-[48%]">
                    <Pressable className="absolute top-5 right-5 z-10">
                      <Heart className="h-5 w-5" fill="white" color="white"/>
                    </Pressable>
                    
                  
                    <View className="mb-2 flex-row justify-center h-28 rounded-2xl overflow-hidden">
                      <Image
                        style={StyleSheet.absoluteFill} 
                        contentFit="cover"
                        source={car.image || "/placeholder.svg"}
                        alt={car.name}
                      
                        className="object-cover transition-transform duration-300" 
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
  
        <View>
          
        <Filtermodel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
        </View>
        
      </View>
    )
}

export default explore

const styles =  StyleSheet.create({

  brands:{
    borderRadius:50
  }
});