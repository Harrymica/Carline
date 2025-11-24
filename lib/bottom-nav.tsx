import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { Home, Heart, Gamepad2, ShoppingBag, User } from "lucide-react-native";


export default function bottom_nav() {

    const pathname = usePathname()

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`)


  return(
     <View className="fixed bottom-0 left-6 right-6 z-50 bg-black mt-auto">
      <View className="bg-[#1A1D1F] rounded-lg px-8 py-5 flex-row m-2 p-2 items-center justify-between shadow-2xl">
        <Link
          href="/home"
          className={`flex flex-col items-center gap-1 ${isActive("/home") ? "text-white" : "text-gray-500"}`}
          >
          <Home className={`h-6 w-6 ${isActive("/home") ? "fill-white" : ""}`} />
        </Link>
        <Link
          href="/favorites"
          className={`flex flex-col items-center gap-1 ${isActive("/favorites") ? "text-white" : "text-gray-500"}`}
        >
          <Heart className={`h-6 w-6 ${isActive("/favorites") ? "fill-white" : ""}`} />
        </Link>

        <Link
          href="/fun-zone"
          className={`flex flex-col items-center gap-1 ${isActive("/favorites") ? "text-white" : "text-gray-500"}`}
        >
          <Gamepad2 className={`h-6 w-6 ${isActive("/favorites") ? "fill-white" : ""}`} />
        </Link>
        <Link
          href="/explore"
          className={`flex flex-col items-center gap-1 ${isActive("/explore") ? "text-white" : "text-gray-500"}`}
        >
          <ShoppingBag className={`h-6 w-6 ${isActive("/explore") ? "fill-white" : ""}`} />
        </Link>
        <Link
          href="/chat"
          className={`flex flex-col items-center gap-1 ${isActive("/chat") ? "text-white" : "text-gray-500"}`}
        >
          <User className={`h-6 w-6 ${isActive("/chat") ? "fill-white" : ""}`} />
        </Link>
      </View>
    </View>
  )
// return (
//     <View className="fixed bottom-6 left-6 right-6 z-50 ">
//       <View className="bg-[#3e86b6] rounded-[32px] px-8 py-5 flex-row items-center justify-between shadow-2xl">
//         <Link
//           href="/"
//           className={`flex flex-col items-center gap-1 ${isActive("/home") ? "text-white" : "text-gray-500"}`}
//         >
//           <Home className={`h-6 w-6 ${isActive("/home") ? "fill-white" : ""}`} />
//         </Link>
//         <Link
//           href="/"
//           className={`flex flex-col items-center gap-1 ${isActive("/favorites") ? "text-white" : "text-gray-500"}`}
//         >
//           <Heart className={`h-6 w-6 ${isActive("/favorites") ? "fill-white" : ""}`} />
//         </Link>

//         <Link
//           href="/fun-zone"
//           className={`flex flex-col items-center gap-1 ${isActive("/fun-zone") ? "text-white" : "text-gray-500"}`}
//         >
//           <Gamepad2 className={`h-6 w-6 ${isActive("/fun-zoe") ? "fill-white" : ""}`} />
//         </Link>
//         <Link
//           href="/explore"
//           className={`flex flex-col items-center gap-1 ${isActive("/explore") ? "text-white" : "text-gray-500"}`}
//         >
//           <ShoppingBag className={`h-6 w-6 ${isActive("/explore") ? "fill-white" : ""}`} />
//         </Link>
//         <Link
//           href="/chat"
//           className={`flex flex-col items-center gap-1 ${isActive("/chat") ? "text-white" : "text-gray-500"}`}
//         >
//           <User className={`h-6 w-6 ${isActive("/chat") ? "fill-white" : ""}`} />
//         </Link>
//       </View>
//     </View>
//   )
}