'use client'

import { motion } from 'framer-motion'
import { PieChartIcon, LayersIcon, ClockIcon, SettingsIcon, HelpCircleIcon } from 'lucide-react'

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: 'overview', icon: PieChartIcon, label: 'Overview' },
    { id: 'baskets', icon: LayersIcon, label: 'Token Baskets' },
    { id: 'history', icon: ClockIcon, label: 'History' },
  ]

  return (
    <motion.nav 
      className="w-64 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-4"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center mb-8">
        {/* <img src="/logo.svg" alt="Logo" className="h-12" /> */}
      </div>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${
                activeView === item.id ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}

