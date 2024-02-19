import React, { useEffect, useRef, useState } from "react";
import Contacts from "./Contacts";
import Welcome from "./Welcome";
import ChatContainer from "./ChatContainer";
import { io } from "socket.io-client";
import Header from "../../Header/Header";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LeftNavAgent from "../../LeftNav/LeftNavAgent/LeftNavAgent";
import { API_ROUTES } from "../../../Api";
import Loader from "../../Loader/Loader";
import { connect } from 'react-redux';
import NothingFound from "../../Dialogs/NothingFound/NothingFound";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTranslation } from "react-i18next"
import { Divider } from "@mui/material";
import queryString from 'query-string';


const mapStateToProps = (state) => ({
  socket: state.socket,
  // ... Map other state values as needed
});

function ChatScreen({ socket }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [chatList, setChatList] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [newMessage, setNewMessage] = useState();
  const { i18n, t } = useTranslation();
  let currentChatId = useRef();
  const [showContactsOnly, setShowContactsOnly] = useState(false);

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

    fetch(API_ROUTES.getAgentOwnerChatList)
      .then((response) => response.json())
      .then((data) => {

        const newData = data.map((data) => (
          {
            partner: data.owner,
            property: data.property,
            sailId: data.sailId,
            unreadMessagesCount: data.unreadMessagesCount,
            chatId: data.chatId,
            lastMessageTime: data.lastMessageTime
          }
        ))


        setChatList((prevChatList) => [...prevChatList, ...newData]);
        // setIsLoading(false)
        console.log("Agent Owner chat List ", data);
        console.log("Full chatList", chatList);
      })
      .catch((error) => {
        console.error(' getAgentOwnerChatList API request failed:', error);
      });


    fetch(API_ROUTES.getAgentChatList)
      .then((response) => response.json())
      .then((data) => {
        setChatList((prevChatList) => [...prevChatList, ...data]);
        console.log("Agent chat List ", data);
        console.log("Full chatList", chatList);
      })
      .catch((error) => {
        console.error(' getAgentChatList API request failed:', error);
      })
      .finally(() => {
        // Set isLoading to false after both API calls are complete
        setIsLoading(false);
      });


  }, []);

  const handleChatChange = (chat) => {
    fetch(API_ROUTES.setReadFlagAgent(chat?.chatId), {
      method: "POST"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log("Setting Read flag response of Agent", data);
        if (data === "Done") {
          console.log("Read flag set successfully");
          setChatList((prevContacts) => {
            return prevContacts.map((contact) =>
              contact.chatId === chat?.chatId ? { ...contact, unreadMessagesCount: 0 } : contact
            );
          });
        } else {
          console.log("Unexpected response:", data);
        }
      })
      .catch((error) => {
        console.error("setReadFlagAgent API request failed:", error);
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
          agentChatState: newUpdate?.agentChatState,
          chatId: newUpdate.chatId,
          chatStatus: newUpdate?.chatStatus,
          lastMessageTime: newUpdate.lastMessageTime,
          partner: newUpdate?.buyer ?? newUpdate?.owner,
          property: newUpdate.property,
          sailId: newUpdate.sailId,
          unreadMessagesCount: newUpdate.unreadMessagesCount,
        };

        setChatList((prevChatList) => {
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
              <LeftNavAgent />
              <TabPanel style={{ height: 'fit-content' }}>
                <main>
                  <h2 class="active-menu">{t("messages")}</h2>

                  <div className="container-fluid-agent">
                    {chatList.length == 0 ? (<NothingFound />) : (
                      <div>
                        {(isMobile && currentChat) ? (
                          <div>
                            <button class="back-to-contacts" onClick={handleBackButtonClick}>
                              <ArrowBackIosIcon className='icons'
                                sx={{ fontSize: "13px", color: "#54C7E9" }} />
                              {t("backToChatlist")}
                            </button>
                            <ChatContainer currentChat={currentChat} socket={socket} newMessage={newMessage}
                              contacts={chatList}

                            />
                          </div>
                        ) :
                          (isMobile || showContactsOnly) ?
                            (<div className="chat-screen">
                              <div className="contact-list-agent">
                                <Contacts contacts={chatList} changeChat={handleChatChange} />
                              </div>
                            </div>)
                            :
                            (<div className="chat-screen">
                              <div className="contact-list-agent">
                                <Contacts contacts={chatList} changeChat={handleChatChange} />
                              </div>
                              <Divider orientation="vertical" className="vertical-divider" sx={{ height: "auto" }} />

                              <div className="message-screen-agent">
                                {currentChat === undefined ? (
                                  <Welcome />
                                ) : (
                                  <ChatContainer currentChat={currentChat} socket={socket} newMessage={newMessage}
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
