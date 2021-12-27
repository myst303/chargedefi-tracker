import {useEffect, useState} from "react";
import {useWalletAddress} from "../contexts/WalletAddressContext";
import {useDisclosure} from "@chakra-ui/react";


export const useWalletProvider = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {walletAddress, setWalletAddress} = useWalletAddress()!;


    useEffect(() => {
        // invoke method on bsc e.g.

    }, [])

    // const checkIfWalletConnected = async() => {
    //     try {
    //         if (!ethereum) {
    //             alert("Get MetaMask you pleb :P!");
    //             // console.log("Make sure you to have metamask!")
    //             return;
    //         } else {
    //             // console.log("We have an ether object", ethereum)
    //         }
    //
    //         /*
    //          * Check if we're authorized to access the user's wallet
    //          */
    //         const accounts = await ethereum.request({ method: 'eth_accounts' });
    //         if (accounts.length !== 0) {
    //             const account = accounts[0];
    //             // console.log("Found an authorized account:", account);
    //             setCurrentAccount(account)
    //         } else {
    //             // console.log("No authorized account found")
    //         }
    //
    //
    //     } catch (error:any) {
    //         alert("An error occurred connecting your wallet");
    //     }
    // }

    const onConnectWallet = async (walletProvider: string) => {
        switch (walletProvider){
            case "Binance Chain Wallet":
                await connectBinanceWallet()
                break;
            default:
                break;
        }
    }

    const connectBinanceWallet = async() => {
        const { BinanceChain  } = window as any
        try {
            if (!BinanceChain) {
                alert("Get Binance Chain you pleb :P!");
                return;
            }
            const accounts = await BinanceChain.request({ method: "eth_requestAccounts" });
            setWalletAddress(accounts[0]);
            onClose()
        } catch (error) {
            console.log(error)
            alert("An error occurred connecting your wallet");
        }
    }

    return {
        onOpen, onClose, isOpen,
        onConnectWallet, walletAddress
    }
}
