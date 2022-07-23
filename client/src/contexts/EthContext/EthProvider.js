import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  //create web3 objects to be used across the App
  const init = useCallback(async (artifact) => {
    if (artifact) {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.requestAccounts();
      const networkID = await web3.eth.net.getId();
      const { abi } = artifact;
      let address, contract;
      try {
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);
      } catch (err) {
        console.error(err);
      }
      dispatch({
        type: actions.init,
        data: { artifact, web3, accounts, networkID, contract },
      });
    }
  }, []);

  const connectWallet = useCallback(() => {
    try {
      const artifact = require("../../contracts/StarNotary.json");
      init(artifact);
    } catch (error) {
      console.error(error);
    }
  }, [init]);

  //if wallet connected, init the state
  useEffect(() => {
    if (window.ethereum.isConnected()) connectWallet();
  }, [connectWallet]);

  //handle events when metamask changes
  useEffect(() => {
    const events = ["chainChanged", "accountsChanged", "disconnect"];
    const handleChange = (e) => {
      dispatch({
        type: actions.init,
        data: initialState,
      });
    };

    events.forEach((e) => window.ethereum.on(e, () => handleChange(e)));
    return () => {
      events.forEach((e) =>
        window.ethereum.removeListener(e, () => handleChange(e))
      );
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
        connectWallet,
      }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
