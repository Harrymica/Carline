// import { useState, use } from "react"
// import { useRouter } from 'expo-router'
// // import { createClient } from "@/lib/supabase/client"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent } from "@/components/ui/card"
// import { ChevronLeft, Upload, CheckCircle2, Loader2 } from 'lucide-react-native'
// import { useToast } from "@/hooks/use-toast"
// import Link from "next/link"

// export default function RenewalProcessPage({ params }: { params: Promise<{ type: string }> }) {
//   const { type } = use(params)
//   const [step, setStep] = useState(1)
//   const [isLoading, setIsLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     registrationNumber: "",
//     expiryDate: "",
//   })
//   const router = useRouter()
//   const { toast } = useToast()
//   const supabase = createClient()

//   const handleSubmit = async () => {
//     setIsLoading(true)
//     try {
//       const { data: { user } } = await supabase.auth.getUser()
      
//       if (!user) throw new Error("Not authenticated")

//       const { error } = await supabase
//         .from('document_renewals')
//         .insert({
//           user_id: user.id,
//           document_type: type,
//           vehicle_registration: formData.registrationNumber,
//           expiry_date: formData.expiryDate,
//           status: 'pending'
//         })

//       if (error) throw error

//       setStep(3) // Success step
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const steps = [
//     { id: 1, title: "Vehicle Details" },
//     { id: 2, title: "Upload Docs" },
//     { id: 3, title: "Review" },
//   ]

//   return (
//     <div className="min-h-screen bg-white pb-24">
//       <div className="sticky top-0 z-10 flex items-center gap-4 bg-white px-6 py-4 shadow-sm">
//         <Link href="/services" className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
//           <ChevronLeft className="h-6 w-6 text-gray-900" />
//         </Link>
//         <h1 className="text-lg font-bold text-gray-900 capitalize">{type} Renewal</h1>
//       </div>

//       {/* Progress Steps */}
//       <div className="px-6 py-6">
//         <div className="flex items-center justify-between">
//           {steps.map((s, i) => (
//             <div key={s.id} className="flex flex-col items-center gap-2">
//               <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
//                 step >= s.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
//               }`}>
//                 {step > s.id ? <CheckCircle2 className="h-5 w-5" /> : s.id}
//               </div>
//               <span className={`text-xs font-medium ${step >= s.id ? 'text-blue-600' : 'text-gray-400'}`}>
//                 {s.title}
//               </span>
//             </div>
//           ))}
//         </div>
//         <div className="relative mt-4 h-1 w-full bg-gray-100 rounded-full">
//           <div 
//             className="absolute left-0 top-0 h-full bg-blue-600 rounded-full transition-all duration-300"
//             style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
//           />
//         </div>
//       </div>

//       <div className="px-6">
//         {step === 1 && (
//           <div className="space-y-6">
//             <div className="space-y-2">
//               <Label>Vehicle Registration Number</Label>
//               <Input 
//                 placeholder="ABC-1234"
//                 value={formData.registrationNumber}
//                 onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
//                 className="h-12 rounded-xl"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>Current Expiry Date</Label>
//               <Input 
//                 type="date"
//                 value={formData.expiryDate}
//                 onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
//                 className="h-12 rounded-xl"
//               />
//             </div>
//             <Button 
//               className="w-full h-12 rounded-full bg-blue-600 text-lg"
//               onClick={() => setStep(2)}
//               disabled={!formData.registrationNumber || !formData.expiryDate}
//             >
//               Next Step
//             </Button>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="space-y-6">
//             <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
//               <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
//                 <Upload className="h-8 w-8" />
//               </div>
//               <h3 className="mb-2 font-bold text-gray-900">Upload Documents</h3>
//               <p className="mb-6 text-sm text-gray-500">
//                 Please upload a clear photo of your current registration card
//               </p>
//               <Button variant="outline" className="rounded-full">
//                 Choose File
//               </Button>
//             </div>
//             <Button 
//               className="w-full h-12 rounded-full bg-blue-600 text-lg"
//               onClick={handleSubmit}
//               disabled={isLoading}
//             >
//               {isLoading ? <Loader2 className="animate-spin" /> : "Submit Application"}
//             </Button>
//           </div>
//         )}

//         {step === 3 && (
//           <div className="text-center py-12">
//             <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600">
//               <CheckCircle2 className="h-12 w-12" />
//             </div>
//             <h2 className="mb-2 text-2xl font-bold text-gray-900">Application Submitted!</h2>
//             <p className="mb-8 text-gray-500">
//               We have received your renewal request. You can track the status in the Services tab.
//             </p>
//             <Button 
//               className="w-full h-12 rounded-full bg-blue-600 text-lg"
//               onClick={() => router.push('/services')}
//             >
//               Back to Services
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
