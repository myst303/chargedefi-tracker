import React from 'react';
import {useFarmsChargeEarnings} from "./hooks/useFarmsChargeEarnings";
import ChargeEarningsTable from "../../../../common/components/ChargeEarningsTable/ChargeEarningsTable";
import { Skeleton } from '@chakra-ui/react';

const FarmChargeTable = () => {
    const { data, isLoading, isError} = useFarmsChargeEarnings()

    return (
        <Skeleton isLoaded={!isLoading && !isError}>
            <ChargeEarningsTable data={data}/>
        </Skeleton>
    );
};

export default FarmChargeTable;
