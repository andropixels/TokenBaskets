'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowDownIcon, Settings2Icon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Mock token list - replace with actual tokens from your platform
const tokens = [
  { symbol: 'WGLMR', name: 'Wrapped GLMR', balance: '10.5', icon: '🌟' },
  { symbol: 'USDC', name: 'USD Coin', balance: '1000.00', icon: '💵' },
  { symbol: 'WMOVR', name: 'Wrapped MOVR', balance: '5.2', icon: '🌙' },
  { symbol: 'DOT', name: 'Polkadot', balance: '20.0', icon: '⚪' },
]

export default function TokenSwap() {
  const [tokenFrom, setTokenFrom] = useState(tokens[0].symbol)
  const [tokenTo, setTokenTo] = useState(tokens[1].symbol)
  const [amountFrom, setAmountFrom] = useState('')
  const [amountTo, setAmountTo] = useState('')
  const [slippage, setSlippage] = useState('0.5')
  const [showSettings, setShowSettings] = useState(false)

  const handleSwap = async () => {
    // Implement swap functionality
    console.log('Swapping tokens:', { tokenFrom, tokenTo, amountFrom, amountTo, slippage })
  }

  const switchTokens = () => {
    setTokenFrom(tokenTo)
    setTokenTo(tokenFrom)
    setAmountFrom(amountTo)
    setAmountTo(amountFrom)
  }

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">Swap Tokens</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-400 hover:text-white"
          >
            <Settings2Icon className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* From Token */}
          <div className="rounded-lg bg-gray-900/50 p-4 space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-400">From</label>
              <span className="text-sm text-gray-400">
                Balance: {tokens.find(t => t.symbol === tokenFrom)?.balance || '0.00'}
              </span>
            </div>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="0.00"
                value={amountFrom}
                onChange={(e) => setAmountFrom(e.target.value)}
                className="bg-transparent border-none text-2xl font-semibold focus:ring-0"
              />
              <Select value={tokenFrom} onValueChange={setTokenFrom}>
                <SelectTrigger className="w-[140px] bg-gray-700/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {tokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <div className="flex items-center space-x-2">
                        <span>{token.icon}</span>
                        <span>{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Switch Tokens Button */}
          <div className="flex justify-center -my-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={switchTokens}
              className="bg-gray-800 rounded-full h-8 w-8 p-1 hover:bg-gray-700"
            >
              <ArrowDownIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* To Token */}
          <div className="rounded-lg bg-gray-900/50 p-4 space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-400">To</label>
              <span className="text-sm text-gray-400">
                Balance: {tokens.find(t => t.symbol === tokenTo)?.balance || '0.00'}
              </span>
            </div>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="0.00"
                value={amountTo}
                onChange={(e) => setAmountTo(e.target.value)}
                className="bg-transparent border-none text-2xl font-semibold focus:ring-0"
              />
              <Select value={tokenTo} onValueChange={setTokenTo}>
                <SelectTrigger className="w-[140px] bg-gray-700/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {tokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <div className="flex items-center space-x-2">
                        <span>{token.icon}</span>
                        <span>{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-lg bg-gray-900/50 p-4 space-y-2"
            >
              <label className="text-sm text-gray-400">Slippage Tolerance</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="bg-gray-700/50"
                />
                <span className="text-gray-400">%</span>
              </div>
            </motion.div>
          )}

          {/* Swap Button */}
          <Button
            onClick={handleSwap}
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            Swap Tokens
          </Button>

          {/* Exchange Rate */}
          <div className="text-sm text-gray-400 text-center">
            1 {tokenFrom} = 0.00 {tokenTo}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

