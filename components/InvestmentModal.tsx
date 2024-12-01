// components/InvestmentModal.tsx
'use client'

import { Root, Portal, Overlay, Content, Title, Close } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { X } from 'lucide-react'
import { ethers } from 'ethers'
import ClientWrapper from './ClientWrapper'
import { Token } from './TokenBaskets'
import { NETWORK_CONFIG } from '../configs/addresses';
const { MAINNET } = NETWORK_CONFIG;

interface InvestmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    basketName: string;
    tokens: Token[];
}

function InvestmentModalContent({ isOpen, onClose, basketName, tokens }: InvestmentModalProps) {
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleInvest = async () => {

        
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            setError('Please enter a valid amount')
            return
        }

        setLoading(true)
        setError('')

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            
            // Convert amount to proper format
            const amountInWei = ethers.utils.parseEther(amount)
            const halfAmountInWei = amountInWei.div(2)
            
            // First swap: GLMR to first token
            const tx1 = await signer.sendTransaction({
                to: tokens[0].address,
                value: halfAmountInWei,
                gasLimit: ethers.utils.hexlify(100000)  // Explicit gas limit
            })

            await tx1.wait()
            console.log('First swap complete:', tx1.hash)

            onClose()
        } catch (error: any) {
            console.error('Investment error:', error)
            // More descriptive error message
            if (error.code === 'INVALID_ARGUMENT') {
                setError('Invalid amount format. Please enter a valid number.')
            } else {
                setError(error.message || 'Failed to process investment')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Root open={isOpen} onOpenChange={onClose}>
            <Portal>
                <Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] 
                    w-[90vw] max-w-[400px] rounded-lg bg-[#1a1b1f] p-6 text-white border border-purple-500">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Title className="text-xl font-semibold text-white">
                                Invest in {basketName}
                            </Title>
                            <Close asChild>
                                <button
                                    className="text-gray-400 hover:text-white"
                                    aria-label="Close"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </Close>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-2">
                                Investment Amount (GLMR)
                            </label>
                            <input
                                type="text"  // Changed from number to text
                                value={amount}
                                onChange={(e) => {
                                    // Only allow numbers and decimals
                                    const value = e.target.value.replace(/[^0-9.]/g, '')
                                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                        setAmount(value)
                                        setError('')
                                    }
                                }}
                                className="w-full px-3 py-2 bg-[#2c2d31] text-white rounded border border-purple-500 
                                    focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter amount (e.g. 1.5)"
                            />
                            <p className="text-sm text-gray-400 mt-1">
                                {amount && !isNaN(Number(amount)) && 
                                    `${Number(amount)/2} GLMR will be swapped for each token`}
                            </p>
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm p-2 bg-red-900/50 rounded border border-red-500">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded bg-[#2c2d31] text-white hover:bg-[#3a3b3f] 
                                    transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleInvest}
                                disabled={loading || !amount || isNaN(Number(amount))}
                                className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 
                                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : 'Confirm Investment'}
                            </button>
                        </div>
                    </div>
                </Content>
            </Portal>
        </Root>
    )
}

export default function InvestmentModal(props: InvestmentModalProps) {
    return (
        <ClientWrapper>
            <InvestmentModalContent {...props} />
        </ClientWrapper>
    );
}