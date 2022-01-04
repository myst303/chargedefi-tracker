import React from 'react';
import ProtocolStats from "./components/protocol-stats/ProtocolStats";
import ExpansionStats from "./components/protocol-stats/ExpansionStats/ExpansionStats";
import BeefyVaults from "./components/beefy-vaults/BeefyVaults";
import Farms from "./components/farms/Farms";
import UserStats from "./components/user-stats/UserStats";
import {default as BoardRoomMain} from "./components/boardroom/BoardRoom";
import {useWalletAddress} from "../../common/contexts/WalletAddressContext";
import ConnectDapp from "../../common/components/ConnectDapp/ConnectDapp";

const Main = () => {
    const { walletAddress } = useWalletAddress()!

    if(!walletAddress){
        return <ConnectDapp/>
    }

    return (
        <>
            <ProtocolStats/>
            <ExpansionStats/>
            <BeefyVaults/>
            <Farms/>
            <BoardRoomMain/>
            <UserStats/>
        </>
    );
};

export default Main;
