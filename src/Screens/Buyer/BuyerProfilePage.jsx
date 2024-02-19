import React from 'react'
import LeftNav from '../../Components/LeftNav/LeftNav/LeftNav'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Header from '../../Components/Header/Header';
import ProfilePage from '../../Components/ProfilePage/ProfilePage';


function BuyerProfilePage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="container-fluid p-4">
        <Tabs className="vertical-tabs">
          <TabList className="hidden-tab-list" >
            <Tab className="hidden-tab-list"></Tab>
          </TabList>
          <LeftNav/>
          <TabPanel style={{ height: 'fit-content', width: '70%' }}>
            <ProfilePage/>
          </TabPanel>
        </Tabs>
      </div >
    </div >
  )
}

export default BuyerProfilePage