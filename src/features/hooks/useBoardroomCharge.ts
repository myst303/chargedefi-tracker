import {formatUS} from "../../common/helpers/formating";
import {fromWei} from "../../common/helpers/web3-helpers";
import {useEffect, useState} from "react";
import {useWalletAddress} from "../../common/contexts/WalletAddressContext";
import {useTokenPrices} from "../overview/hooks/useTokePrices";
import boardRoomContract from "../contracts/single-token-boardroom.json";
import {boardroomAddress} from "../../common/helpers/consts";

const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

export const useBoardRoomCharge = () => {
    const {walletAddress} = useWalletAddress()!
    const { coins } = useTokenPrices()
    const boardroomC = new web3.eth.Contract(boardRoomContract, boardroomAddress, {from: walletAddress})

    const [staticEarned, setStaticEarned] = useState<string>()
    const [staticEarnedDollar, setStaticEarnedDollar] = useState<number>()
    const [chargeInvested, setChargeInvested] = useState<string>()
    const [chargeInvestedDollar, setChargeInvestedDollar] = useState<number>()

    const get = async() => {
        if(coins.length > 0) {
            const earned = await boardroomC.methods.earned(walletAddress).call()
            setStaticEarned(formatUS(fromWei(earned[0])))
            setStaticEarnedDollar(fromWei(earned[0]) * coins[0].price)

            const balanceOfCharge = await boardroomC.methods.balanceOf(walletAddress).call()
            setChargeInvested(formatUS(fromWei(balanceOfCharge)))
            setChargeInvestedDollar(fromWei(balanceOfCharge) * coins[2].price)


        }
    }

    useEffect(() => {
        get()
    },[coins])

    return {
        staticEarned, staticEarnedDollar, chargeInvested, chargeInvestedDollar
    }
}
