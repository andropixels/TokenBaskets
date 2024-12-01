'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import InvestmentModal from './InvestmentModal'
import { NETWORK_CONFIG } from '../configs/addresses'
import { TrendingUpIcon, CoinsIcon, BarChart3Icon, ClockIcon } from 'lucide-react'

const { MAINNET } = NETWORK_CONFIG

// Contract addresses
export const STELLASWAP_ROUTER = "0xe6d0ED3759709b743707DcfeCAe39BC180C981fe"
export const WGLMR = "0xAcc15dC74880C9944775448304B263D191c6077F"

export interface Token {
    symbol: string
    address: string
    name: string
    decimals: number
}

interface Basket {
    id: number
    name: string
    tokens: Token[]
    tvl: string
    volume: string
    apr: string
    yearPerformance: string
    riskLevel: 'Low Risk' | 'Medium Risk' | 'High Risk'
    description: string
}

// Token definitions
const TOKENS = {
    DOT: {
        symbol: "DOT.xc",
        address: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
        name: "Polkadot",
        decimals: 18
    },
    GLMR: {
        symbol: "GLMR",
        address: "0xAcc15dC74880C9944775448304B263D191c6077F",
        name: "Glimmer",
        decimals: 18
    },
    USDC: {
        symbol: "USDC",
        address: "0x931715FEE2d06333043d11F658C8CE934aC61D0c",
        name: "USD Coin",
        decimals: 6
    },
    WELL: {
        symbol: "WELL",
        address: "0x511aB53F793683763E5a8829738301368a2411E3",
        name: "WELL",
        decimals: 18
    },
    ETH: {
        symbol: "ETH",
        address: "0xfA9343C3897324496A05fC75abeD6bAC29f8A40f",
        name: "Ethereum",
        decimals: 18
    },
    WBTC: {
        symbol: "WBTC.wh",
        address: "0x922D641a426DcFFaeF11680e5358F34d97d112E1",
        name: "Wrapped Bitcoin",
        decimals: 8
    },
    USDT: {
        symbol: "USDT",
        address: "0xFFFFFFFF1FCacBd218EDc0EbA20Fc2308C778080",
        name: "Tether USD",
        decimals: 6
    },
    AAVE: {
        symbol: "AAVE.wh",
        address: "0xFFFFFFFF52C56A9257bB97f4B2b6F7B2D624ecda",
        name: "Aave",
        decimals: 18
    }
} as const

// Updated baskets with varied token combinations
const baskets: Basket[] = [
    {
        id: 1,
        name: 'DOT/GLMR Pool',
        tokens: [TOKENS.DOT, TOKENS.GLMR],
        tvl: '$3.14M',
        volume: '$1.71M',
        apr: '5.15%',
        yearPerformance: '+15.2%',
        riskLevel: 'Medium Risk',
        description: 'A balanced pool combining Polkadots ecosystem token with Moonbeams native currency.'
    },
    {
        id: 2,
        name: 'USDC/GLMR/DOT Trio',
        tokens: [TOKENS.USDC, TOKENS.GLMR, TOKENS.DOT],
        tvl: '$2.5M',
        volume: '$1.2M',
        apr: '4.8%',
        yearPerformance: '+11.7%',
        riskLevel: 'Medium Risk',
        description: 'A diversified pool combining stability, native currency, and ecosystem potential.'
    },
    {
        id: 3,
        name: 'ETH/GLMR/WBTC/USDC Quad',
        tokens: [TOKENS.ETH, TOKENS.GLMR, TOKENS.WBTC, TOKENS.USDC],
        tvl: '$5.2M',
        volume: '$3.1M',
        apr: '6.2%',
        yearPerformance: '+18.9%',
        riskLevel: 'High Risk',
        description: 'A high-potential pool linking major cryptocurrencies with Moonbeam and stablecoin stability.'
    },
    {
        id: 4,
        name: 'WBTC/GLMR Pool',
        tokens: [TOKENS.WBTC, TOKENS.GLMR],
        tvl: '$1.8M',
        volume: '$950K',
        apr: '4.25%',
        yearPerformance: '+28.1%',
        riskLevel: 'High Risk',
        description: 'A dynamic pool combining Bitcoins market dominance with Moonbeam\'s growth potential.'
    },
    {
        id: 5,
        name: 'WELL/USDC/USDT Trio',
        tokens: [TOKENS.WELL, TOKENS.USDC, TOKENS.USDT],
        tvl: '$1.2M',
        volume: '$750K',
        apr: '3.75%',
        yearPerformance: '+12.3%',
        riskLevel: 'Low Risk',
        description: 'A balanced option pairing a promising DeFi token with major stablecoins for moderate growth and high stability.'
    },
    {
        id: 6,
        name: 'ETH/GLMR/AAVE Pool',
        tokens: [TOKENS.ETH, TOKENS.GLMR, TOKENS.AAVE],
        tvl: '$2.8M',
        volume: '$1.5M',
        apr: '5.5%',
        yearPerformance: '+20.7%',
        riskLevel: 'High Risk',
        description: 'A DeFi-focused pool combining Ethereum, Moonbeam, and Aave for high growth potential.'
    }
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'Low Risk':
      return 'text-green-500'
    case 'Medium Risk':
      return 'text-yellow-500'
    case 'High Risk':
      return 'text-red-500'
    default:
      return 'text-muted-foreground'
  }
}

export default function TokenBaskets() {
    const [selectedBasket, setSelectedBasket] = useState<Basket | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleInvestClick = (basket: Basket) => {
        setSelectedBasket(basket)
        setIsModalOpen(true)
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {baskets.map((basket, index) => (
                    <motion.div
                        key={basket.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-foreground">{basket.name}</h3>
                                    <span className={`text-sm ${getRiskColor(basket.riskLevel)}`}>
                                        {basket.riskLevel}
                                    </span>
                                </div>
                                
                                <div className="mb-4">
                                    <h4 className="text-sm text-muted-foreground mb-2">Tokens:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {basket.tokens.map((token) => (
                                            <span 
                                                key={token.symbol}
                                                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm font-medium"
                                            >
                                                {token.symbol}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <CoinsIcon className="h-4 w-4 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">TVL:</p>
                                            <p className="font-medium text-foreground">{basket.tvl}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BarChart3Icon className="h-4 w-4 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">24h Volume:</p>
                                            <p className="font-medium text-foreground">{basket.volume}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUpIcon className="h-4 w-4 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">APR:</p>
                                            <p className="font-medium text-green-500">{basket.apr}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ClockIcon className="h-4 w-4 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">1Y Performance:</p>
                                            <p className="font-medium text-accent">{basket.yearPerformance}</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground mb-4">
                                    {basket.description}
                                </p>

                                <Button 
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                    onClick={() => handleInvestClick(basket)}
                                    disabled={loading}
                                >
                                    Invest
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {selectedBasket && (
                <InvestmentModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setSelectedBasket(null)
                    }}
                    basketName={selectedBasket.name}
                    tokens={selectedBasket.tokens}
                />
            )}
        </>
    )
}
