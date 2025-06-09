"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Coins, TrendingUp, Gift, Star, Flame } from "lucide-react"
import Image from 'next/image';
import { useSocket } from "@/lib/SocketContext"
import { Page } from "@/app/page"

interface MainDashboardProps {
  showToast: (message: string, type?: "success" | "error" | "info") => void,
  tgUser: any,
  setCurrentPage: (page: Page) => void;
}

export function MainDashboard({ showToast, tgUser, setCurrentPage }: MainDashboardProps) {
  const { coinSocket } = useSocket();
  const [user, setUser] = useState(tgUser);
  const [tappingAnimation, setTappingAnimation] = useState(false);
  const [floatingCoins, setFloatingCoins] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [level, setLevel] = useState(tgUser.level);
  const [coinsToNextLevel, setCoinsToNextLevel] = useState(0);
  const [energy, setEnergy] = useState(tgUser.energy);
  const [maxEnergy, setMaxEnergy] = useState(tgUser.energyCapacity);
  const [energyQuality, setenergyQuality] = useState(tgUser.energyQuality);
  const [clickQuality, setClickQuality] = useState(tgUser.clickQuality);

  // Calculate level based on total coins collected
  const calculateLevel = (totalCoins: number) => {
    let currentLevel = 1;
    let coinsNeeded = 0;

    while (coinsNeeded <= totalCoins) {
      coinsNeeded += 1000 * currentLevel;
      if (coinsNeeded <= totalCoins) {
        currentLevel++;
      }
    }

    return {
      level: currentLevel,
      coinsToNext: coinsNeeded - totalCoins,
    };
  };

  // Socket.IO ulanishini boshqarish
  useEffect(() => {
    if (coinSocket) {
      coinSocket.emit('getUserDatas', { id: user.id });
      coinSocket.on('getUserDatasResponse', (data) => {
        setUser(data);
        setEnergy(data.energy)
        setLevel(data.level)
        setClickQuality(data.clickQuality)


      const levelData = calculateLevel(data.coins);
      if (levelData.level > level) {
        setLevel(levelData.level);
      }

      setCoinsToNextLevel(levelData.coinsToNext);
      });


      // Tozalash
      return () => {
        coinSocket.off('getUserDatasResponse');
      };
    } else {
      showToast("Socket not connected!", "error");
    }
  }, [coinSocket, user.id, showToast]);

  // Energy regeneration
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev: any) => Math.min(maxEnergy, prev + energyQuality));
    }, 1000);
    return () => clearInterval(interval);
  }, [maxEnergy, energyQuality]);

  const handleTap = (
    event: React.TouchEvent<HTMLElement> | React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();

    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    if (energy < clickQuality) {
      return;
    }

    setUser((prevUser: any) => ({
      ...prevUser,
      coins: (prevUser.coins) + clickQuality,
      energy: (prevUser.energy) - clickQuality,
      totalTaps: (prevUser.totalTaps) + 1,
    }));
    setEnergy((prev: any) => Math.max(0, prev - clickQuality));

    const levelData = calculateLevel(user.coins);

    if (levelData.level > level) {
      setLevel(levelData.level);
    }

    setCoinsToNextLevel(levelData.coinsToNext);
    setTappingAnimation(true);

    if (coinSocket) {
      coinSocket.emit('addCoin', {
        userId: user?.id,
        coinCount: clickQuality,
        level,
        energy,
        energyCapacity: maxEnergy,
        totalTaps: user.totalTaps,
        clickQuality: user.clickQuality,
        energyQuality: user.energyQuality
      });
    } else {
      return;
    }

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newCoin = {
      id: Date.now() + Math.random(),
      x: x - 10,
      y: y - 10,
    };

    setFloatingCoins((prev) => [...prev, newCoin]);

    setTimeout(() => {
      setFloatingCoins((prev) => prev.filter((coin) => coin.id !== newCoin.id));
    }, 5000);

    setTimeout(() => setTappingAnimation(false), 150);
  };

  // Agar coinSocket mavjud bo'lmasa, loading yoki xato sahifasini ko'rsatish
  if (!coinSocket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg font-bold">Socket ulanmadi...</div>
      </div>
    );
  }

  return (
    <div className="h-[90vh] flex flex-col p-4 space-y-2 flex flex-col">
      {/* Compact Stats Header */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
          <CardContent className="p-2 text-center">
            <div className="flex items-center justify-center space-x-1 text-blue-400">
              <Coins className="w-4 h-4" />
              <span className="text-xs font-medium">Coins</span>
            </div>
            <div className="text-sm font-bold text-white">{user?.coins?.toLocaleString('en-US')}</div>
          </CardContent>
        </Card>

        {/* Level Bar */}
        <div className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg rounded-lg p-2 pb-3">
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

      <div className="flex-1 flex justify-center items-center">
        <div
          className={`relative cursor-pointer transition-transform duration-150 ${tappingAnimation ? "animate-tap-scale" : ""} hover:scale-105 ${energy <= clickQuality ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleTap}
          onTouchStart={handleTap}
        >
          <div className="w-[400px] h-[400px] relative">
            <Image
              src="/coin-icon.png"
              alt="Mouse Icon"
              width={400}
              height={400}
              className="object-contain bg-transparent"
            />
          </div>

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

      {/* Bottom Area */}
      <div className="mt-auto grid grid-cols-2 gap-2">
        <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg py-2 flex justify-center items-center gap-1">
          <Zap className="text-yellow-400" />
          <p className="text-sm font-bold text-white p-0 m-0">
            {energy}/{maxEnergy}
          </p>

        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg py-2 flex justify-center items-center">
          <Flame className="text-yellow-400" /> <button onClick={() => setCurrentPage('mine')} className="text-white font-bold pt-1 m-0">Boost</button>
        </Card>

      </div>

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
          animation: float-up 1.5s ease-out forwards;
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
  );
}