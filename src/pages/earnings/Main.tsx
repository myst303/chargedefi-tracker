import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import BeefyEarningsTable from "./components/beefy-vaults/BeefyEarningsTable";

const Main = () => {
    return (
        <Flex flexDir="column" py={5}>
            <Tabs isFitted>
                <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Boardroom</Tab>
                    <Tab>Farms</Tab>
                    <Tab>Beefy Vaults</Tab>

                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                    </TabPanel>
                    <TabPanel>
                        <BeefyEarningsTable/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
};

export default Main;
