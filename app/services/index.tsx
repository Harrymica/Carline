// import { createClient } from "@/lib/supabase/server"
import  Button  from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Shield, Wrench, AlertTriangle, ChevronRight, Upload, Clock } from 'lucide-react-native'
import {Link} from "expo-router"
import { ScrollView, View, Text } from "react-native"

export default function ServicesPage() {
//   const supabase = await createClient()
 /* const { data: { user } } = await supabase.auth.getUser()

  const { data: activeRenewals } = await supabase
    .from('document_renewals')
    .select('*')
    .eq('user_id', user?.id)
    .in('status', ['pending', 'in_progress'])*/

  return (
    <ScrollView className="min-h-screen bg-gray-50 pb-24">
      <View className="sticky top-0 z-10 bg-white px-6 py-4 shadow-sm">
        <View className="flex items-center justify-between">
          <Text className="text-2xl font-bold text-gray-900">Services</Text>
          <Link href="/" className="text-sm font-medium text-blue-600">Back to Home</Link>
        </View>
      </View>

      <View className="p-6 space-y-6">
       
        {/* {activeRenewals && activeRenewals.length > 0 && (
          <View className="rounded-2xl bg-white p-4 shadow-sm border border-blue-100">
            <View className="flex items-center gap-3 mb-3">
              <View className="p-2 bg-blue-50 rounded-full">
                <Clock className="h-5 w-5 text-blue-600" />
              </View>
              <View>
                <Text className="font-bold text-gray-900">In Progress</Text>
                <Text className="text-xs text-gray-500">{activeRenewals.length} active requests</Text>
              </View>
            </View>
            <View className="space-y-2">
              {activeRenewals.map((renewal: any) => (
                <View key={renewal.id} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded-lg">
                  <Text className="capitalize font-medium">{renewal.document_type}</Text>
                  <Text className="text-blue-600 capitalize">{renewal.status.replace('_', ' ')}</Text>
                </View>
              ))}
            </View>
          </View>
        )} */}

        {/* Document Services */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-4">Document Renewal</Text>
          <View className="grid gap-4">
            <Link href="/services/renewal/registration">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="flex items-center gap-4 p-4">
                  <View className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <FileText className="h-6 w-6" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-gray-900">Vehicle Registration</Text>
                    <Text className="text-xs text-gray-500">Renew your annual registration</Text>
                  </View>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/services/renewal/insurance">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="flex items-center gap-4 p-4">
                  <View className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <Shield className="h-6 w-6" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-gray-900">Insurance Renewal</Text>
                    <p className="text-xs text-gray-500">Compare and renew policies</p>
                  </View>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </CardContent>
              </Card>
            </Link>
          </View>
        </View>

        {/* Maintenance & Assistance */}
        <View>
          <Text className="text-lg font-bold text-gray-900 mb-4">Maintenance & Help</Text>
          <View className="grid grid-cols-2 gap-4">
            <Link href="/services/maintenance" className="block">
              <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center text-center p-6 gap-3">
                  <View className="h-14 w-14 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                    <Wrench className="h-7 w-7" />
                  </View>
                  <View>
                    <Text className="font-bold text-gray-900">Mechanic</Text>
                    <Text className="text-xs text-gray-500">Book service</Text>
                  </View>
                </CardContent>
              </Card>
            </Link>

            <Link href="/services/roadside" className="block">
              <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center text-center p-6 gap-3">
                  <View className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                    <AlertTriangle className="h-7 w-7" />
                  </View>
                  <View>
                    <Text className="font-bold text-gray-900">Roadside</Text>
                    <Text className="text-xs text-gray-500">Emergency help</Text>
                  </View>
                </CardContent>
              </Card>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
