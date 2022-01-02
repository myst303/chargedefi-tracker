import React, {useEffect} from 'react';
import {Button, Flex, Heading, Spacer, Text, useDisclosure, Image} from "@chakra-ui/react";
import {formatWalletAddr} from "../../helpers/formating";
import {useWalletProvider} from "../../hooks/useWalletProvider";
import WalletModal from "../PickWalletModal/WalletModal";
import { ColorModeSwitcher } from '../ColorModeSwitcher/ColorModeSwitcher';
import { Skeleton } from "@chakra-ui/react"
import {useTokenPrices} from "../../contexts/TokenPricesContext";
import {getTokenUrl} from "../../helpers/util";
import {NavContent} from "../Navbar/NavContent";


const TopNavBar = () => {
    const { onOpen, onClose, isOpen, onConnectWallet, checkIfWalletConnected, wallet, walletAddress } = useWalletProvider()
    const {tokens} = useTokenPrices()!
    const { staticPrice, pulsePrice, chargePrice} = tokens


    if(!tokens){
        return null
    }

    return (
        <Flex>
            <NavContent.Desktop display={{ base: 'none', md: 'flex' }} />
            <NavContent.Mobile display={{ base: 'flex', md: 'none' }} />
            {isOpen && <WalletModal isOpen={isOpen} onClose={onClose} onSelectWallet={onConnectWallet} /> }
            <Spacer/>
            <Flex>
                <Flex>
                    <Image mx={2} my="auto" src={getTokenUrl("static")} width="35px" height="35px"/>
                    <Skeleton isLoaded={staticPrice > 0}  my="auto">
                    <Text my="auto" fontFamily="Metropolis" fontWeight="bold">${staticPrice}</Text>
                    </Skeleton>
                </Flex>
                <Flex>
                    <Image mx={2} my="auto" src={getTokenUrl("pulse")} width="35px" height="35px"/>
                    <Skeleton isLoaded={pulsePrice > 0}  my="auto" >
                    <Text my="auto" fontFamily="Metropolis" fontWeight="bold">${pulsePrice}</Text>
                    </Skeleton>
                </Flex>
                <Flex>
                    <Image mx={2} my="auto" src={getTokenUrl("charge")} width="35px" height="35px"/>
                    <Skeleton isLoaded={chargePrice > 0}  my="auto">
                        <Text my="auto" fontFamily="Metropolis" fontWeight="bold">${chargePrice}</Text>
                    </Skeleton>
                </Flex>
            </Flex>
            <ColorModeSwitcher my="auto" mx={5}/>
            <Button  justify="flex-end" colorScheme="blue" my="auto"
                    onClick={wallet && !walletAddress ? checkIfWalletConnected : onOpen}>
                {walletAddress ? formatWalletAddr(walletAddress): "Connect"}
            </Button>
        </Flex>
    );
};

export default TopNavBar;
