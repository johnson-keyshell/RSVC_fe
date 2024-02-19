import React from 'react'
import LeftNav from '../../Components/LeftNav/LeftNav/LeftNav'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Header from '../../Components/Header/Header';
import ProfilePage from '../../Components/ProfilePage/ProfilePage';


function AdminSettings() {
  const handleGoogle = () => {
    window.location.href = '/api/auth/google/auth-url'
  }
  const handleDocuSign = () => {
    window.location.href = '/api/auth/docusign/auth-url'

  }
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
          {/* <LeftNav /> */}
          <TabPanel style={{ height: 'fit-content', width: '70%' }}>
            <div>
              <button className="add-more-btn mt-3" style={{ marginLeft: "10px", width: "fit-content" }} onClick={handleGoogle}>Google Authentication for Application</button>
              <button className="add-more-btn mt-3" style={{ marginLeft: "10px", width: "fit-content" }} onClick={handleDocuSign}>DocuSign Authentication for Application</button>
            </div>
          </TabPanel>
        </Tabs>
      </div >
    </div >
  )
}

export default AdminSettings