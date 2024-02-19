import React, { useEffect, useRef, useState } from "react";
import Typography from '@mui/material/Typography';
import Header from "../../Components/Header/Header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { API_ROUTES } from "../../Api";
import Loader from "../../Components/Loader/Loader";
import { connect } from 'react-redux';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTranslation } from "react-i18next"
import { Divider } from "@mui/material";
import AgentProfileCard from "../Seller/AgentList/AgentProfileCard";
import { Box } from "@mui/material";
import LeftNav from "../../Components/LeftNav/LeftNav/LeftNav";


function BuyerAgentsPage({ socket }) {
    const [isLoading, setIsLoading] = useState(true);
    const [agentList, setAgentList] = useState([]);
    const [properties, setProperties] = useState([]);
    const [triggerRender, setTriggerRender] = useState(false);

    const { i18n, t } = useTranslation();
    const [agents, setAgents] = useState({
        agent1: null,
        agent2: null,
    })


    useEffect(() => {

        fetch(API_ROUTES.getSellerAgentList)
            .then((response) => response.json())
            .then((data) => {
                setAgentList(data);
                // setIsLoading(false)

                if (data.length > 0) {
                    setAgents(prevAgents => ({
                        ...prevAgents,
                        agent1: data[0],
                    }));
                }
                if (data.length > 1) {
                    setAgents(prevAgents => ({
                        ...prevAgents,
                        agent2: data[1],
                    }));
                }
                console.log("Agent List ", data);
                console.log("Agents in new ", agents);
            })
            .catch((error) => {
                console.error(' getSellerAgentList API request failed:', error);
            });


    }, [triggerRender]);

    useEffect(() => {
        fetch(API_ROUTES.getSellerLandingPage)
            .then((response) => response.json())
            .then((data) => {
                setProperties(data?.properties);
                setIsLoading(false)
                console.log("Properties List ", data);
            })
            .catch((error) => {
                console.error(' getSellerLandingPage API request failed:', error);
            });
    }, []);


    return (

        <div>

            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <header>
                        <Header />
                    </header>
                    <div className="container-fluid p-4">
                        <Tabs className="vertical-tabs" style={{ height: 'fit-content' }}>
                            <TabList className="hidden-tab-list" >
                                <Tab className="hidden-tab-list"></Tab>
                            </TabList>
                            <LeftNav />
                            <TabPanel style={{ height: 'fit-content' }}>
                                <main>
                                    <h2 class="active-menu">{t("agents")}</h2>

                                    <div className="container-fluid-agent">
                                        {agentList ? (<Box sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "16px",
                                            justifyContent: "flex-start",
                                            '@media (max-width: 1200px)': {
                                                justifyContent: "center",
                                            }
                                        }}
                                        >
                                            {agentList?.map((agent) => (
                                                <AgentProfileCard key={agent.eMail} agent={agent} handleInitiateChat={""} isBuyer={true} />
                                            ))
                                            }
                                        </Box>) : (
                                            <Typography class="main-reason-doc" >There is no agents assigned.</Typography>

                                        )
                                        }
                                    </div>
                                </main>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>

            )
            }

        </div >


    );
}

export default BuyerAgentsPage;
