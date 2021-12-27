import React from 'react';
import {Flex, Heading, SimpleGrid} from "@chakra-ui/react";
import {IconStatCard} from "../../../beefy-vaults/components/StatCard/IconStatCard";
import {useBoardRoomCharge} from "../../../hooks/useBoardroomCharge";

const BoardroomCharge = () => {
    const { staticEarnedDollar, staticEarned, chargeInvested, chargeInvestedDollar} = useBoardRoomCharge()
    return (
        <>
            <Heading>Boardroom - Charge</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" pt={5}>
                <IconStatCard
                    imgData={{
                        icon: "https://www.chargedefi.fi/static/media/charge.53089c19.png",
                        w: "50px",
                        h:"50px"
                    }}
                    data={{
                        symbol: 'Charge Invested',
                        value: chargeInvestedDollar!,
                        topValue: chargeInvested
                    }}
                />
                <IconStatCard
                    imgData={{
                        icon: "https://www.chargedefi.fi/static/media/static.180ec003.png",
                        w: "50px",
                        h: "50px"
                    }}
                    data={{
                        symbol: 'Static Earned',
                        value: staticEarnedDollar!,
                        topValue: staticEarned,
                    }
                    }/>

            </SimpleGrid>
        </>
    );
};

export default BoardroomCharge;
