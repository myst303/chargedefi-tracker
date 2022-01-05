import React from 'react';
import {Flex, Img, Table, TableCaption, Tag, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {getTokenUrl, timeZone} from "../../../../common/helpers/util";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import {useBoardroomChargeEarnings} from "./hooks/useBoardroomChargeEarnings";


const BoardRoomLpTable = () => {

    const { data, isLoading, isError} = useBoardroomChargeEarnings()
    return (
        <Table variant="simple">
            <TableCaption> Table is updated at every epoch</TableCaption>
            <Thead>
                <Tr>
                    <Th>Date-time</Th>
                    <Th>Static Earned</Th>
                    <Th>Static Value</Th>
                    <Th>Total Earned</Th>
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
                                <Img src={getTokenUrl("static")} h="30px" w="30px" my="auto"/>
                                <Text my="auto" px={2}>{i.earned_static.toFixed(2)}</Text>
                            </Flex>
                        </Td>
                        <Td>${i.earned_static_value.toFixed(2)}</Td>
                        <Td>${i.total_earned.toFixed(2)}</Td>
                        <Td>{i.percent_increase}%</Td>
                    </Tr>

                )}
            </Tbody>
        </Table>
    );
};

export default BoardRoomLpTable;
