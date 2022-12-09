import { ethers } from "ethers";
import { ABI } from "../constants/abi";
import { ADDRESS } from "../constants/common";
import Wallet from "../wallet";

import CommonF from "./common";

const FaucetContract = {
  get contract() {
    const localChainId = localStorage.getItem("staticNwId");
    console.log("herher i m");
    if (localChainId == 338) {
      return new ethers.Contract(
        ADDRESS.CST_FAUCET_CONTRACT,
        ABI.CSTFaucetContract,
        Wallet.provider
      );
    } else if (localChainId == 97) {
      console.log("herher i m  2");

      return new ethers.Contract(
        ADDRESS.CST_FAUCET_CONTRACT2,
        ABI.CSTFaucetContract,
        Wallet.provider
      );
    } else if (localChainId == 43113) {
      return new ethers.Contract(
        ADDRESS.CST_FAUCET_CONTRACT3,
        ABI.CSTFaucetContract,
        Wallet.provider
      );
    }
    // Wallet.init();
    // return new ethers.Contract(
    //   ADDRESS.CST_FAUCET_CONTRACT,
    //   ABI.CSTFaucetContract,
    //   Wallet.provider
    // );
  },
  get iface() {
    return new ethers.utils.Interface(ABI.CSTFaucetContract);
  },
  bytecode: function (meth, values) {
    return this.iface.encodeFunctionData(meth, values);
  },
  hasClaimed: function (addr) {
    console.log("addddddddddddr", addr);
    return this.contract.hasClaimed(addr);
  },

  claimCST: function () {
    const localChainId = localStorage.getItem("staticNwId");
    let txObj;
    if (localChainId == 338) {
      console.log("claimCST338");
      txObj = {
        from: CommonF.from,
        to: ADDRESS.CST_FAUCET_CONTRACT,
        data: this.bytecode("claim", []),
      };
    } else if (localChainId == 97) {
      console.log("claimCST97");

      txObj = {
        from: CommonF.from,
        to: ADDRESS.CST_FAUCET_CONTRACT2,
        data: this.bytecode("claim", []),
      };
    } else if (localChainId == 43113) {
      console.log("claimCST43113");

      txObj = {
        from: CommonF.from,
        to: ADDRESS.CST_FAUCET_CONTRACT3,
        data: this.bytecode("claim", []),
      };
    }
    console.log("RRRRRRRRRR", txObj);
    return CommonF.sendTx(txObj);
  },
};

export default FaucetContract;
