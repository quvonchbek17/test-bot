"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Settings, Volume2, Wifi, Download, RotateCcw } from "lucide-react"

interface SettingsPageProps {
  showToast: (message: string, type?: "success" | "error" | "info") => void,
  user: any
}

export function SettingsPage({ showToast }: SettingsPageProps) {
  const [settings, setSettings] = useState({
    coinAnimation: true,
    soundEffects: true,
    notifications: true,
    autoTap: false,
    language: "en",
    proxyHost: "",
    proxyPort: "",
    apiToken: "",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = () => {
    // Simulate saving settings
    showToast("Settings saved successfully!")
  }

  const handleLoadSettings = () => {
    // Simulate loading settings from file
    showToast("Settings loaded from file!", "info")
  }

  const handleResetSettings = () => {
    setSettings({
      coinAnimation: true,
      soundEffects: true,
      notifications: true,
      autoTap: false,
      language: "en",
      proxyHost: "",
      proxyPort: "",
      apiToken: "",
    })
    showToast("Settings reset to default!", "info")
  }

  const handleExportSettings = () => {
    const settingsJson = JSON.stringify(settings, null, 2)
    const blob = new Blob([settingsJson], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "hamster-settings.json"
    a.click()
    showToast("Settings exported successfully!")
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-700 to-navy-900 text-white border border-blue-500/30 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-6 h-6" />
            <span>Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm opacity-90">Customize your Hamster Kombat experience</p>
        </CardContent>
      </Card>

      {/* Game Settings */}
      <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">Game Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium text-white">Coin Animation</Label>
              <p className="text-xs text-gray-400">Show animated coins when tapping</p>
            </div>
            <Switch
              checked={settings.coinAnimation}
              onCheckedChange={(checked) => handleSettingChange("coinAnimation", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium flex items-center space-x-2 text-white">
                <Volume2 className="w-4 h-4" />
                <span>Sound Effects</span>
              </Label>
              <p className="text-xs text-gray-400">Enable game sound effects</p>
            </div>
            <Switch
              checked={settings.soundEffects}
              onCheckedChange={(checked) => handleSettingChange("soundEffects", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium text-white">Notifications</Label>
              <p className="text-xs text-gray-400">Receive game notifications</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium text-white">Auto Tap (Demo)</Label>
              <p className="text-xs text-gray-400">Automatic tapping simulation</p>
            </div>
            <Switch checked={settings.autoTap} onCheckedChange={(checked) => handleSettingChange("autoTap", checked)} />
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">Language</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Select Language</Label>
            <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
              <SelectTrigger className="bg-gray-800/50 border-blue-500/30 text-white placeholder-gray-400">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-blue-500/30">
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="ru">🇷🇺 Русский</SelectItem>
                <SelectItem value="uz">🇺🇿 O'zbek</SelectItem>
                <SelectItem value="es">🇪🇸 Español</SelectItem>
                <SelectItem value="fr">🇫🇷 Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Network Settings */}
      <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-white">
            <Wifi className="w-5 h-5" />
            <span>Network Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Proxy Host</Label>
              <Input
                placeholder="proxy.example.com"
                value={settings.proxyHost}
                onChange={(e) => handleSettingChange("proxyHost", e.target.value)}
                className="bg-gray-800/50 border-blue-500/30 text-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Proxy Port</Label>
              <Input
                placeholder="8080"
                value={settings.proxyPort}
                onChange={(e) => handleSettingChange("proxyPort", e.target.value)}
                className="bg-gray-800/50 border-blue-500/30 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">API Token</Label>
            <Input
              type="password"
              placeholder="Enter your API token"
              value={settings.apiToken}
              onChange={(e) => handleSettingChange("apiToken", e.target.value)}
              className="bg-gray-800/50 border-blue-500/30 text-white placeholder-gray-400"
            />
            <p className="text-xs text-gray-400">Your API token for connecting to Telegram</p>
          </div>
        </CardContent>
      </Card>

      {/* Settings Management */}
      <Card className="bg-black/80 backdrop-blur-sm border border-blue-500/30 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">Settings Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700 text-white">
              Save Settings
            </Button>
            <Button
              onClick={handleLoadSettings}
              variant="outline"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-600/20"
            >
              Load Settings
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleExportSettings}
              variant="outline"
              className="border-purple-500 text-purple-600 hover:bg-purple-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              onClick={handleResetSettings}
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This is a demo interface. Settings are not connected to any real automation system.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
