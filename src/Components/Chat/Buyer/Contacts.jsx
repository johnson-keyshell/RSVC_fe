import React, { useState } from "react";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Loader from "../../Loader/Loader";
import formatDate from "../../formatDate";
import CloseIcon from '@mui/icons-material/CloseOutlined';
import { t } from "i18next";
import contactIcon from '../../../icons/contact.png'


function Contacts({ contacts, changeChat }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const clearSearch = () => {
    setSearchQuery("");
  };

  const changeCurrentChat = (chatId, contact) => {
    setSearchQuery("");
    setCurrentSelected(chatId);
    changeChat(contact);
  };
  const filteredContacts = contacts.filter((filteredContact) =>
    filteredContact?.chatStatus !== 'Hidden-Inactive' && filteredContact?.chatStatus !== 'Hidden'
  ).filter((contact) =>
    contact?.partner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Select the first contact in the list
      const firstContact = filteredContacts[0];
      if (firstContact) {
        changeCurrentChat(firstContact.chatId, firstContact);
      }
    }
  };
  return (
    <div>
      <div className="container-fluid mt-2" style={{ paddingLeft: "0", paddingRight: "2%" }}>
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

        <div>
          {filteredContacts.length > 0 ? (
            <div style={{ minHeight: "22vh", height: "fit-content", overflowY: 'auto', maxHeight: "68vh" }}>

              <ul>
                {filteredContacts.map((contact) => (
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
                        src={contact?.partner.profilePic || contactIcon}
                      // onError={() => setProPic(contactIcon)}
                      />
                      {/* ) : (
                  <div className="thumbnail-text">{contact?.partner.name}</div>
                )} */}
                      <div className="contact-details">
                        <p className="name">{contact?.partner.name}</p>
                        <p className="last-message">
                          {contact?.property.name}
                        </p>
                        <p className="role">{t(contact?.partner.role)}</p>
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
            </div>) : (
            <p class="no-results-message">{t("noResult")}</p>

          )}

        </div>
      </div>
    </div>
  );
}

export default Contacts;
