import {Flex, Heading } from '@chakra-ui/react'
import "@fontsource/metropolis"
import {useEffect, useMemo, useState} from "react";
import {WalletAddressContext} from './common/contexts/WalletAddressContext';
import {TokenPricesContext} from "./common/contexts/TokenPricesContext";
import TopNavBar from "./common/components/TopNavBar/TopNavBar";
import {useColorModeValue as mode } from "@chakra-ui/react";
import React from 'react';
import "./common/assets/main.css"
import BeefyVaults from "./pages/overview/components/beefy-vaults/BeefyVaults";
import {default as BoardRoomMain} from "./pages/overview/components/boardroom/BoardRoom"
import ProtocolStats from "./pages/overview/components/protocol-stats/ProtocolStats";
import ExpansionStats from "./pages/overview/components/protocol-stats/ExpansionStats/ExpansionStats";
import ConnectDapp from "./common/components/ConnectDapp/ConnectDapp";
import Farms from "./pages/overview/components/farms/Farms";
import {busdAddress, CHARGE_LP_ADDRESS, CHARGE_ADDRESS, STATIC_LP_ADDRESS, staticAddress} from "./common/helpers/consts";
import chargeABI from "./common/contracts/charge_abi.json"
import lpABI from "./pages/overview/contracts/lp-token-boardroom.json"
import {QueryClient, QueryClientProvider} from "react-query";

const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

function App() {

    const [walletAddress, setWalletAddress] = useState<string>();
    const providedWallet = useMemo<any>(() => ({ walletAddress, setWalletAddress }), [walletAddress, setWalletAddress])

    const [tokens, setTokens] = useState<any>({})
    const providedTokens = useMemo<any>(() => ({ tokens, setTokens }), [tokens, setTokens])

    const queryClient = new QueryClient()

    const getTokenPrices = async () => {
        const busdToken = new web3.eth.Contract(chargeABI, busdAddress, {from: walletAddress})
        const staticToken = new web3.eth.Contract(chargeABI, staticAddress, {from: walletAddress})
        const chargeToken = new web3.eth.Contract(chargeABI, CHARGE_ADDRESS, {from: walletAddress})
        const staticLpToken = new web3.eth.Contract(lpABI, STATIC_LP_ADDRESS, {from: walletAddress})
        const chargeLpToken = new web3.eth.Contract(lpABI, CHARGE_LP_ADDRESS, {from: walletAddress})

        // Regular coin prices
        const chargePrice = await busdToken.methods.balanceOf(CHARGE_LP_ADDRESS).call() / await chargeToken.methods.balanceOf(CHARGE_LP_ADDRESS).call()
        const staticPrice = await busdToken.methods.balanceOf(STATIC_LP_ADDRESS).call() / await staticToken.methods.balanceOf(STATIC_LP_ADDRESS).call()
        const pulsePrice = staticPrice
        const busdPrice = 1

        // Static LP token calculations
        const tokensInPool0 =  (await staticToken.methods.balanceOf(STATIC_LP_ADDRESS).call()) / 1e18
        const busdInPool0 = (await busdToken.methods.balanceOf(STATIC_LP_ADDRESS).call()) / 1e18;
        const totalLPtokens0 = (await staticLpToken.methods.totalSupply().call()) / 1e18;

        const tokenPerLP0 = tokensInPool0 / totalLPtokens0;
        const busdPerLP0 = busdInPool0 / totalLPtokens0;

        const staticLp = tokenPerLP0 * staticPrice + busdPerLP0 * busdPrice;

        // Charge LP token calculations
        const tokensInPool1 =  (await chargeToken.methods.balanceOf(CHARGE_LP_ADDRESS).call()) / 1e18
        const busdInPool1 = (await busdToken.methods.balanceOf(CHARGE_LP_ADDRESS).call()) / 1e18;
        const totalLPtokens1 = (await chargeLpToken.methods.totalSupply().call()) / 1e18;

        const tokenPerLP1 = tokensInPool1 / totalLPtokens1;
        const busdPerLP1 = busdInPool1 / totalLPtokens1;

        const chargeLp = tokenPerLP1 * chargePrice + busdPerLP1 * busdPrice;

        setTokens(
            {
                chargePrice: parseFloat(chargePrice.toFixed(3)),
                staticPrice: parseFloat(staticPrice.toFixed(3)),
                pulsePrice: parseFloat(pulsePrice.toFixed(3)),
                staticLp: parseFloat(staticLp.toFixed(3)),
                chargeLp: parseFloat(chargeLp.toFixed(3))
            })
    }

    useEffect(() => {
        getTokenPrices()
        setInterval(() => getTokenPrices(), 300000)
    }, [])



    return (
        <QueryClientProvider client={queryClient}>
            <TokenPricesContext.Provider value={providedTokens}>
                <WalletAddressContext.Provider value={providedWallet}>
                    <Flex w="100vw" h="100vh" flexDir="column" px={{sm: 0, lg: 5}} py={8} overflowX="hidden" bg={mode("#fafbfd", "gray.800")}>
                        {tokens &&  <TopNavBar/>}
                        {walletAddress
                            ? <>
                                <ProtocolStats/>
                                <ExpansionStats/>
                                <BeefyVaults/>
                                <Farms/>
                                <BoardRoomMain/>
                            </>
                        : <ConnectDapp/>}
                    </Flex>
                </WalletAddressContext.Provider>
            </TokenPricesContext.Provider>
        </QueryClientProvider>
    )
}
export default App
