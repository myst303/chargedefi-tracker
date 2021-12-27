import {
    Box,
    Flex,
    Heading,
    HStack,
    Text,
    Image,
    useColorModeValue as mode, Skeleton,
} from '@chakra-ui/react'
import * as React from 'react'
import { Indicator } from './Indicator'

export interface StatCardProps {
    imgData: {
        icon: string
        w: any
        h: any
    }
    data: {
        symbol: string
        topValue: any,
        value: number
        changeDaily?: {
            value: number
            percent: number
        },
        changeWeekly?: {

        },
        changeMonthly?: {

        }
    }
}

function format(value: number) {
    return new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD' }).format(value)
}

export const IconStatCard = (props: StatCardProps) => {
    const { data, imgData } = props
    const { icon, w, h} = imgData
    const { value, changeDaily, symbol, topValue } = data


    const isNegative = changeDaily && changeDaily.percent < 0

    return (
        <Box bg={mode('white', 'gray.700')} px="6" py="4" shadow="base" rounded="lg" w="100%" mr={5}>
            <HStack>
                <Image w={w} h={h} src={icon} bg={mode('white', 'gray.500')} rounded="full"/>
                <Skeleton isLoaded={topValue !== undefined} w="100%" h="30px">
                    <Text fontWeight="bold" fontSize="20px" color={mode('gray.500', 'white')}>
                        {topValue}
                    </Text>
                </Skeleton>
            </HStack>
            <Skeleton isLoaded={value !== undefined}>
                <Heading as="h4" size="lg" my="3" fontWeight="extrabold">${format(value)}</Heading>
            </Skeleton>

            <Flex justify="space-between" align="center" fontWeight="medium" fontSize="sm">
                {changeDaily &&
                <HStack spacing="0" color={mode('black', 'gray.400')}>
                    <Skeleton isLoaded={changeDaily !== undefined}>
                        <Indicator type={isNegative ? 'down' : 'up'} />
                        <Text>${format(changeDaily.value)} ({isNegative ? '' : '+'}{changeDaily.percent}%)</Text>
                    </Skeleton>
                </HStack>
                }
                <Text color={mode('black', 'white')}>{symbol}</Text>
            </Flex>
        </Box>
    )
}
