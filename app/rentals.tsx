// import { createClient } from "@/lib/supabase/server"
import { Car } from "@/lib/types";
import { CarCard } from "@/lib/car-card";
// import { Input } from "@/components/ui/input"
import  Button  from "@/components/ui/button";
import { Search, Map, List } from 'lucide-react-native';
import {Link} from "expo-router";
import {Image} from "expo-image";
import { TextInput, View, Text, ScrollView } from "react-native";

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


export default function RentalsPage() {
  //const cars = await getRentalCars()
const cars = DUMMY_CARS; 
  return (
    <View className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <View className="z-10 bg-background-light dark:bg-background-dark px-6 py-4 shadow-sm mt-8">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-slate-700 dark:text-slate-200">Rent a Car</Text>
          <Link href="/" className="text-sm font-medium text-blue-600 dark:text-slate-200">Back to Home</Link>
        </View>
        
        {/* <View className="flex-row gap-3">
          <View className="relative flex-1 bg-red-300 ">
            <Search className="absolute left-4 top-0 h-5 w-5 text-gray-400" />
            <TextInput 
              placeholder="Search nearby cars..." 
              className="h-11 rounded-xl border-gray-200 bg-gray-50 pl-10"
            />
          </View>
          <Button size="icon" variant="outline" className="h-11 w-11 rounded-xl border-gray-200">
            <Map className="h-5 w-5 text-gray-600" />
          </Button>
        </View> */}
        <View className="flex-row gap-3 top-0">
            {/* Search Input Container */}
            <View className="relative flex-row">
              {/* Search Icon: Positioned at 50% from top and shifted up by 50% of its own height to center it */}
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/3 h-5 w-5 text-gray-400 z-10" 
                style={{position:"absolute", left:3, top:3}}
                color="black"
              />
              {/* TextInput */}
              <TextInput 
                placeholder="Search nearby cars..." 
                className="h-11 w-80 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4" // Added border and pr-4 for good measure
              />
            </View>

            {/* Map Button */}
            <Button size="icon" variant="outline" className="h-11 w-11 rounded-xl border-gray-200">
              <Map className="h-5 w-5 text-gray-600" />
            </Button>
        </View>


      </View>

      {/* Map View Placeholder */}
      <View className="relative flex-1 bg-gray-200">
        <Image
          source="/placeholder.svg?text=Map+View"
          alt="Map"
          className="object-cover opacity-50"
        />
        
        {/* Floating Car Cards on Map */}
        <View className="absolute bottom-0 left-0 right-0 h-2/3 overflow-y-auto rounded-t-[2rem] bg-white p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
          <View className="mb-4 flex items-center justify-center">
            <View className="h-1 w-12 rounded-full bg-gray-300" />
          </View>
          <Text className="mb-4 text-lg font-bold text-gray-900">Available Near You</Text>
          <ScrollView className="flex-col gap-4 mb-4">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}
