'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Sidebar from './Sidebar'
import PortfolioOverview from './PortfolioOverview'
import TokenBaskets from './TokenBaskets'
import TransactionHistory from './TransactionHistory'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import TokenSwap from './TokenSwap'

export default function Dashboard() {
  const [activeView, setActiveView] = useState('overview')
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <PortfolioOverview />
      case 'baskets':
        return <TokenBaskets />
      case 'history':
        return <TransactionHistory />
      case 'swap':
        return <TokenSwap />
      default:
        return <PortfolioOverview />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onDepositClick={() => setIsDepositModalOpen(true)}
          onWithdrawClick={() => setIsWithdrawModalOpen(true)}
        />
        <motion.main 
          className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderActiveView()}
        </motion.main>
      </div>
      <DepositModal isOpen={isDepositModalOpen} onClose={() => setIsDepositModalOpen(false)} />
      <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} />
    </div>
  )
}

