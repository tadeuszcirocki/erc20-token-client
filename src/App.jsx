import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';

import tokenAbi from './utils/token.json';
import vestingAbi from './utils/vesting.json';

const App = () => {

    const tokenAddress = "0x70a764d787f6928aaF1cD9658E14f47CaEEC6AAE";
    const vestingAddress = "0x9188715C18f396453bEF74f844eAEad60E7B6E02";
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
    //token or vesting
    const [isVesting, setIsVesting] = useState(false);
    //vesting states starts
    const [claimed, setClaimed] = useState(0);
    const [vested, setVested] = useState(0);
    const [vestAddr, setVestAddr] = useState("address of recipient");
    const [vestAmount, setVestAmount] = useState("amount to vest");

    const [vestTransferAmount, setVestTransferAmount] = useState("amount to send");
    const [claimAmount, setClaimAmount] = useState("amount to claim");
    const [toClaim, setToClaim] = useState(0);




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
            let account;
            if (accounts.length !== 0) {
                account = accounts[0];
                console.log("Found an authorized account:", account);
                setCurrentAccount(account);
            } else {
                console.log("No authorized account found")
            }

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const token = new ethers.Contract(tokenAddress, tokenAbi.abi, signer);
            const vesting = new ethers.Contract(vestingAddress, vestingAbi.abi, signer);

            const supl = await token.totalSupply();
            const bigSupl = ethers.BigNumber.from(supl);
            setTotalSupply(bigSupl.toNumber());

            const bal = await token.balanceOf(account);
            const bigBal = ethers.BigNumber.from(bal);
            setBalance(bigBal.toNumber());

            const vest = await vesting.initialBalances(account);
            const bigVest = ethers.BigNumber.from(vest);
            setVested(bigVest.toNumber());

            const claim = await vesting.claimed(account);
            const bigClaim = ethers.BigNumber.from(claim);
            setClaimed(bigClaim.toNumber());

            const available = await vesting.tokensAvailable(account);
            const bigAvailable = ethers.BigNumber.from(available);
            setToClaim(bigAvailable.toNumber());

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

    const tokenBalanceOf = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const token = new ethers.Contract(tokenAddress, tokenAbi.abi, signer);
                const bal = await token.balanceOf(balanceOfAddr);
                const bigBal = ethers.BigNumber.from(bal);
                setBalanceOf(bigBal.toNumber());
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const vestingVest = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const vesting = new ethers.Contract(vestingAddress, vestingAbi.abi, signer);
                vesting.vest(vestAddr, vestAmount);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const sendTokensToVesting = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const token = new ethers.Contract(tokenAddress, tokenAbi.abi, signer);
                token.transfer(vestingAddress, vestTransferAmount);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const vestingClaim = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const vesting = new ethers.Contract(vestingAddress, vestingAbi.abi, signer);
                vesting.claim(claimAmount);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const switchToToken = async () => {
        setIsVesting(false);
    }

    const switchToVesting = async () => {
        setIsVesting(true);
    }

    const checkIfOwner = async () => {
        if (currentAccount.toUpperCase() == tokenOwner.toUpperCase()) {
            setIsOwner(true);
        }
    }



    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])



    return (
        <div className="mainContainer">


            <div className="dataContainer">
                <div className="switch">
                    <button className="switchButton" onClick={switchToToken}>
                        TOKEN
                    </button>
                    <button className="switchButton" onClick={switchToVesting}>
                        VESTING
                    </button>
                </div>
                {!isVesting && (
                    <div>
                        <div className="bio">
                            TOKEN
                        </div>
                        <div className="header">
                            👋 Hey there!
                        </div>

                        <div className="bio">
                            "5" in input box == 5 widewei == 0.000 000 000 000 000 005 WIDE
                        </div>

                        <div className="element">
                            total supply: {totalSupply} widewei<hr />
                            your balance: {balance} widewei
                        </div>


                        <div className="element">
                            <div className="bio">
                                check WIDE balance of address
                            </div>
                            <input
                                type="text"
                                name="balanceOfAddr"
                                onChange={e => setBalanceOfAddr(e.target.value)}
                                value={balanceOfAddr}
                            />

                            <button className="waveButton" onClick={tokenBalanceOf}>
                                check balance
                            </button>
                            balance: {balanceOf}
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
                    </div>)}





                    {isVesting && (
                    <div>
                        <div className="bio">
                            VESTING
                        </div>
                        <div className="header">
                            👋 Hey there!
                        </div>
                        
                        <div className="bio">
                            "5" in input box == 5 widewei == 0.000 000 000 000 000 005 WIDE
                        </div>

                        <div className="element">
                            vested: {vested} widewei<hr />
                            claimed: {claimed} widewei
                        </div>


                        <div className="element">
                            <div className="bio">
                                claim your tokens
                            </div>
                            <input
                                type="text"
                                name="claimAmount"
                                onChange={e => setClaimAmount(e.target.value)}
                                value={claimAmount}
                            />

                            <button className="waveButton" onClick={vestingClaim}>
                                claim
                            </button>
                            available: {toClaim}
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
                                    vest tokens to address (vesting vest function)
                                </div>
                                <input
                                    type="text"
                                    name="vestAddr"
                                    onChange={e => setVestAddr(e.target.value)}
                                    value={vestAddr}
                                />
                                <input
                                    type="text"
                                    name="vestAmount"
                                    onChange={e => setVestAmount(e.target.value)}
                                    value={vestAmount}
                                />
                                <button className="waveButton" onClick={vestingVest}>
                                    vest tokens
                                </button>
                            </div>
                        )}
                        {isOwner && (
                            <div className="element">
                                <div className="bio">
                                    send tokens to the vesting contract
                                </div>
                                <input
                                    type="text"
                                    name="vestTransferAmount"
                                    onChange={e => setVestTransferAmount(e.target.value)}
                                    value={vestTransferAmount}
                                />
                                <button className="waveButton" onClick={sendTokensToVesting}>
                                    send tokens
                                </button>
                            </div>
                        )}
                    </div>)}
            </div>




        </div>
    );
}
export default App