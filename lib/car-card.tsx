import {Image} from "expo-image";
import {Link, router} from "expo-router";
import { Heart, Fuel, Gauge, Users } from 'lucide-react-native';
// import { Button } from "@/components/ui/button"
import { Car } from "@/lib/types"
import { Pressable, View, Text, StyleSheet } from "react-native";
import Button from "@/components/ui/button";
import { Redirect } from "expo-router";
interface CarCardProps {
  car: Car
}

const handleClick =(car:any) =>{
 
  router.push(`/car/${car.id}`);
}


export function CarCard({ car }: CarCardProps) {
  return (
    <View className="group mb-4 relative block overflow-hidden rounded-2xl bg-background-light dark:bg-background-dark p-4 shadow-sm transition-all hover:shadow-md border border-gray-100 dark:border-white">

    <Pressable  onPress={() =>handleClick(car)}>
      <View className="mb-4 flex-row items-start justify-between">
        <View>
          <View className="flex-row items-center gap-1">
            <Text className="text-yellow-400">★</Text>
            <Text className="text-sm font-medium text-slate-700 dark:text-slate-200">{car.rating}</Text>
          </View>
          <Text className="mt-1 text-lg font-bold text-slate-700 dark:text-slate-200">{car.brand} {car.model}</Text>
          <Text className="text-xs text-slate-700 dark:text-slate-200">{car.condition === 'new' ? 'New' : 'Used'} • {car.year}</Text>
        </View>
        <Button className="rounded-full bg-background-light dark:bg-background-dark p-2 text-slate-700 dark:text-slate-200 transition-colors hover:bg-red-50 hover:text-red-500">
          <Heart className="h-5 w-5" fill="transparent" color="white"/>
        </Button>
      </View>

      <View className="relative mb-4 h-32 w-full">
        <Image source={car.images || "/placeholder.svg"} alt={`${car.brand} ${car.model}`}
           className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
           style={StyleSheet.absoluteFill} contentFit="cover"/>
      </View>

      <View className=" flex-row p-4 gap-4 mb-4 items-center justify-between text-xs text-slate-700 dark:text-slate-200">
        <View className="flex-row items-center gap-1 text-slate-700 dark:text-slate-200">
          <Gauge className="h-4 w-4 bg-white" />
          <Text className="text-slate-700 dark:text-slate-200">{car.transmission}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Fuel className="h-4 w-4" />
          <Text className="text-slate-700 dark:text-slate-200">{car.fuel_type}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Users className="h-4 w-4" />
          <Text className="text-slate-700 dark:text-slate-200">{car.seats} Seats</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between gap-4 p-2">
        <View className="flex-row">
          <Text className="text-lg font-bold text-blue-600 dark:text-slate-200">${car.price_per_day}</Text>
          <Text className="text-lg text-gray-400">/hr</Text>
        </View>
        <View className=" float-end">
          <Button className="h-8 rounded-full  dark:text-slate-200 bg-blue-600 px-4">
          Rent
        </Button>
        </View>
      </View>
    </Pressable>
    </View>
  )
}
