"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Coins, TrendingUp, Gift, Star } from "lucide-react"
import Image from 'next/image';
import { FaMedal, FaTrophy, FaCrown, FaStar } from 'react-icons/fa';
import { GiTrophyCup, GiDiamondTrophy } from 'react-icons/gi';
import { ImCoinDollar, ImCoinPound, ImCoinYen, ImCoinEuro } from "react-icons/im";
import { BiBitcoin } from "react-icons/bi";
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/slices/userSlice"
interface MainDashboardProps {
  showToast: (message: string, type?: "success" | "error" | "info") => void,
  tgUser: any
}

export function MainDashboard({ showToast, tgUser }: MainDashboardProps) {
  const [coins, setCoins] = useState(0)
  // const [profitPerHour] = useState(125000)
  const [tappingAnimation, setTappingAnimation] = useState(false)
  const [floatingCoins, setFloatingCoins] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Level system
  const [level, setLevel] = useState(1)
  const [coinsToNextLevel, setCoinsToNextLevel] = useState(1000)
  const [totalCoinsCollected, setTotalCoinsCollected] = useState(0)

  // Energy system
  const [energy, setEnergy] = useState(1000)
  const [maxEnergy, setMaxEnergy] = useState(1000)
  const [energyLevel, setEnergyLevel] = useState(1)
  const [energyRefillRate, setEnergyRefillRate] = useState(1) // Energy per second
  const [clickQuality, setClickQuality] = useState(level) // Energy per second

  // Calculate level based on total coins collected
  const calculateLevel = (totalCoins: number) => {
    let currentLevel = 1
    let coinsNeeded = 0

    while (coinsNeeded <= totalCoins) {
      coinsNeeded += 1000 * currentLevel
      if (coinsNeeded <= totalCoins) {
        currentLevel++
      }
    }

    return {
      level: currentLevel,
      coinsToNext: coinsNeeded - totalCoins,
    }
  }

  // Get coin image based on level
  const getCoinImage = (level: number) => {
    if (level >= 50) return <ImCoinPound className="text-yellow-400 w-[40px] h-[40px] text-semibold" /> // Diamond coin for high levels
    if (level >= 25) return <BiBitcoin className="text-yellow-400 w-[40px] h-[40px] text-semibold" /> // Trophy coin for advanced levels
    if (level >= 15) return <ImCoinEuro className="text-yellow-400 w-[40px] h-[40px] text-semibold" /> // Star coin for intermediate levels
    if (level >= 10) return <ImCoinDollar className="text-yellow-400 w-[40px] h-[40px] text-semibold" /> // Gold coin for experienced players
    if (level >= 5) return <ImCoinYen className="text-yellow-400 w-[40px] h-[40px] text-semibold" /> // Silver coin for beginners
    return <ImCoinPound className="text-yellow-400 w-[40px] h-[40px] text-semibold" /> // Bronze coin for new players
  }

  // Energy regeneration
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => Math.min(maxEnergy, prev + energyRefillRate))
    }, 1000)
    return () => clearInterval(interval)
  }, [maxEnergy, energyRefillRate])

  const handleTap = (event: React.MouseEvent) => {
    if (energy <= clickQuality) {
      showToast("Not enough energy!", "error")
      return
    }
    const newTotalCoins = totalCoinsCollected + clickQuality
    const levelData = calculateLevel(newTotalCoins)

    setCoins((prev) => prev + clickQuality)
    setTotalCoinsCollected(newTotalCoins)
    setEnergy((prev) => Math.max(0, prev - clickQuality))

    // Check for level up
    if (levelData.level > level) {
      setLevel(levelData.level)
      showToast(`Level Up! You are now level ${levelData.level}!`, "success")
    }

    setCoinsToNextLevel(levelData.coinsToNext)
    setTappingAnimation(true)

    // Create floating coin animation
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const newCoin = {
      id: Date.now(),
      x: x - 10,
      y: y - 10,
    }

    setFloatingCoins((prev) => [...prev, newCoin])

    setTimeout(() => {
      setFloatingCoins((prev) => prev.filter((coin) => coin.id !== newCoin.id))
    }, 5000)

    setTimeout(() => setTappingAnimation(false), 150)
  }

  const handleMultiTouch = (event: React.TouchEvent) => {
    event.preventDefault(); // scroll oldini olish

    // Har bir touch uchun handleTap ishga tushadi
    Array.from(event.changedTouches).forEach((touch) => {
      if (energy < clickQuality) return; // energiya yetmasa o'tkazib yubor
      handleTap({
        clientX: touch.clientX,
        clientY: touch.clientY,
        currentTarget: event.currentTarget,
        preventDefault: () => { },
      } as unknown as React.MouseEvent);
    });
  };

  return (
    <div className="p-4 space-y-4 flex flex-col">
      {/* Compact Stats Header */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
          <CardContent className="p-2 text-center">
            <div className="flex items-center justify-center space-x-1 text-blue-400">
              <Coins className="w-4 h-4" />
              <span className="text-xs font-medium">Coins</span>
            </div>
            <div className="text-sm font-bold text-white">{coins.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
          <CardContent className="p-2 text-center">
            <div className="flex items-center justify-center space-x-1 text-yellow-400">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-medium">Energy</span>
            </div>
            <div className="text-sm font-bold text-white">
              {energy}/{maxEnergy}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
          <CardContent className="p-2 text-center">
            <div className="flex items-center justify-center space-x-1 text-green-400">
              <Star className="w-4 h-4" />
              <span className="text-xs font-medium">Level</span>
            </div>
            <div className="text-sm font-bold text-white">{level}</div>
          </CardContent>
        </Card>
      </div>

      {/* Compact Progress Bars */}
      <div className="grid grid-cols-2 gap-2">
        {/* Energy Bar */}
        <div className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg rounded-lg p-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-1 text-yellow-400">
              <Zap className="w-3 h-3" />
              <span className="text-xs font-medium">Energy Lvl {energyLevel}</span>
            </div>
            <span className="text-xs text-gray-400">{energyRefillRate}/sec</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-500 to-orange-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(energy / maxEnergy) * 100}%` }}
            />
          </div>
        </div>

        {/* Level Bar */}
        <div className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg rounded-lg p-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-1 text-green-400">
              <Star className="w-3 h-3" />
              <span className="text-xs font-medium">Level {level}</span>
            </div>
            <span className="text-xs text-gray-400">{coinsToNextLevel.toLocaleString()} to next</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.max(0, 100 - (coinsToNextLevel / (1000 * level)) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Large Hamster Tapping Area */}
      <div className="relative flex flex-1 justify-center items-center">
        <div
          className={`relative cursor-pointer transition-transform duration-150 ${tappingAnimation ? "animate-tap-scale" : ""
            } hover:scale-105 ${energy <= clickQuality ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleTap}
          // onTouchStart={handleMultiTouch}
        >
          <div className="w-[400px] h-[300px] relative">
            <Image
              src="/coin-icon.png" // Path to your PNG image in the public folder
              alt="Mouse Icon"
              width={600} // Adjust width to match the original text-[90px]
              height={600} // Adjust height to match the original text-[90px]
              className="object-contain bg-transparent"
            />
            {/* <div className="absolute -top-4 -right-4 text-5xl animate-pulse">{getCoinImage(level)}</div> */}
            {energy <= 0 && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <div className="text-white text-lg font-bold">No Energy</div>
              </div>
            )}
          </div>

          {/* Floating Coins */}
          {floatingCoins.map((coin) => (
            <div
              key={coin.id}
              className="absolute text-5xl animate-bounce pointer-events-none text-yellow-300 font-semibold"
              style={{
                left: coin.x,
                top: coin.y,
                animation: "float-up 1s ease-out forwards",
              }}
            >
              {`+${clickQuality}`}
            </div>
          ))}
        </div>
      </div>

      {/* Coin Stats */}


      <style jsx>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0px);
          }
          100% {
            opacity: 0;
            transform: translateY(-150px);
          }
        }
        .animate-float-up {
          animation: float-up 1.5s ease-out forwards; /* Longer duration */
        }

       @keyframes tap-scale {
       0% { transform: scale(1); }
       50% { transform: scale(0.95); }
       100% { transform: scale(1); }
      }

    .animate-tap-scale {
      animation: tap-scale 0.2s ease-in-out;
    }
      `}</style>
    </div>
  )
}


// bg-gradient-to-br from-blue-600 to-navy-800 rounded-full flex items-center justify-center shadow-2xl border-8 border-blue-400/30