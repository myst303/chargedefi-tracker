import boardRoomStaticLPABI from "../../../contracts/lp-token-boardroom.json"
import {useWalletAddress} from "../../../../../common/contexts/WalletAddressContext";
import {useEffect, useState} from "react";
import {lpTokenBoardroomAddress, treasuryAddress} from "../../../../../common/helpers/consts";
import {formatUS} from "../../../../../common/helpers/formating";
import {useTokenPrices} from "../../../../../common/contexts/TokenPricesContext";
import treasuryABI from "../../../contracts/treasury.json";

const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

export const useBoardRoomLp = () => {
    const {walletAddress} = useWalletAddress()!
    const { tokens } = useTokenPrices()!
    const { staticPrice, chargePrice, staticLp } = tokens

    const lpBoardroomContract = new web3.eth.Contract(boardRoomStaticLPABI, lpTokenBoardroomAddress, {from: walletAddress}).methods
    const treasuryContract = new web3.eth.Contract(treasuryABI,treasuryAddress, {from: walletAddress}).methods

    const [stats, setStats] = useState<any>({})

    const get = async() => {

        const earned = await lpBoardroomContract.earned(walletAddress).call()
        const balanceOfLpPair = await lpBoardroomContract.balanceOf(walletAddress).call()
        const tvl = (await lpBoardroomContract.totalSupply().call() / 1e18) * staticLp

        const period = (await treasuryContract.PERIOD().call()) / 3600
        const latestSnapshotIndex = await lpBoardroomContract.latestSnapshotIndex().call()
        const lastHistory = await lpBoardroomContract.boardHistory(latestSnapshotIndex).call()
        const lastRewards0PerShare = lastHistory[2];
        const lastRewards1PerShare = lastHistory[4];

        const prevHistory = (await lpBoardroomContract.boardHistory(latestSnapshotIndex-1).call());
        const prevRewards0PerShare = prevHistory[2];
        const prevRewards1PerShare = prevHistory[4];
        const epochRewards0PerShare = (lastRewards0PerShare - prevRewards0PerShare) / 1e18;
        const epochRewards1PerShare = (lastRewards1PerShare - prevRewards1PerShare) / 1e18;

        const rewards0PerYear = epochRewards0PerShare*(24/period)*365*staticPrice;
        const rewards1PerYear = epochRewards1PerShare*(24/period)*365*chargePrice;
        const apr = (rewards0PerYear + rewards1PerYear) *100 / staticLp;

        const staticEarned = earned[0] / 1e18
        const chargeEarned = earned[1] / 1e18
        const staticValue = staticEarned * staticPrice
        const chargeValue = chargeEarned * chargePrice
        const lpTokens = balanceOfLpPair / 1e18
        const lpTokensValue = ((balanceOfLpPair / 1e18) * staticLp)

        const dailyTotal = apr / 365

        const staticDaily = (rewards0PerYear * 100 / staticLp) / 365
        const chargeDaily = (rewards1PerYear * 100 / staticLp) / 365


        setStats({
            tvl: tvl.toFixed(0),
            tokens: lpTokens,
            value: lpTokensValue.toFixed(2),
            chargeEarned:chargeEarned,
            chargeValue: chargeValue,
            staticEarned: staticEarned,
            staticValue: staticValue,
            chargeChangeDaily: {
                percent: chargeDaily.toFixed(2),
                value: (lpTokensValue * (chargeDaily / 100)).toFixed(2)
            },
            staticChangeDaily: {
                percent: staticDaily.toFixed(2),
                value: (lpTokensValue * (staticDaily / 100)).toFixed(2)
            }
        })


    }

    useEffect(() => {
        if(staticPrice && chargePrice > 0) get()
    },[staticPrice, chargePrice])

    return {
        stats
    }
}
