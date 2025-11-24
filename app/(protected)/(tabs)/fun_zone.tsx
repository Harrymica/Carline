// import { createClient } from "@/lib/supabase/server"
import { BrainTeaser, LeaderboardEntry } from "@/lib/types";
import  Button  from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Brain, Puzzle, ChevronRight, Star } from 'lucide-react-native';
import {Link} from "expo-router";
import {Image} from "expo-image";
import { View } from "react-native";

async function getFunZoneData() {
  //const leaderboard = [];
  // const supabase = await createClient()
  
  // const { data: teasers } = await supabase
  //   .from('brain_teasers')
  //   .select('*')
  //   .limit(3)

  // const { data: leaderboard } = await supabase
  //   .from('leaderboard')
  //   .select('*')
  //   .limit(5)

  /* return {
    teasers: (teasers as BrainTeaser[]) || [],
    leaderboard: (leaderboard as LeaderboardEntry[]) || []
  }*/
}

export default function FunZonePage() {

  return(
    <View>Fun Zone</View>
  );
}
 // const { teasers, leaderboard } = await getFunZoneData();

 /* return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="sticky top-0 z-10 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Fun Zone</h1>
          <Link href="/" className="text-sm font-medium text-blue-600">Back to Home</Link>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Daily Challenge Banner */
       /* <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white shadow-lg">
          <div className="relative z-10">
            <div className="mb-2 flex items-center gap-2">
              <Brain className="h-6 w-6 text-yellow-300" />
              <span className="font-bold text-yellow-300">Daily Challenge</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold">Car Trivia Master</h2>
            <p className="mb-6 text-indigo-100">Test your knowledge about luxury cars and win points!</p>
            <Link href="/fun-zone">
              <Button className="rounded-full bg-white text-indigo-600 hover:bg-indigo-50">
                Start Quiz
              </Button>
            </Link>
          </div>
          <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        </div>*/

        {/* Categories */}
      /*  <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900">Categories</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/fun-zone">
              <Card className="border-0 bg-blue-50 shadow-none transition-colors hover:bg-blue-100">
                <CardContent className="flex flex-col items-center p-6">
                  <div className="mb-3 rounded-full bg-white p-3 text-blue-600 shadow-sm">
                    <Brain className="h-6 w-6" />
                  </div>
                  <span className="font-bold text-gray-900">Trivia</span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/fun-zone/category/puzzles">
              <Card className="border-0 bg-purple-50 shadow-none transition-colors hover:bg-purple-100">
                <CardContent className="flex flex-col items-center p-6">
                  <div className="mb-3 rounded-full bg-white p-3 text-purple-600 shadow-sm">
                    <Puzzle className="h-6 w-6" />
                  </div>
                  <span className="font-bold text-gray-900">Puzzles</span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section> */

        {/* Leaderboard */}
       /* <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Top Racers</h3>
            <Link href="/fun-zone/leaderboard" className="text-sm font-medium text-blue-600">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <div key={entry.id} className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center font-bold text-gray-400">
                    {index + 1}
                  </div>
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                    <Image 
                      source={entry.avatar_url || "/placeholder.svg"} 
                      alt={entry.full_name || "User"} 
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{entry.full_name || "Anonymous"}</p>
                    <p className="text-xs text-gray-500">{entry.correct_answers} wins</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-yellow-600">
                  <Trophy className="h-4 w-4" />
                  <span className="font-bold">{entry.total_points}</span>
                </div>
              </div>
            ))}
          </div>
        </section> */
  //     </div>
  //   </div>
  // )*/
//}
