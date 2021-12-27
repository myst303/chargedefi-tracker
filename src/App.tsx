import {Flex, Heading } from '@chakra-ui/react'
import "@fontsource/metropolis"
import {useMemo, useState} from "react";
import {WalletAddressContext} from './common/contexts/WalletAddressContext';
import TopNavBar from "./common/components/TopNavBar/TopNavBar";
import {useTokenPrices} from "./features/overview/hooks/useTokePrices";
import React from 'react';
import Earnings from "./features/beefy-vaults/components/Earnings";
import {default as BoardRoomMain} from "./features/boardroom/Main"
import ProtocolStats from "./features/protocol-stats/ProtocolStats";
import ExpansionStats from "./features/protocol-stats/ExpansionStats/ExpansionStats";
import ConnectDapp from "./common/components/ConnectDapp/ConnectDapp";


function App() {

    const [walletAddress, setWalletAddress] = useState<string>();
    const providerValue = useMemo<any>(() => ({ walletAddress, setWalletAddress }), [walletAddress, setWalletAddress])

    const { } = useTokenPrices()
    return (
        <WalletAddressContext.Provider value={providerValue}>
            <Flex w="100vw" h="100vh" flexDir="column" px={12} py={8} overflowX="hidden">
                <TopNavBar/>
                {walletAddress
                    ? <>
                        <ProtocolStats/>
                        <ExpansionStats/>
                        <Earnings/>
                        <BoardRoomMain/>
                    </>
                : <ConnectDapp/>}
            </Flex>
        </WalletAddressContext.Provider>

    )
}
export default App
