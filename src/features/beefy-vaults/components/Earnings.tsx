import {Flex, Heading, SimpleGrid, Text} from '@chakra-ui/react'
import React from 'react';
import {IconStatCard} from "./StatCard/IconStatCard";
import {useBeefyVault} from "../hooks/useBeefyVaults";

const Earnings = () => {
    const { staticLpDv, staticLp, chargeLpDv, chargeLp } = useBeefyVault()
    return (
        <Flex flexDir="column" px={5} >
            <Heading>Beefy Vaults</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" pt={5}>
                <IconStatCard
                    imgData={{
                        icon: "https://www.chargedefi.fi/static/media/charge-busd.fffca344.png",
                        w: "83px",
                        h: "50px"
                    }}
                    data={{
                      symbol: 'Charge-BUSD LP / Dollar Amount',
                      value: chargeLpDv!,
                      topValue: chargeLp!,
                      changeDaily: { value: 24.98, percent: -0.73 },
                  }}
                />
                <IconStatCard
                    imgData={{
                        icon: "https://www.chargedefi.fi/static/media/charge-busd.fffca344.png",
                        w: "83px",
                        h: "50px"
                    }}
                    data={{
                        symbol: 'Static-BUSD LP / Dollar Amount',
                        value: staticLpDv!,
                        topValue: staticLp!,
                        changeDaily: { value: 24.98, percent: -0.73 },
                    }}
                />
            </SimpleGrid>
        </Flex>
    );
};

export default Earnings;
