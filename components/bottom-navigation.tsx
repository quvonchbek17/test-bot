"use client"

import { Button } from "@/components/ui/button"
import { Home, Pickaxe, Gift, Users, Plane, Gamepad2, User } from "lucide-react"
import type { Page } from "@/app/page"

interface BottomNavigationProps {
  currentPage: Page
  onPageChange: (page: Page) => void
}

const navigationItems = [
  { id: "home" as Page, label: "Home", icon: Home },
  { id: "mine" as Page, label: "Mine", icon: Pickaxe },
  { id: "earn" as Page, label: "Earn", icon: Gift },
  { id: "friends" as Page, label: "Friends", icon: Users },
  { id: "profile" as Page, label: "Profile", icon: User },
  // { id: "airdrop" as Page, label: "Airdrop", icon: Plane },
  // { id: "gamedev" as Page, label: "GameDev", icon: Gamepad2 },
]

export function BottomNavigation({ currentPage, onPageChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-black/95 backdrop-blur-sm border-t border-blue-500/30 shadow-lg">
      <div className="grid grid-cols-5 gap-1 p-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(item.id)}
              className={`flex flex-col items-center space-y-1 h-16 no-hover bg-blue-600/20 text-blue-400`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-semibold">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
