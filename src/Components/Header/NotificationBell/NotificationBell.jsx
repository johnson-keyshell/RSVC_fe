import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from "@mui/material/Button";
import './NotificationBell.css'
import formatDate from '../../formatDate.js';
import { useTranslation } from "react-i18next";
const NotificationBell = ({ notifications, markAsRead }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { i18n, t } = useTranslation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const unreadNotifications = notifications.filter((notification) => !notification.ReadFlag);

  return (
    <div>
      <Button onClick={handleClick}
        sx={{
          width: "auto",
          minWidth: "50px"
        }}
      >

        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <NotificationsIcon style={{ color: '#4C4C4C', cursor: 'pointer' }} />

          {unreadNotifications.length > 0 && (
            <div style={{
              position: 'relative',
              top: '14px',
              left: '-25%',
            }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#54C7E9',
                  borderRadius: '50%',
                }}
              ></div>
            </div>
          )}

        </div>
      </Button>

      <Popover
        style={{ width: "200%", maxHeight: "300px" }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        className="custom-scrollbar"
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List>
          {notifications.length != 0 ? (
            notifications.map((notification, index) => (
              <ListItem
                key={index}
                onClick={() => markAsRead(notification.NotificationID)}
                button
                style={{ background: notification.ReadFlag ? 'white' : '#f5f5f5' }}
              >
                <ListItemText
                  primary={notification.Message}
                  secondary={formatDate(notification.Timestamp)}
                />
              </ListItem>
            ))) : (
            <ListItem
              style={{ background: 'white', margin: 'auto' }}
            >
              <ListItemText
                primary={t("noNotifications")}
              />
            </ListItem>)}


        </List>
      </Popover>
    </div>
  );
};

export default NotificationBell;
