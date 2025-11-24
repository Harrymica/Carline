// import { createClient } from "@/lib/supabase/server"
import type { Car } from "@/lib/types"
import { CarCard } from "@/lib/car-card"
// import  TextInput  from "@/components/ui/TextInput"
import  Button  from "@/components/ui/button"
import {
  Search,
  MapPin,
  Bell,
  SlidersHorizontal,
  CarFront,
  Key,
  FileText,
  Gamepad2,
  Menu,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react-native"
import {Image} from "expo-image"
import {Link} from "expo-router"
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { View, Text, TextInput, ScrollView} from "react-native"
// import leftMenu from '@/components/leftMenUI';
import LeftMenu from "@/components/leftMenUI";
import { useState } from "react"
import Filtermodel from "@/components/filtermodel"
async function getCars() {
//   const supabase = await createClient()
//   const { data: cars } = await supabase.from("cars").select("*").limit(5)
//   return (cars as Car[]) || []
}


async function getProfile() {
//   const supabase = await createClient()
//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   if (!user) return null

//   const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()

//   return profile
}

export default  function HomePage() {
  //const cars = await getCars()
  //const profile = await getProfile()
   const [isFilterOpen, setIsFilterOpen] = useState(false)

  const brands = [
    { name: "BMW", logo: "/placeholder.svg?text=BMW" },
    { name: "Toyota", logo: "/placeholder.svg?text=Toyota" },
    { name: "Mercedes", logo: "/placeholder.svg?text=Mercedes" },
    { name: "Tesla", logo: "/placeholder.svg?text=Tesla" },
    { name: "Audi", logo: "/placeholder.svg?text=Audi" },
  ]

  return (
    <ScrollView className="flex flex-col gap-6 min-h-screen mb-5">
      {/* Header Section */}
      <View className="relative rounded-b-[2.5rem] bg-gradient-to-r from-gray-900 to-gray-800 px-6 pb-8 pt-12 text-white">
        <View className="mb-6 flex-row items-center justify-between z-40">
          <View className="flex-row items-center gap-4 z-auto">
           <LeftMenu />

            <View>
              <View className="flex-row items-center gap-2 text-blue-100">
                <MapPin className="h-4 w-4" />
                <Text className="text-sm text-white">New York, USA</Text>
                <Text className="text-xs text-white">▼</Text>
              </View>
              <Text className="mt-1 text-white text-xl font-bold">Hi, Daniel 👋</Text>
            </View>
          </View>
          <View className="relative">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-transparent text-white hover:bg-white/20 hover:text-white"
            >
              <Bell className="h-5 w-5 text-white" />
              <Text className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-blue-600" />
            </Button>
          </View>
        </View>

        <View className="flex-row gap-3">
          <View className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <TextInput
              placeholder="Search cars..."
              className="h-11 rounded-xl border-0 bg-white pl-10 text-gray-900 "
            />
          </View>
          <Button size="icon" className="h-11 w-11 rounded-xl bg-white text-blue-600 hover:bg-blue-50"onPress={() => setIsFilterOpen(true)}>
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </View>
      </View>

      {/* Quick Access Buttons */}
      <View className="grid grid-cols-4 gap-4 px-6">
        <Link href="/sales" className="flex flex-col items-center gap-2">
          <View className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100">
            <CarFront className="h-6 w-6" />
          </View>
          <Text className="text-xs font-medium text-gray-600">Buy Car</Text>
        </Link>
        <Link href="/rentals" className="flex flex-col items-center gap-2">
          <View className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition-colors hover:bg-orange-100">
            <Key className="h-6 w-6" />
          </View>
          <Text className="text-xs font-medium text-gray-600">Rent</Text>
        </Link>
        <Link href="/services" className="flex flex-col items-center gap-2">
          <View className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 transition-colors hover:bg-purple-100">
            <FileText className="h-6 w-6" />
          </View>
          <Text className="text-xs font-medium text-gray-600">Renew</Text>
        </Link>
        <Link href="/fun-zone" className="flex flex-col items-center gap-2">
          <View className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 transition-colors hover:bg-green-100">
            <Gamepad2 className="h-6 w-6" />
          </View>
          <Text className="text-xs font-medium text-gray-600">Play</Text>
        </Link>
      </View>

      {/* Recent Activity / Promo Banner */}
      <View className="px-6">
        <View className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
          <View className="relative z-10 max-w-[60%]">
            <h3 className="mb-1 text-lg font-bold">Summer Sale</h3>
            <p className="mb-4 text-sm text-gray-300">Get 20% off on all luxury car rentals this week.</p>
            <Button size="sm" className="rounded-full bg-white text-gray-900 hover:bg-gray-100">
              Book Now
            </Button>
          </View>
          <View className="absolute -bottom-4 -right-4 h-32 w-48 opacity-50">
            {/* Decorative circle or image could go here */}
            <View className="h-full w-full rounded-full bg-blue-500 blur-3xl" />
          </View>
        </View>
      </View>

      {/* Brands Section */}
      <View className="px-6">
        <View className="mb-4 flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Brands</h2>
          <Link href="/brands" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            See All
          </Link>
        </View>
        <View className="flex-row gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {brands.map((brand) => (
            <View key={brand.name} className="flex flex-col items-center gap-2">
              <View className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 shadow-sm ring-1 ring-gray-100">
                <View className="relative h-8 w-8">
                  <Image source={brand.logo || "/placeholder.svg"} alt={brand.name} fill className="object-contain" />
                </View>
              </View>
              <Text className="text-xs font-medium text-gray-600">{brand.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Popular Cars Section */}
      <View className="px-6 mb-6">
        <View className="mb-4 flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Popular Car</h2>
          <Link href="/cars" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            See All
          </Link>
        </View>
        {/* <View className="flex flex-col gap-4">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </View> */}
      </View>
      <Filtermodel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </ScrollView>
  )
}
