import React from 'react';
import {Heading, SimpleGrid} from "@chakra-ui/react";
import {IconStatCard} from "../../../beefy-vaults/components/StatCard/IconStatCard";
import {useBoardRoomLp} from "../../../hooks/useBoardRoomLp";

const BoardRoomLp = () => {
    const { lpInvested, lpDollar, staticEarned, staticEarnedDollar, chargeEarnedDollar, chargeEarned } = useBoardRoomLp()
    return (
        <>
            <Heading py={5}>Boardroom - Static-BUSD</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" pt={5}>
                <IconStatCard
                    imgData={{
                        icon: "https://www.chargedefi.fi/static/media/charge-busd.fffca344.png",
                        w: "83px",
                        h: "50px"
                    }}
                    data={{
                        symbol: 'LP invested',
                        value: lpDollar!,
                        topValue: lpInvested,
                    }
                    }/>
                <IconStatCard
                    imgData={{
                        icon: "https://www.chargedefi.fi/static/media/charge.53089c19.png",
                        w: "50px",
                        h:"50px"
                    }}
                    data={{
                        symbol: 'Charge Earned',
                        value: chargeEarnedDollar!,
                        topValue: chargeEarned
                    }}
                />
                <IconStatCard
                    imgData={{
                        icon: "https://www.chargedefi.fi/static/media/static.180ec003.png",
                        w: "50px",
                        h:"50px"
                    }}
                    data={{
                        symbol: 'Static Earned',
                        value: staticEarnedDollar!,
                        topValue: staticEarned
                    }}
                />
            </SimpleGrid>
        </>
    );
};

export default BoardRoomLp;
