'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { Button } from '@/components/ui/button'
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, TrendingDownIcon, DollarSignIcon, FuelIcon as GasPumpIcon, LayersIcon, BoxIcon, CoinsIcon } from 'lucide-react'

const generateRandomData = (count: number) => {
  const startDate = new Date('2023-01-01')
  const data = []
  let value = 10000

  for (let i = 0; i < count; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
    const change = Math.random() * 1000 - 500
    value += change
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(0, value),
    })
  }

  return data
}

const portfolioData = generateRandomData(180) // 6 months of daily data

const timeRanges = ['1W', '1M', '3M', '6M', 'YTD', '1Y']

// Mock data for invested crates
const investedCrates = [
  { name: 'DOT/GLMR Pool', amount: 500, apy: 5.15 },
  { name: 'USDC/GLMR Pool', amount: 300, apy: 2.92 },
  { name: 'ETH/GLMR Pool', amount: 200, apy: 3.15 },
]

// Mock data for DOT investment
const dotInvestment = 1000

export default function PortfolioOverview() {
  const [selectedRange, setSelectedRange] = useState('1M')
  const [isLoading, setIsLoading] = useState(false)

  const filteredData = portfolioData.slice(-30) // Default to 1 month of data

  const latestValue = filteredData[filteredData.length - 1].value
  const previousValue = filteredData[0].value
  const changePercentage = ((latestValue - previousValue) / previousValue) * 100
  const isPositiveChange = changePercentage >= 0

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  }

  const handleRangeChange = (range: string) => {
    setIsLoading(true)
    setSelectedRange(range)
    // Simulate API call or data processing
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div
        className="lg:col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Portfolio Performance</span>
              <div className="flex space-x-2">
                {timeRanges.map((range) => (
                  <Button
                    key={range}
                    variant={selectedRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleRangeChange(range)}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filteredData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background p-2 border border-border rounded shadow">
                              <p className="text-sm">{`Date: ${payload[0].payload.date}`}</p>
                              <p className="text-sm font-bold">{`Value: ${formatCurrency(payload[0].value)}`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <DollarSignIcon className="mr-2 h-5 w-5 text-purple-400" />
                  Total Value
                </h3>
                <p className="text-3xl font-bold text-purple-400">{formatCurrency(latestValue)}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  {isPositiveChange ? (
                    <TrendingUpIcon className="mr-2 h-5 w-5 text-green-400" />
                  ) : (
                    <TrendingDownIcon className="mr-2 h-5 w-5 text-red-400" />
                  )}
                  {selectedRange} Change
                </h3>
                <p className={`text-2xl font-bold ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositiveChange ? '+' : '-'}{Math.abs(changePercentage).toFixed(2)}%
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <GasPumpIcon className="mr-2 h-5 w-5 text-blue-400" />
                  Gas Savings
                </h3>
                <p className="text-2xl font-bold text-blue-400">{formatCurrency(123.45)}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <LayersIcon className="mr-2 h-5 w-5 text-yellow-400" />
                  Active Baskets
                </h3>
                <p className="text-2xl font-bold text-yellow-400">{investedCrates.length}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <CoinsIcon className="mr-2 h-5 w-5 text-green-400" />
                  DOT Invested
                </h3>
                <p className="text-2xl font-bold text-green-400">{dotInvestment} DOT</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        className="lg:col-span-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Invested Crates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {investedCrates.map((crate, index) => (
                <Card key={index} className="bg-secondary">
                  <CardContent className="p-4">
                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      <BoxIcon className="mr-2 h-5 w-5 text-purple-400" />
                      {crate.name}
                    </h4>
                    <p className="text-sm text-gray-400 mb-1">Amount Invested:</p>
                    <p className="text-xl font-bold text-purple-400 mb-2">{formatCurrency(crate.amount)}</p>
                    <p className="text-sm text-gray-400 mb-1">APY:</p>
                    <p className="text-xl font-bold text-green-400">{crate.apy}%</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

