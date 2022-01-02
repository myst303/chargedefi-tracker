import React from 'react';
import {Img, Table, TableCaption, Tbody, Th, Thead, Tr, Text, Flex, Tag, Td} from "@chakra-ui/react";
import {getTokenUrl} from "../../../../common/helpers/util";

const BeefyEarningsTable = () => {
    return (
        <Table variant="simple">
            <TableCaption> Table is updated daily at midnight 24:00 UTC time</TableCaption>
            <Thead>
                <Tr>
                    <Th>Date</Th>
                    <Th>Staked LP</Th>
                    <Th>Earned LP</Th>
                    <Th>Earned $</Th>
                    <Th>Daily %</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>
                        <Tag colorScheme="blue">{new Date().toLocaleDateString()}</Tag>
                    </Td>
                    <Td>
                        <Flex>
                            <Img src={getTokenUrl("static-busd")} h="30px" w="50px" my="auto"/>
                            <Text my="auto" px={2}>915</Text>
                        </Flex>
                    </Td>
                    <Td>
                        <Flex>
                            <Img src={getTokenUrl("static-busd")} h="30px" w="50px" my="auto"/>
                            <Text my="auto" px={2} >15</Text>
                        </Flex>
                    </Td>
                    <Td>$50</Td>
                    <Td>2.35</Td>
                </Tr>
            </Tbody>
        </Table>
    );
};

export default BeefyEarningsTable;
