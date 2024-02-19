import React from 'react';
import SellerDocuments from './SellerDocuments'
import { useState, useEffect } from 'react';
import { API_ROUTES } from '../../../Api';
import Loader from '../../Loader/Loader';
import Header from '../../Header/Header';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LeftNavAgent from '../../LeftNav/LeftNavAgent/LeftNavAgent';
import Welcome from '../../Chat/Buyer/Welcome';
import '../Documents.css'
import DocumentContacts from '../DocumentContacts';
import NothingFound from '../../Dialogs/NothingFound/NothingFound';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTranslation } from "react-i18next";
import { Divider } from "@mui/material";
import LeftNavOwner from '../../LeftNav/LeftNavOwner/LeftNavOwner';
import AgentBuyerContact from './AgentBuyerContact';
import queryString from 'query-string';


const SellerContactList = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [chatList, setChatList] = useState([]);
    const { i18n, t } = useTranslation();
    const [currentChat, setCurrentChat] = useState(undefined);
    const [showContactsOnly, setShowContactsOnly] = useState(false);

    const handleBackButtonClick = () => {
        setCurrentChat(undefined);
        setShowContactsOnly(true);
    };

    const isMobile = window.innerWidth <= 825;
    useEffect(() => {
        // Parse query parameters from the URL
        const parsed = queryString.parse(window.location.search);
    
        // Check if the 'currentChat' parameter is present
        if (parsed.currentChat) {
          // Parse the 'currentChat' parameter (assuming it's a JSON string)
          const currentChat = JSON.parse(parsed.currentChat);
          setCurrentChat(currentChat);
    
          // Now you can use the 'currentChat' object in your component
          console.log('currentChat:', currentChat);
        }
      }, []); 

    useEffect(() => {
        const handleResize = () => {
            setShowContactsOnly(window.innerWidth <= 825);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
 
        fetch(API_ROUTES.getSellerChatList)
            .then((response) => response.json())
            .then((data) => {
                setChatList(data.sailChatList);
                setIsLoading(false);
                console.log("Owner List for docs ", data);
            })
            .catch((error) => {
                console.error(' getSellerChatList API request failed:', error);
            });


    }, []);

    const handleChatChange = (chat) => {


        setCurrentChat(chat);
    };

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
                                    <h2 class="active-menu">{t("documents")}</h2>
                                    <div className="container-fluid-buyer-document">
                                        {chatList.length == 0 ? (<NothingFound />) : (
                                            <div>
                                                {(isMobile && currentChat) ? (
                                                    <div>
                                                        <button class="back-to-contacts" onClick={handleBackButtonClick}>
                                                            <ArrowBackIosIcon className='icons'
                                                                sx={{ fontSize: "13px", color: "#54C7E9" }} />
                                                            {t("backToList")}
                                                        </button>
                                                        <SellerDocuments currentChat={currentChat} />
                                                    </div>
                                                ) :
                                                    (isMobile || showContactsOnly) ?
                                                        (<div className="buyer-document-screen">
                                                            <div className="contact-list-buyer-document">
                                                                <AgentBuyerContact contacts={chatList} changeChat={handleChatChange} />
                                                            </div>
                                                        </div>)
                                                        :
                                                        (<div className="buyer-document-screen">
                                                            <div className="contact-list-buyer-document">
                                                                <AgentBuyerContact contacts={chatList} changeChat={handleChatChange} />
                                                            </div>
                                                            <Divider orientation="vertical" className="vertical-divider" sx={{ height: "auto" }} />

                                                            <div className="message-screen-buyer-document">
                                                                {currentChat === undefined ? (
                                                                    <Welcome />
                                                                ) : (
                                                                    <SellerDocuments currentChat={currentChat} />
                                                                )}
                                                            </div>
                                                        </div>)
                                                }
                                            </div>
                                        )}
                                    </div>
                                </main>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>

            )}
        </div>

    );
};

export default SellerContactList;
