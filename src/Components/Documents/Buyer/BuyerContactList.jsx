import React from 'react';
import queryString from 'query-string';
import BuyerDocuments from './BuyerDocuments'
import { useState, useEffect } from 'react';
import { API_ROUTES } from '../../../Api';
import Loader from '../../Loader/Loader';
import Header from '../../Header/Header';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LeftNav from '../../LeftNav/LeftNav/LeftNav';
import Welcome from '../../Chat/Buyer/Welcome';
import '../Documents.css'
import DocumentContacts from '../DocumentContacts';
import NothingFound from '../../Dialogs/NothingFound/NothingFound';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTranslation } from "react-i18next";
import { Divider } from "@mui/material";


const BuyerContactList = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [chatList, setChatList] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [showContactsOnly, setShowContactsOnly] = useState(false);
    const { i18n, t } = useTranslation();

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

        fetch(API_ROUTES.getBuyerChatList)
            .then((response) => response.json())
            .then((data) => {
                setChatList(data);
                setIsLoading(false);
                console.log("Buyer chat List ", data);
            })
            .catch((error) => {
                console.error(' getBuyerChatList API request failed:', error);
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
                            <LeftNav />
                            <TabPanel style={{ height: 'fit-content', width: '70%' }}>
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
                                                        <BuyerDocuments currentChat={currentChat} />
                                                    </div>
                                                ) :
                                                    (isMobile || showContactsOnly) ?
                                                        (<div className="buyer-document-screen">
                                                            <div className="contact-list-buyer-document">
                                                                <DocumentContacts contacts={chatList} changeChat={handleChatChange} />
                                                            </div>
                                                        </div>)
                                                        :
                                                        (<div className="buyer-document-screen">
                                                            <div className="contact-list-buyer-document">
                                                                <DocumentContacts contacts={chatList} changeChat={handleChatChange} />
                                                            </div>
                                                            <Divider orientation="vertical" className="vertical-divider" sx={{ height: "auto" }} />

                                                            <div className="message-screen-buyer-document">
                                                                {currentChat === undefined ? (
                                                                    <Welcome />
                                                                ) : (
                                                                    <BuyerDocuments currentChat={currentChat} />
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

export default BuyerContactList;
