import React from 'react';
import {Heading, SimpleGrid} from "@chakra-ui/react";
import {IconStatCard} from "../../../../../common/components/IconStatCard/IconStatCard";
import {useBoardRoomLp} from "../hooks/useBoardRoomLp";
import {InvestedCard} from "../cards/InvestedCard";

const BoardRoomLp = () => {
    const { stats } = useBoardRoomLp()
    return (
        <>
            <Heading pt={5}>Boardroom - Static-BUSD</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" pt={5}>
                <InvestedCard
                    token="static-busd"
                    data={{
                        symbol: 'Static-BUSD',
                        value: stats.tokens,
                        topValue: stats.value,
                        tvl: stats.tvl
                    }}
                />
                <IconStatCard
                    token="charge"
                    data={{
                        symbol: 'Charge Earned',
                        value: stats.chargeValue,
                        topValue: stats.chargeEarned,
                        changeDaily: stats.chargeChangeDaily
                    }}
                />
                <IconStatCard
                    token="static"
                    data={{
                        symbol: 'Static Earned',
                        value: stats.staticValue,
                        topValue: stats.staticEarned,
                        changeDaily: stats.staticChangeDaily
                    }}
                />
            </SimpleGrid>
        </>
    );
};

export default BoardRoomLp;
