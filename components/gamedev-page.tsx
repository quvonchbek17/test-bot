"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Users, Gamepad2, TrendingUp, Clock, Star } from "lucide-react"

interface GameDevPageProps {
  showToast: (message: string, type?: "success" | "error" | "info") => void,
  user: any
}

const gameGenres = [
  {
    id: 1,
    name: "Action",
    icon: "⚔️",
    difficulty: "Hard",
    duration: "8h",
    reward: 15000,
    description: "High-intensity combat games",
  },
  {
    id: 2,
    name: "Puzzle",
    icon: "🧩",
    difficulty: "Easy",
    duration: "4h",
    reward: 8000,
    description: "Brain-teasing puzzle games",
  },
  {
    id: 3,
    name: "Strategy",
    icon: "♟️",
    difficulty: "Medium",
    duration: "6h",
    reward: 12000,
    description: "Strategic thinking games",
  },
  {
    id: 4,
    name: "Racing",
    icon: "🏎️",
    difficulty: "Medium",
    duration: "5h",
    reward: 10000,
    description: "High-speed racing games",
  },
]

const teamMembers = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Lead Developer",
    level: 5,
    efficiency: 85,
    cost: 50000,
    avatar: "👨‍💻",
  },
  {
    id: 2,
    name: "Sarah Kim",
    role: "Game Designer",
    level: 4,
    efficiency: 78,
    cost: 40000,
    avatar: "👩‍🎨",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Artist",
    level: 3,
    efficiency: 72,
    cost: 35000,
    avatar: "🎨",
  },
]

const leaderboard = [
  { rank: 1, name: "GameMaster Pro", diamonds: 2500000, studio: "Elite Games" },
  { rank: 2, name: "DevKing", diamonds: 2200000, studio: "Pixel Studios" },
  { rank: 3, name: "CodeNinja", diamonds: 1900000, studio: "Indie Craft" },
  { rank: 4, name: "You", diamonds: 1650000, studio: "Your Studio" },
  { rank: 5, name: "GameCrafter", diamonds: 1400000, studio: "Dream Games" },
]

export function GameDevPage({ showToast }: GameDevPageProps) {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const [activeProjects, setActiveProjects] = useState<
    Array<{
      id: number
      genre: string
      progress: number
      timeLeft: string
    }>
  >([
    { id: 1, genre: "Puzzle", progress: 75, timeLeft: "1h 23m" },
    { id: 2, genre: "Action", progress: 45, timeLeft: "3h 45m" },
  ])

  const [studioStats] = useState({
    diamondsPerHour: 125000,
    totalTeamMembers: 3,
    activeProjects: 2,
    completedGames: 47,
  })

  const handleStartProject = (genre: (typeof gameGenres)[0]) => {
    if (selectedGenre === genre.id) {
      const newProject = {
        id: Date.now(),
        genre: genre.name,
        progress: 0,
        timeLeft: genre.duration,
      }
      setActiveProjects((prev) => [...prev, newProject])
      setSelectedGenre(null)
      showToast(`Started ${genre.name} game development!`)
    } else {
      setSelectedGenre(genre.id)
    }
  }

  const handleHireTeamMember = (member: (typeof teamMembers)[0]) => {
    showToast(`${member.name} hired as ${member.role}!`)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "Hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Studio Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-r from-blue-600 to-navy-800 text-white border border-blue-500/30 shadow-lg">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">{studioStats.diamondsPerHour.toLocaleString()}</div>
            <div className="text-sm opacity-90">Diamonds/Hour</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-navy-600 to-black text-white border border-blue-500/30 shadow-lg">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">{studioStats.totalTeamMembers}</div>
            <div className="text-sm opacity-90">Team Members</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects */}
      {activeProjects?.length > 0 && (
        <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-white">
              <Gamepad2 className="w-5 h-5" />
              <span>Active Projects</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeProjects.map((project) => (
              <div key={project.id} className="bg-gray-800/50 rounded-lg p-3 border border-blue-500/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">{project.genre} Game</span>
                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{project.timeLeft}</span>
                  </div>
                </div>
                <Progress value={project.progress} className="h-2" />
                <div className="text-sm text-gray-400 mt-1">{project.progress}% Complete</div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Game Genres */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle>Start New Project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {gameGenres.map((genre) => (
            <div
              key={genre.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedGenre === genre.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
              onClick={() => handleStartProject(genre)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{genre.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{genre.name}</h3>
                    <p className="text-sm text-gray-600">{genre.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <Badge className={`${getDifficultyColor(genre.difficulty)} text-white text-xs`}>
                        {genre.difficulty}
                      </Badge>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{genre.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600">+{genre.reward.toLocaleString()} 💎</div>
                  <Button
                    size="sm"
                    className={`mt-2 ${
                      selectedGenre === genre.id ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 hover:bg-gray-600"
                    } text-white`}
                  >
                    {selectedGenre === genre.id ? "Start Project" : "Select"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Team Management */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Hire Team Members</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{member.avatar}</div>
                <div>
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <Badge className="bg-blue-100 text-blue-800 text-xs">Level {member.level}</Badge>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Star className="w-3 h-3" />
                      <span>{member.efficiency}% Efficiency</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-orange-600 mb-2">{member.cost.toLocaleString()} 💎</div>
                <Button
                  size="sm"
                  onClick={() => handleHireTeamMember(member)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Hire
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span>Studio Leaderboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  entry.name === "You" ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      entry.rank === 1
                        ? "bg-yellow-500 text-white"
                        : entry.rank === 2
                          ? "bg-gray-400 text-white"
                          : entry.rank === 3
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {entry.rank}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{entry.name}</div>
                    <div className="text-sm text-gray-600">{entry.studio}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-purple-600">{entry.diamonds.toLocaleString()} 💎</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
