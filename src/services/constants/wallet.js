const WALLET_TYPE = {
  NONE: "none",
  METAMASK: "Metamask",
  TRUST_WALLET: "TrustWallet",
  WALLET_CONNECT: "WalletConnect",
};

const PROVIDER_EVENT = {
  ACC_CHANGED: "accountsChanged",
  CHAIN_CHANGE: "chainChanged",
};

const WALLET_METH = {
  REQ_ACCOUNTS: "eth_requestAccounts",
  REQ_ACCOUNTS_INFURA: "eth_accounts",
  ADD_CHAIN: "wallet_addEthereumChain",
  SWITCH_CHAIN: "wallet_switchEthereumChain",
};

const CHAIN = {
  CRONOS_TEST: {
    INT: 338,
    HEX: "0x152",
    NAME: "Cronos Testnet",
    SYMBOL: "TCRO",
    URL: "https://cronos-testnet-3.crypto.org:8545/",
  },
  BINANCE_TEST: {
    INT: 97,
    HEX: "0x61",
    NAME: "BinanceTestnet",
    SYMBOL: "tBNB",
    NATIVE_NAME: "Binance-Testnet",
    DECIMAL: 18,
    URL: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    LINK: "https://testnet.bscscan.com",
  },
  AVALANCHE_TEST: {
    INT: 43113,
    HEX: "0xA869",
    NAME: "AvalancheFUJIC-Chain",
    SYMBOL: "AVAX",
    NATIVE_NAME: "Avalanche-Testnet",
    DECIMAL: 18,
    URL: "https://api.avax-test.network/ext/bc/C/rpc",
    LINK: "https://testnet.snowtrace.io/",
  },

  // CRONOS_MAIN: {
  //     INT: 338,
  //     HEX: '0x152',
  //     NAME: 'Cronos Mainnet',
  // }
};

const WALLET_PARAM = {
  ADD_CHAIN: {
    chainId: CHAIN.CRONOS_TEST.HEX,
    chainName: CHAIN.CRONOS_TEST.NAME,
    rpcUrls: ["https://cronos-testnet-3.crypto.org:8545/"],
    nativeCurrency: {
      symbol: "TCRO",
      decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.cronoscan.com/"],
  },
  ADD_CHAIN_TBNB: {
    chainId: CHAIN.BINANCE_TEST.HEX,
    chainName: CHAIN.BINANCE_TEST.NAME,
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    nativeCurrency: {
      symbol: "tBNB",
      decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.cronoscan.com/"],
  },
  ADD_CHAIN_AVAX: {
    chainId: CHAIN.AVALANCHE_TEST.HEX,
    chainName: CHAIN.AVALANCHE_TEST.NAME,
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    nativeCurrency: {
      symbol: "AVAX",
      decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.cronoscan.com/"],
  },
};

const INFURA_ID = "e9ef53e4b59f472b892524a49146d3b1";

export {
  CHAIN,
  INFURA_ID,
  WALLET_METH,
  WALLET_TYPE,
  WALLET_PARAM,
  PROVIDER_EVENT,
};
