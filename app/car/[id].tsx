import type React from "react"
import { useState } from "react"
import {Link} from "expo-router"
import { ArrowLeft, Share2, Heart, Star, MessageCircle, Phone, RefreshCcw, FileInput } from "lucide-react-native"
import { ScrollView, Text, View } from "react-native"
import { Image } from "expo-image"

export default function CarDetails() {
  const [rotation, setRotation] = useState(0)
  const [activeTab, setActiveTab] = useState("about")
  const [rentalType, setRentalType] = useState("short") // short, long, buy

  const car = {
    name: "Toyota Fortuner Legender",
    type: "SUV",
    rating: 4.9,
    price: 30.0,
    description:
      "The Toyota Fortuner Legender is a premium SUV that combines luxury with rugged capability. Featuring a powerful engine, advanced safety features, and a spacious interior, it's perfect for both city driving and off-road adventures.",
    owner: {
      name: "Jenny Doe",
      role: "Owner",
      image: "/placeholder.svg?height=48&width=48&text=JD",
    },
    images: [
      "/placeholder.svg?height=300&width=500&text=Side+View",
      "/placeholder.svg?height=300&width=500&text=Front+View",
      "/placeholder.svg?height=300&width=500&text=Back+View",
      "/placeholder.svg?height=300&width=500&text=Interior",
    ],
  }

  const handleRotate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRotation(Number.parseInt(e.target.value))
  }

  return (
    <ScrollView className="min-h-screen bg-slate-50 pb-32 font-sans">
      {/* Header */}
      <View className="p-6 pt-12 flex-row justify-between items-center sticky top-0 z-10 bg-slate-50/80 backdrop-blur-md">
        <Link
          href="/"
          className="flex-row w-10 h-10 rounded-full bg-white shadow-sm  items-center justify-center text-slate-900 hover:bg-slate-100 transition-colors"
           style={{display:"flex"}}
           >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <Text className="font-bold text-lg text-[#0f172a]">Car Details</Text>
        <View className="flex-row gap-3">
          <button className="flex-row  w-10 h-10 rounded-full bg-white shadow-sm items-center justify-center text-slate-900 hover:bg-slate-100 transition-colors" style={{display:"flex"}}>
            <Share2 className="w-5 h-5" />
          </button>
          <button className="flex-row  w-10 h-10 rounded-full bg-white shadow-sm items-center justify-center text-slate-900 hover:bg-slate-100 transition-colors" style={{display:"flex"}}>
            <Heart className="w-5 h-5" />
          </button>
        </View>
      </View>

      {/* 360 View Section */}
      <View className="px-6 mb-8">
        <View className="relative aspect-[16/9] mb-6 flex-row items-center justify-center perspective-1000">
          {/* Simulated 360 view using rotation transform */}
          <View
            className="w-full h-full transition-transform duration-100 ease-linear"
            style={{ transform: `rotateY(${rotation}deg)` }}
          >
            <Image
              source={car.images[0] || "/placeholder.svg"}
              alt={car.name}
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </View>

          {/* 360 Indicator */}
          <View className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm text-[#3B6CFF] flex items-center gap-1">
            <RefreshCcw className="w-3 h-3" /> 360° View
          </View>
        </View>

        {/* Rotation Slider */}
        <View className="relative h-12 flex-row items-center justify-center mb-6">
          <input
            type="range"
            min="0"
            max="360"
            value={rotation}
            onChange={handleRotate}
            className="w-full max-w-[200px] accent-[#3B6CFF] cursor-ew-resize"
          />
        </View>

        {/* Gallery Thumbnails */}
        <View className="flex-row gap-3 overflow-x-auto pb-2 no-scrollbar">
          {car.images.map((img, i) => (
            <button
              key={i}
              className={`relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 ${
                i === 0 ? "border-[#3B6CFF]" : "border-transparent"
              }`}
            >
              <img src={img || "/placeholder.svg"} alt={`View ${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
          <button className="w-20 h-16 rounded-xl bg-[#3B6CFF] text-white font-bold flex-row items-center justify-center flex-shrink-0">
            +10
          </button>
        </View>
      </View>

      {/* Car Info */}
      <View className="px-6 mb-6">
        <View className="flex-row justify-between items-start mb-2">
          <span className="px-3 py-1 rounded-lg bg-blue-50 text-[#3B6CFF] text-xs font-bold uppercase tracking-wider">
            {car.type}
          </span>
          <View className="flex-row items-center gap-1 text-amber-400 font-bold">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-slate-900">{car.rating}</span>
          </View>
        </View>
        <h2 className="text-2xl font-bold text-[#0f172a] mb-6">{car.name}</h2>

        {/* Tabs */}
        <View className="flex-row border-b border-slate-100 mb-6">
          {["About", "Gallery", "Review"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.toLowerCase() ? "text-[#3B6CFF]" : "text-slate-400"
              }`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
              {activeTab === tab.toLowerCase() && (
                <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B6CFF] rounded-t-full"></View>
              )}
            </button>
          ))}
        </View>

        {/* Rental Options */}
        <View className="bg-white p-1 rounded-xl flex-row mb-6 border border-slate-100">
          <button
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              rentalType === "short" ? "bg-[#1A1D26] text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
            }`}
            onClick={() => setRentalType("short")}
          >
            Short Term
          </button>
          <button
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              rentalType === "long" ? "bg-[#1A1D26] text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
            }`}
            onClick={() => setRentalType("long")}
          >
            Long Term
          </button>
          <button
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              rentalType === "buy" ? "bg-[#1A1D26] text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
            }`}
            onClick={() => setRentalType("buy")}
          >
            Buy Car
          </button>
        </View>

        {/* Owner Info */}
        <View className="mb-6">
          <h3 className="font-bold text-[#0f172a] mb-3">Rent Partner</h3>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <img
                src={car.owner.image || "/placeholder.svg"}
                alt={car.owner.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <View>
                <p className="font-bold text-[#0f172a]">{car.owner.name}</p>
                <p className="text-xs text-slate-500">{car.owner.role}</p>
              </View>
            </View>
            <View className="flex-row gap-3">
              <button className="w-10 h-10 rounded-full bg-blue-50 text-[#3B6CFF] flex-row items-center justify-center hover:bg-blue-100 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-blue-50 text-[#3B6CFF] flex-row items-center justify-center hover:bg-blue-100 transition-colors">
                <Phone className="w-5 h-5" />
              </button>
            </View>
          </View>
        </View>

        {/* Description */}
        <View className="mb-24">
          <h3 className="font-bold text-[#0f172a] mb-2">About</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{car.description}</p>
        </View>
      </View>

      {/* Footer Action */}
      <View className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-6 pb-8 rounded-t-[32px] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <View className="flex-row items-center justify-between gap-6">
          <View>
            <p className="text-slate-400 text-xs mb-1">Price</p>
            <View className="flex-row items-baseline gap-1">
              <span className="text-2xl font-bold text-[#0f172a]">${car.price.toFixed(2)}</span>
              <span className="text-slate-400 text-sm">/hr</span>
            </View>
          </View>
          <button className="flex-row bg-[#3B6CFF] text-white font-bold py-4 rounded-[20px] shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-transform">
            Book Now
          </button>
        </View>
      </View>
    </ScrollView>
  )
}
