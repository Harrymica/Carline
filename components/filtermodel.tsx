import { View, Text, ScrollView, Pressable, } from 'react-native';
import React from 'react';
import { X } from "lucide-react-native";
import { useState } from "react";

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
}

const filtermodel = ({ isOpen, onClose }: FilterModalProps) => {

const [priceRange, setPriceRange] = useState(50)
const [testDrive, setTestDrive] = useState(true)

  if (!isOpen) return null


  return (
    <ScrollView className="fixed inset-0 z-50 flex-row items-end w-full " contentContainerStyle={{width:"100%"}}>
      {/* Backdrop */}
      <Pressable className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onPress={onClose}></Pressable>


      {/* Modal Content */}
      <View className="relative w-full mb-6 max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl transform transition-transform duration-300 ease-out max-h-[100vh] overflow-y-auto">
        <View className="bg-[#1A1D26] p-6 pb-12 text-white">
          <View className="flex-row justify-between items-center mb-4">
            <Pressable onPress={onClose} className="text-slate-400 hover:text-white transition-colors text-sm">
              Cancel
            </Pressable>
            <Text className="text-lg font-bold">Filters</Text>
            <Pressable onPress={onClose} className="text-slate-400 hover:text-white transition-colors text-sm">
              Reset
            </Pressable>
          </View>

          {/* Active Filters Preview */}
          <View className="flex-row gap-2 overflow-x-auto pb-2 no-scrollbar">
            <View className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-medium whitespace-nowrap">
             <Text>
              Free test drive 
              </Text> 
              <X className="w-3 h-3 ml-1" />
            </View>
            <View className="flex-row items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-medium whitespace-nowrap">
              <Text>
                Toyota
              </Text>
               <X className="w-3 h-3 ml-1" />
            </View>
            <View className="flex-row items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-medium whitespace-nowrap">
              <Text>
                $23k - $80k 
              </Text>
              <X className="w-3 h-3 ml-1" />
            </View>
          </View>
        </View>

        <View className="p-6 -mt-6 bg-white rounded-t-[32px] relative">
          {/* Test Drive Toggle */}
          <View className="flex-row items-center justify-between mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-900">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
                </svg>
              </View>
              <Text className="font-bold text-[#0f172a]">Free test drive</Text>
            </View>
            <Pressable
              onPress={() => setTestDrive(!testDrive)}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                testDrive ? "bg-[#3B6CFF]" : "bg-slate-200"
              }`}
            >
              <View
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  testDrive ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </Pressable>
          </View>

          {/* Brands */}
          <View className="mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-bold text-[#0f172a]">Brand car</Text>
              <Pressable className="text-slate-400 text-xs font-medium hover:text-[#3B6CFF]">More brand</Pressable>
            </View>
            <View className="grid grid-cols-4 gap-3">
              {[
                { name: "Ferrari", icon: "/placeholder.svg?text=F" },
                { name: "Toyota", icon: "/placeholder.svg?text=T" },
                { name: "BMW", icon: "/placeholder.svg?text=B" },
                { name: "Tesla", icon: "/placeholder.svg?text=T" },
              ].map((brand, i) => (
                <Pressable
                  key={brand.name}
                  className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-colors ${
                    i === 1 ? "bg-[#1A1D26]" : "bg-white border border-slate-100 hover:border-slate-300"
                  }`}
                >
                  <View
                    className={`w-10 h-10 rounded-full flex-row items-center justify-center ${
                      i === 1 ? "bg-white/10 text-white" : "bg-slate-50"
                    }`}
                  >
                    <img src={brand.icon || "/placeholder.svg"} alt={brand.name} className="w-6 h-6 rounded-full" />
                  </View>
                  <Text className={`text-[10px] font-bold ${i === 1 ? "text-white" : "text-slate-900"}`}>
                    {brand.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Price Range */}
          <View className="mb-8">
            <Text className="font-bold text-[#0f172a] mb-4">Price range</Text>
            {/* Histogram */}
            <View className="flex-row items-end gap-1 h-12 mb-2 px-2">
              {[30, 50, 40, 70, 50, 80, 60, 90, 50].map((h, i) => (
                <View key={i} className="flex-1 bg-[#3B6CFF]/20 rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
            </View>
            {/* <input
              type="range"
              min="0"
              max="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number.parseInt(e.target.value))}
              className="w-full accent-[#3B6CFF] h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            /> */}
            <View className="flex-row justify-between mt-4">
              <View className="px-4 py-2 rounded-xl border border-slate-100 font-bold text-[#0f172a]">
               <Text>
                $23,000
                </Text> 
                </View>
              <Text className="text-slate-300 self-center">—</Text>
              <View className="px-4 py-2 rounded-xl border border-slate-100 font-bold text-[#0f172a]">
                
                <Text>$80,000</Text>
                </View>
            </View>
          </View>

          {/* Features */}
          <View className="mb-8">
            <View className="flex-row justify-between items-center mb-4 ">
              <Text className="font-bold text-[#0f172a]">Features</Text>
              <Pressable className="text-slate-400 text-xs font-medium hover:text-[#3B6CFF]">More feature</Pressable>
            </View>
            <View className="flex-row gap-2 overflow-x-auto pb-2 no-scrollbar">
              {["Navigation", "Climate Control", "Air Condition"].map((feat) => (
                <Pressable
                  key={feat}
                  className="px-4 py-2 rounded-xl border border-slate-100 text-xs font-bold text-slate-600 whitespace-nowrap hover:border-[#3B6CFF] hover:text-[#3B6CFF] transition-colors"
                >
                  {feat}
                </Pressable>
              ))}
            </View>
          </View>

          <Pressable className="w-full bg-[#3B6CFF] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-transform">
            Apply Filter
          </Pressable>
        </View>
      </View>

      
    </ScrollView>
  )
}

export default filtermodel