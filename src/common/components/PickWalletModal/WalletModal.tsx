import { Modal, ModalHeader, ModalContent, ModalOverlay, ModalBody, ModalCloseButton, ModalFooter, List, ListItem, Text, Image, Box, Flex, Button } from '@chakra-ui/react';
import wallets from "./wallets.json"
import React from 'react';
import {useHoverHighlight} from "../../hooks/useHoverHighlight";
import {useWalletAddress} from "../../contexts/WalletAddressContext";

type Props = {
    isOpen: boolean
    onClose: () => void
    onSelectWallet: (providerName: string) => void
}

const WalletModal = ({isOpen, onClose, onSelectWallet}: Props) => {

    const { walletAddress, setWalletAddress } = useWalletAddress()!

    const { hooverProps: hovProps1} = useHoverHighlight()
    const { hooverProps: hovProps2} = useHoverHighlight()
    const hoovList = [hovProps1, hovProps2]

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={walletAddress ? "lg": "sm"} closeOnOverlayClick={false}>
            <ModalOverlay />
            {!walletAddress &&
            <ModalContent my="auto">
                <ModalHeader>Connect Wallet</ModalHeader>
                <ModalCloseButton mt={2}/>
                <ModalBody>
                    <List spacing={2}>
                        {wallets.map((i:any, key:number) => {
                            return <ListItem key={i.name}  onClick={() => onSelectWallet(i.name)} {...hoovList[key]}>
                                <Flex justify="space-between" px={5}>
                                    <Text my="auto">{i.name}</Text>
                                    <Image my="auto" src={i.icon} h="40px" w="40px"/>
                                </Flex>
                            </ListItem>
                        })}
                    </List>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
            }
            {walletAddress &&
            <ModalContent my="auto">
                <ModalHeader>Your Wallet</ModalHeader>
                <ModalCloseButton mt={2}/>
                <ModalBody>
                    <Flex flexDir="column">
                        <Text>{walletAddress}</Text>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={() => setWalletAddress(undefined)}>Logout</Button>
                </ModalFooter>
            </ModalContent>
            }
        </Modal>
    );
};

export default WalletModal;