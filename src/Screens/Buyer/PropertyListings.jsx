import React from 'react'
import Header from '../../Components/Header/Header'
import Filtermenu from '../../Components/FilterMenu/Filtermenu'
import Buyerviewcard from '../../Components/Viewcard/Buyerviewcard'
import GridView from '../../Components/Quickinfo/GridView'
import LeftNav from '../../Components/LeftNav/LeftNav/LeftNav'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useTranslation } from "react-i18next";

function PropertyListings({
    nextStep
}) {
    const { i18n, t } = useTranslation();
    return (
        <div>
            <Header
                nextStep={nextStep}
            />
            {/* <Filtermenu /> */}
            <div className="container-fluid p-4">
                <Tabs className="vertical-tabs">
                    <TabList className="hidden-tab-list" >
                        <Tab className="hidden-tab-list"></Tab>
                    </TabList>
                    <LeftNav />
                    <TabPanel>
                        <div class="card-listing-section">
                            <h2 class="active-menu ml-3">{t("listings")}</h2>
                            <div class="ml-3">
                                <GridView
                                    nextStep={nextStep}
                                    level="buyer"
                                />
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>


        </div>
    )
}

export default PropertyListings