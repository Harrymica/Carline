export interface Car {
  id: string
  name: string
  brand: string
  type: string
  rating: number
  price: number
  image: string
  transmission: "Manual" | "Automatic"
  fuel: "Petrol" | "Diesel" | "Electric"
  seats: number
  description: string
  owner: {
    name: string
    role: string
    image: string
  }
  images: string[]
}

export const brands = [
  { name: "BMW", icon: "/placeholder.svg?height=50&width=50&text=BMW" },
  { name: "Toyota", icon: "/placeholder.svg?height=50&width=50&text=Toyota" },
  { name: "Mercedes", icon: "/placeholder.svg?height=50&width=50&text=Mercedes" },
  { name: "Tesla", icon: "/placeholder.svg?height=50&width=50&text=Tesla" },
]

export const cars: Car[] = [
  {
    id: "1",
    name: "Hyundai Verna",
    brand: "Hyundai",
    type: "Sedan",
    rating: 4.9,
    price: 25.00,
    image: "/placeholder.svg?height=200&width=400&text=Hyundai+Verna",
    transmission: "Manual",
    fuel: "Petrol",
    seats: 5,
    description: "The Hyundai Verna is a subcompact car produced by the South Korean manufacturer Hyundai since 2000.",
    owner: {
      name: "Jenny Doe",
      role: "Owner",
      image: "/placeholder.svg?height=50&width=50&text=JD"
    },
    images: [
      "/placeholder.svg?height=100&width=150&text=View+1",
      "/placeholder.svg?height=100&width=150&text=View+2",
      "/placeholder.svg?height=100&width=150&text=View+3",
      "/placeholder.svg?height=100&width=150&text=View+4",
    ]
  },
  {
    id: "2",
    name: "Toyota Fortuner Legender",
    brand: "Toyota",
    type: "SUV",
    rating: 4.9,
    price: 30.00,
    image: "/placeholder.svg?height=250&width=500&text=Toyota+Fortuner",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 7,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    owner: {
      name: "Jenny Doe",
      role: "Owner",
      image: "/placeholder.svg?height=50&width=50&text=JD"
    },
    images: [
      "/placeholder.svg?height=100&width=150&text=Side",
      "/placeholder.svg?height=100&width=150&text=Front",
      "/placeholder.svg?height=100&width=150&text=Back",
      "/placeholder.svg?height=100&width=150&text=Interior",
    ]
  }
]
