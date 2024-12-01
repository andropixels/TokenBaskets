'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import WalletConnect from './WalletConnect'

interface HeaderProps {
  onDepositClick: () => void
  onWithdrawClick: () => void
}

export default function Header({ onDepositClick, onWithdrawClick }: HeaderProps) {
  return (
    <motion.header 
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-4 flex justify-between items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4">
        <WalletConnect />
      </div>
      <div className="flex items-center space-x-4">
        <Button onClick={onDepositClick} variant="outline" className="bg-purple-600 hover:bg-purple-700">
          <ArrowDownIcon className="mr-2 h-4 w-4" /> Deposit
        </Button>
        <Button onClick={onWithdrawClick} variant="outline" className="bg-blue-600 hover:bg-blue-700">
          <ArrowUpIcon className="mr-2 h-4 w-4" /> Withdraw
        </Button>
      </div>
    </motion.header>
  )
}

