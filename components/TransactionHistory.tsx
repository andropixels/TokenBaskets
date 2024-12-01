'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowDownIcon, ArrowUpIcon, SearchIcon, FilterIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Transaction {
  id: number
  type: 'deposit' | 'withdraw'
  amount: number
  token: string
  date: string
  status: 'completed' | 'pending' | 'failed'
  fromAddress?: string
  toAddress?: string
}

const transactions: Transaction[] = [
  { id: 1, type: 'deposit', amount: 1000, token: 'USDC', date: '2023-06-01', status: 'completed', fromAddress: '0x1234...5678', toAddress: '0xabcd...efgh' },
  { id: 2, type: 'withdraw', amount: 0.5, token: 'ETH', date: '2023-05-28', status: 'pending', fromAddress: '0xabcd...efgh', toAddress: '0x8765...4321' },
  { id: 3, type: 'deposit', amount: 2000, token: 'USDC', date: '2023-05-25', status: 'completed', fromAddress: '0x2468...1357', toAddress: '0xabcd...efgh' },
  { id: 4, type: 'withdraw', amount: 100, token: 'GLMR', date: '2023-05-20', status: 'failed', fromAddress: '0xabcd...efgh', toAddress: '0x1357...2468' },
  { id: 5, type: 'deposit', amount: 5, token: 'DOT', date: '2023-05-15', status: 'completed', fromAddress: '0x9876...5432', toAddress: '0xabcd...efgh' },
]

export default function TransactionHistory() {
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdraw'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.type === filter
    const matchesSearch = transaction.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.date.includes(searchTerm) ||
                          transaction.amount.toString().includes(searchTerm)
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500'
      case 'pending':
        return 'text-yellow-500'
      case 'failed':
        return 'text-red-500'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative w-full sm:w-64">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search transactions..."
              className="pl-10 w-full bg-background text-foreground border-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={(value: 'all' | 'deposit' | 'withdraw') => setFilter(value)}>
            <SelectTrigger className="w-full sm:w-40 bg-background text-foreground border-input">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdraw">Withdrawals</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <AnimatePresence>
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${transaction.type === 'deposit' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                          {transaction.type === 'deposit' ? (
                            <ArrowDownIcon className="text-green-500" />
                          ) : (
                            <ArrowUpIcon className="text-red-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{transaction.type === 'deposit' ? 'Deposit' : 'Withdraw'}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{transaction.amount} {transaction.token}</p>
                        <p className={`text-sm ${getStatusColor(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>From: {transaction.fromAddress}</p>
                      <p>To: {transaction.toAddress}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </CardContent>
    </Card>
  )
}

