import {useEffect, useState} from "react";
import {useWalletAddress} from "../../../common/contexts/WalletAddressContext";
import beefyStaticContract from "../contracts/static-busd.json"
import beefyChargeContract from "../contracts/charge-busd.json"
import {fromWei} from "../../../common/helpers/web3-helpers";
import {formatUS} from "../../../common/helpers/formating";


const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');


export const useBeefyVault = () => {

    const {walletAddress} = useWalletAddress()!
    const [staticLp, setStaticLp] = useState<string>()
    const [staticLpDv, setStaticLpDV] = useState<number>()
    const [chargeLp, setChargeLp] = useState<string>()
    const [chargeLpDv, setChargeLpDv] = useState<number>()

    const getBeefyVaults = async() => {
        const staticContract = new web3.eth.Contract(beefyStaticContract, "0xaae97e1b198406d691d75b5aa60ac0b4e4b0e5cd", {from: walletAddress})
        const chargeContract = new web3.eth.Contract(beefyChargeContract, "0xDf988851e4CbA99565A9949706ff75Fd7f3b1b7A", {from: walletAddress})

        const staticPricePerShare = fromWei(await staticContract.methods.getPricePerFullShare().call())
        const myStaticBalance = fromWei(await staticContract.methods.balanceOf(walletAddress).call()) * staticPricePerShare
        setStaticLp(formatUS(myStaticBalance))

        const chargePricePerShare = fromWei(await chargeContract.methods.getPricePerFullShare().call())
        const myChargeBalance = fromWei(await chargeContract.methods.balanceOf(walletAddress).call()) * chargePricePerShare
        setChargeLp(formatUS(myChargeBalance))


        fetch("https://api.beefy.finance/lps", {method: "GET"})
            .then(response => response.json())
            .then(data => {
                setStaticLpDV(data["charge-static-busd"] * myStaticBalance)
                setChargeLpDv(data["charge-charge-busd"] * myChargeBalance)
            })
    }

    useEffect(() => {
        getBeefyVaults()
    }, [walletAddress])

    return {
        chargeLp, chargeLpDv,
        staticLp, staticLpDv
    }
}
