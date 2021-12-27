import { Flex, Heading, Stat, Text, Box,  useColorModeValue as mode, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import {useBoardRoomLp} from "../hooks/useBoardRoomLp";
import {IconStatCard} from "../beefy-vaults/components/StatCard/IconStatCard";
import BoardroomCharge from "./components/BoardroomCharge/BoardroomCharge";
import BoardRoomLp from "./components/BoardroomLp/BoardRoomLp";


const Main = () => {


    return (
        <Flex px={5} py={5} flexDir="column">
            <BoardroomCharge/>
            <BoardRoomLp/>
        </Flex>
    );
};

export default Main;
