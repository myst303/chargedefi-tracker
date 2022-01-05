import React from 'react';
import {useFarmsStaticEarnings} from "./hooks/useFarmsStaticEarnings";
import {Skeleton} from "@chakra-ui/react";
import ChargeEarningsTable from "../../../../common/components/ChargeEarningsTable/ChargeEarningsTable";


const FarmStaticTable = () => {
    const { data, isLoading, isError} = useFarmsStaticEarnings()

    return (
        <Skeleton isLoaded={!isLoading && !isError}>
            <ChargeEarningsTable data={data}/>
        </Skeleton>
    );
};

export default FarmStaticTable;
