import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Form } from "react-bootstrap";
import log from "../../../services/logging/logger";
import SelectTokenModal from "../Modal/SelectTokenModal";
import "./inputStyle.scss";
import { useSelector } from "react-redux";

const CustomInputGroup = ({ className, icon, title, states }) => {
  const swap = useSelector((s) => s.swap);
  const [show, setShow] = useState(false);
  const [tokenData, setTokenData] = useState([]);

  // console.log("swapPPPPPPPPP", swap?.tokenList_chg);
  useEffect(() => {
    const localChainId = localStorage.getItem("staticNwId");
    let tokenList_chg = swap.tokenList_chg[0];
    setTokenData(tokenList_chg);
  }, [swap.tokenList_chg]);

  useEffect(
    (_) => {
      log.w("show bal change ", states.token.showBalance);
      console.log("state.token", states.token.balance);
    },

    
    [states.token.showBalance]
  );

  console.log("tokenDataAAAAAAAAAAA", tokenData);

  const handleClose = () => {
    setShow(false);
    states.tList.resetTList_chg();
  };
  const handleShow = () => setShow(true);

  console.log("states.tList", states.token);

  return (
    <InputGroup className={`customInp_style ${className}`}>
      <InputGroup.Text>
        <div className="coinSelect_wrap">
          <img
            src={icon}
            alt={`coin_icon ${icon}`}
            className="img--token_icon"
          />
          <div className="coinSelect">
            <span></span>
            <span className="selectOption" onClick={handleShow}>
              {states.tList.val}
            </span>
            <p
              className={`block--token-balance${
                states.token.showBalance ? "" : " d-none"
              }`}
              onClick={states.token.setToMaxAmount}
            >
              <span>Balance:</span>
              <span
                className={`ui--max-balance-value${
                  states.token.showMaxBtn ? " btn--max-amount" : ""
                }`}
              >
                {states.token.balance}
              </span>
              <span className="hover-balance">
                {states?.token?.onHoverBalance}
              </span>
            </p>
          </div>
          <SelectTokenModal
            show={show}
            hideCbk={handleClose}
            state={states.tList}
          />
        </div>
      </InputGroup.Text>
      <FormControl
        type="text"
        className="inout-for-swap"
        // placeholder="0.00"
        value={states.token.val}
        disabled={states.token.disabled}
        onInput={states.token.inputCallback}
      />
    </InputGroup>
  );
};

export default CustomInputGroup;
