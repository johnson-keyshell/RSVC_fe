import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MultiStepForm from "../../Components/Forms/Seller/MultiStepForm"
import Header from "../../Components/Header/Header";
import LeftNavOwner from "../../Components/LeftNav/LeftNavOwner/LeftNavOwner";

function HomeScreen() {
  return (
    <div>
      <header>
        <Header/>
      </header>
      <div className="container-fluid p-4">
        <Tabs className="vertical-tabs">
        <TabList className="hidden-tab-list" >
          <Tab className="hidden-tab-list"></Tab>
        </TabList>
        <LeftNavOwner/>
          <TabPanel>
            <MultiStepForm />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default HomeScreen;