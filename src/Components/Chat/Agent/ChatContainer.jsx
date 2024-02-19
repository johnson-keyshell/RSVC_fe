import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import axios from "axios";
import config from "../../../config";
import './AgentChatScreen.css'
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
import { Button, Tooltip } from '@mui/material'
import queryString from 'query-string';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';


function ChatContainer({ currentChat, socket, newMessage }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [messages, setMessages] = useState([]);
  const [showAgentCalling, setShowAgentCalling] = useState(false);
  const allowedStatuses = ['Hidden', 'Active'];
  const { i18n, t } = useTranslation();
  const [openAgreementSnackbar, setOpenAgreementSnackbar] = useState(false);


  const handleCloseAgreementSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAgreementSnackbar(false);
  };


  const handleDocClick = () => {
    const queryStringParams = queryString.stringify({ currentChat: JSON.stringify(currentChat) });
    // Append the query string to the URL
    const url = `/agent/documents?${queryStringParams}`;
    window.location.href = url;
  };


  const scrollRef = useRef();

  useEffect(() => {
    console.log("Current chat is ", currentChat)
    const chatId = currentChat?.chatId;
    fetch(API_ROUTES.getAgentChatMessage(chatId))
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
        setIsLoading(false)
        console.log("Messages for Agent from buyer ", data);
      })
      .catch((error) => {
        console.error(' getAgentChatMessage API request failed:', error);
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
      to: currentChat?.partner.userName,
      message: msg.message,
      messageType: msg.messageType
    }
    console.log("Message body ", message)
    if (message) {
      fetch(API_ROUTES.postSendMessageAgent, {
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
          console.error('postSendMessageAgent API request failed:', error);
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

  const handleDialogOpen = () => {

    fetch(API_ROUTES.getAgentAgreementSendOrNot(currentChat?.sailId))
      .then((response) => response.json())
      .then((data) => {
        console.log("Is already agreement send or not", data);
        if (data.code == 1) {
          setShowAgentCalling(true);
        }
        else {
          console.log("Agreement send already");
          setOpenAgreementSnackbar(true);
        }
      })
      .catch((error) => {
        console.error(' getAgentAgreementSendOrNot API request failed:', error);
      });
  }

  const handleSendAgreement = (text) => {

    const agreement = {
      chatId: currentChat?.chatId,
      agreementText: text,
      buyer: currentChat?.partner.userName,
      sailId: currentChat?.sailId,

    }
    console.log("Agreement body ", agreement)
    if (agreement) {
      fetch(API_ROUTES.postAgentAgreementGenerate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agreement),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("Sending Agreement to buyer from agent  ", data);
          if (data) {
            console.log("Agreement send successfully")
            setShowAgentCalling(false);
          }
          else {
            console.log("Agreement not send ")

          }
        })
        .catch((error) => {
          console.error('postAgentAgreementGenerate API request failed:', error);
          console.error('Request Body:', JSON.stringify(agreement));
        });
    }


  }

  const handleInfoClick = () => {
    window.location.href = '/agent';
  };
  return (
    <div>

      {isLoading ? (
        <Loader />
      ) : (
        <div class="chat-area-wrapper">
          <div class="message-header p-2">
            <div>
              <p>{currentChat?.property.addressLine1}</p>
              <h3>{currentChat?.property.name}</h3>
              <h3>{currentChat?.partner.name}</h3>
            </div>
            {currentChat?.partner?.role === 'buyer' && (
              <div class="mr-2 mt-2">
                {/* <Button onClick={handleInfoClick}>
                <InfoOutlinedIcon sx={{ color: "black" }} />
              </Button> */}
                <Tooltip title={t("goToDocuments")}arrow>
                  <Button onClick={handleDocClick}>
                    <TextSnippetIcon sx={{ color: "black" }} />
                  </Button>
                </Tooltip>
              </div>)}

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
                      class={`message ${message.to !== currentChat.partner.userName ? "recieved" : "sended"
                        }`}
                    >
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
                            <p class="footer-agreement">{(message.agreement.footer != "View To Accept/Reject") && t((message.agreement.footer))}</p>

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

          {(allowedStatuses.includes(currentChat?.chatStatus) || (currentChat?.partner?.role === "owner")) ?
            <ChatInput handleSendMsg={handleSendMsg} currentChat={currentChat} />
            : (
              <NoLonger />
            )}
          {allowedStatuses.includes(currentChat?.chatStatus) && (currentChat?.partner?.role === "buyer") && <Button class="agent-agreement-btn" onClick={(e) => handleDialogOpen(e)}>{t("sendAgentAgreement")}</Button>}
          {showAgentCalling && <AgentCalling onClose={() => setShowAgentCalling(false)} sendAgreement={handleSendAgreement} />}

          <Snackbars
            openSnackbar={openAgreementSnackbar}
            handleCloseSnackbar={handleCloseAgreementSnackbar}
            type="success"
            message={t("agentAgreementSendAlready")}
          />
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
