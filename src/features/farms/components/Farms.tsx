import React from 'react';
import {Heading, SimpleGrid} from "@chakra-ui/react";
import {IconStatCard} from "../../beefy-vaults/components/StatCard/IconStatCard";
import {useFarms} from "../../hooks/useFarms";

const Farms = () => {

    const { staticBusd, chargeBusd} = useFarms()

    return (
      <>
          <Heading py={5} px={5}>Farms </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" pt={5} px={5}>
              <IconStatCard
                  imgData={{
                      icon: "https://www.chargedefi.fi/static/media/static-busd.00622597.png",
                      w: "83px",
                      h: "50px"
                  }}
                  data={{
                      symbol: 'Static-BUSD Invested / Dollar Amount',
                      value: staticBusd.value,
                      topValue: staticBusd.lp,
                  }}
              />
              <IconStatCard
                  imgData={{
                      icon: "https://www.chargedefi.fi/static/media/charge.53089c19.png",
                      w: "50px",
                      h: "50px"
                  }}
                  data={{
                      symbol: 'Charge Earned / Dollar Amount',
                      value: staticBusd.chargeValue,
                      topValue: staticBusd.chargeReward,
                  }}
              />
              <IconStatCard
                  imgData={{
                      icon: "https://www.chargedefi.fi/static/media/charge-busd.fffca344.png",
                      w: "83px",
                      h:"50px"
                  }}
                  data={{
                      symbol: 'Charge-BUSD Invested / Dollar Amount',
                      value: chargeBusd.value,
                      topValue: chargeBusd.lp
                  }}
              />
              <IconStatCard
                  imgData={{
                      icon: "https://www.chargedefi.fi/static/media/charge.53089c19.png",
                      w: "50px",
                      h: "50px"
                  }}
                  data={{
                      symbol: 'Charge Earned / Dollar Amount',
                      value: chargeBusd.chargeValue,
                      topValue: chargeBusd.chargeReward,
                  }}
              />
          </SimpleGrid>
      </>
    );
};

export default Farms;
