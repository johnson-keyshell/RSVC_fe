import React, { useEffect, useRef, useState } from "react";
import Typography from '@mui/material/Typography';
import Header from "../../../Components/Header/Header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { API_ROUTES } from "../../../Api";
import Loader from "../../../Components/Loader/Loader";
import { connect } from 'react-redux';
import NothingFound from "../../../Components/Dialogs/NothingFound/NothingFound";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTranslation } from "react-i18next"
import { Divider } from "@mui/material";
import LeftNavOwner from "../../../Components/LeftNav/LeftNavOwner/LeftNavOwner";
import UserProfileCard from "./UserProfileCard";
import AgentProfileCard from "./AgentProfileCard";
import { Box } from "@mui/material";
import Snackbars from "../../../Components/Dialogs/Snackbar/Snackbars";
import { useLocation, useNavigate } from 'react-router-dom';


function AgentList({ socket }) {
    const [isLoading, setIsLoading] = useState(true);
    const [agentList, setAgentList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [properties, setProperties] = useState([]);
    const [triggerRender, setTriggerRender] = useState(false);
    const [openAgentAssignSnackbar, setOpenAgentAssignSnackbar] = useState(false);

    const { i18n, t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
   
    const [agents, setAgents] = useState({
        agent1: null,
        agent2: null,
    })
    const handleCloseAgentAssignSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAgentAssignSnackbar(false);
    };

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

        fetch(API_ROUTES.getSellerUserList)
            .then((response) => response.json())
            .then((data) => {
                setUserList(data);
                // setIsLoading(false)
                console.log("User List ", data);
            })
            .catch((error) => {
                console.error(' getSellerUserList API request failed:', error);
            });


    }, []);
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



    const assignProperty = (propertyId, selectedAgent, agentNum) => {

        console.log("Agents Data", agents);
        let sampleData = {
            agent1: agents?.agent1?.eMail,
            agent2: agents?.agent2?.eMail,
            propertyId: propertyId,
        };

        if (agentNum === "agent1") {
            sampleData.agent1 = selectedAgent?.eMail || sampleData.agent1;
        } else {
            sampleData.agent2 = selectedAgent?.eMail || sampleData.agent2;
        }

        fetch(API_ROUTES.postAgentAssign, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sampleData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Response of data for assigning agent", data);
                setOpenAgentAssignSnackbar(true);
                setTriggerRender(prevState => !prevState);

            })
            .catch((error) => {
                console.error('postAgentAssign API request failed:', error);
            });
    }

    const handleInitiateChat = (agent) => {
        let sampleData = {
            partner: agent.eMail,
        }
        fetch(API_ROUTES.postInitiateChat, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sampleData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Response of data for initiating agent", data);
                const chatId = data?.ChatID;
                navigate('/seller/chat', { state: { chatId } });
                // window.location.href = '/seller/chat';


            })
            .catch((error) => {
                console.error('postInitiateChat API request failed:', error);
            });

    }







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
                            <LeftNavOwner />
                            <TabPanel style={{ height: 'fit-content' }}>
                                <main>
                                    <h2 class="active-menu">{t("agents")}</h2>

                                    <div className="container-fluid-agent">
                                        <Typography
                                            className="txt-buildname"
                                            variant="subtitle2"
                                            sx={{
                                                font: "inter",
                                                fontSize: "20px",
                                                fontWeight: "600",
                                                margin: "10px 0",
                                            }}
                                        >
                                            {t("assignedAgents")}
                                        </Typography>
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
                                                <AgentProfileCard key={agent.eMail} agent={agent} handleInitiateChat={handleInitiateChat} />
                                            ))
                                            }
                                        </Box>) : (
                                            <Typography class="main-reason-doc" >{t("thereIsNoAgentsAssigned.")}</Typography>

                                        )
                                        }

                                        <Typography
                                            className="txt-buildname"
                                            variant="subtitle2"
                                            sx={{
                                                font: "inter",
                                                fontSize: "20px",
                                                fontWeight: "600",
                                                margin: "10px 0",
                                            }}
                                        >
                                            {t("availableUsers")}
                                        </Typography>
                                        {userList ? (<Box sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "16px",
                                            '@media (max-width: 900px)': {
                                                justifyContent: "center",
                                            }
                                        }}>
                                            {userList?.map((agent) => (
                                                <UserProfileCard key={agent.eMail} agent={agent} properties={properties} assignProperty={assignProperty} />
                                            ))}
                                        </Box>) : (
                                            <Typography class="main-reason-doc" >{t("thereIsNoUsersRegisteredYet!!")}</Typography>

                                        )}

                                    </div>
                                </main>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>

            )
            }
            <Snackbars
                openSnackbar={openAgentAssignSnackbar}
                handleCloseSnackbar={handleCloseAgentAssignSnackbar}
                type="success"
                message={t("agentAssignedSuccessfully")}
            />
        </div >


    );
}

export default AgentList;
