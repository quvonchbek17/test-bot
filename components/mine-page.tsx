"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Coins, Clock, Zap, Battery } from "lucide-react"

interface MinePageProps {
  showToast: (message: string, type?: "success" | "error" | "info") => void,
  tgUser: any
}

const upgradeCategories = ["All", "PR & Team", "Markets", "Legal", "Web3", "Energy"]

const upgradeCards = [
  // Regular upgrades
  // {
  //   id: 1,
  //   name: "CEO",
  //   category: "PR & Team",
  //   cost: 15000,
  //   profitPerHour: 2000,
  //   level: 5,
  //   maxLevel: 25,
  //   icon: "👔",
  //   type: "profit",
  // },
  // {
  //   id: 2,
  //   name: "Marketing",
  //   category: "PR & Team",
  //   cost: 25000,
  //   profitPerHour: 3500,
  //   level: 3,
  //   maxLevel: 25,
  //   icon: "📢",
  //   type: "profit",
  // },
  // {
  //   id: 3,
  //   name: "Bitcoin",
  //   category: "Markets",
  //   cost: 50000,
  //   profitPerHour: 7500,
  //   level: 8,
  //   maxLevel: 25,
  //   icon: "₿",
  //   type: "profit",
  // },
  // {
  //   id: 4,
  //   name: "Ethereum",
  //   category: "Markets",
  //   cost: 75000,
  //   profitPerHour: 12000,
  //   level: 6,
  //   maxLevel: 25,
  //   icon: "Ξ",
  //   type: "profit",
  // },
  // {
  //   id: 5,
  //   name: "Compliance",
  //   category: "Legal",
  //   cost: 100000,
  //   profitPerHour: 15000,
  //   level: 2,
  //   maxLevel: 25,
  //   icon: "⚖️",
  //   type: "profit",
  // },
  // {
  //   id: 6,
  //   name: "DeFi",
  //   category: "Web3",
  //   cost: 200000,
  //   profitPerHour: 35000,
  //   level: 1,
  //   maxLevel: 25,
  //   icon: "🏦",
  //   type: "profit",
  // },
  // Energy upgrades
  {
    id: 7,
    name: "Mini Capacity",
    desc: "+1000 Capacity",
    category: "Energy",
    cost: 10000,
    energyBonus: 100,
    level: 1,
    maxLevel: 50,
    icon: "🔋",
    type: "energy_capacity",
  },
  {
    id: 8,
    name: "Mini Energy",
    desc: "+5 Energy/sec",
    category: "Energy",
    cost: 15000,
    refillBonus: 1,
    level: 1,
    maxLevel: 25,
    icon: "⚡",
    type: "energy_refill",
  },
  {
    id: 9,
    name: "Plus Capacity",
    desc: "+3000 Capacity",
    category: "Energy",
    cost: 50000,
    energyBonus: 500,
    level: 0,
    maxLevel: 10,
    icon: "🔋",
    type: "energy_capacity",
  },
  {
    id: 10,
    name: "Plus Energy",
    desc: "+10 Energy/sec",
    category: "Energy",
    cost: 75000,
    refillBonus: 3,
    level: 0,
    maxLevel: 15,
    icon: "⚡",
    type: "energy_refill",
  },
]

export function MinePage({ showToast }: MinePageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [userCoins] = useState(1234567)

  const filteredCards = upgradeCards.filter((card) => {
    const matchesCategory = selectedCategory === "All" || card.category === selectedCategory
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalProfitPerHour = upgradeCards
    .filter((card) => card.type === "profit")
    .reduce((sum, card) => sum + (0) * card.level, 0)

  const handleUpgrade = (card: (typeof upgradeCards)[0]) => {
    if (userCoins >= card.cost) {
    if (card.type === "energy_capacity") {
        showToast(`${card.name} upgraded! +${card.energyBonus} energy capacity`)
      } else if (card.type === "energy_refill") {
        showToast(`${card.name} upgraded! +${card.refillBonus} energy/sec`)
      }
    } else {
      showToast("Not enough coins!", "error")
    }
  }

  const getCategoryColor = (category: string) => {
    return "bg-blue-500"
    switch (category) {
      case "PR & Team":
        return "bg-blue-500"
      case "Markets":
        return "bg-green-500"
      case "Legal":
        return "bg-red-500"
      case "Web3":
        return "bg-purple-500"
      case "Energy":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getUpgradeIcon = (card: (typeof upgradeCards)[0]) => {
    if (card.type === "energy_capacity") return <Battery className="w-3 h-3" />
    if (card.type === "energy_refill") return <Zap className="w-3 h-3" />
    return <TrendingUp className="w-3 h-3" />
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header Stats */}
      <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-blue-400 mb-1">
                <Coins className="w-5 h-5" />
                <span className="text-sm font-medium">Available</span>
              </div>
              <div className="text-xl font-bold text-white">{userCoins.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      {/* <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search upgrades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/60 backdrop-blur-sm border border-blue-500/30 shadow-lg text-white placeholder-gray-400"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {upgradeCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-black/60 hover:bg-black/80 text-gray-300 border-blue-500/30"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div> */}

      {/* Upgrade Cards */}
      <div className="space-y-3">
        {filteredCards.map((card) => {
          const canAfford = userCoins >= card.cost
          const isEnergyUpgrade = card.type === "energy_capacity" || card.type === "energy_refill"

          return (
            <Card
              key={card.id}
              className={`bg-black/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] ${
                isEnergyUpgrade
                  ? "border-yellow-500/30 hover:border-yellow-400/50"
                  : "border-blue-500/30 hover:border-blue-400/50"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl w-[30px]">{card.icon}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-white">{card.name}</h3>
                        {/* <Badge className={`${getCategoryColor(card.category)} text-white text-xs`}>
                          {card.category}
                        </Badge> */}
                      </div>
                      <div className="text-sm text-gray-400">
                        {card.desc}
                      </div>
                      {/* <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <div className="flex items-center space-x-1">
                          {getUpgradeIcon(card)}
                          <span></span>
                        </div>
                        {card.type === "profit" && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>h payback</span>
                          </div>
                        )}
                      </div> */}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-lg font-bold mb-2 text-blue-400`}>
                      {card.cost.toLocaleString()}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleUpgrade(card)}
                      disabled={!canAfford || card.level >= card.maxLevel}
                      className={`bg-blue-600 hover:bg-blue-700 text-white`}
                    >
                      {card.level >= card.maxLevel ? "MAX" : "Buy"}
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
