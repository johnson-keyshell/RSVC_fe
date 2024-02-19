import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Header from '../../Components/Header/Header';
import ProfilePage from '../../Components/ProfilePage/ProfilePage';
import LeftNavOwner from '../../Components/LeftNav/LeftNavOwner/LeftNavOwner';


function SellerProfilePage() {
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
          <LeftNavOwner/>
          <TabPanel style={{ height: 'fit-content', width: '70%' }}>
            <ProfilePage/>
          </TabPanel>
        </Tabs>
      </div >
    </div >
  )
}

export default SellerProfilePage