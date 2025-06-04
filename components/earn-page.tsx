"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Gift, Key, Youtube, Twitter, MessageCircle } from "lucide-react"

interface EarnPageProps {
  showToast: (message: string, type?: "success" | "error" | "info") => void
}

const dailyTasks = [
  {
    id: 1,
    title: "Daily Login",
    description: "Log in to the game",
    reward: 1000,
    completed: true,
    icon: "📅",
  },
  {
    id: 2,
    title: "Join Telegram Channel",
    description: "Join our official Telegram channel",
    reward: 5000,
    completed: false,
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Follow on X (Twitter)",
    description: "Follow our X account",
    reward: 5000,
    completed: false,
    icon: <Twitter className="w-5 h-5" />,
  },
  {
    id: 4,
    title: "Subscribe to YouTube",
    description: "Subscribe to our YouTube channel",
    reward: 10000,
    completed: false,
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    id: 5,
    title: "Invite 3 Friends",
    description: "Invite 3 friends to play",
    reward: 25000,
    completed: false,
    icon: "👥",
  },
]

const puzzleGrid = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 0, 13, 14], // 0 represents empty space
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
]

export function EarnPage({ showToast }: EarnPageProps) {
  const [completedTasks, setCompletedTasks] = useState(new Set([1]))
  const [morseCode, setMorseCode] = useState("")
  const [cipherSolved, setCipherSolved] = useState(false)

  const completedCount = completedTasks.size
  const totalTasks = dailyTasks.length
  const progressPercentage = (completedCount / totalTasks) * 100

  const handleTaskComplete = (taskId: number) => {
    if (!completedTasks.has(taskId)) {
      setCompletedTasks((prev) => new Set([...prev, taskId]))
      const task = dailyTasks.find((t) => t.id === taskId)
      if (task) {
        showToast(`Task completed! +${task.reward.toLocaleString()} coins`)
      }
    }
  }

  const handleMorseSubmit = () => {
    // Simple morse code validation (example: SOS = ... --- ...)
    if (morseCode.toLowerCase().includes("sos") || morseCode.includes("... --- ...")) {
      setCipherSolved(true)
      showToast("Daily Cipher solved! +1,000,000 coins")
    } else {
      showToast("Incorrect cipher code", "error")
    }
  }

  const addMorseSymbol = (symbol: string) => {
    setMorseCode((prev) => prev + symbol + " ")
  }

  return (
    <div className="p-4 space-y-6">
      {/* Progress Header */}
      {/* <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-white">Daily Tasks</h2>
            <Badge className="bg-blue-600 text-white">
              {completedCount}/{totalTasks}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-sm text-gray-400 mt-2">Complete tasks to earn coins and bonuses</p>
        </CardContent>
      </Card> */}

      {/* Daily Cipher */}
      {/* <Card className="bg-gradient-to-r from-blue-700 to-navy-900 text-white border border-blue-500/30 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <div className="text-2xl">🔐</div>
            <span>Daily Cipher</span>
            {cipherSolved && <CheckCircle className="w-5 h-5 text-green-400" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm opacity-90">Decode the Morse code to earn 1,000,000 coins!</p>

          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              onClick={() => addMorseSymbol(".")}
            >
              • (Dot)
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              onClick={() => addMorseSymbol("-")}
            >
              — (Dash)
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              onClick={() => setMorseCode("")}
            >
              Clear
            </Button>
          </div>

          <Input
            placeholder="Enter morse code (try: ... --- ...)"
            value={morseCode}
            onChange={(e) => setMorseCode(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder-white/70"
          />

          <Button
            onClick={handleMorseSubmit}
            disabled={cipherSolved}
            className="w-full bg-white text-blue-700 hover:bg-gray-100"
          >
            {cipherSolved ? "Solved!" : "Submit Code"}
          </Button>
        </CardContent>
      </Card> */}

      {/* Mini Game Puzzle */}
      {/* <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-yellow-600" />
            <span>Sliding Puzzle</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">Solve the puzzle to earn keys for special rewards!</p>

          <div className="grid grid-cols-5 gap-1 max-w-xs mx-auto mb-4">
            {puzzleGrid.flat().map((num, index) => (
              <div
                key={index}
                className={`aspect-square flex items-center justify-center text-sm font-bold rounded ${
                  num === 0
                    ? "bg-gray-200"
                    : "bg-gradient-to-br from-blue-400 to-blue-600 text-white cursor-pointer hover:scale-105 transition-transform"
                }`}
              >
                {num === 0 ? "" : num}
              </div>
            ))}
          </div>

          <Button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            onClick={() => showToast("Puzzle solved! +3 Keys", "success")}
          >
            Solve Puzzle
          </Button>
        </CardContent>
      </Card> */}

      {/* Task List */}
      <div className="space-y-3">
        {dailyTasks.map((task) => {
          const isCompleted = completedTasks.has(task.id)

          return (
            <Card
              key={task.id}
              className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg hover:shadow-xl hover:border-blue-400/50 transition-all duration-200"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{typeof task.icon === "string" ? task.icon : task.icon}</div>
                    <div>
                      <h3 className="font-bold text-white">{task.title}</h3>
                      <p className="text-sm text-gray-400">{task.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Gift className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-400">+{task.reward.toLocaleString()} coins</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleTaskComplete(task.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Go
                      </Button>
                    )}
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
