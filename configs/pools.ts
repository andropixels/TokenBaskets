// config/pools.ts
export const NETWORKS = {
    moonbaseAlpha: {
        id: 1287,
        name: 'Moonbase Alpha',
        rpc: 'https://rpc.api.moonbase.moonbeam.network'
    }
};

export const POOL_ABI = [
    "function swap(address tokenIn, uint256 amountIn) public",
    "function getReserves() public view returns (uint256, uint256)",
    "function getTokens() public view returns (address, address)"
];

export const ERC20_ABI = [
    "function approve(address spender, uint256 amount) public returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function decimals() view returns (uint8)"
];

export const POOLS = {
    'DOT-DOGE': {
        address: '0x2CD35a15A99342bbc2aC154A082dab3e8BeFF1dF',
        token0: {
            address: "0xc260E227C727c685dB1c6fbcE4263FB1020E5e57",
            symbol: "DOT",
            decimals: 18
        },
        token1: {
            address: "0xb7A7629FC5370258ff3Ea7C75FE63694dB3262E9",
            symbol: "DOGE",
            decimals: 18
        }
    },
    'DOT-PEPE': {
        address: '0x07BD3B3Fa18729f7d34BdeAae25aE3E10a85478f',
        token0: {
            address: "0xc260E227C727c685dB1c6fbcE4263FB1020E5e57",
            symbol: "DOT",
            decimals: 18
        },
        token1: {
            address: "0x88d06AfDBB213DA3D1e90121887A352D5B76020A",
            symbol: "PEPE",
            decimals: 18
        }
    },
    'DOT-SHIB': {
        address: '0x1da1ec1F2143389c7E77c091de4070B0Ca054521',
        token0: {
            address: "0xc260E227C727c685dB1c6fbcE4263FB1020E5e57",
            symbol: "DOT",
            decimals: 18
        },
        token1: {
            address: "0x275B89c3bee9f87ac0bA92681c246B8cb7c19924",
            symbol: "SHIB",
            decimals: 18
        }
    }
} as const;