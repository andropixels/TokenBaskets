'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { WalletIcon } from 'lucide-react'
import WalletSelector from './WalletSelector'

export default function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null)
  const [isWalletSelectorOpen, setIsWalletSelectorOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if there's a stored address in localStorage
    const storedAddress = localStorage.getItem('walletAddress')
    if (storedAddress) {
      setAddress(storedAddress)
    }

    // Setup ethereum event listeners if MetaMask is available
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          handleDisconnect()
        } else {
          handleWalletSelect(accounts[0])
        }
      })

      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }

    // Cleanup listeners
    return () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleWalletSelect)
        window.ethereum.removeListener('chainChanged', () => {})
      }
    }
  }, [])

  const handleWalletSelect = (selectedAddress: string) => {
    setAddress(selectedAddress)
    localStorage.setItem('walletAddress', selectedAddress)
    setIsWalletSelectorOpen(false)
    setError(null)
  }

  const handleDisconnect = () => {
    setAddress(null)
    localStorage.removeItem('walletAddress')
    setError(null)
  }

  const handleConnectClick = () => {
    setIsWalletSelectorOpen(true)
    setError(null)
  }

  return (
    <>
      {address ? (
        <div className="flex items-center space-x-2">
          <WalletIcon className="h-5 w-5 text-green-400" />
          <span className="text-sm">{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
          <Button
            onClick={handleDisconnect}
            variant="outline"
            size="sm"
            className="ml-2 bg-red-600 hover:bg-red-700"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleConnectClick}
          variant="outline"
          className="bg-purple-600 hover:bg-purple-700"
        >
          Connect Wallet
        </Button>
      )}

      {error && (
        <div className="text-red-500 text-sm mt-2 p-2 bg-red-500/10 rounded">
          Error: {error}
        </div>
      )}

      <WalletSelector
        isOpen={isWalletSelectorOpen}
        onClose={() => setIsWalletSelectorOpen(false)}
        onSelect={handleWalletSelect}
      />
    </>
  )
}