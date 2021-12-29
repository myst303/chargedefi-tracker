import {VStack, Heading, Input, Text, Flex, Button, useToast, InputLeftElement, InputGroup} from '@chakra-ui/react';
import React, {useState} from 'react';
import {useWalletAddress} from "../../contexts/WalletAddressContext";
import {isAddress} from "../../helpers/web3-helpers";
import {IoWalletOutline} from "@react-icons/all-files/io5/IoWalletOutline";

const ConnectDapp = () => {

    const { setWalletAddress } = useWalletAddress()!
    const [addr, setAddr] = useState<string>()
    const toast = useToast()

    const onSubmit = () => {
        if(isAddress(addr!)){
            setWalletAddress(addr)
        } else {
            toast({
                title: "Invalid address",
                description: "Please provide a wallet BSC address",
                status: "error",
                duration: 6000,
                isClosable: true
            })
        }
    }


    return (
        <VStack my="auto"  textAlign="center" spacing="24px">
            <Heading >Connect wallet to get started</Heading>
            <Text  fontSize="24px">OR</Text>
            <Heading >Paste wallet address</Heading>
            <Flex w={{base: "100%", lg: "60%"}}>
                <InputGroup size="lg">
                    <InputLeftElement
                        my="auto"
                        pointerEvents='none'
                        children={<IoWalletOutline size="25px"  />}
                    />
                    <Input placeholder="Walled address..." size="lg" onChange={e => setAddr(e.target.value)}/>
                </InputGroup>
                <Button mx={2} size="lg" colorScheme="blue" onClick={onSubmit} isDisabled={!addr}>Submit</Button>
            </Flex>
        </VStack>
    );
};

export default ConnectDapp;
