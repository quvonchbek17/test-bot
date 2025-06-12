"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Coins, Zap, BatteryFull, MousePointerClick } from "lucide-react"
import { Search } from "lucide-react"
import { useSocket } from "@/lib/SocketContext"

interface MinePageProps {
  showToast: (message: string, type?: "success" | "error" | "info") => void
  tgUser: any
}

const filters = ["All", "Refill", "Capacity", "Click"]

const upgrades = [
  // Refill Upgrades
  {
    id: 1, name: "Refill Mini", desc: "+1 energy/sec", cost: 10000, type: "refill", bonus: "+1/sec", icon: <Zap className="w-4 h-4 text-yellow-400" />,
  },
  {
    id: 2, name: "Refill Plus", desc: "+5 energy/sec", cost: 50000, type: "refill", bonus: "+5/sec", icon: <Zap className="w-4 h-4 text-yellow-400" />,
  },
  {
    id: 3, name: "Refill Pro", desc: "+10 energy/sec", cost: 100000, type: "refill", bonus: "+10/sec", icon: <Zap className="w-4 h-4 text-yellow-400" />,
  },
  {
    id: 4, name: "Refill Elite", desc: "+20 energy/sec", cost: 200000, type: "refill", bonus: "+20/sec", icon: <Zap className="w-4 h-4 text-yellow-400" />,
  },

  // Capacity Upgrades
  {
    id: 5, name: "Capacity Mini", desc: "+500 energy cap", cost: 20000, type: "capacity", bonus: "+500 cap", icon: <BatteryFull className="w-4 h-4 text-green-400" />,
  },
  {
    id: 6, name: "Capacity Plus", desc: "+1500 energy cap", cost: 50000, type: "capacity", bonus: "+1500 cap", icon: <BatteryFull className="w-4 h-4 text-green-400" />,
  },
  {
    id: 7, name: "Capacity Pro", desc: "+3000 energy cap", cost: 100000, type: "capacity", bonus: "+3000 cap", icon: <BatteryFull className="w-4 h-4 text-green-400" />,
  },
  {
    id: 8, name: "Capacity Elite", desc: "+6000 energy cap", cost: 300000, type: "capacity", bonus: "+6000 cap", icon: <BatteryFull className="w-4 h-4 text-green-400" />,
  },

  // Click Quality Upgrades
  {
    id: 9, name: "Click Mini", desc: "+1 coins/tap", cost: 20000, type: "click", bonus: "+1/tap", icon: <MousePointerClick className="w-4 h-4 text-blue-400" />,
  },
  {
    id: 10, name: "Click Plus", desc: "+3 coins/tap", cost: 60000, type: "click", bonus: "+3/tap", icon: <MousePointerClick className="w-4 h-4 text-blue-400" />,
  },
  {
    id: 11, name: "Click Pro", desc: "+5 coins/tap", cost: 100000, type: "click", bonus: "+5/tap", icon: <MousePointerClick className="w-4 h-4 text-blue-400" />,
  },
  {
    id: 12, name: "Click Elite", desc: "+10 coins/tap", cost: 200000, type: "click", bonus: "+10/tap", icon: <MousePointerClick className="w-4 h-4 text-blue-400" />,
  },
]

export function MinePage({ showToast, tgUser }: MinePageProps) {
  const { coinSocket } = useSocket();
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [user, setUser] = useState(tgUser)

  const filteredUpgrades = upgrades.filter((u) => {
    if (selectedFilter === "All") return true
    return u.type === selectedFilter.toLowerCase()
  })

  useEffect(() => {
    if (coinSocket) {
      coinSocket.emit('getUserDatas', { id: tgUser.id });
      coinSocket.on('getUserDatasResponse', (data) => {
        setUser(data)
      });

      // Tozalash
      return () => {
        coinSocket.off('getUserDatasResponse');
      };
    } else {
      showToast("Socket not connected!", "error");
    }
  }, [coinSocket, tgUser.id]);

  const handleBuy = (upgrade: typeof upgrades[0]) => {
    if (user.coins >= upgrade.cost) {
      setUser((prevUser: any) => ({
        ...prevUser,
        coins: (prevUser.coins) - upgrade.cost
      }));
    } else {
      alert("Not enough coins!")
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Coin Display */}
      <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
        <CardContent className="p-4 text-center text-white">
          <div className="flex justify-center items-center space-x-2 mb-1 text-blue-400">
            <Coins className="w-5 h-5" />
            <span className="text-sm font-medium">Coins</span>
          </div>
          <div className="text-2xl font-bold">{user.coins?.toLocaleString()}</div>
        </CardContent>
      </Card>

      {/* Filter Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <Button
            key={f}
            onClick={() => setSelectedFilter(f)}
            variant={selectedFilter === f ? "default" : "outline"}
            className={`whitespace-nowrap ${selectedFilter === f
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-black/60 hover:bg-black/80 text-gray-300 border-blue-500/30"
              }`}
            size="sm"
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Upgrade Cards */}
      <div className="space-y-4">
        {filteredUpgrades.map((card) => {
          const canAfford = user.coins >= card.cost
          return (
            <Card key={card.id} className="bg-black/80 border border-white/10 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {card.icon}
                    <div>
                      <div className="font-semibold text-white">{card.name}</div>
                      <div className="text-sm text-gray-400">{card.desc}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-400 font-bold mb-1">{card.cost.toLocaleString()}</div>
                    <Button
                      size="sm"
                      onClick={() => handleBuy(card)}
                      disabled={!canAfford}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
