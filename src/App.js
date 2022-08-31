import React, { useState } from 'react';
import  { Text } from './text.js';
import Web3 from 'web3';
import { Campaign, Cancel, Claim, Pledge, Refund, Unpledge } from './ContractFunctions';

//ID IS 1
//DEPLOY ONE CAMPAIGN AND TEST FROM THERE, KEEP TRACK AS YOU GO
function App() {
  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount(){    
    if(window.ethereum){
      const accounts = await window.ethereum.request({
        method:"eth_requestAccounts",
      });
      console.log(accounts);
      setWalletAddress(accounts[0]);
    }
    else{
      alert('Metamask not detected');
    } 
  }

  async function hideAccount(){
    setWalletAddress("");
  }

  async function create(){
    
  }

  async function pledge(){
    await Crowdfund.methods.pledge(1, 1000);
  }

  async function cancel(){
    await Crowdfund.methods.cancel(1);
  }

  async function refund(){
    await Crowdfund.methods.refund(1);
  }

  async function unpledge(){
    await Crowdfund.methods.unpledge(1, 1000);
  }

  return (
    <>
    <Text
    className="Metamask"
    onMouseEnter={() => requestAccount()}
    onMouseLeave={() => hideAccount()}
    >
      Your Wallet Address is: {walletAddress}
    </Text>
    <button
    onClick={() => Campaign()}>
      Create a Campaign!
    </button>
    <button
    onClick={() => Pledge()}>
      Pledge
    </button>
    <button
    onClick={() => Unpledge()}>
      Unpledge
    </button>
    <button
    onClick={() => Cancek()}>
      Cancel
    </button>
    <button
    onClick={() => Refund()}>
      Refund
    </button>
    </>
  );
}

export default App;
