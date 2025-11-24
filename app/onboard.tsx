"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'expo-router'
import { Image } from "expo-image"
import  Button  from "@/components/ui/button"
import { ScrollView, View, Text, Pressable, Dimensions } from "react-native"
import Animated, { 
  FadeInRight, 
  FadeOutLeft, 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  interpolateColor 
} from "react-native-reanimated"
// import blueCar from "@/assets/blue-luxury-car-front-view.jpg" 
import { SafeAreaView } from "react-native-safe-area-context"

// Mapping Tailwind classes to Hex codes for Reanimated interpolation
const COLORS = [
  "#2563eb", // bg-blue-600
  "#4f46e5", // bg-indigo-600
  "#7c3aed", // bg-violet-600
]

const slides = [
  {
    id: 1,
    title: "Choose car right for you",
    description: "Answer a few quick questions to find the right car for you.",
    image: require("@/assets/blue-luxury-car-front-view.jpg"),//"./blue-luxury-car-front-view.jpg", // Kept exactly as requested
    color: "bg-blue-600",
  },
  {
    id: 2,
    title: "Real-time availability",
    description: "Find cars available near you instantly with our map integration.",
    image: require("@/assets/map-with-car-location-pins.jpg"),//"./map-with-car-location-pins.jpg",
    color: "bg-indigo-600",
  },
  {
    id: 3,
    title: "Easy booking & payment",
    description: "Book your dream car in seconds with secure digital payments.",
    image: require("@/assets/mobile-payment-success-screen.jpg"),//"./mobile-payment-success-screen.jpg",
    color: "bg-violet-600",
  },
]

// Create an Animated version of ScrollView
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()
  
  // Shared value to drive animations
  const progress = useSharedValue(0)

  useEffect(() => {
    // Animate progress whenever currentSlide changes
    progress.value = withTiming(currentSlide, { duration: 500 })
  }, [currentSlide])

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      router.push("/login")
    }
  }

  const skip = () => {
    router.push("/login")
  }

  // Interpolate background color based on slide index
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      slides.map((_, i) => i), // [0, 1, 2]
      COLORS
    )
    return { backgroundColor }
  })

  return (
    <AnimatedScrollView 
      style={[{ flex: 1 }, animatedBackgroundStyle]}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <SafeAreaView className="flex-1 justify-between p-6 pt-12">
        {/* Top Header */}
        <View className="flex-row justify-between items-center p-6" >
          <View className="flex-row gap-1">
            {slides.map((_, index) => {
              // Create animated style for dots (replacing CSS transition)
              const dotStyle = useAnimatedStyle(() => {
                const isActive = index === currentSlide;
                return {
                  backgroundColor: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.3)",
                  width: withTiming(isActive ? 24 : 6, { duration: 300 }), // Expand active dot
                }
              })

              return (
                <Animated.View
                  key={index}
                  style={[{ height: 4, borderRadius: 99 }, dotStyle]}
                />
              )
            })}
          </View>
          
          <Pressable onPress={skip}>
            <Text className="text-sm font-medium text-white/80">
              Skip
            </Text>
          </Pressable>
        </View>

        {/* Main Content Area */}
        <View className="flex-1 items-center justify-center px-6 pb-10 pt-4">
          {/* Reanimated replacement for AnimatePresence:
            The `key` prop forces unmount/mount, triggering entering/exiting animations.
          */}
          <Animated.View
            key={currentSlide}
            entering={FadeInRight.springify().damping(12).stiffness(100)} // Mimics initial={{ x: 50 }}
            exiting={FadeOutLeft.duration(200)} // Mimics exit={{ x: -50 }}
            className="flex-col items-center w-full"
          >
            <View className="relative mb-8 h-64 w-full max-w-xs items-center justify-center">
              <Image
                
                source={slides[currentSlide].image}// Using uri for string paths
                alt={slides[currentSlide].title}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
              />
            </View>
            
            <Text className="mb-4 text-3xl font-bold leading-tight text-white text-center">
              {slides[currentSlide].title}
            </Text>
            
            <Text className="mb-8 text-white/80 text-center text-base">
              {slides[currentSlide].description}
            </Text>
          </Animated.View>

          {/* Bottom Button */}
          {/* Assuming Button is a custom component that accepts onPress or onClick-mapped props */}
          <Button
            onPress={nextSlide} 
            className="h-14 w-full rounded-full bg-white flex-row items-center justify-center active:bg-white/90"
          >
            <Text className="text-lg font-semibold text-blue-600">
              {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </AnimatedScrollView>
  )
}