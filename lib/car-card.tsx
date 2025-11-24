import {Image} from "expo-image";
import {Link} from "expo-router";
import { Heart, Fuel, Gauge, Users } from 'lucide-react-native';
// import { Button } from "@/components/ui/button"
import { Car } from "@/lib/types"
import { Pressable } from "react-native";

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  return (
    <Link href={`/car/${car.id}`} className="group relative block overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md border border-gray-100">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium text-gray-600">{car.rating}</span>
          </div>
          <h3 className="mt-1 text-lg font-bold text-gray-900">{car.brand} {car.model}</h3>
          <p className="text-xs text-gray-500">{car.condition === 'new' ? 'New' : 'Used'} • {car.year}</p>
        </div>
        <button className="rounded-full bg-gray-50 p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      <div className="relative mb-4 h-32 w-full">
        <Image
        
          source={car.image_url || "/placeholder.svg"}
          alt={`${car.brand} ${car.model}`}
          
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Gauge className="h-4 w-4" />
          <span>{car.transmission}</span>
        </div>
        <div className="flex items-center gap-1">
          <Fuel className="h-4 w-4" />
          <span>{car.fuel_type}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{car.seats} Seats</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-blue-600">${car.price_per_day}</span>
          <span className="text-xs text-gray-400">/hr</span>
        </div>
        <Pressable className="h-8 rounded-full bg-blue-600 px-4 hover:bg-blue-700">
          Rent
        </Pressable>
      </div>
    </Link>
  )
}
