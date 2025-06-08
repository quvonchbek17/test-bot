"use client"

import { FaSpinner } from "react-icons/fa"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Coins, Star } from "lucide-react"
import { motion } from "framer-motion"

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 space-y-6">
      {/* Stats Skeleton Cards */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-md">
        <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg animate-pulse">
          <CardContent className="p-2 text-center">
            <div className="flex items-center justify-center space-x-1 text-blue-400">
              <Coins className="w-4 h-4" />
              <span className="text-xs font-medium">Coins</span>
            </div>
            <div className="text-sm font-bold text-white">...</div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg animate-pulse">
          <CardContent className="p-2 text-center">
            <div className="flex items-center justify-center space-x-1 text-yellow-400">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-medium">Energy</span>
            </div>
            <div className="text-sm font-bold text-white">...</div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg animate-pulse">
          <CardContent className="p-2 text-center">
            <div className="flex items-center justify-center space-x-1 text-green-400">
              <Star className="w-4 h-4" />
              <span className="text-xs font-medium">Level</span>
            </div>
            <div className="text-sm font-bold text-white">...</div>
          </CardContent>
        </Card>
      </div>

      {/* Loading Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="text-white text-3xl"
      >
        <FaSpinner className="animate-spin" />
      </motion.div>

      <div className="text-white/70 text-sm">Loading your datas...</div>
    </div>
  )
}
