import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import './NotificationBell/NotificationBell.css'
import ChatIcon from '@mui/icons-material/Chat';
import { useTranslation } from "react-i18next";
import { API_ROUTES } from '../../Api';
import Loader from '../Loader/Loader';

const ChatButton = ({ profileType, isLogin }) => {
    const { i18n, t } = useTranslation();
    const [unreadChatCount, setUnreadChatCount] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        if (isLogin) {
            fetch(API_ROUTES.getUnreadChatCount)
                .then((response) => response.json())
                .then((data) => {
                    if (data !== 0) {
                        setUnreadChatCount(true);
                        // setIsLoading(false);
                    }
                    setIsLoading(false);
                    console.log("UnreadChatCount ", data);
                })
                .catch((error) => {
                    console.error(' getUnreadChatCount API request failed:', error);
                });
        }
    }, []);

    const handleChatClick = () => {
        if (profileType === "buyer") {
            window.location.href = '/buyer/chat';
        }
        else if (profileType === "agent") {
            window.location.href = '/agent/chat';
        }
        else if (profileType === "owner") {
            window.location.href = '/seller/chat';
        }
    }
    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <Button onClick={handleChatClick}
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
                            <ChatIcon style={{ color: '#4C4C4C', cursor: 'pointer' }} />

                            {unreadChatCount && (
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

                </div >
            )}
        </div >

    );
};

export default ChatButton;
