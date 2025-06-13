"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { User, Edit3, X, Trophy, Calendar, Coins, Zap, Star, TrendingUp, Crown, Target, Clock, Gift } from "lucide-react"
import { TfiApple, TfiCrown, TfiCup, TfiFaceSmile, TfiInfoAlt, TfiPowerOff, TfiStatsUp, TfiUser, TfiWallet, TfiWand } from "react-icons/tfi";
import { MdOutlineEdit } from "react-icons/md";
import { useSocket } from "@/lib/SocketContext"
import { useUser } from "@/lib/UserContext"

interface ProfilePageProps {
  showToast: (message: string, type?: "success" | "error" | "info") => void,
  tgUser: any
}


export function ProfilePage({ showToast, tgUser }: ProfilePageProps) {
  const { coinSocket } = useSocket();
  const textRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const {user, setUser} = useUser()
  const [shouldScroll, setShouldScroll] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    avatar: <TfiFaceSmile />,
  })

  // Socket.IO ulanishini boshqarish
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
    }
  }, [coinSocket, tgUser.id]);

  useEffect(() => {

    const textWidth = textRef.current?.scrollWidth || 0
    const containerWidth = containerRef.current?.offsetWidth || 0
    setShouldScroll(textWidth > containerWidth)
  }, [])

  const handleSaveProfile = () => {
    setIsEditing(false)
    showToast("Profile updated successfully!")
  }


  const getAvatarOptions = () => [<TfiFaceSmile />, <TfiApple />, <TfiCrown />, <TfiCup />, <TfiInfoAlt />, <TfiPowerOff />, <TfiStatsUp />, <TfiUser />, <TfiWand />, <TfiWallet />]

const calculateTimeSinceJoined = (joinDate: string | Date): string => {
  const now = new Date();
  const joined = new Date(joinDate);
  const diffMs = now.getTime() - joined.getTime(); // Millisekundlarda farq
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // Kunlar
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Soatlar
  return `${days} days ${hours} hours`;
};

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <Card className="bg-black/20 text-white border border-blue-500/30 border-[2px] shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="w-6 h-6" />
              <span className="text-[20px]">ID: {tgUser?.id || "Use in Telegram"}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              {isEditing ? <X className="w-4 h-4 mr-1" /> : <Edit3 className="w-4 h-4 mr-1" />}
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
                      className={`text-3xl p-2 rounded-lg transition-all text-blue-400 ${profileData.avatar === avatar ? "bg-white/30 scale-110" : "bg-white/10 hover:bg-white/20"
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
                  <div ref={containerRef} className="w-[220px] overflow-hidden whitespace-nowrap relative">
                    <h2
                      ref={textRef}
                      className={`inline-block text-2xl font-bold ${shouldScroll ? "animate-scroll" : ""
                        }`}
                    >
                      {tgUser?.first_name || tgUser?.last_name ? `${tgUser?.first_name || ""} ${tgUser?.last_name || ""}` : "Use in Telegram"}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-4 text-sm opacity-90">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(user.createdAt).toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\./g, '-')}</span>
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
            <div className="text-xl font-bold text-white">{user?.coins?.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Coins</div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{user?.energyCapacity?.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Energy Capacity</div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Stats */}
      <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
        <CardHeader className="pb-3">
          {/* <CardTitle className="text-lg text-white">Infos</CardTitle> */}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Star className={`w-5 h-5 text-green-400`} />
              <div>
                <div className="font-bold text-white">
                  Level
                </div>
                <div className="text-[15px] text-gray-400">{user.level}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <User className={`w-5 h-5 text-fuchsia-400`} />
              <div>
                <div className="font-bold text-white">
                  Since Join
                </div>
                <div className="text-[15px] text-gray-400">{calculateTimeSinceJoined(user.createdAt)}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Target className={`w-5 h-5 text-blue-400`} />
              <div>
                <div className="font-bold text-white">
                  Tap Power
                </div>
                <div className="text-[15px] text-gray-400">{user.clickQuality} / Tap</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Zap className={`w-5 h-5 text-yellow-400`} />
              <div>
                <div className="font-bold text-white">
                  Recharge Rate
                </div>
                <div className="text-[15px] text-gray-400">{user.energyQuality} / Sec</div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>


      {/* Game Statistics */}
      {/* <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
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
      </Card> */}

      <style jsx>{`
    @keyframes scroll {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
    .animate-scroll {
      animation: scroll 15s linear infinite;
    }
  `}</style>
    </div>
  )
}
