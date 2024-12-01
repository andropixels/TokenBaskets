import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42], // Ethereum networks
})

const walletconnect = new WalletConnectConnector({
  rpc: { 1: process.env.NEXT_PUBLIC_RPC_URL || 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID' },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
})

export const connectMetaMask = async (): Promise<string> => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed. Please install it to connect.')
  }

  try {
    await injected.activate()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    if (accounts && accounts.length > 0) {
      return accounts[0]
    } else {
      throw new Error('No accounts found')
    }
  } catch (error) {
    console.error('Error connecting to MetaMask:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to connect to MetaMask: ${error.message}`)
    } else {
      throw new Error('Failed to connect to MetaMask')
    }
  }
}

export const connectSubWallet = async (): Promise<string> => {
  if (typeof window.injectedWeb3 === 'undefined' || typeof window.injectedWeb3['subwallet-js'] === 'undefined') {
    throw new Error('SubWallet is not installed. Please install it to connect.')
  }

  try {
    const subwallet = window.injectedWeb3['subwallet-js']
    await subwallet.enable()
    const accounts = await subwallet.accounts.get()
    if (accounts && accounts.length > 0) {
      return accounts[0].address
    } else {
      throw new Error('No accounts found')
    }
  } catch (error) {
    console.error('Error connecting to SubWallet:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to connect to SubWallet: ${error.message}`)
    } else {
      throw new Error('Failed to connect to SubWallet')
    }
  }
}

export const connectWalletConnect = async (): Promise<string> => {
  try {
    await walletconnect.activate()
    const account = await walletconnect.getAccount()
    if (account) {
      return account
    } else {
      throw new Error('No account found')
    }
  } catch (error) {
    console.error('Error connecting with WalletConnect:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to connect with WalletConnect: ${error.message}`)
    } else {
      throw new Error('Failed to connect with WalletConnect')
    }
  }
}

