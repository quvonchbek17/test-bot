"use client"

import { useEffect, useState } from "react"
import { CheckCircle, XCircle, Info, X } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error" | "info"
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), 2500)
    const fullClose = setTimeout(onClose, 3000)

    return () => {
      clearTimeout(timer)
      clearTimeout(fullClose)
    }
  }, [onClose])

  const getIcon = () => {
    const base = "w-5 h-5"
    switch (type) {
      case "success":
        return <CheckCircle className={`${base} text-green-400`} />
      case "error":
        return <XCircle className={`${base} text-red-400`} />
      case "info":
        return <Info className={`${base} text-blue-400`} />
    }
  }

  const getBackground = () => {
    switch (type) {
      case "success":
        return "from-green-700/70 to-green-900/80"
      case "error":
        return "from-red-700/70 to-red-900/80"
      case "info":
        return "from-blue-700/70 to-blue-900/80"
    }
  }

  return (
    <div
      className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 z-50
        transition-all duration-500
        ${exiting ? "opacity-0 -translate-y-6" : "opacity-100"}
      `}
    >
      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10
          bg-gradient-to-br ${getBackground()}
          text-white shadow-lg backdrop-blur-md max-w-xs w-full
        `}
      >
        {getIcon()}
        <span className="text-sm font-medium break-words flex-1">
          {message}
        </span>
        <button
          onClick={() => setExiting(true)}
          className="text-white/60 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
