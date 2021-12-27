import React from 'react';
import StatCard from "../boardroom/components/StatCard/StatCard";
import {Flex, Heading, SimpleGrid} from "@chakra-ui/react";
import {useProtocolStats} from "../hooks/useProtocolStats";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const ProtocolStats = () => {

    const { epoch, timer, epochUnderOne} = useProtocolStats()
    return (
        <Flex px={5} py={5} flexDir="column">
            <Heading>Basics</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" pt={5}>
                <StatCard label={"Time to next epoch"} value={timer}/>
                <StatCard label={"Current Epoch"} value={epoch} />
                <StatCard label={"Epochs Under Peg"} value={epochUnderOne}/>
            </SimpleGrid>
        </Flex>
    );
};

export default ProtocolStats;
