import React, { useEffect, useRef, useState } from "react";
import SellerChatInput from "./SellerChatInput";
import axios from "axios";
import config from "../../../config";
// import './AgentChatScreen.css' 
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Loader from "../../Loader/Loader";
import DescriptionIcon from '@mui/icons-material/Description';
import { API_ROUTES } from "../../../Api";
import { Link } from 'react-router-dom';
import { formatDateGeneral, formatDateTime } from "../../formatDate";
import ImageIcon from '@mui/icons-material/Image';
import AgentCalling from "../../AgentAgreementDialogs/AgentCalling";
import NoLonger from "../NoLonger";
import { useTranslation } from "react-i18next";
import { Divider } from "@mui/material";
import Snackbars from "../../Dialogs/Snackbar/Snackbars";
import Typography from '@mui/material/Typography';
import { Button, Tooltip } from '@mui/material'
import queryString from 'query-string';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';



function SellerChatContainer({ currentChat, socket, newMessage }) {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isBuyer, setIsBuyer] = useState(undefined);
  const [isAgent, setIsAgent] = useState(currentChat?.property);
  const allowedStatuses = ['Hidden', 'Active'];
  const { i18n, t } = useTranslation();

  const scrollRef = useRef();

  useEffect(() => {
    console.log("Current chat is ", currentChat)
    const chatId = currentChat?.chatId;
    setIsAgent(currentChat?.property)
    if (currentChat?.buyer)
      setIsBuyer(true);
    else
      setIsBuyer(false);
    fetch(API_ROUTES.getSellerChatMessage(chatId))
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
        setIsLoading(false);
        console.log("Messages for seller from agent ", data);
      })
      .catch((error) => {
        console.error(' getSellerChatMessage API request failed:', error);
      });
  }, [currentChat?.chatId]);

  useEffect(() => {
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  }, [newMessage?.messageId]);

  const handleSendMsg = async (msg) => {
    console.log(
      "CURRENT chat-----------",
      currentChat ? currentChat : "no currnt chat"
    );
    const message = {
      chatId: currentChat?.chatId,
      to: currentChat?.agent.userName,
      message: msg.message,
      messageType: msg.messageType
    }
    console.log("Message body ", message)
    if (message) {
      fetch(API_ROUTES.postSendMessageSeller, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("Sending message to buyer from agent  ", data);
          if (data) {
            console.log("Message send successfully")
            if (socket.socket) {
              console.log('Socket in ChatScreen after opening chat:', socket);
              console.log({ message });
            }
          }
          else {
            console.log("Message not send ")

          }
        })
        .catch((error) => {
          console.error('postSendMessageSeller API request failed:', error);
          console.error('Request Body:', JSON.stringify(message));
        });
    }
  };


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (socket.socket) {
      console.log('Socket in ChatScreen after opening chat:', socket);
      socket.socket.emit('open-chat', currentChat?.chatId);
      return () => {
        socket.socket.emit('leaveChat', currentChat?.chatId);
      };
    }
  }, [currentChat?.chatId]);




  const handleInfoClick = () => {
    window.location.href = '/seller/agents';
  };

  const handleDocClick = () => {
    const queryStringParams = queryString.stringify({ currentChat: JSON.stringify(currentChat) });
    // Append the query string to the URL
    const url = `/seller/documents?${queryStringParams}`;
    window.location.href = url;
  };

  return (
    <div>

      {isLoading ? (
        <Loader />
      ) : (
        <div class="chat-area-wrapper">
          <div class="message-header p-2">
            <div>
              {(isAgent && currentChat?.property) ? (
                <div>
                  <p>{currentChat?.property.addressLine1}</p>
                  <h3>{currentChat?.property.name}</h3>
                </div>
              ) : (
                <h3>{t("currentlyNotTheAgentOfAnyOfYourProperty")}</h3>
              )}

              {isBuyer ? (
                <div>
                  <div style={{ display: 'flex', alignItems: "baseline" }}>
                    <p>{t("agent")}: </p>
                    <h3>{currentChat.agent?.name}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: "baseline" }}>
                    <p>{t("buyer")}: </p>
                    <h3>{currentChat.buyer?.name}</h3>
                  </div>
                </div>
              ) : (
                <h3>{currentChat?.agent.name}</h3>
              )}
            </div>
            {currentChat.buyer?.role === 'buyer' && (
              <div class="mr-2 mt-2">
                {/* <Button onClick={handleInfoClick}>
                <InfoOutlinedIcon sx={{ color: "black" }} />
              </Button> */}
                <Tooltip title={t("goToDocuments")} arrow>
                  <Button onClick={handleDocClick}>
                    <TextSnippetIcon sx={{ color: "black" }} />
                  </Button>
                </Tooltip>
              </div>
            )}

          </div>
          <Divider orientation="horizontal" className="horizontal-divider-grey" />

          <div class="message-content-agent" style={{ overflowY: "auto" }}>
            <div class="container-fluid">
              {messages.slice().reverse().map((message, index, array) => {
                const showDateHeader = index === 0 || new Date(message.time).toDateString() !== new Date(array[index - 1].time).toDateString();

                return (
                  <div ref={scrollRef} key={message.messageId}>
                    {showDateHeader && (
                      <div class="date-header-chat" id={`date-header-${message.time}`}>
                        {formatDateGeneral(message.time)}
                      </div>
                    )}
                    <div
                      class={`message ${message.to !== currentChat.agent?.userName ? "recieved" : "sended"
                        }`}
                    >
                      {isBuyer && (<span class="seller-viewonly-name">{
                        (message.to !== currentChat.agent?.userName) ?
                          (currentChat?.agent?.name) : (currentChat?.buyer?.name)
                      }</span>)}
                      <div class="content">
                        {message.messageType === "Text" && (
                          <>
                            <p class="chat-txt-content">{message.text}</p>
                            <span class="timestamp-inchat">{formatDateTime(message.time)}</span>
                          </>
                        )}
                        {message.messageType === "Image" && (
                          <>
                            <Link class="link-style" to={`/api/image/chat/${currentChat?.chatId}/${message.image.ImageID}`} target="_blank">
                              <ImageIcon style={{ fontSize: 50 }} />
                              <p class="chat-txt-content">{message.image.name}</p>
                            </Link>
                            <span class="timestamp-inchat">{formatDateTime(message.time)}</span>
                          </>
                        )}
                        {message.messageType === "Document" && (
                          <div>
                            <Link class="link-style" to={`/api/document/chat/${currentChat?.chatId}/${message.document.documentID}`} target="_blank">
                              <DescriptionIcon style={{ fontSize: 50 }} />
                              <p class="chat-txt-content">{message.document.name}</p>
                            </Link>
                            <span class="timestamp-inchat">{formatDateTime(message.time)}</span>
                          </div>
                        )}
                        {message.messageType === "Agreement" && (
                          <div>
                            <h6 class="agreement-header">{t("agentAcceptanceAgreement")}</h6>
                            <p class="chat-txt-content">{message.agreement.agreementText}</p>
                            {(message.agreement.footer != "View To Accept/Reject") &&
                              <Divider orientation="horizontal" className="horizontal-divider" />}
                            <p class="footer-agreement">{(message.agreement.footer != "View To Accept/Reject") && t(message.agreement.footer)}</p>

                            {/* <button onClick={() => handleAgreementView(message)}>{message.agreement.footer}</button> */}
                            <span class="timestamp-inchat">{formatDateTime(message.time)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {!(isBuyer) && (
            allowedStatuses.includes(currentChat?.chatStatus) ?
              <SellerChatInput handleSendMsg={handleSendMsg} currentChat={currentChat} />
              : (
                <NoLonger />
              )
          )
          }


        </div>
      )}
    </div>
  );
}

export default SellerChatContainer;
