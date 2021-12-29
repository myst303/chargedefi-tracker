import {formatUS} from "../../common/helpers/formating";
import {fromWei} from "../../common/helpers/web3-helpers";
import bscscan, { contract } from 'bsc-scan'
import {useEffect, useState} from "react";
import {useWalletAddress} from "../../common/contexts/WalletAddressContext";
import boardRoomContract from "../contracts/single-token-boardroom.json";
import {boardroomAddress} from "../../common/helpers/consts";
import {useTokenPrices} from "../../common/contexts/TokenPricesContext";

const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

bscscan.setUrl('https://api.bscscan.com')
bscscan.setApiKey('2W6DVXP23CY5BF92MAK1RHBF6XE8SJJHIQ')

export const useBoardRoomCharge = () => {
    const {walletAddress} = useWalletAddress()!
    const { tokens } = useTokenPrices()!
    const { staticPrice, chargePrice, } = tokens
    const boardroomC = new web3.eth.Contract(boardRoomContract, boardroomAddress, {from: walletAddress})

    const [staticEarned, setStaticEarned] = useState<string>()
    const [staticEarnedDollar, setStaticEarnedDollar] = useState<number>()
    const [chargeInvested, setChargeInvested] = useState<string>()
    const [chargeInvestedDollar, setChargeInvestedDollar] = useState<number>()

    const get = async() => {
        const earned = await boardroomC.methods.earned(walletAddress).call()
        setStaticEarned(formatUS(fromWei(earned[0])))
        setStaticEarnedDollar(fromWei(earned[0]) * staticPrice)

        const balanceOfCharge = await boardroomC.methods.balanceOf(walletAddress).call()
        setChargeInvested(formatUS(fromWei(balanceOfCharge)))
        setChargeInvestedDollar(fromWei(balanceOfCharge) * chargePrice)

        // console.log(new Date(await boardroomC.methods.nextEpochPoint().call() * 1e3))
    }

    useEffect(() => {
        if(staticPrice && chargePrice > 0) get()
    },[staticPrice, chargePrice])

    return {
        staticEarned, staticEarnedDollar, chargeInvested, chargeInvestedDollar
    }
}
