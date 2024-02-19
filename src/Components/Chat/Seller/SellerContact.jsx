import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Loader from "../../Loader/Loader";
import formatDate from "../../formatDate";
import { useTranslation } from "react-i18next";
import contactIcon from '../../../icons/contact.png'


function SellerContact({ contacts, changeChat }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [noOfUnreadMessages, setNoOfUnreadMessages] = useState();
  const { i18n, t } = useTranslation();



  const changeCurrentChat = (chatId, contact) => {
    setCurrentSelected(chatId);
    changeChat(contact);
  };
  return (
    <div>
      <div className="container-fluid mt-2" style={{ paddingLeft: "0", paddingRight: "2%" }}>
        {/* <input type="text" className="contact-search-agent" placeholder={t("search")} /> */}

        <div>
          <Typography
            className="txt-street"
            variant="subtitle1"
            sx={{
              font: "inter",
              fontSize: "13px",
              fontWeight: "400",
            }}
          >
            {t("agents")}
          </Typography>
          {contacts.length != 0 ? (
            <div style={{ minHeight: "22vh", height: "fit-content", overflowY: 'auto', maxHeight: "34vh" }}>

              <ul>
                {contacts.map((contact) => (
                  <li key={contact.chatId} onClick={() => changeCurrentChat(contact.chatId, contact)} style={{ marginTop: "5px" }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: '100%',
                        paddingLeft: '2%',
                        paddingRight: '2%',
                        flexShrink: '1',
                        cursor: 'pointer',
                        height: '75px'

                      }}
                    >
                      {/* {contact?.partner.profilePic ? (
                  // <img
                  //   src={contact?.partner.profilePic}
                  //   className="thumbnail"
                  //   alt={contact?.partner.name}
                  // /> */}
                      <Avatar
                        alt="Remy Sharp"
                        src={contact?.agent?.profilePic || contactIcon}
                      // onError={() => setProPic(contactIcon)}
                      />
                      {/* ) : (
                  <div className="thumbnail-text">{contact?.partner.name}</div>
                )} */}
                      <div className="contact-details">
                        <p className="name">
                          {contact?.agent.name}
                        </p>
                        <p className="last-message">
                          {(contact?.property?.name) ? (contact?.property?.name) : ("No Property Assigned")}
                        </p>
                        <p className="role">{t(contact?.agent?.role)}</p>
                      </div>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'column',
                          flexShrink: '1',
                          alignItems: 'baseline',
                        }}>
                        <p className="time">{contact?.lastMessageTime && formatDate(contact?.lastMessageTime)}</p>
                        {contact?.unreadMessagesCount > 0 && (
                          <div className="unread-count">
                            {contact?.unreadMessagesCount}
                          </div>
                        )}
                      </Box>
                    </Box>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p class="no-results-message">{t("noResult")}</p>

          )}

        </div>
      </div>
    </div>
  );
}

export default SellerContact;
