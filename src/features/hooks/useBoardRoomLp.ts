
import {fromWei, toBN} from "../../common/helpers/web3-helpers";
import boardRoomContract from "../contracts/single-token-boardroom.json"
import lpBoardroomContract from "../contracts/lp-token-boardroom.json"
import {useWalletAddress} from "../../common/contexts/WalletAddressContext";
import {useEffect, useState} from "react";
import {boardroomAddress, lpTokenBoardroomAddress} from "../../common/helpers/consts";
import {useTokenPrices} from "../overview/hooks/useTokePrices";
import {formatUS} from "../../common/helpers/formating";

const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

export const useBoardRoomLp = () => {
    const {walletAddress} = useWalletAddress()!
    const { coins } = useTokenPrices()
    const lpBoardroomC = new web3.eth.Contract(lpBoardroomContract, lpTokenBoardroomAddress, {from: walletAddress})

    const [staticEarned, setStaticEarned] = useState<string>()
    const [staticEarnedDollar, setStaticEarnedDollar] = useState<number>()
    const [chargeEarned, setChargeEarned] = useState<string>()
    const [chargeEarnedDollar, setChargeEarnedDollar] = useState<number>()
    const [lpInvested, setLpInvested] = useState<number>()
    const [lpDollar, setLpDollar] = useState<number>()


    const get = async() => {
        if(coins.length > 0) {
            const earned = await lpBoardroomC.methods.earned(walletAddress).call()
            setStaticEarned(formatUS(fromWei(earned[0])))
            setStaticEarnedDollar(fromWei(earned[0]) * coins[0].price)
            setChargeEarned(formatUS(fromWei(earned[1])))
            setChargeEarnedDollar(fromWei(earned[1]) * coins[2].price)

            const balanceOfLpPair = fromWei(await lpBoardroomC.methods.balanceOf(walletAddress).call())
            setLpInvested(balanceOfLpPair)
            setLpDollar(coins[3].price * balanceOfLpPair)

        }
    }

    useEffect(() => {
        get()
    },[coins])

    return {
        staticEarned, chargeEarned, chargeEarnedDollar, staticEarnedDollar, lpInvested, lpDollar
    }
}
