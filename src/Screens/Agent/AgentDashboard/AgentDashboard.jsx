import React from "react";
import Header from "../../../Components/Header/Header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./AgentDashboard.css";
import { useTranslation } from "react-i18next";
import LeftNavAgent from "../../../Components/LeftNav/LeftNavAgent/LeftNavAgent";
import AgentGridView from '../AgentGridView'


function AgentDashboard() {
  const { i18n, t } = useTranslation();


  return (
    <div>
            <Header
            />
            {/* <Filtermenu /> */}
            <div className="container-fluid p-4">
                <Tabs className="vertical-tabs">
                    <TabList className="hidden-tab-list" >
                        <Tab className="hidden-tab-list"></Tab>
                    </TabList>
                    <LeftNavAgent />
                    <TabPanel>
                        <div class="card-listing-section">
                            {/* <h2 class="active-menu ml-3">Listings</h2> */}
                            <div class="ml-3">
                                <AgentGridView
                                />
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>


        </div>
  );
}

export default AgentDashboard;
