import React, { useEffect, useRef, useState } from "react";
import queryString from 'query-string';
import ChatInput from "./ChatInput";
import './ChatScreen.css'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Loader from "../../Loader/Loader";
import DescriptionIcon from '@mui/icons-material/Description';
import { API_ROUTES } from "../../../Api";
import { Link } from 'react-router-dom';
import { formatDateGeneral, formatDateTime } from "../../formatDate";
import ImageIcon from '@mui/icons-material/Image';
import AgentAgreementBuyerView from "../../AgentAgreementDialogs/AgentAgreementBuyerView";
import NoLonger from "../NoLonger";
import { useTranslation } from "react-i18next";
import { Divider } from "@mui/material";
import { Button, Tooltip } from '@mui/material'
import Snackbars from "../../Dialogs/Snackbar/Snackbars";



function ChatContainer({ currentChat, socket, newMessage }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const { i18n, t } = useTranslation();
  const [agreementView, setAgreementView] = useState(false);
  const [agreementId, setAgreementId] = useState(null);
  const [openAcceptSnackbar, setOpenAcceptSnackbar] = useState(false);
  const [openRejectSnackbar, setOpenRejectSnackbar] = useState(false);


  const handleCloseAcceptSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAcceptSnackbar(false);
  };
  const handleCloseRejectSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenRejectSnackbar(false);
  };


  useEffect(() => {
    console.log("Current chat is ", currentChat)
    const chatId = currentChat?.chatId;
    fetch(API_ROUTES.getBuyerChatMessage(chatId))
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
        setIsLoading(false)
        console.log("Messages for this chat ", data);
      })
      .catch((error) => {
        console.error(' getBuyerChatMessage API request failed:', error);
      });


  }, [currentChat]);

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
      fetch(API_ROUTES.postSendMessage, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("Sending message  ", data);
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
          console.error('postSendMessage API request failed:', error);
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

  const handleAgreementView = (message) => {
    console.log("Agreement veiwing by buyer");
    if (message.agreement.footer === "View To Accept/Reject") {
      if (currentChat?.chatStatus === "Active") {
        fetch(API_ROUTES.getAgentAgreementDetails(message.agreement.agreementId))
          .then((response) => response.json())
          .then((data) => {
            console.log("Agreement for Buyer from agent ", data);
            if (data) {
              setAgreementId(message.agreement.agreementId)
              setAgreementView(true);
            }

          })
          .catch((error) => {
            console.error(' getAgentAgreementDetails API request failed:', error);
          });
      }
      else {
        setOpenRejectSnackbar(true);
      }
    }
  }
  const handleReject = () => {
    const agreementDetails = {
      agreementId: agreementId,
      chatId: currentChat?.chatId,
      agent: currentChat?.partner.userName,
      sailId: currentChat?.sailId
    }
    console.log("agreementDetails body ", agreementDetails)
    if (agreementDetails) {
      fetch(API_ROUTES.postAgentAgreementReject, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agreementDetails),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log("Rejecting Agreement ", data);
          if (data) {
            console.log("Agreement Rejected successfully")
            setAgreementView(false);

          }
          else {
            console.log("Agreement Rejection failed ")
          }
        })
        .catch((error) => {
          console.error('postAgentAgreementReject API request failed:', error);
          console.error('Request Body:', JSON.stringify(agreementDetails));
        });
    }


  }
  const handleAccept = () => {
    const agreementDetails = {
      agreementId: agreementId,
      chatId: currentChat?.chatId,
      agent: currentChat?.partner.userName,
      sailId: currentChat?.sailId
    }
    console.log("agreementDetails body ", agreementDetails)

    fetch(API_ROUTES.getAgentAgreementDetails(agreementId))
      .then((response) => response.json())
      .then((data) => {

        if (data) {
          if (data.status === 1) {
            console.log("Agreement already accepted ");
            setOpenAcceptSnackbar(true);

          }
          else {
            if (agreementDetails) {
              fetch(API_ROUTES.postAgentAgreementAccept, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(agreementDetails),
              })
                .then((response) => response.text())
                .then((data) => {
                  console.log("Accepting Agreement ", data);
                  if (data) {
                    console.log("Agreement Accepted successfully")
                    setAgreementView(false);

                  }
                  else {
                    console.log("Agreement not Accepted ")
                  }
                })
                .catch((error) => {
                  console.error('postAgentAgreementAccept API request failed:', error);
                  console.error('Request Body:', JSON.stringify(agreementDetails));
                });
            }
          }
        }

      })
      .catch((error) => {
        console.error(' getAgentAgreementDetails API request failed:', error);
      });
  }

  const handleInfoClick = () => {
    window.location.href = '/layoutscreen';
  };
  const handleDocClick = () => {
    const queryStringParams = queryString.stringify({ currentChat: JSON.stringify(currentChat) });
    // Append the query string to the URL
    const url = `/buyer/documents?${queryStringParams}`;
    window.location.href = url;
  };

  return (
    <div>
      {isLoading ? (
        <Loader /> // Display the loader while data is loading
      ) : (
        <div class="chat-area-wrapper">
          <div class="message-header p-2">
            <div>
              <p>{currentChat?.property.addressLine1}</p>
              <h3>{currentChat?.property.name}</h3>
              <h3>{currentChat?.partner.name}</h3>
            </div>
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
          </div>
          <Divider orientation="horizontal" className="horizontal-divider-grey" />

          <div class="message-content-buyer" style={{ overflowY: "auto" }}>
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
                            <Divider orientation="horizontal" className="horizontal-divider" />

                            <p class={`${(message.agreement.footer !== 'Accepted' && message.agreement.footer !== 'Rejected') ?
                              'footer-agent-agreement' : 'footer-agent-agreement-after-decision'}`} onClick={() => handleAgreementView(message)}>
                              {t(message.agreement.footer)}
                            </p>
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
          {(currentChat?.chatStatus === "Active") ?
            <ChatInput handleSendMsg={handleSendMsg} currentChat={currentChat} />
            : (
              <NoLonger />
            )}
          {agreementView &&
            <AgentAgreementBuyerView
              onClose={() => setAgreementView(false)}
              onReject={handleReject}
              onAccept={handleAccept}
              open={agreementView} />}

        </div>
      )}
      <Snackbars
        openSnackbar={openAcceptSnackbar}
        handleCloseSnackbar={handleCloseAcceptSnackbar}
        type="success"
        message={t("agreementAlreadyAccepted")}
      />
      <Snackbars
        openSnackbar={openRejectSnackbar}
        handleCloseSnackbar={handleCloseRejectSnackbar}
        type="warning"
        message={t("agreementRejectedAlready")}
      />
    </div>
  );
}

export default ChatContainer;
