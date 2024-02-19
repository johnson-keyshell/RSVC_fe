import "./Header.css";
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "./Modal/Modal";
import NotificationBell from "./NotificationBell/NotificationBell";
import { useTranslation } from "react-i18next";
import { API_ROUTES } from '../../Api';
import axios from 'axios'
import { io } from "socket.io-client";
import Loader from "../Loader/Loader";
import { connect } from 'react-redux';
import { setSocket } from "../../ReduxStore/actions/socketActions";
import ChatButton from "./ChatButton";
import contactIcon from '../../icons/contact.png'


const mapStateToProps = (state) => ({
    socket: state.socket.socket,
    // ... Map other state values as needed
});

const mapDispatchToProps = (dispatch) => ({
    setSocketInStore: (socket) => dispatch(setSocket(socket)),
    // ... Map other dispatch actions as needed
});
function LoginItems({ setSocketInStore, socket, profileType, isLogin, setIsLogin, proPic, loginData, setProPic }) {
    const [notifications, setNotifications] = useState([]);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { i18n, t } = useTranslation();



    useEffect(() => {
        if (isLogin) {
            const fetchNotification = async () => {
                let res = await axios.get(API_ROUTES.getNotification)
                if (res && res.data) {
                    setNotifications(res.data)
                }
            }
            fetchNotification()
        }
    }, [])

    const markAsRead = async (id) => {
        const updatedNotifications = [...notifications];
        const notification = updatedNotifications.find((n) => n.NotificationID === id);
        await axios.post(API_ROUTES.markAsRead + `${notification?.NotificationID}`)
        if (notification) {
            notification.ReadFlag = true;
            setNotifications(updatedNotifications);
        }
    };

    const settings = [
        t("settings.account"),
        t("settings.dashboard"),
    ];

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    useEffect(() => {
        if (loginData && !socket?.connected) {
            const newSocket = io();
            setSocketInStore(newSocket);
            console.log("Socket in header", newSocket)

            newSocket.on('new-notification', (message) => {
                console.log('Connected to Socket.io server', message);
            });

            return () => {
                // newSocket.disconnect();
            };
        }
    }, [!!localStorage.getItem('isLoggedIn'), !!socket?.connected]);


    const handleLogout = () => {
        try {
            fetch(API_ROUTES.getLogOut)
                .then(() => {
                    // Logout was successful, so update the login status and clean up
                    setIsLogin(false);
                    localStorage.removeItem('userDetails');
                    localStorage.setItem('isLoggedIn', 'false');
                    window.location.href = '/';
                })
                .catch((error) => {
                    console.error('getLogOut API request failed:', error);
                });
        } catch (error) {
            console.log("Try block of logout is not worked");
            // Handle network or other errors here
        }
    };
    const handleProfile = () => {
        if (profileType === "buyer") {
            window.location.href = '/buyer/profile';
        }
        else if (profileType === "agent") {
            window.location.href = '/agent/profile';
        }
        else if (profileType === "owner") {
            window.location.href = '/seller/profile';
        }
    }
    const handleSettings = () => {
        window.location.href = '/admin/settings';
    }

    return (

        <div>
            <Box sx={{
                display: "flex",
                alignContent: "flex-end",
                flexWrap: "wrap",
                justifyContent: "flex-end",
            }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 0,
                    }}
                >

                    <NotificationBell
                        notifications={notifications}
                        markAsRead={markAsRead}
                    />

                    <ChatButton
                        profileType={profileType}
                        isLogin={isLogin}
                    />
                    {loginData ? (
                        <>
                            <IconButton
                                onClick={handleOpenUserMenu}
                                className="person-icon"
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={proPic}
                                    onError={contactIcon}
                                />
                            </IconButton>
                            <div
                                onClick={handleOpenUserMenu}
                                class="person-content"
                            >
                                <div>
                                    <Typography class="head-name" gutterBottom>
                                        {
                                            (loginData?.FirstName && loginData?.LastName)
                                                ? `${loginData?.FirstName} ${loginData?.LastName}`
                                                : loginData.UserName
                                        }

                                    </Typography>
                                    <Typography class="head-designation">
                                        {t(profileType)}
                                    </Typography>
                                </div>
                                <span class="expand-icon">
                                    <ExpandMoreIcon />
                                </span>
                            </div>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                sx={{
                                    top: '35px !important',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Typography textAlign="center">
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))} */}
                                <MenuItem key={"profile"} onClick={handleProfile}>
                                    <Typography textAlign="center">{t("profile")}</Typography>
                                </MenuItem>
                                <MenuItem key={"logout"} onClick={handleLogout}>
                                    <Typography textAlign="center">{t("logout")}</Typography>
                                </MenuItem>
                                {profileType === "admin" && <MenuItem key={"settings"} onClick={handleSettings}>
                                    <Typography textAlign="center">Settings</Typography>
                                </MenuItem>}
                            </Menu>
                        </>
                    ) : (
                        <Modal />
                    )}
                </Box>
            </Box>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginItems)