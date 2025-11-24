// import { createClient } from "@/lib/supabase/server"
import { Car } from "@/lib/types";
import { CarCard } from "@/lib/car-card";
// import { Input } from "@/components/ui/input"
import  Button  from "@/components/ui/button";
import { Search, Map, List } from 'lucide-react-native';
import {Link} from "expo-router";
import {Image} from "expo-image";
import { TextInput } from "react-native";

async function getRentalCars() {
//   const supabase = await createClient();
//   const { data: cars } = await supabase
//     .from('cars')
//     .select('*')
//     .eq('is_available', true)
  
 // return (cars as Car[]) || []
}

export default function RentalsPage() {
  //const cars = await getRentalCars()

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <div className="z-10 bg-white px-6 py-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Rent a Car</h1>
          <Link href="/" className="text-sm font-medium text-blue-600">Back to Home</Link>
        </div>
        
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <TextInput 
              placeholder="Search nearby cars..." 
              className="h-11 rounded-xl border-gray-200 bg-gray-50 pl-10"
            />
          </div>
          <Button size="icon" variant="outline" className="h-11 w-11 rounded-xl border-gray-200">
            <Map className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Map View Placeholder */}
      <div className="relative flex-1 bg-gray-200">
        <Image
          source="/placeholder.svg?text=Map+View"
          alt="Map"
          className="object-cover opacity-50"
        />
        
        {/* Floating Car Cards on Map */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 overflow-y-auto rounded-t-[2rem] bg-white p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
          <div className="mb-4 flex items-center justify-center">
            <div className="h-1 w-12 rounded-full bg-gray-300" />
          </div>
          <h3 className="mb-4 text-lg font-bold text-gray-900">Available Near You</h3>
          {/* <div className="grid gap-4">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  )
}
