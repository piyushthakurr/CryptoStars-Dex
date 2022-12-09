import { ethers } from "ethers";
import { ABI } from "../constants/abi";
import { ADDRESS } from "../constants/common";
import { METH } from "../constants/contracts";
import log from "../logging/logger";
import Wallet from "../wallet";

import CommonF from "./common";

const RouterContract = {
  get contract() {
    // Wallet.init();
    const localChainId = localStorage.getItem("staticNwId");
    if (localChainId == 338) {
      return new ethers.Contract(
        ADDRESS.ROUTER_CONTRACT,
        ABI.RouterContract,
        Wallet.provider
      );
    } else if (localChainId == 97) {
      return new ethers.Contract(
        ADDRESS.ROUTER_CONTRACT2,
        ABI.RouterContract,
        Wallet.provider
      );
    } else if (localChainId == 43113) {
      return new ethers.Contract(
        ADDRESS.ROUTER_CONTRACT3,
        ABI.RouterContract,
        Wallet.provider
      );
    }
  },
  get iface() {
    return new ethers.utils.Interface(ABI.RouterContract);
  },
  bytecode: function (meth, values) {
    return this.iface.encodeFunctionData(meth, values);
  },
  getAmountsIn: function (params) {
    return this.contract[METH.ROUTER_CONTRACT.AMOUNTS_IN](...params);
  },
  getAmountsOut: function (params) {
    return this.contract[METH.ROUTER_CONTRACT.AMOUNTS_OUT](...params);
  },
  swapUnpairedTokenByswapExactTokensForTokens: async function (params) {
    console.log("swapUnpairedTokenModifiedCall111111");
    const localChainId = localStorage.getItem("staticNwId");
    let txObj;
    if (localChainId == 338) {
      txObj = {
        from: CommonF.from,
        to: ADDRESS.ROUTER_CONTRACT,
        data: this.bytecode(METH.ROUTER_CONTRACT.SWAP_TKN_XACT_TKN, [
          ...params,
        ]),
      };
    } else if (localChainId == 97) {
      txObj = {
        from: CommonF.from,
        to: ADDRESS.ROUTER_CONTRACT2,
        data: this.bytecode(METH.ROUTER_CONTRACT.SWAP_TKN_XACT_TKN, [
          ...params,
        ]),
      };
    } else if (localChainId == 43113) {
      txObj = {
        from: CommonF.from,
        to: ADDRESS.ROUTER_CONTRACT3,
        data: this.bytecode(METH.ROUTER_CONTRACT.SWAP_TKN_XACT_TKN, [
          ...params,
        ]),
      };
    }
    return CommonF.sendTx(txObj);
  },
  swapUnpairedTokenByswapTokensForExactTokens: function (params) {
    console.log("swapUnpairedTokenModifiedCal2222222222");
    const localChainId = localStorage.getItem("staticNwId");
    let txObj;
    if (localChainId == 338) {
      txObj = {
        from: CommonF.from,
        to: ADDRESS.ROUTER_CONTRACT,
        data: this.bytecode(METH.ROUTER_CONTRACT.SWAP_XACT_TKN_TKN, [
          ...params,
        ]),
      };
      console.log("txObj112",txObj);
    } else if (localChainId == 97) {
      txObj = {
        from: CommonF.from,
        to: ADDRESS.ROUTER_CONTRACT2,
        data: this.bytecode(METH.ROUTER_CONTRACT.SWAP_XACT_TKN_TKN, [
          ...params,
        ]),
      };
    } else if (localChainId == 43113) {
      txObj = {
        from: CommonF.from,
        to: ADDRESS.ROUTER_CONTRACT3,
        data: this.bytecode(METH.ROUTER_CONTRACT.SWAP_XACT_TKN_TKN, [
          ...params,
        ]),
      };
    }
    return CommonF.sendTx(txObj);
  },
  swap_TT: function (params, isTokenAExact) {
    log.i("swap_TT called with:params", params);
    return isTokenAExact
      ? this.swapUnpairedTokenByswapExactTokensForTokens(params)
      : this.swapUnpairedTokenByswapTokensForExactTokens(params);
  },
  addLiquidity: function (params) {
    let txObj = {
      from: CommonF.from,
      to: ADDRESS.ROUTER_CONTRACT,
      data: this.bytecode(METH.ROUTER_CONTRACT.ADD_LIQ, [...params]),
    };
    return CommonF.sendTx(txObj);
  },
};

export default RouterContract;
