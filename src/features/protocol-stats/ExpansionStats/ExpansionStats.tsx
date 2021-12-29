import React from 'react';
import {Flex, Heading, SimpleGrid} from "@chakra-ui/react";
import {useExpansionStats} from "../../hooks/useExpansionStats";
import {IconStatCard} from "../../beefy-vaults/components/StatCard/IconStatCard";

const ExpansionStats = () => {


    const { staticDollarAmount, staticAmount, chargeDollarAmount, chargeAmount, pulseRepayAmount, pulseRepay } = useExpansionStats()
    return (
        <Flex px={5} py={5} flexDir="column">
            <Heading>Expansion / Debt</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" pt={5}>
                <IconStatCard
                    imgData={{
                        icon: "https://www.chargedefi.fi/static/media/static.180ec003.png",
                        w: "50px",
                        h: "50px"
                    }}
                    data={{
                        symbol: 'New Static / Dollar Amount',
                        value: staticDollarAmount!,
                        topValue: staticAmount,
                    }
                }/>

                <IconStatCard
                    imgData={{
                        icon: "https://www.chargedefi.fi/static/media/charge.53089c19.png",
                        w: "50px",
                        h:"50px"
                    }}
                    data={{
                        symbol: "New Charge / Dollar Amount",
                        value: chargeDollarAmount!,
                        topValue: chargeAmount
                    }}
                    />
                <IconStatCard
                    imgData={{
                        icon: "https://www.chargedefi.fi/static/media/pulse.d06a42ec.png",
                        w: "50px",
                        h:"50px"
                    }}
                    data={{
                        symbol: "Pulse Debt / Dollar Amount",
                        value: pulseRepayAmount!,
                        topValue: pulseRepay
                    }}
                />
            </SimpleGrid>
        </Flex>
    );
};

export default ExpansionStats;
