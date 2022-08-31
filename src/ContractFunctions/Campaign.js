const Web3 = require("web3");
require("dotenv").config();
var Contract = require('web3-eth-contract');
import { Crowdfund } from './contract/transact.js'; 


export async function Campaign() {
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
        `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    )
  );
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY
  );
  web3.eth.accounts.wallet.add(signer);

  let time = Math.floor(Date.now/1000);
  let end = new Date((new Date()).getTime() + (10 * 86400000)); 

  const tx = Crowdfund.methods.launch(100000, time, end);


  const receipt = await tx
    .send({
      from: signer.address,
      gas: await tx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Minting Token A ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  console.log(`Mined in block ${receipt.blockNumber}`);
}

