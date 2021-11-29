import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';

import tokenAbi from './utils/token.json';
import vestingAbi from './utils/vesting.json';

const App = () => {

  const tokenAddress = "0x3EE77e1fE41a8921030Ee8024C9E67A443a7D326";
  const vestingAddress = "0xFC5eF677E5F9C56EcBC8F27Ae04FE90cC8A2095a";
  const tokenOwner = "0x2F4ea76b872F0767d2Ea148AB6fDe135E04Ac1C0";
  const vestingOwner = "0x2F4ea76b872F0767d2Ea148AB6fDe135E04Ac1C0";

  const [currentAccount, setCurrentAccount] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  //input states
  const [transferAddr, setTransferAddr] = useState("address of recipient");
  const [transferAmount, setTransferAmount] = useState("amount to send");
  const [approveAddr, setApproveAddr] = useState("address of recipient");
  const [approveAmount, setApproveAmount] = useState("amount to approve");
  const [mintAddr, setMintAddr] = useState("address of recipient");
  const [mintAmount, setMintAmount] = useState("amount to mint");

  const [balanceOf, setBalanceOf] = useState(0);
  const [balanceOfAddr, setBalanceOfAddr] = useState("address");
  //data from view functions
  const [totalSupply, setTotalSupply] = useState(0);
  const [balance, setBalance] = useState(0);


  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }

      
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

const tokenTransfer = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const token = new ethers.Contract(tokenAddress, tokenAbi.abi, signer);
        token.transfer(transferAddr, transferAmount);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
}

const tokenApprove = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const token = new ethers.Contract(tokenAddress, tokenAbi.abi, signer);
        token.approve(approveAddr, approveAmount);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
}

const tokenMint = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const token = new ethers.Contract(tokenAddress, tokenAbi.abi, signer);
        token.mint(mintAddr, mintAmount);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
}


const checkIfOwner = async () => {
  if (currentAccount.toUpperCase() == tokenOwner.toUpperCase()){
    setIsOwner(true);
  }
}



  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])



  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        "5" == 5 widewei == 0.000 000 000 000 000 005 WIDE
        </div>
      

      <div className="element">
        <div className="bio">
        send tokens (token transfer function)
        </div>
        <input
        type="text"
        name="transferAddr"
        onChange={e => setTransferAddr(e.target.value)}
        value={transferAddr}
      />
      <input
        type="text"
        name="transferAmount"
        onChange={e => setTransferAmount(e.target.value)}
        value={transferAmount}
      />
      <button className="waveButton" onClick={tokenTransfer}>
            transfer tokens
          </button>
      </div>


      <div className="element">
        <div className="bio">
        give someone control over amount of your tokens (token approve function)
        </div>
        <input
        type="text"
        name="approveAddr"
        onChange={e => setApproveAddr(e.target.value)}
        value={approveAddr}
      />
      <input
        type="text"
        name="approveAmount"
        onChange={e => setApproveAmount(e.target.value)}
        value={approveAmount}
      />
      <button className="waveButton" onClick={tokenApprove}>
            approve tokens
          </button>
      </div>



        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        {
          <button className="ownerButton" onClick={checkIfOwner}>
            you're an owner? click here
          </button>
        }
        {isOwner && (
          <div className="element">
        <div className="bio">
        mint tokens (token mint function)
        </div>
        <input
        type="text"
        name="mintAddr"
        onChange={e => setMintAddr(e.target.value)}
        value={mintAddr}
      />
      <input
        type="text"
        name="mintAmount"
        onChange={e => setMintAmount(e.target.value)}
        value={mintAmount}
      />
      <button className="waveButton" onClick={tokenMint}>
            mint tokens
          </button>
      </div>
        )}
      </div>
    </div>
  );
}
export default App