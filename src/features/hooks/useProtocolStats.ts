import {useWalletAddress} from "../../common/contexts/WalletAddressContext";
import {useEffect, useReducer, useState} from "react";
import boardRoomContract from "../contracts/single-token-boardroom.json";
import {boardroomAddress, staticAddress, treasuryAddress} from "../../common/helpers/consts";
import treasuryContract from "../contracts/treasury.json";
import staticContract from "../../common/contracts/static.json";
import {fromWei} from "../../common/helpers/web3-helpers";
import {useTokenPrices} from "../overview/hooks/useTokePrices";


const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');


const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "updateState":
            return {...state, [action.name]: action.value}
        default:
            return {...state}
    }
}

function format(value: number) {
    return new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD' }).format(value)
}

export const useProtocolStats = () => {
    const {walletAddress} = useWalletAddress()!
    const {coins} = useTokenPrices()

    const initialState ={
        epoch: null,
        epochUnderOne: null,
        nextEpochDate: null,
        timer: null,
    }
    const initState = () => { return initialState}

    const [state, dispatch] = useReducer(reducer, initialState, initState)

    // Contract objects
    const boardroomC = new web3.eth.Contract(boardRoomContract, boardroomAddress, {from: walletAddress})
    const treasuryC = new web3.eth.Contract(treasuryContract, treasuryAddress, {from: walletAddress})
    const staticC = new web3.eth.Contract(staticContract, staticAddress, {from: walletAddress})


    const get = async() => {
        boardroomC.methods.epoch().call().then((epoch:number) =>
            dispatch({type:"updateState", name:"epoch", value: epoch}))
        boardroomC.methods.nextEpochPoint().call().then((nextEpoch:number) =>
            dispatch({type:"updateState", name:"nextEpochDate", value:new Date(nextEpoch * 1e3)}))
        treasuryC.methods.epochsUnderOne.call().call().then((i:any) =>
            dispatch({type: "updateState", name: "epochUnderOne", value: i}))
        staticC.methods.totalSupply().call().then((i:any) =>
            dispatch({type: "updateState", name: "expansionDollarValue",
                value: format((coins[0].price - 1.01) * 0.1 * parseInt(fromWei(i))) })
            // console.log(parseInt(fromWei(i)))

        )

    }

    const countdown = () => {
        setInterval(() => {
            if (state.nextEpochDate !== null) {
                let now = new Date().getTime()
                let distance = state.nextEpochDate.getTime() - now
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                dispatch({
                    type:"updateState",
                    name:"timer",
                    value:`0${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}`: seconds}`
                })

                if(distance < 0){
                    get()
                }
            }
        }, 1000)

    }

    useEffect(() => {
        if(state.nextEpochDate !== null){
            countdown()
        }
    }, [state.nextEpochDate])

    useEffect(() => {
        if(coins.length > 0) get()
    }, [coins])

    return {
        ...state
    }
}