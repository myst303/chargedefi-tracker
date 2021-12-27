import {chargeAddress, staticAddress, treasuryAddress} from "../../common/helpers/consts";
import treasuryContract from "../contracts/treasury.json";
import staticContract from "../../common/contracts/static.json";
import chargeContract from "../../common/contracts/charge.json";

import {useWalletAddress} from "../../common/contexts/WalletAddressContext";
import {fromWei, toBN} from "../../common/helpers/web3-helpers";
import {formatUS} from "../../common/helpers/formating";
import {useTokenPrices} from "../overview/hooks/useTokePrices";
import {useEffect, useState} from "react";


const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

export const useExpansionStats = () => {
    const {walletAddress} = useWalletAddress()!
    const { coins } = useTokenPrices()
    const treasuryC = new web3.eth.Contract(treasuryContract, treasuryAddress, {from: walletAddress})
    const staticC = new web3.eth.Contract(staticContract, staticAddress, {from: walletAddress})
    const chargeC = new web3.eth.Contract(chargeContract, chargeAddress, {from: walletAddress})

    const [staticDollarAmount, setStaticDollarAmount] = useState<number>()
    const [staticAmount, setStaticAmount] = useState<any>()
    const [chargeDollarAmount, setChargeDollarAmount] = useState<number>()
    const [chargeAmount, setChargeAmount] = useState<any>()

    const get = async () => {
        staticC.methods.totalSupply().call().then((i:any) => {
            setStaticDollarAmount((coins[0].price - 1.01) * 0.1 * parseInt(fromWei(i)) * coins[0].price)
            setStaticAmount(formatUS((coins[0].price - 1.01) * 0.1 * parseInt(fromWei(i))))
        })
        let mintLimit = toBN(await chargeC.methods.mintLimitOf(treasuryAddress).call())
        let mintedAmount = toBN(await chargeC.methods.mintedAmountOf(treasuryAddress).call())
        let amountMintable = mintLimit > mintedAmount ? mintLimit.sub(mintedAmount) : 0
        const chargePerEpoch = fromWei(await treasuryC.methods.sharesMintedPerEpoch.call().call())
        const finalMintCharge = Math.min(amountMintable, chargePerEpoch)
        setChargeAmount(formatUS(finalMintCharge))
        setChargeDollarAmount(coins[2].price * finalMintCharge)

    }

    useEffect(() => {
        if(coins.length > 0) get()
    } ,[coins])

    return {
        staticDollarAmount, staticAmount, chargeDollarAmount, chargeAmount
    }
}
