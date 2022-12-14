import { createSlice } from "@reduxjs/toolkit";
import l_t from "../../../services/logging/l_t";
import log from "../../../services/logging/logger";
import GEN_ICON from "../../../Assets/Images/token_icons/Gen.svg";
import {
  contains,
  evDispatch,
  getTokenListDiff,
  isNaNy,
  notEqual,
  rEqual,
  toFixed,
  tStampJs,
} from "../../../services/utils";
import {
  EVENT,
  MISC,
  TOKEN_INIT,
  TOKEN_LIST_STATIC,
} from "../../../services/constants/common";

export const swapSlice = createSlice({
  name: "swap",
  initialState: {
    isExactIn: !0,
    xchangeEq: "",
    validSwap: !1,
    token2_addr: "",
    recentTxList: [],
    token1_approved: !0,
    token2_icon: `${GEN_ICON}`,
    token2_sym: MISC.SEL_TOKEN,
    slippage: MISC.DEF_SLIPPAGE,
    tokenList: TOKEN_LIST_STATIC,
    deadLine: MISC.SWAP_DEAD_LINE,
    token1_value: TOKEN_INIT.VAL(),
    token2_value: TOKEN_INIT.VAL(),
    token1_sym: MISC.SEL_TOKEN,
    tokenList_chg: TOKEN_LIST_STATIC,
    token1_addr: "",
    token1_icon: `${GEN_ICON}`,
    isUpDownToggle: !1,
    tokenInfoForUI: {
      icon: "",
      addr: "",
      name: "",
      symbol: "",
      balance: 0,
      totalSupply: 0,
      burntAmount: 0,
      initialSupply: 0,
    },
    players: [],
  },

  reducers: {
    setTokenValue: (state, action) => {
      let n = action.payload.n;
      if (n === 0) {
        state.token1_value.ui = action.payload.v;
        state.token2_value.ui = action.payload.v;
        state.token1_value.actual = action.payload.v;
        state.token2_value.actual = action.payload.v;
      } else {
        let v = action.payload.v;
        state[`token${n}_value`].ui = v.ui;
        state[`token${n}_value`].actual = v.actual;
      }
    },
    setTokenInfo: (state, action) => {
      log.i("setting token infos:", action.payload);
      if (rEqual(action.payload.n, 0)) {
        if (action.payload.isUpDown) {
          state.token1_sym = action.payload.sym[0];
          state.token2_sym = action.payload.sym[1];

          state.token1_icon = action.payload.icon[0];
          state.token2_icon = action.payload.icon[1];

          state.token1_addr = action.payload.addr[0];
          state.token2_addr = action.payload.addr[1];
          state.isUpDownToggle = !state.isUpDownToggle;
        } else {
          state.token1_sym = MISC.SEL_TOKEN;
          state.token2_sym = MISC.SEL_TOKEN;

          state.token2_icon = `${GEN_ICON}`;
          state.token1_icon = `${GEN_ICON}`;

          state.token1_addr = "";
          state.token2_addr = "";
        }
        evDispatch(EVENT.TOKEN_SELECTION, {
          selectedToken: action.payload.n,
          addrList: [state.token1_addr, state.token2_addr],
        });
      } else {
        const otherN = rEqual(action.payload.n, 1) ? 2 : 1;
        if (
          rEqual(state[`token${action.payload.n}_addr`], action.payload.addr) &&
          !action.payload.reset
        ) {
          l_t.w("already selected!");
        } else if (
          rEqual(state[`token${otherN}_addr`], action.payload.addr) &&
          !action.payload.reset
        ) {
          l_t.w("both tokens can't be same!");
        } else {
          // log.i('setTokenInfo to:', action.payload);
          state.token1_value.ui = "";
          state.token2_value.ui = "";
          state.token1_value.actual = "";
          state.token2_value.actual = "";
          state[`token${action.payload.n}_sym`] = action.payload.sym;
          state[`token${action.payload.n}_icon`] = action.payload.icon;
          state[`token${action.payload.n}_addr`] = action.payload.addr;
          if (action.payload.reset) {
            state[`token${otherN}_sym`] = MISC.SEL_TOKEN;
            state[`token${otherN}_icon`] = `${GEN_ICON}`;
            state[`token${otherN}_addr`] = "";
          }
          evDispatch(EVENT.TOKEN_SELECTION, {
            selectedToken: action.payload.n,
            addrList: [action.payload.addr],
          });
        }
      }
    },
    addToTokenList: (state, action) => {
      console.log("tokenList_chg111111");
      state.tokenList.push({
        ...action.payload,
      });
      state.tokenList_chg = [...state.tokenList];
    },
    saveTxHash: (state, action) => {
      // const localChainId = localStorage.getItem("staticNwId");
      // if exceeded, remove most old one!
      console.log("state.recentTxList.length", state.recentTxList.length);
      if (state.recentTxList.length >= MISC.MAX_RECENT_TXS)
        state.recentTxList.splice(0, 1);
      state.recentTxList.unshift({
        tStampJs: tStampJs(),
        hash: action.payload.txHash,
        pair: action.payload.pair,
        localChainId: action.payload.localChainId,
      });
    },
    setDeadLine: (state, action) => {
      state.deadLine = action.payload;
    },
    setSlippage: (state, action) => {
      state.slippage = action.payload;
    },
    setIsExactIn: (state, action) => {
      state.isExactIn = action.payload;
    },
    setXchangeEq: (state, action) => {
      state.xchangeEq = action.payload;
    },
    setValidSwap: (state, action) => {
      state.validSwap = action.payload;
    },
    addPlayers: (state, action) => {
      console.log("playersSSSSSSSSS");
      state.players = [...action.payload];
    },
    addOnePlayer: (state, action) => {
      state.players.push(action.payload);
    },
    setToken1Approved: (state, action) => {
      state.token1_approved = action.payload;
    },
    changeTokenList: (state, action) => {
      // console.log("tokenList_chg2222");
      state.tokenList_chg = [...action.payload];
    },
    setTokenInfoForUI: (state, action) => {
      console.log(" ...action.payload ",state );
      state.tokenInfoForUI = { ...action.payload };
    },
    addTokensToTokenList: (state, action) => {
      console.log("tokenList_chg333333333");
      state.tokenList = [
        ...state.tokenList,
        ...getTokenListDiff(action.payload, state.tokenList),
      ];
      state.tokenList_chg = [
        ...state.tokenList,
        ...getTokenListDiff(action.payload, state.tokenList),
      ];
    },
  },
});

const { reducer, actions } = swapSlice;

export const {
  setPair,
  saveTxHash,
  addPlayers,
  setDeadLine,
  setSlippage,
  setValidSwap,
  setXchangeEq,
  setTokenInfo,
  addOnePlayer,
  setIsExactIn,
  setTokenValue,
  addToTokenList,
  changeTokenList,
  setToken1Approved,
  setTokenInfoForUI,
  addTokensToTokenList,
} = actions;

export default reducer;
