"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wallet, CheckCircle, Gift, Twitter, Youtube, MessageCircle } from "lucide-react"

interface AirdropPageProps {
  showToast: (message: string, type?: "success" | "error" | "info") => void
}

const airdropTasks = [
  {
    id: 1,
    title: "Connect TON Wallet",
    description: "Link your TON wallet to receive airdrop",
    reward: "Required",
    completed: false,
    icon: <Wallet className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Join Telegram Community",
    description: "Join our official Telegram community",
    reward: "+10% Bonus",
    completed: false,
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Follow on X",
    description: "Follow our official X account",
    reward: "+5% Bonus",
    completed: false,
    icon: <Twitter className="w-5 h-5" />,
  },
  {
    id: 4,
    title: "Subscribe YouTube",
    description: "Subscribe to our YouTube channel",
    reward: "+5% Bonus",
    completed: false,
    icon: <Youtube className="w-5 h-5" />,
  },
]

export function AirdropPage({ showToast }: AirdropPageProps) {
  const [completedTasks, setCompletedTasks] = useState(new Set<number>())
  const [walletConnected, setWalletConnected] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 42,
    seconds: 30,
  })

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleConnectWallet = () => {
    setWalletConnected(true)
    setCompletedTasks((prev) => new Set([...prev, 1]))
    showToast("TON Wallet connected successfully!")
  }

  const handleTaskComplete = (taskId: number) => {
    setCompletedTasks((prev) => new Set([...prev, taskId]))
    const task = airdropTasks.find((t) => t.id === taskId)
    if (task) {
      showToast(`Task completed! ${task.reward}`)
    }
  }

  const completedCount = completedTasks.size
  const totalTasks = airdropTasks.length
  const progressPercentage = (completedCount / totalTasks) * 100
  const bonusPercentage = (completedCount - 1) * 5 // Excluding wallet connection

  const estimatedTokens = 50000 + (bonusPercentage / 100) * 50000

  return (
    <div className="p-4 space-y-6">
      {/* Countdown Timer */}
      <Card className="bg-gradient-to-r from-blue-700 to-navy-900 text-white border border-blue-500/30 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Gift className="w-6 h-6" />
            <span>Airdrop Event</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm opacity-90 mb-4">Complete tasks to maximize your airdrop allocation</p>

          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.days}</div>
              <div className="text-xs opacity-75">Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.hours}</div>
              <div className="text-xs opacity-75">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.minutes}</div>
              <div className="text-xs opacity-75">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{timeLeft.seconds}</div>
              <div className="text-xs opacity-75">Seconds</div>
            </div>
          </div>

          <div className="bg-white/20 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Estimated Allocation:</span>
              <span className="font-bold text-lg">{estimatedTokens.toLocaleString()} $HMSTR</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900">Airdrop Progress</h3>
            <Badge className="bg-green-500 text-white">
              {completedCount}/{totalTasks}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-3 mb-2" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tasks Completed</span>
            <span>+{bonusPercentage}% Bonus</span>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Connection */}
      {!walletConnected ? (
        <Card className="bg-gradient-to-r from-blue-600 to-navy-800 text-white border border-blue-500/30 shadow-lg">
          <CardContent className="p-6 text-center">
            <Wallet className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Connect Your TON Wallet</h3>
            <p className="text-sm opacity-90 mb-4">Connect your TON wallet to receive your airdrop tokens</p>
            <Button onClick={handleConnectWallet} className="bg-white text-blue-700 hover:bg-gray-100 font-medium">
              Connect TON Wallet
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-green-50 border-green-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="font-bold text-green-800">Wallet Connected</h3>
                <p className="text-sm text-green-600">UQA...xyz (TON Wallet)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Airdrop Tasks */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-900">Complete Tasks for Bonus</h3>

        {airdropTasks.map((task) => {
          const isCompleted = completedTasks.has(task.id)
          const isWalletTask = task.id === 1

          return (
            <Card
              key={task.id}
              className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-600">{task.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-600">{task.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Gift className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-orange-600">{task.reward}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => (isWalletTask ? handleConnectWallet() : handleTaskComplete(task.id))}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                        disabled={isWalletTask && !walletConnected}
                      >
                        {isWalletTask ? "Connect" : "Go"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Airdrop Info */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Airdrop Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Supply:</span>
            <span className="font-bold">100,000,000,000 $HMSTR</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Airdrop Allocation:</span>
            <span className="font-bold">60% (60B $HMSTR)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Distribution Date:</span>
            <span className="font-bold">September 26, 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Vesting:</span>
            <span className="font-bold">No vesting period</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
