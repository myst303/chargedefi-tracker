import React from 'react';
import {Button, Flex, Heading, Spacer, Text, useDisclosure, Image} from "@chakra-ui/react";
import {formatWalletAddr} from "../../helpers/formating";
import {useWalletProvider} from "../../hooks/useWalletProvider";
import WalletModal from "../PickWalletModal/WalletModal";
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import {useTokenPrices} from "../../../features/overview/hooks/useTokePrices";
import {useBeefyVault} from "../../../features/beefy-vaults/hooks/useBeefyVaults";



const TopNavBar = () => {
    const { onOpen, onClose, isOpen, onConnectWallet, walletAddress } = useWalletProvider()
    const { coins } = useTokenPrices()

    const { } = useBeefyVault()
    return (
        <Flex>
            {isOpen && <WalletModal isOpen={isOpen} onClose={onClose} onSelectWallet={onConnectWallet} /> }
            <Spacer/>
            <Flex>
                {coins.length > 0 && coins.slice(0,3).map((coin:any) =>
                    <Flex px={2} key={coin.name}>
                        <Image mx={2} my="auto" src={coin.icon} width="35px" height="35px"/>
                        <Text my="auto" fontFamily="Metropolis" fontWeight="bold">${coin.price}</Text>
                    </Flex>
                )}
            </Flex>
            <ColorModeSwitcher my="auto" mx={5}/>
            <Button size="lg" justify="flex-end" onClick={onOpen}>{walletAddress ? formatWalletAddr(walletAddress): "Connect"}</Button>
        </Flex>
    );
};

export default TopNavBar;
