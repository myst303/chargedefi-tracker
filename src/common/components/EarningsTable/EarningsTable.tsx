import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react'

const EarningsTable = () => {
    return (
        <Table variant="simple">
            <TableCaption> Table is updated daily at midnight 24:00 UTC time</TableCaption>
            <Thead>
                <Tr>
                    <Th>Staked LP</Th>
                    <Th>Earned LP</Th>
                    <Th>Earned $</Th>
                    <Th>Daily %</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>

                </Tr>
            </Tbody>
        </Table>
    );
};

export default EarningsTable;
