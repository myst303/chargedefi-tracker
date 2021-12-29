import {Flex, Heading } from '@chakra-ui/react'
import "@fontsource/metropolis"
import {useEffect, useMemo, useState} from "react";
import {WalletAddressContext} from './common/contexts/WalletAddressContext';
import {TokenPricesContext} from "./common/contexts/TokenPricesContext";
import TopNavBar from "./common/components/TopNavBar/TopNavBar";
import React from 'react';
import "./common/assets/main.css"
import Earnings from "./features/beefy-vaults/components/Earnings";
import {default as BoardRoomMain} from "./features/boardroom/Main"
import ProtocolStats from "./features/protocol-stats/ProtocolStats";
import ExpansionStats from "./features/protocol-stats/ExpansionStats/ExpansionStats";
import ConnectDapp from "./common/components/ConnectDapp/ConnectDapp";
import CoinGecko from "coingecko-api";
import staticOracleContract from "./features/contracts/static-oracle.json"
import {staticOracleAddress} from "./common/helpers/consts";
import Farms from "./features/farms/components/Farms";

const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

function App() {

    const [walletAddress, setWalletAddress] = useState<string>();
    const providerValue = useMemo<any>(() => ({ walletAddress, setWalletAddress }), [walletAddress, setWalletAddress])

    const [tokens, setTokens] = useState<any>()
    const providerTokens = useMemo<any>(() => ({ tokens, setTokens }), [tokens, setTokens])

    const staticOracleC = new web3.eth.Contract(staticOracleContract, staticOracleAddress, {from: walletAddress})

    const getTokenPrice = async () => {
        const client = new CoinGecko()
        // console.log( await staticOracleC.methods.twap(staticAddress, toBN(1e18)).call() / 1e18)
        const staticCoin = await client.coins.fetch("chargedefi-static", {})
        const chargeCoin = await client.coins.fetch("chargedefi-charge", {})
        let staticLp
        let chargeLp
        try {
            const {sLp, cLp} = await fetch("https://api.beefy.finance/lps", {method: "GET"})
                .then(r => r.json())
                .then(r => {return {sLp: r["charge-static-busd"], cLp: r["charge-charge-busd"] }})
            staticLp = sLp
            chargeLp = cLp
        } catch(e){}
        setTokens(
            {
                chargePrice: parseFloat(chargeCoin.data.tickers[0].last.toFixed(3)),
                staticPrice: parseFloat(staticCoin.data.tickers[0].last.toFixed(3)),
                pulsePrice: parseFloat(staticCoin.data.tickers[0].last.toFixed(3)),
                staticLp: parseFloat(staticLp),
                chargeLp: parseFloat(chargeLp)
            }
        )

    }

    useEffect(() => {
        // console.log("get token price")
        getTokenPrice()
    }, [])

    return (
        <TokenPricesContext.Provider value={providerTokens}>
            <WalletAddressContext.Provider value={providerValue}>
                <Flex w="100vw" h="100vh" flexDir="column" px={12} py={8} overflowX="hidden">
                    {tokens &&  <TopNavBar/>}
                    {walletAddress
                        ? <>
                            <ProtocolStats/>
                            <ExpansionStats/>
                            <Earnings/>
                            <Farms/>
                            <BoardRoomMain/>
                        </>
                    : <ConnectDapp/>}
                </Flex>
            </WalletAddressContext.Provider>
        </TokenPricesContext.Provider>

    )
}
export default App
