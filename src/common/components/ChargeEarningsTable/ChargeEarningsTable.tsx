import React from 'react';
import {Flex, Img, Table, TableCaption, Tag, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {getTokenUrl, timeZone} from "../../helpers/util";
import dayjs from "dayjs";

type Props = {
    data: Array<any>
}

const ChargeEarningsTable = ({ data }: Props) => {
    return (
        <Table variant="simple">
            <TableCaption> Table is updated at every epoch</TableCaption>
            <Thead>
                <Tr>
                    <Th>Date-time</Th>
                    <Th>Charge Earned</Th>
                    <Th>Charge Value</Th>
                    <Th>Total Value</Th>
                    <Th>Percentage</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data && data.map((i:any, key:number) =>
                    <Tr>
                        <Td>
                            <Tag colorScheme="blue">{dayjs.utc(i.date).tz(timeZone).toDate().toLocaleString()}</Tag>
                        </Td>
                        <Td>
                            <Flex>
                                <Img src={getTokenUrl("charge")} h="30px" w="30px" my="auto"/>
                                <Text my="auto" px={2}>{i.earned_charge.toFixed(2)}</Text>
                            </Flex>
                        </Td>
                        <Td>${i.earned_charge_value.toFixed(2)}</Td>
                        <Td>${i.total_earned.toFixed(2)}</Td>
                        <Td>{i.percent_increase}%</Td>
                    </Tr>

                )}
            </Tbody>
        </Table>
    );
};

export default ChargeEarningsTable;
