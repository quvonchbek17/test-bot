"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { User, Edit3, Trophy, Calendar, Coins, Zap, Star, TrendingUp, Crown, Target, Clock, Gift } from "lucide-react"
import { TfiApple, TfiCrown, TfiCup, TfiFaceSmile, TfiInfoAlt, TfiPowerOff, TfiStatsUp, TfiUser, TfiWallet, TfiWand } from "react-icons/tfi";

interface ProfilePageProps {
  showToast: (message: string, type?: "success" | "error" | "info") => void,
  tgUser: any
}

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Tap 100 times",
    icon: "👶",
    completed: true,
    progress: 100,
    maxProgress: 100,
    reward: 1000,
  },
  {
    id: 2,
    title: "Coin Collector",
    description: "Collect 10,000 coins",
    icon: "🪙",
    completed: true,
    progress: 10000,
    maxProgress: 10000,
    reward: 5000,
  },
  {
    id: 3,
    title: "Energy Master",
    description: "Reach energy level 5",
    icon: "⚡",
    completed: false,
    progress: 1,
    maxProgress: 5,
    reward: 10000,
  },
  {
    id: 4,
    title: "Level Up",
    description: "Reach level 10",
    icon: "⭐",
    completed: false,
    progress: 1,
    maxProgress: 10,
    reward: 15000,
  },
  {
    id: 5,
    title: "Social Butterfly",
    description: "Invite 5 friends",
    icon: "👥",
    completed: false,
    progress: 0,
    maxProgress: 5,
    reward: 25000,
  },
  {
    id: 6,
    title: "Millionaire",
    description: "Collect 1,000,000 coins",
    icon: "💰",
    completed: true,
    progress: 1234567,
    maxProgress: 1000000,
    reward: 50000,
  },
]

const dailyStats = [
  { label: "Taps Today", value: 1247, icon: Target, color: "text-blue-400" },
  { label: "Coins Earned", value: 45230, icon: Coins, color: "text-yellow-400" },
  { label: "Energy Used", value: 892, icon: Zap, color: "text-orange-400" },
  { label: "Time Played", value: "2h 34m", icon: Clock, color: "text-green-400" },
]

export function ProfilePage({ showToast, tgUser }: ProfilePageProps) {

  console.log(tgUser)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    username: "HamsterMaster",
    avatar: <TfiFaceSmile />,
    joinDate: "2024-01-15",
    totalCoins: 1234567,
    level: 15,
    energyLevel: 3,
    totalTaps: 15420,
    friendsInvited: 3,
    gamesCompleted: 12,
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    showToast("Profile updated successfully!")
  }

  const handleClaimAchievement = (achievement: (typeof achievements)[0]) => {
    if (achievement.completed) {
      showToast(`Achievement claimed! +${achievement.reward.toLocaleString()} coins`)
    }
  }

  const completedAchievements = achievements.filter((a) => a.completed).length
  const totalAchievements = achievements.length
  const achievementProgress = (completedAchievements / totalAchievements) * 100

  const getAvatarOptions = () => [<TfiFaceSmile />, <TfiApple />, <TfiCrown />, <TfiCup />, <TfiInfoAlt />, <TfiPowerOff />, <TfiStatsUp />, <TfiUser />, <TfiWand />, <TfiWallet />]

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <Card className="bg-black/20 text-white border border-blue-500/30 border-[2px] shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="w-6 h-6" />
              <span>Profile</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Edit3 className="w-4 h-4 mr-1" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {isEditing ? (
                <div className="grid grid-cols-5 gap-2">
                  {getAvatarOptions().map((avatar, i) => (
                    <button
                      key={i}
                      onClick={() => setProfileData((prev) => ({ ...prev, avatar }))}
                      className={`text-3xl p-2 rounded-lg transition-all text-blue-400 ${
                        profileData.avatar === avatar ? "bg-white/30 scale-110" : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="w-16 h-16 bg-white/20 text-blue-400 rounded-full flex items-center justify-center text-4xl">
                  {profileData.avatar}
                </div>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  {/* <Label className="text-white">Username</Label>
                  <Input
                    value={profileData.username}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, username: e.target.value }))}
                    className="bg-white/20 border-white/30 text-white placeholder-white/70"
                  /> */}
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold">{"Eshmat"}</h2>
                  <div className="flex items-center space-x-4 text-sm opacity-90">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(new Date()).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Level {profileData.level}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <Button onClick={handleSaveProfile} className="w-full bg-white text-blue-700 hover:bg-gray-100">
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
          <CardContent className="p-4 text-center">
            <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{profileData.totalCoins.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Coins</div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{profileData.totalTaps.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Taps</div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Stats */}
      <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">Today's Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {dailyStats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <div>
                    <div className="font-bold text-white">
                      {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                    </div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>


      {/* Game Statistics */}
      <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-white">
            <TrendingUp className="w-5 h-5" />
            <span>Game Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{profileData.level}</div>
              <div className="text-sm text-gray-400">Current Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{profileData.energyLevel}</div>
              <div className="text-sm text-gray-400">Energy Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{profileData.friendsInvited}</div>
              <div className="text-sm text-gray-400">Friends Invited</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{profileData.gamesCompleted}</div>
              <div className="text-sm text-gray-400">Games Completed</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Account Type:</span>
              <div className="flex items-center space-x-1">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-medium">Premium</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Rank:</span>
              <span className="text-white font-medium">#1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Best Streak:</span>
              <span className="text-white font-medium">47 days</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
