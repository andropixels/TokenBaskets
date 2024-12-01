// config/addresses.ts
export const NETWORK_CONFIG = {
    MAINNET: {
        STELLASWAP_ROUTER: "0xe6d0ED3759709b743707DcfeCAe39BC180C981fe",
        WGLMR: "0xacc15dc74880c9944775448304b263d191c6077f",
        NETWORK_ID: 1284,
        RPC_URL: 'https://rpc.api.moonbeam.network',
        TOKENS: {
            DOT: {
                symbol: "xcDOT",
                address: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
                name: "Polkadot",
                decimals: 18
            },
            // Add other mainnet tokens
        }
    }
};
