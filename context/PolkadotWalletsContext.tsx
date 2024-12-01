'use client'

import React, { createContext, useState, useMemo, useEffect, useContext } from 'react'
import type { BaseWallet, WalletAggregator } from '@polkadot-onboard/core'

interface PolkadotWalletsContextProviderProps {
  children: React.ReactNode
  walletAggregator: WalletAggregator
  initialWaitMs?: number
}

interface PolkadotWalletsContextProps {
  wallets: BaseWallet[] | undefined
}

const PolkadotWalletsContext = createContext<PolkadotWalletsContextProps>({
  wallets: undefined,
})

export const useWallets = () => useContext(PolkadotWalletsContext)

export const PolkadotWalletsContextProvider = ({
  children,
  walletAggregator,
  initialWaitMs = 30,
}: PolkadotWalletsContextProviderProps) => {
  const [wallets, setWallets] = useState<BaseWallet[] | undefined>()

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const wallets = await walletAggregator.getWallets()
      setWallets(wallets)
    }, initialWaitMs)

    return () => clearTimeout(timeoutId)
  }, [walletAggregator, initialWaitMs])

  const contextData = useMemo(
    () => ({
      wallets,
    }),
    [wallets]
  )

  return (
    <PolkadotWalletsContext.Provider value={contextData}>
      {children}
    </PolkadotWalletsContext.Provider>
  )
}

