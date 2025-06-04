"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Users, Gift, Crown, User } from "lucide-react"

interface FriendsPageProps {
  showToast: (message: string, type?: "success" | "error" | "info") => void
}

const friendsList = [
  {
    id: 1,
    username: "CryptoMaster",
    isPremium: true,
    diamonds: 2.5,
    joinDate: "2024-01-15",
    avatar: "👨‍💼",
  },
  {
    id: 2,
    username: "HamsterFan",
    isPremium: false,
    diamonds: 0.8,
    joinDate: "2024-01-20",
    avatar: "👩‍💻",
  },
  {
    id: 3,
    username: "TapKing",
    isPremium: true,
    diamonds: 3.2,
    joinDate: "2024-01-25",
    avatar: "👨‍🎨",
  },
  {
    id: 4,
    username: "CoinCollector",
    isPremium: false,
    diamonds: 1.1,
    joinDate: "2024-02-01",
    avatar: "👩‍🔬",
  },
  {
    id: 5,
    username: "DiamondHands",
    isPremium: true,
    diamonds: 4.7,
    joinDate: "2024-02-05",
    avatar: "👨‍🚀",
  },
]

export function FriendsPage({ showToast }: FriendsPageProps) {
  const [referralLink] = useState("https://t.me/hamster_kombat_bot?start=kentik_12345")

  const totalFriends = friendsList.length
  const premiumFriends = friendsList.filter((friend) => friend.isPremium).length
  const totalDiamonds = friendsList.reduce((sum, friend) => sum + friend.diamonds, 0)

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      showToast("Referral link copied to clipboard!")
    } catch (err) {
      showToast("Failed to copy link", "error")
    }
  }

  const inviteFriend = () => {
    // Simulate opening Telegram
    showToast("Opening Telegram to invite friends...", "info")
  }

  return (
    <div className="p-4 space-y-6">
      {/* Stats Header */}
      {/* <div className="grid grid-cols-2 gap-3">
        <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
          <CardContent className="p-3 text-center">
            <Users className="w-6 h-6 text-blue-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-white">{totalFriends}</div>
            <div className="text-xs text-gray-400">Friends</div>
          </CardContent>
        </Card>


        <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
          <CardContent className="p-3 text-center">
            <Users className="w-6 h-6 text-blue-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-white">{premiumFriends}</div>
            <div className="text-xs text-gray-400">Premium</div>
          </CardContent>
        </Card>

      </div> */}

      {/* Referral Link */}
      <Card className="bg-blue-800/30 border-blue-500/30 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">Invite Friends</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm opacity-90 text-white">Share your referral link and earn diamonds for each friend who joins!</p>

          <div className="flex space-x-2">
            <Input
              value={referralLink}
              readOnly
              className="bg-white/20 border-white/30 text-white placeholder-white/70 flex-1"
            />
            <Button
              onClick={copyReferralLink}
              variant="outline"
              size="sm"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          <Button onClick={inviteFriend} className="w-full bg-blue-500 text-white hover:bg-gray-100 font-medium">
            Invite a Friend
          </Button>
        </CardContent>
      </Card>

      {/* Reward Info */}
      {/* <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4">
          <h3 className="font-bold text-gray-900 mb-3">Referral Rewards</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Regular Account</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">0.1 💎</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-gray-700">Premium Account</span>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">0.3 💎</Badge>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Friends List */}
      <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">Your Friends</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {friendsList.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-blue-500/20"
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{friend.avatar}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">{friend.username}</span>
                    {friend.isPremium && <Crown className="w-4 h-4 text-yellow-400" />}
                  </div>
                  <div className="text-xs text-gray-400">Joined {new Date(friend.joinDate).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-green-400">+{friend.diamonds} 💎</div>
                <div className="text-xs text-gray-500">{friend.isPremium ? "Premium" : "Regular"}</div>
              </div>
            </div>
          ))}

          {friendsList.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No friends invited yet</p>
              <p className="text-sm">Start inviting friends to earn diamonds!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
