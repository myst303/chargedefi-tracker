
import treasuryContract from "../contracts/treasury.json"
import boardroomAllocationContract from "../contracts/boardroom-allocation.json"

import pulseContract from "../../common/contracts/pulse.json"
import staticContract from "../../common/contracts/static.json"

import {fromWei, toBN} from "../../common/helpers/web3-helpers";
import {useEffect} from "react";
import {useWalletAddress} from "../../common/contexts/WalletAddressContext";
import {boardroomAllocationAddress, staticAddress, treasuryAddress} from "../../common/helpers/consts";


const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

export const useTreasury = () => {

    const { walletAddress } = useWalletAddress()!
    const treasuryC = new web3.eth.Contract(treasuryContract, treasuryAddress, {from: walletAddress})
    const pulseC = new web3.eth.Contract(pulseContract, "0xbceBAeAF1160Edc84D81A8f2D075858eE3960e9E", {from: walletAddress})
    const staticC = new web3.eth.Contract(staticContract, staticAddress, {from: walletAddress})
    const brAllocationC = new web3.eth.Contract(boardroomAllocationContract, boardroomAllocationAddress, {from: walletAddress})


    const boardroomsBalance = async () => {
        let balance = toBN(0);
        const brCount = await brAllocationC.methods.boardroomInfoLength().call()
        for (let step = 0; step < brCount; step++){
            const { boardroom } =  await brAllocationC.methods.boardrooms(step).call()
             const brBalance = toBN(await staticC.methods.balanceOf(boardroom).call())
             balance = balance.add(brBalance)
        }
        return balance
    }

    const computeSupplyAdjustment = async (staticPrice: number, staticPeg: number) => {
        const supply = toBN(await staticC.methods.totalSupply().call())
            .sub(toBN(await staticC.methods.balanceOf(treasuryAddress).call()))
            .sub(await boardroomsBalance())
        return supply.mul(staticPrice).sub(staticPeg).div(staticPeg)
    }

    const getStaticExpansion = async () => {
        let savedForBr = toBN(0)
        let savedForBond = toBN(0)
        let savedForDevs = toBN(0)
        const pulseSupply = await pulseC.methods.totalSupply.call().call()
        const seigniorageSaved = toBN(await treasuryC.methods.seigniorageSaved.call().call())
        const bondDepletionFloorPercent = await treasuryC.methods.bondDepletionFloorPercent.call().call()
        const devPercent = toBN(await treasuryC.methods.devPercentage.call().call())
        const bondRepayPercent = toBN(await treasuryC.methods.bondRepayPercent.call().call())
        const totalBondsToRepay = toBN(pulseSupply).mul(toBN(bondDepletionFloorPercent)).div(toBN("10000"))
        const staticPrice = toBN(await treasuryC.methods.getDollarPrice().call())
        const staticPriceOne = toBN(1000000000000000000)
        const supplyDelta = await computeSupplyAdjustment(staticPrice, staticPriceOne)
        // console.log(await  treasuryC.methods.devAddress.call().call())
        console.log(await staticC.methods.totalSupply().call())

        if(seigniorageSaved >= totalBondsToRepay){
            savedForBr = supplyDelta
        } else {
            let segniorage = supplyDelta
            if(segniorage.mul(bondDepletionFloorPercent).div(toBN("10000")) <= totalBondsToRepay.sub(seigniorageSaved)){
                savedForBond = segniorage.mul(bondRepayPercent).div(10000)
                savedForBr = segniorage.sub(savedForBond)
            } else {
                savedForBond = totalBondsToRepay.sub(seigniorageSaved)
                savedForBr = segniorage.sub(savedForBond)
            }
        }

        // console.log(fromWei(savedForBr))

        if(savedForBr > 0){
            savedForDevs = savedForBr.mul(devPercent).div(toBN(10000))
            savedForBr = savedForBr.sub(savedForDevs)
        }
        console.log("new printed static", fromWei(savedForBr))
        // console.log(fromWei(savedForBond))

    }

    useEffect(() => {
        // getStaticExpansion()
    }, [])

    return {

    }
}
