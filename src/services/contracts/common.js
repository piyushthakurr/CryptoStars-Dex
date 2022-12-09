import log from "../logging/logger";
import l_t from "../logging/l_t";
import Wallet from "../wallet"

const CommonF = {
    from: '',
    init: function(p) {
        this.from = p.from;
        console.log("this is ppp ",p);
    },
    sendTx: async function(txObj) {
        // Wallet.init();
        try {
            console.log("inside tx obj",txObj);
            let estimate = await Wallet.provider.estimateGas(txObj);
            console.log("estimate",estimate);
            txObj['gas'] = estimate.toHexString();
            console.log("estimate.toHexString();",estimate.toHexString());
        } catch(e) {
            return new Promise((_, j) => j(l_t.e(e.reason)));
        }
        let txHash = await Wallet.provider.send('eth_sendTransaction', [txObj]);
        return Wallet.provider.waitForTransaction(txHash);
    },
}

export default CommonF;