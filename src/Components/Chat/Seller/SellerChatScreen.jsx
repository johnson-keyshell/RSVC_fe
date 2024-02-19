import React, { useEffect, useRef, useState } from "react";
import SellerContact from "./SellerContact";
import Welcome from "./Welcome";
import SellerChatContainer from "./SellerChatContainer";
import { io } from "socket.io-client";
import Header from "../../Header/Header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { API_ROUTES } from "../../../Api";
import Loader from "../../Loader/Loader";
import { connect } from 'react-redux';
import NothingFound from "../../Dialogs/NothingFound/NothingFound";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTranslation } from "react-i18next"
import { Divider, Typography } from "@mui/material";
import LeftNavOwner from "../../LeftNav/LeftNavOwner/LeftNavOwner";
import AgentBuyerContact from './AgentBuyerContact'
import CloseIcon from '@mui/icons-material/CloseOutlined';
import queryString from 'query-string';
import { useLocation,useNavigate } from 'react-router-dom';




const mapStateToProps = (state) => ({
  socket: state.socket,
  // ... Map other state values as needed
});

function ChatScreen({ socket }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [agentChatList, setAgentChatList] = useState([]);
  const [sailChatList, setSailChatList] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [newMessage, setNewMessage] = useState();
  const { i18n, t } = useTranslation();
  let currentChatId = useRef();
  const [showContactsOnly, setShowContactsOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      let firstContact = null
      if (filteredAgents.length != 0) {
        firstContact = filteredAgents[0];
      }
      else {
        firstContact = filteredSail[0];
      }

      if (firstContact) {
        changeCurrentChat(firstContact.chatId, firstContact);
      }
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const changeCurrentChat = (chatId, contact) => {
    setSearchQuery("");
    handleChatChange(contact);
  };

  const filteredAgents = agentChatList.filter((contact) =>
    contact?.agent?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredSail = sailChatList.filter((contact) =>
    contact?.buyer?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBackButtonClick = () => {
    if (socket.socket) {
      socket.socket.emit('close-chat');
    }
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
        setAgentChatList(data.agentChatList);
        setSailChatList(data.sailChatList);
        setIsLoading(false)
        console.log("Owner chat List ", data);

      })
      .catch((error) => {
        console.error(' getSellerChatList API request failed:', error);
      });


  }, []);

  useEffect(() => {
    const chatId = location?.state?.chatId;

    if (chatId && agentChatList.length > 0) {
      const foundChat = agentChatList.find(chat => chat.chatId === chatId);
      setCurrentChat(foundChat);

      // Navigate only when conditions are met
      navigate({ state: { chatId: null } });
    }
  }, [agentChatList, setCurrentChat, location, navigate]);



  const handleChatChange = (chat) => {
    fetch(API_ROUTES.setSellerReadFlag(chat?.chatId), {
      method: "POST"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log("Setting Read flag response of Seller", data);
        if (data === "Done") {
          console.log("Read flag set successfully");
          setAgentChatList((prevContacts) => {
            return prevContacts.map((contact) =>
              contact.chatId === chat?.chatId ? { ...contact, unreadMessagesCount: 0 } : contact
            );
          });
        } else {
          console.log("Unexpected response:", data);
        }
      })
      .catch((error) => {
        console.error("setSellerReadFlag API request failed:", error);
      });

    setCurrentChat(chat);
  };


  useEffect(() => {
    if (currentChat?.chatId) {
      currentChatId.current = currentChat.chatId;
    }
  }, [currentChat?.chatId]);

  useEffect(() => {
    if (socket.socket) {
      console.log('Socket in ChatScreen:', socket);
      socket.socket.emit('in-chat-screen');
      socket.socket.on('chat-list-update', (newUpdate) => {
        console.log("New updated contact", newUpdate);

        const updatedChat = {
          agent: newUpdate.agent,
          buyer: newUpdate?.buyer,
          chatId: newUpdate.chatId,
          chatStatus: newUpdate.chatStatus,
          lastMessageTime: newUpdate.lastMessageTime,
          partner: newUpdate.partner,
          property: newUpdate.property,
          // sailId: newUpdate.sailId,
          unreadMessagesCount: newUpdate.unreadMessagesCount,
        };

        if (updatedChat.buyer) {
          setSailChatList((prevChatList) => {
            // Check if the chat already exists in the list
            const existingChatIndex = prevChatList.findIndex((chat) => chat.chatId === updatedChat.chatId);

            if (existingChatIndex !== -1) {
              // If the chat exists, remove it from the list
              const updatedChatList = prevChatList.filter((chat) => chat.chatId !== updatedChat.chatId);

              // Add the updated chat at the beginning of the list
              const newChatList = [updatedChat, ...updatedChatList];

              // Check if the currentChat is affected by the update
              if (currentChatId.current === updatedChat.chatId) {
                // Update the currentChat state with the latest information
                setCurrentChat(updatedChat);
              }

              return newChatList;
            } else {
              // If the chat doesn't exist, add it to the beginning of the list
              return [updatedChat, ...prevChatList];
            }
          });
        }
        else {
          setAgentChatList((prevChatList) => {
            // Check if the chat already exists in the list
            const existingChatIndex = prevChatList.findIndex((chat) => chat.chatId === updatedChat.chatId);

            if (existingChatIndex !== -1) {
              // If the chat exists, remove it from the list
              const updatedChatList = prevChatList.filter((chat) => chat.chatId !== updatedChat.chatId);

              // Add the updated chat at the beginning of the list
              const newChatList = [updatedChat, ...updatedChatList];

              // Check if the currentChat is affected by the update
              if (currentChatId.current === updatedChat.chatId) {
                // Update the currentChat state with the latest information
                setCurrentChat(updatedChat);
              }

              return newChatList;
            } else {
              // If the chat doesn't exist, add it to the beginning of the list
              return [updatedChat, ...prevChatList];
            }
          });
        }



      });


      socket.socket.on('new-message', (message) => {
        console.log("chat id inside use effect", currentChatId);
        if (currentChatId) {
          setNewMessage(message);
          console.log("in socket", message)
        }
      });
    }
  }, [socket]);

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
                  <h2 class="active-menu">{t("messages")}</h2>

                  <div className="container-fluid-agent">
                    {agentChatList.length == 0 ? (<NothingFound />) : (
                      <div>
                        {(isMobile && currentChat) ? (
                          <div>
                            <button class="back-to-contacts" onClick={handleBackButtonClick}>
                              <ArrowBackIosIcon className='icons'
                                sx={{ fontSize: "13px", color: "#54C7E9" }} />
                              {t("backToChatlist")}
                            </button>
                            <SellerChatContainer currentChat={currentChat} socket={socket} newMessage={newMessage}
                              contacts={agentChatList}

                            />
                          </div>
                        ) :
                          (isMobile || showContactsOnly) ?
                            (<div className="chat-screen">
                              <div className="contact-list-agent">
                                <div className="search-box-container">
                                  <input
                                    type="text"
                                    className="contact-search-agent"
                                    placeholder={t("search")}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                  />
                                  {searchQuery && (
                                    <span className="close-icon" onClick={clearSearch}>
                                      <CloseIcon />
                                    </span>
                                  )}
                                </div>
                                <SellerContact contacts={filteredAgents} changeChat={handleChatChange} />
                                <AgentBuyerContact contacts={filteredSail} changeChat={handleChatChange} />
                              </div>
                            </div>)
                            :
                            (<div className="chat-screen">
                              <div className="contact-list-agent">
                                <div className="search-box-container">
                                  <input
                                    type="text"
                                    className="contact-search-agent"
                                    placeholder={t("search")}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                  />
                                  {searchQuery && (
                                    <span className="close-icon" onClick={clearSearch}>
                                      <CloseIcon />
                                    </span>
                                  )}
                                </div>
                                <SellerContact contacts={filteredAgents} changeChat={handleChatChange} />
                                <AgentBuyerContact contacts={filteredSail} changeChat={handleChatChange} />                              </div>
                              <Divider orientation="vertical" className="vertical-divider" sx={{ height: "auto" }} />

                              <div className="message-screen-agent">
                                {currentChat === undefined ? (
                                  <Welcome />
                                ) : (
                                  <SellerChatContainer currentChat={currentChat} socket={socket} newMessage={newMessage}
                                    onBackButtonClick={handleBackButtonClick}
                                    isMobile={isMobile}
                                  />
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

      )
      }
    </div >


  );
}

export default connect(mapStateToProps)(ChatScreen);
