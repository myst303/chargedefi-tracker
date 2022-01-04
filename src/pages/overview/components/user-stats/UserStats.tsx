import { Flex, Heading, Stat, Text, Box,  useColorModeValue as mode, SimpleGrid, Input, Checkbox, useToast, InputLeftElement, InputGroup } from '@chakra-ui/react';
import StatCard from "../../../../common/components/StatCard/StatCard";
import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
import {useBeefyVault} from '../beefy-vaults/hooks/useBeefyVaults';
import {useFarms} from "../farms/hooks/useFarms";
import {useBoardRoomCharge} from "../boardroom/hooks/useBoardroomCharge";
import {useBoardRoomLp} from "../boardroom/hooks/useBoardRoomLp";
import { isNumber } from '@chakra-ui/utils';

const UserStats = () => {

    const [investment, setInvestment] = useState<string>("");

    const [includeBeefy, setIncludeBeefy] = useState<boolean>(true);
    const [includeFarms, setIncludeFarms] = useState<boolean>(true);
    const [includeBoardroom, setIncludeBoardroom] = useState<boolean>(true);

    const { staticVault, chargeVault } = useBeefyVault();
    const { stats } = useFarms();
    const statsBoardRoomLp = useBoardRoomLp()
    const statsBoardRoomCharge = useBoardRoomCharge()

    let totalValue = 0;
    if (includeBeefy) {
        totalValue += Number(chargeVault.toDollar);
        totalValue += Number(staticVault.toDollar);
    }

    if (includeFarms) {
        totalValue += Number(stats.staticLpValue);
        totalValue += Number(stats.staticRewardValue);
        totalValue += Number(stats.chargeLpValue);
        totalValue += Number(stats.chargeRewardValue);
    }

    if (includeBoardroom) {
        totalValue += Number(statsBoardRoomLp.stats.value);
        totalValue += Number(statsBoardRoomLp.stats.chargeValue);
        totalValue += Number(statsBoardRoomLp.stats.staticValue);
        totalValue += Number(statsBoardRoomCharge.stats.value);
        totalValue += Number(statsBoardRoomCharge.stats.earnedValue);
    }

    let roi = 0;

    if (isNumber(Number(investment)) && Number(investment) != 0) {
        roi = (totalValue/Number(investment)-1)*100;
    }
    const cookies = new Cookies();

    function updateInvestment (value:string) {
        const numberValue = Number(value);
        if (isNumber(numberValue) && numberValue != 0) {
            cookies.set('investment', value, { path: '/' });
            setInvestment(value);
        } else {
            cookies.set('investment', 0, { path: '/' });
            setInvestment('0');
        }
    }

    if (investment == "" && cookies.get('investment') !== undefined) {
        console.log("retrieving investment from cookie!");
        setInvestment(cookies.get('investment'));
    }

    return (
        <Flex px={5} py={5} flexDir="column">
            <Heading>User statistics</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" pt={5}>
                <Flex w={{base: "100%", lg: "60%"}}>
                    <InputGroup size="lg">
                        <Text>Total Investment</Text>
                        <Input value={investment} size="lg" onChange={e => updateInvestment(e.target.value)}/>
                    </InputGroup>
                </Flex>
                <Flex w={{base: "100%", lg: "60%"}}>
                    <Checkbox isChecked={includeBeefy} onChange={e => setIncludeBeefy(e.target.checked)}>
                        Beefy
                    </Checkbox>
                    <Checkbox isChecked={includeFarms} onChange={e => setIncludeFarms(e.target.checked)}>
                        Farms
                    </Checkbox>
                    <Checkbox isChecked={includeBoardroom} onChange={e => setIncludeBoardroom(e.target.checked)}>
                        Boardroom
                    </Checkbox>
                </Flex>
                <StatCard label={"Total Value"} value={"$" + totalValue.toFixed(2)} />
                <StatCard label={"Return on investment"} value={roi.toFixed(2) + '%'}/>
            </SimpleGrid>
        </Flex>
    );
};

export default UserStats;
