import { ArrowLeft, Search, Heart } from "lucide-react-native";
import {Link} from "expo-router";
import {Image} from "expo-image";
import { ScrollView, View, Text } from "react-native";
import Button from "@/components/ui/button";
// import { BottomNav } from "@/components/bottom-nav"

const favoriteCars = [
  {
    id: 1,
    name: "Tesla Model 3",
    price: "$ 52,000",
    rating: 4.4,
    reviews: 205,
    image: require("@/assets/tesla-model-3-white-side.jpg"),
  },
  {
    id: 2,
    name: "Tesla Model X",
    price: "$ 32,000",
    rating: 4.2,
    reviews: 205,
    image: require("@/assets/tesla-model-x-black-side.jpg"),
  },
  {
    id: 3,
    name: "Tesla Model 3",
    price: "$ 52,000",
    rating: 4.4,
    reviews: 205,
    image: require("@/assets/tesla-model-3-white-side-2.jpg"),
  },
]

export default function FavoritesPage() {
  return (
    <ScrollView className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <View className="sticky top-0 z-30 
      bg-gradient-to-r from-gray-900 
      to-gray-800 h-[15px] mb-8 px-6 pt-12 
      pb-6 flex-row items-center justify-between 
      
      "
      style={{alignItems:'center'}}>
        <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Link>
        <Text className="font-bold text-lg text-white">Favourite Car</Text>
        <Button className="p-2 -mr-2 hover:bg-gray-100 rounded-full">
          <Search className="h-6 w-6" />
        </Button>
      </View>

      {/* List */}
      <ScrollView className="px-4 space-y-4">
        {favoriteCars.map((car) => (
          <View key={car.id} className="bg-white mb-4  flex-row items-center shadow-sm">
            <View className="w-1/2">
              <Image
                source={car.image || "/placeholder.svg"}
                alt={car.name}
                style={{width:160, height:200}}
                className="object-cover "
              />
            </View>
            <View className="w-1/2 space-y-2 px-4 p-2">
              <Text className="font-bold text-lg">{car.name}</Text>
              <Text className="font-bold text-gray-900">{car.price}</Text>
              <View className="flex-row items-center gap-1 text-xs text-gray-500">
                <View className="text-yellow-400">★</View>
                <View className="font-medium text-black">{car.rating}</View>
                <View>({car.reviews} Review)</View>
              </View>
              <View className="flex-row items-center gap-2 pt-1">
                <Button className="flex-1 bg-black text-white text-xs font-medium py-2 rounded-full">
                  Buy 
                  </Button>
                <Button className="p-4">
                  <Heart className="h-5 w-5 fill-black text-black" />
                </Button>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

     
    </ScrollView>
  )
}
