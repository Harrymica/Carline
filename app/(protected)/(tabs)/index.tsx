import type { Car } from "@/lib/types"
import { CarCard } from "@/lib/car-card"
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
  CarIcon,
  Plug,
  LinkIcon,

} from "lucide-react-native"
import {Image} from "expo-image"
import {Link} from "expo-router";
import { View, Text, TextInput, ScrollView, StyleSheet, ImageBackground} from "react-native";
import LeftMenu from "@/components/leftMenUI";
import { useState } from "react"
import Filtermodel from "@/components/filtermodel"
// import { LinearGradient } from "expo-linear-gradient";

const DUMMY_CARS: Car[] = [
  {
    id: "car_1",
    brand: "BMW",
    model: "M3 Competition",
    year: 2023,
    price_per_day: 150,
    price_sale: 85000,
    condition: 'new',
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 5,
    mileage: 1500,
    // Use the require format for local images as requested
    image_url: require("@/assets/tesla-model-3-white-side-2.jpg"), 
    images: [require("@/assets/tesla-model-3-white-side-2.jpg")],
    description: "The ultimate driving machine with track-ready performance.",
    is_available: true,
    location: "New York, USA",
    rating: 4.8,
    features: ["Navigation", "A/C", "Sport Seats"],
    created_at: new Date().toISOString(),
  },
  {
    id: "car_2",
    brand: "Toyota",
    model: "Camry SE",
    year: 2020,
    price_per_day: 55,
    price_sale: 25000,
    condition: 'used',
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 5,
    mileage: 45000,
    image_url: require("@/assets/blue-luxury-car-front-view.jpg"), 
    images: [require("@/assets/blue-luxury-car-front-view.jpg")],
    description: "Reliable and comfortable sedan, perfect for daily commutes.",
    is_available: true,
    location: "California, USA",
    rating: 4.5,
    features: ["Backup Camera", "Bluetooth"],
    created_at: new Date().toISOString(),
  },
  {
    id: "car_3",
    brand: "Tesla",
    model: "Model 3 Long Range",
    year: 2024,
    price_per_day: 120,
    price_sale: 48000,
    condition: 'new',
    transmission: 'automatic',
    fuel_type: 'electric',
    seats: 5,
    mileage: 500,
    image_url: require("@/assets/tesla-model-3-white-side.jpg"),  //require("@/assets/tesla-model-3-white-side.jpg"),
    images: [require("@/assets/tesla-model-3-white-side.jpg")],
    description: "All-electric performance with cutting-edge technology.",
    is_available: false,
    location: "Texas, USA",
    rating: 4.9,
    features: ["Autopilot", "Heated Seats"],
    created_at: new Date().toISOString(),
  },
]




export default function HomePage() {
 
  const cars = DUMMY_CARS; 
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const brands = [
    { name: "BMW", logo: "/placeholder.svg?text=BMW" },
    { name: "Toyota", logo: "/placeholder.svg?text=Toyota" },
    { name: "Mercedes", logo: "/placeholder.svg?text=Mercedes" },
    { name: "Tesla", logo: "/placeholder.svg?text=Tesla" },
    { name: "Audi", logo: "/placeholder.svg?text=Audi" },
     { name: "Jaguar", logo: "/placeholder.svg?text=Audi" },
      { name: "Chevrolen", logo: "/placeholder.svg?text=Audi" },
  ]

  return (
    <ScrollView className="flex flex-col gap-6 min-h-screen  bg-background dark:bg-background-dark" 
     stickyHeaderIndices={[0, 5]}>
     
    
      {/* Header Section */}
      <View style={{ height:100}} className="relative  px-6 pb-8 pt-12  bg-blue-900 dark:bg-background-dark text-slate-700 dark:text-slate-200">
        <View className="mb-3 flex-row items-center justify-between z-40">
          <View className="flex-row items-center gap-4 z-auto">
           <LeftMenu />

            <View>
              {/* <View className="flex-row items-center gap-2 text-slate-700 dark:text-slate-200 ">
                <MapPin className="h-4 w-4" style={styles.icons}/>
                <Text className="text-sm text-white">New York, USA</Text>
                <Text className="text-xs text-white">▼</Text>
              </View> */}
              <Text className="mt-1 text-white text-xl font-bold">Hi, Daniel 👋</Text>
            </View>
          </View>
          <View className="relative">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              
              >
              <Bell className="h-5 w-5" fill="white" color="white"/>
              <Text className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-blue-600" />
            </Button>
          </View>
        </View>

        <View className="flex-row gap-4 top-0 px-5">
          {/* <View className="relative flex-1 ">
            <Search className="absolute left-0 top-3 h-5 w-5 text-slate-700 dark:text-slate-200"  style={{left:10, top:30, zIndex:30}}/>
            <TextInput
              placeholder="Search cars..."
              className="h-11 rounded-xl border-0 bg-white pl-10 text-gray-900 "
            />
          </View>
          <Button size="icon" className="h-11 w-11 top-7 rounded-xl bg-white text-blue-60"onPress={() => setIsFilterOpen(true)}>
            <SlidersHorizontal className="h-5 w-5"/>
          </Button> */}
        </View>

        
      </View>

      <ImageBackground source={require("@/assets/bag_im/maintenance.jpeg")} className="relative mb-4 h-60 overflow-hidden rounded-2xl  p-8 bg-black dark:bg-gray-950 text-slate-700 dark:text-slate-200">
                  {/* <View className="relative z-10 max-w-[60%]">
                    <Text className="mb-1 text-slate-300 dark:text-slate-200 text-lg font-bold">Summer Sale</Text>
                    <Text className="mb-4 text-sm text-gray-300">Get 20% off on all luxury car rentals this week.</Text>
                    <Button size="sm" className="rounded-full text-slate-700 dark:text-slate-500">
                      Book Now
                    </Button>
                  </View>
                  <View className="absolute -bottom-4 -right-4 h-32 w-48 opacity-50">
                  
                    <View className="h-full w-full rounded-full bg-blue-500 blur-3xl" />
                  </View> */}
          </ImageBackground>
        
      {/* Quick Access Buttons */}
     <View className=" mt-4 text-slate-700 dark:text-slate-200" style={styles.quickAccessContainer}>
      
      {/* 1. Buy Car Link */}
      <View href="/sales" style={styles.quickAccessLink}>
        <View style={styles.linkContent}>
          <View style={[styles.iconWrapper, styles.blueBg]}>
            <CarFront size={24} color="#2563EB" /> {/* text-blue-600 */}
          </View>
          <Text className="text-slate-700 dark:text-slate-200" style={styles.linkText}>Buy Car</Text>
        </View>
      </View>
      
      {/* 2. Rent Link */}
      <Link href="/rentals" style={styles.quickAccessLink}>
        <View style={styles.linkContent}>
          <View style={[styles.iconWrapper, styles.orangeBg]}>
            <Key size={24} color="#EA580C" /> {/* text-orange-600 */}
          </View>
          <Text className="text-slate-700 dark:text-slate-200" style={styles.linkText}>Rent</Text>
        </View>
      </Link>
      
      {/* 3. Renew Link */}
      <Link href="/services" style={styles.quickAccessLink}>
        <View style={styles.linkContent}>
          <View style={[styles.iconWrapper, styles.purpleBg]}>
            <FileText size={24} color="#9333EA" /> {/* text-purple-600 */}
          </View>
          <Text className="text-slate-700 dark:text-slate-200" style={styles.linkText}>Renew</Text>
        </View>
      </Link>
      
      {/* 4. Play Link */}
      <Link href="/(protected)/(tabs)/fun_zone" style={styles.quickAccessLink}>
        <View style={styles.linkContent}>
          <View style={[styles.iconWrapper, styles.greenBg]}>
            <Gamepad2 size={24} color="#22C55E" /> {/* text-green-600 */}
          </View>
          <Text className="text-slate-700 dark:text-slate-200" style={styles.linkText}>Play</Text>
        </View>
      </Link>
      
    </View>

      {/* Recent Activity / Promo Banner */}
      <View className="px-6 pt-6 mb-40  text-slate-700 dark:text-slate-200">

        
        <View  className="flex-row gap-4  h-28 mb-8 justify-between ">

            <View className="relative w-40 flex-row overflow-hidden rounded-2xl  p-2 bg-blue-200 dark:bg-blue-200 text-slate-700 dark:text-slate-200">
                  <View className="relative z-10 max-w-[60%]">
                    <Text className="mb-1 text-black dark:text-slate-700 text-md font-bold">Rent</Text>
                    
                  </View>
                  <View className=" -bottom-10 -right-1 h-20 w-40 ">
                    <Image source={require("@/assets/bag_im/rent.png")} style={StyleSheet.absoluteFill} contentFit="cover"/>
                  
                  </View>
                </View>
                <View className="relative w-40 flex-row overflow-hidden rounded-2xl  p-2 bg-gray-200 dark:bg-gray-200 text-slate-700 dark:text-slate-200">
                  <View className="relative z-10 max-w-[60%]">
                    <Text className="mb-1 text-black dark:text-slate-700 text-md font-bold">Buy Car</Text>
                    
                  </View>
                  <View className=" -bottom-10 -right-1 h-20 w-20 ">
                    <Image source={require("@/assets/bag_im/benz.png")} style={StyleSheet.absoluteFill} contentFit="contain"/>
                  
                  </View>
                </View>
                
                
        </View>

        

          <View>
            <Text className="text-3xl font-bold text-slate-700 dark:text-slate-200 mb-4">
            <LinkIcon color="white"  size={19}/>
              Integrations
            </Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <View  className="flex-row gap-4">

                <ImageBackground source={require("@/assets/bag_im/map (1).jpeg")} className="relative w-80 overflow-hidden rounded-2xl  p-6 bg-black dark:bg-gray-950 text-slate-700 dark:text-slate-200">
                   <View className="relative z-10 max-w-[60%]">
                    <Text className="mb-1 text-black dark:text-black text-lg font-bold">Map</Text>
                    <Text className="mb-4 text-sm text-black">find location</Text>
                    <Button size="sm" className="rounded-full text-slate-700 dark:text-slate-500">
                      Find
                    </Button>
                  </View>
                  <View className="absolute -bottom-4 -right-4 h-32 w-48 opacity-50">
                  {/* <Text> Decorative circle or image could go here</Text> */}
                    <View className="h-full w-full rounded-full bg-blue-500 blur-3xl" />
                  </View>
                </ImageBackground>
                <ImageBackground source={require("@/assets/bag_im/schedule.jpg")} className="relative w-80 overflow-hidden rounded-2xl bg-blue-500 dark:bg-gray-950 p-6 text-slate-700 dark:text-slate-200">
                  <View className="relative z-10 max-w-[60%]">
                    <Text className="mb-1 text-black dark:text-black text-lg font-bold">Schedule events</Text>
                    <Text className="mb-4 text-sm text-black">Schedule Activities</Text>
                    <Button size="sm" className="rounded-full text-slate-700 dark:text-slate-500">
                      Book Now
                    </Button>
                  </View>
                  <View  className="absolute -bottom-4 -right-4 h-32 w-48 opacity-50">
                  {/* <Text> Decorative circle or image could go here</Text> */}
                    <View className="h-full w-full rounded-full bg-blue-500 blur-3xl" />
                  </View>
                </ImageBackground>
            </View>




          </ScrollView>



          <View>
            <Text className="text-3xl font-bold text-slate-700 dark:text-slate-200 mt-4 mb-4">
              <Plug color="white"  size={19}/>
              Services
              </Text>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <View  className="flex-row gap-4 mt-4">

                <View className="flex-col ">
                <ImageBackground source={require("@/assets/bag_im/maintenance.jpeg")} className="relative flex w-64 h-40 overflow-hidden rounded-2xl  p-2 bg-black dark:bg-gray-950 text-slate-700 dark:text-slate-200">
                </ImageBackground>
                  <Text className="text-slate-700 dark:text-slate-200 p-2 text-xl">Maintenance</Text>
                  <Text className="text-slate-700 dark:text-slate-200 p-2 text-md">
                    Immediate arrival to the rescue
                  </Text>

                </View>

                <View className="flex-col ">
                <ImageBackground source={require("@/assets/bag_im/emergency (3).jpeg")} className="relative w-64 h-40   overflow-hidden rounded-2xl bg-blue-500 dark:bg-gray-950 p-2 text-slate-700 dark:text-slate-200">
                  
                </ImageBackground>
                  <Text className="text-slate-700 dark:text-slate-200 p-2 text-xl">Emergency</Text>
                  <Text className="text-slate-700 dark:text-slate-200 p-2 text-md">
                    Immediate arrival to the rescue
                  </Text>
                </View>
                <View className="flex-col ">
                <ImageBackground source={require("@/assets/bag_im/rentals (2).jpeg")} className="relative w-64 h-40 overflow-hidden rounded-2xl bg-yellow-500 dark:bg-gray-950 p-2 text-slate-700 dark:text-slate-200">
                  
                </ImageBackground>
                  <Text className="text-slate-700 dark:text-slate-200 p-2 text-xl">Rent Car</Text>
                  <Text className="text-slate-700 dark:text-slate-200 p-2 text-md">
                    Rent on short time or long term
                  </Text>
                </View>
                <View className="flex-col ">
                <ImageBackground source={require("@/assets/bag_im/filling station (1).jpeg")} className="relative w-64 h-40 overflow-hidden rounded-2xl bg-white-500 dark:bg-gray-950 p-2 text-slate-700 dark:text-slate-200">
                  
                </ImageBackground>
                  <Text className="text-slate-700 dark:text-slate-200 p-2 text-xl">Filling Stations</Text>
                  <Text className="text-slate-700 dark:text-slate-200 p-2 text-md">
                    Find nearest filling stations
                  </Text>
                </View>
                <View className="flex-col ">
                <ImageBackground source={require("@/assets/bag_im/buy (3).jpg")} className="relative w-64 h-40 overflow-hidden rounded-2xl bg-green-500 dark:bg-gray-950 p-2 text-slate-700 dark:text-slate-200">
                 
                </ImageBackground>
                  <Text className="text-slate-700 dark:text-slate-200 p-2 text-xl">Buy Car</Text>
                  <Text className="text-slate-700 dark:text-slate-200 p-2 text-md">
                    Buy your dream cars
                  </Text>
                </View>
            </View>




          </ScrollView>
        
        

      </View>

      
          
    <View>
      {/* Brands Section */}
          <View  className="px-6 dark:bg-background-dark text-slate-700 dark:text-slate-200">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-lg font-bold text-slate-700 dark:text-slate-200">Brands</Text>
              <Link href="/brands" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                See All
              </Link>
            </View>
            <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            stickyHeaderIndices={[1]}
            className="flex-row gap-5 pb-3" style={{gap:20}}>
              {brands.map((brand) => (
                <View key={brand.name} className="flex flex-col items-center gap-5">
                  <View className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 shadow-sm ring-1 ring-gray-100">
                    <View className="relative h-8 w-8">
                      <Image source={brand.logo || "/placeholder.svg"} 
                      style={StyleSheet.absoluteFill} contentFit="cover"
                      alt={brand.name} 
                      className="object-contain" />
                    </View>
                  </View>
                  <Text className="text-xs font-medium text-slate-700 dark:text-slate-200">{brand.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Popular Cars Section */}
          <View className="px-6 mb-6 dark:bg-background-dark text-primary dark:text-indigo-400">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-lg font-bold text-gray-900">Popular Car</Text>
              <Link href="/cars" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                See All
              </Link>
            </View>
            <View className="flex flex-col gap-4" style={{marginBottom:100}}>
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </View>
          </View>
    </View>
        
      
      <Filtermodel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    // Equivalent to: className="relative rounded-b-[2.5rem] ... px-6 pb-8 pt-12 text-white"
    gradientContainer: {
        position: 'relative',
        borderBottomLeftRadius: 40, 
        borderBottomRightRadius: 40,
        paddingTop: 2,   
        marginBottom:25,
        
        // paddingHorizontal: 24, 
        // paddingBottom: 32, 
    },
    icons:{
      color:"green",
      
      
    },
    contentContainer: {
        // Use this if you want to separate the content from the gradient styles
    },
    // Equivalent to: text-white
    text: {
        color: 'white',
    },

    searchFilterRow: {
        flexDirection: 'row',
        gap: 16, // gap-4 (4 * 4 = 16)
        paddingHorizontal: 20, // px-5 (5 * 4 = 20)
    },
    
   
    searchInputContainer: {
        position: 'relative',
        flex: 1,
        height: 44, // h-11 (11 * 4 = 44)
    },
    searchIcon: {
        position: 'absolute',
        left: 12, // left-3 (3 * 4 = 12)
        top: 11,  // Center the icon vertically in h-11 container (44/2 - 20/2 = 11)
        width: 20, // h-5/w-5 (5 * 4 = 20)
        height: 20,
        color: '#9CA3AF', // text-gray-400
        zIndex: 1, // Ensure the icon is above the TextInput
    },

    quickAccessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    paddingHorizontal: 12, 
    paddingVertical: 5,
     
  },
  quickAccessLink: {
   
    // width: '24%', 
    // alignItems: 'center', 
  },
  linkContent: {
    flexDirection: 'column', 
    alignItems: 'center',    
    gap: 4,                   
  },
  iconWrapper: {
    height: 56, 
    width: 56,  
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  linkText: {
    fontSize: 10, // text-xs (12px) often looks big for these, so 10-11px
    fontWeight: '500', // font-medium
    // color: '#1F2937', // text-gray-900 for dark text on light background
    textAlign: 'center',
    marginTop: 4, // Add a slight margin-top if gap isn't enough
  },
  // Background colors for the icon wrappers
  blueBg: { backgroundColor: '#DBEAFE' },   
  orangeBg: { backgroundColor: '#FFEDD5' }, 
  purpleBg: { backgroundColor: '#F3E8FF' }, 
  greenBg: { backgroundColor: '#DCFCE7' }, 

    
});

