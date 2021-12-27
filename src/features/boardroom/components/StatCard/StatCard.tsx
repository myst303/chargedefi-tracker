import React from 'react';
import {Box, Stat} from "@chakra-ui/react";
import {useColorModeValue as mode} from "@chakra-ui/react"
import {StatLabel} from "./StatLabel";
import {StatNumber} from "./StatNumber";
import { Skeleton } from '@chakra-ui/react'
type Props = {
    label: string
    value: any
}

const StatCard = ({label, value}: Props) => {
    return (
        <Box bg={mode('white', 'gray.700')} px="6" py="4" shadow="base" rounded="lg" w="100%" mr={5}>
            <Stat key={label}>
                <StatLabel>{label}</StatLabel>
                <Skeleton isLoaded={value !== null} h="45px">
                    <StatNumber>{value}</StatNumber>
                </Skeleton>
            </Stat>
        </Box>
    );
};

export default StatCard;
