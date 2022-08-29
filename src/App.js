import React, { useState } from 'react';
import  { Text } from './text.js';
import Web3 from 'web3';
import { Crowdfund } from './contract/transact.js';

//ID IS 1
//DEPLOY ONE CAMPAIGN AND TEST FROM THERE, KEEP TRACK AS YOU GO
function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [truncatedWallet, setTruncatedWallet] = useState("");


  const web3 = new Web3(new 
    Web3.providers.HttpProvider("http://localhost:3000"));


  async function requestAccount(){    
    if(window.ethereum){
      const accounts = await window.ethereum.request({
        method:"eth_requestAccounts",
      });
      console.log(accounts);
      setWalletAddress(accounts[0]);
      setTruncatedWallet(accounts[0].substring(0,4) + "...");
    }
    else{
      alert('Metamask not detected');
    } 
  }

  async function hideAccount(){
    setWalletAddress("");
  }

  async function create(){
    let time = Math.floor(Date.now/1000);
    let end = new Date((new Date()).getTime() + (10 * 86400000)); 
    await Crowdfund.methods.launch(100000, time, end);
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
    <button>
      Create a Campaign!
    </button>
    <button>
      Pledge
    </button>
    <button>
      Unpledge
    </button>
    <button>
      Cancel
    </button>
    <button>
      Refund
    </button>
    </>
  );
}

export default App;
