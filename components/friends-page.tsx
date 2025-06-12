"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Users, Gift, Crown, User, Coins } from "lucide-react"
import { useSocket } from "@/lib/SocketContext"

interface FriendsPageProps {
  showToast: (message: string, type?: "success" | "error" | "info") => void,
  tgUser: any
}

export function FriendsPage({ showToast, tgUser }: FriendsPageProps) {
  const { coinSocket } = useSocket();
  const [user, setUser] = useState(tgUser)
  const [referralLink, setReferralLink] = useState(`https://t.me/coinmainertestbot?start=${user.refCode}`)

    // Socket.IO ulanishini boshqarish
    useEffect(() => {
      if (coinSocket) {
        coinSocket.emit('getUserDatas', { id: tgUser.id });
        coinSocket.on('getUserDatasResponse', (data) => {
          setReferralLink(`https://t.me/coinmainertestbot?start=${data.refCode}`)
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

      {/* Referral Link */}
      <Card className="bg-blue-800/30 border-blue-500/30 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">Invite Friends</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm opacity-90 text-white">Share your referral link and earn coins for each friend who joins!</p>

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

      {/* Friends List */}
      <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">Your Friends</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {user.referredUsers && user.referredUsers?.map((friend: any) => (
            <div
              key={friend.id}
              className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-blue-500/20"
            >
              <div className="flex items-center space-x-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">{friend?.first_name || friend?.last_name ? `${friend?.first_name || ""} ${friend?.last_name || ""}` : "Use in Telegram"}</span>
                  </div>
                  <div className="text-xs text-gray-400">Joined {new Date(friend.createdAt).toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\./g, '-')}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-green-400">+{10000} <Coins className="w-4 h-4 text-yellow-400" /></div>
              </div>
            </div>
          ))}

          {user?.referredUsers?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No friends invited yet</p>
              <p className="text-sm">Start inviting friends to earn coins!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
