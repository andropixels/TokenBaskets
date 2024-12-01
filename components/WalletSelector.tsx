'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'

// Utility function to handle MetaMask connection
async function connectMetaMask(): Promise<string> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask is not installed')
  }

  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    })
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found')
    }

    return accounts[0]
  } catch (error) {
    console.error('MetaMask connection error:', error)
    throw new Error('Failed to connect to MetaMask')
  }
}

// Utility function to handle SubWallet connection
async function connectSubWallet(): Promise<string> {
  if (typeof window === 'undefined' || !window.SubWallet) {
    throw new Error('SubWallet is not installed')
  }

  try {
    const accounts = await window.SubWallet.enable()
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found')
    }
    return accounts[0]
  } catch (error) {
    console.error('SubWallet connection error:', error)
    throw new Error('Failed to connect to SubWallet')
  }
}

// Utility function to handle WalletConnect
async function connectWalletConnect(): Promise<string> {
  throw new Error('WalletConnect implementation pending')
}

const walletOptions = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '/metamask.svg',
    connectFunction: connectMetaMask,
  },
  {
    id: 'subwallet',
    name: 'SubWallet',
    icon: '/subwallet.svg',
    connectFunction: connectSubWallet,
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: '/walletconnect.svg',
    connectFunction: connectWalletConnect,
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable Domains',
    icon: '/unstoppable.svg',
    connectFunction: async () => { throw new Error('Unstoppable Domains connection is not implemented yet') },
  },
  {
    id: 'talisman',
    name: 'Talisman',
    icon: '/talisman.svg',
    connectFunction: async () => { throw new Error('Talisman connection is not implemented yet') },
  },
]

interface WalletSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (address: string) => void
}

export default function WalletSelector({ isOpen, onClose, onSelect }: WalletSelectorProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleWalletSelect = async (wallet: typeof walletOptions[0]) => {
    setIsConnecting(true)
    setError(null)
    try {
      const address = await wallet.connectFunction()
      onSelect(address)
      onClose()
    } catch (err) {
      console.error('Failed to connect wallet:', err)
      setError(err instanceof Error ? err.message : 'Failed to connect wallet')
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-[#1C1C1C] border-gray-800">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl text-white">Select a Wallet</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="text-sm text-gray-400 -mt-2">Connect to a wallet</div>
        <div className="space-y-2 my-4">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => handleWalletSelect(wallet)}
              disabled={isConnecting}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg
                bg-gray-800/50 hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-white">{wallet.name}</span>
              
            </button>
          ))}
        </div>
        {error && (
          <div className="text-red-500 text-sm mb-4 p-2 bg-red-500/10 rounded">
            Error: {error}
          </div>
        )}
        {isConnecting && (
          <div className="text-blue-500 text-sm mb-4 p-2 bg-blue-500/10 rounded">
            Connecting... Please check your wallet for any required actions.
          </div>
        )}
        <div className="text-sm text-gray-400">
          New to Crypto?{' '}
          <a
            href="#"
            className="text-[#FF00FF] hover:text-[#FF40FF] transition-colors"
          >
            Learn more about wallets
          </a>
        </div>
        <div className="text-xs text-gray-500">
          By connecting a wallet, you agree to our{' '}
          <a
            href="#"
            className="text-[#FF00FF] hover:text-[#FF40FF] transition-colors"
          >
            Terms & Conditions
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}