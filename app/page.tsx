"use client"

import { useState } from "react"
import { MainDashboard } from "@/components/main-dashboard"
import { MinePage } from "@/components/mine-page"
import { EarnPage } from "@/components/earn-page"
import { FriendsPage } from "@/components/friends-page"
import { AirdropPage } from "@/components/airdrop-page"
import { GameDevPage } from "@/components/gamedev-page"
import { SettingsPage } from "@/components/settings-page"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Toast } from "@/components/toast"

export type Page = "home" | "mine" | "earn" | "friends" | "airdrop" | "gamedev" | "settings"

export default function HamsterKombatApp() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null)

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <MainDashboard showToast={showToast} />
      case "mine":
        return <MinePage showToast={showToast} />
      case "earn":
        return <EarnPage showToast={showToast} />
      case "friends":
        return <FriendsPage showToast={showToast} />
      case "airdrop":
        return <AirdropPage showToast={showToast} />
      case "gamedev":
        return <GameDevPage showToast={showToast} />
      case "settings":
        return <SettingsPage showToast={showToast} />
      default:
        return <MainDashboard showToast={showToast} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black max-w-md mx-auto relative overflow-hidden">
      <div className="pb-20">{renderPage()}</div>
      <BottomNavigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
