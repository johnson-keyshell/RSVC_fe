import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { MODAL_ICON } from "../../config/urls";
import { GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons";
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import './Modal/Modal.css'
import { API_ROUTES } from "../../Api";
import { useTranslation } from "react-i18next";
import ProfilePageEdit from "../ProfilePage/ProfilePageEdit";
import Snackbars from "../Dialogs/Snackbar/Snackbars";
// import { Box, Button as BC, Center, Stack, Text } from '@chakra-ui'


function Pop({ isOpen, onClose, handleClosePop, handleLogin
    //  userType 
}) {
    const userType = "buyer";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const apiEndpointGoogle = `/api/auth/google/${userType}`;
    const apiEndpointFacebook = `/api/auth/facebook/${userType}`;
    const { i18n, t } = useTranslation();
    const [openSignup, setOpenSignup] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [openSubmitErrorSnackbar, setOpenSubmitErrorSnackbar] = useState(false);
    const [openSubmitSnackbar, setOpenSubmitSnackbar] = useState(false);
    const [openDuplicateSnackbar, setOpenDuplicateSnackbar] = useState(false);
    const [openPasswordSnackbar, setOpenPasswordSnackbar] = useState(false);
    const [duplicateMessage, setDuplicateMessage] = useState(false);


    const handleCloseSubmitErrorSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSubmitErrorSnackbar(false);
    };
    const handleCloseDuplicateSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenDuplicateSnackbar(false);
    };
    const handleClosePasswordSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenPasswordSnackbar(false);
    };
    const handleCloseSubmitSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSubmitSnackbar(false);
    };


    const handleLocalLogin = () => {
        const userDetails = {
            "userName": email,
            "password": password
        };

        console.log("userDetails", userDetails);

        if (userDetails) {
            fetch(API_ROUTES.postLocalLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            })
                .then((response) => {
                    if (response.ok) {
                        // Redirect to the desired URL upon successful login
                        window.location.href = '/';
                    } else if (response.status === 403) {
                        // Handle 403 status (Forbidden - incorrect username or password)
                        setErrorMessage('Incorrect username or password');
                    } else {
                        // Handle other status codes if needed
                        console.error(`HTTP error! Status: ${response.status}`);
                    }
                })
                .catch((error) => {
                    console.error('postLocalLogin API request failed:', error);
                });
        }
    };

    const handleCloseSignup = () => {
        setOpenSignup(false);
        setProfileData(null);
    }

    const handleSignUp = () => {
        setOpenSignup(true);
    }
    const handleFieldChange = (field, value, label) => {
        setProfileData((prevData) => {
            const newData = { ...prevData };
            if (label === "address") {
                if (!newData.Address) {
                    newData.Address = {
                        AddressLine1: null,
                        AddressLine2: null,
                        Area: null,
                        Pincode: null,
                        GoogleMapLink: null,
                        Latitude: null,
                        Longitude: null,
                    };
                }
                newData.Address[field] = value;
            }
            else {
                newData[field] = value;
            }
            return newData;
        });
    };

    const [fieldErrors, setFieldErrors] = useState({
        FirstName: true,
        LastName: true,
        eMail: true,
        PhoneNumber: true,
        AddressLine1: false,
        AddressLine2: false,
        Area: false,
        Pincode: false,
        GoogleMapLink: false,
        NewPassword: false,
        ConfirmNewPassword: false,
    });

    const signUpSubmit = () => {
        const hasError = Object.values(fieldErrors).some((error) => error);
        console.log("Errros",fieldErrors);
        if (profileData?.NewPassword !== profileData.ConfirmNewPassword || profileData?.NewPassword===undefined) {
            setOpenPasswordSnackbar(true);
        } else {
            if (!hasError) {
                let sampleFormat = {
                    FirstName: profileData?.FirstName,
                    LastName: profileData?.LastName,
                    eMail: profileData?.eMail,
                    UserName: profileData?.UserName,
                    PhoneNumber: profileData?.PhoneNumber,
                    PreferredContactMethod: profileData?.PreferredContactMethod,
                    ProfilePic: profileData?.ProfilePic?.ImageID,
                    HashPassword: profileData?.NewPassword,
                    ...(profileData?.Address && {
                        Address: {
                            ...(profileData.Address.AddressID && { AddressID: profileData.Address.AddressID }),
                            AddressLine1: profileData.Address?.AddressLine1,
                            AddressLine2: profileData.Address?.AddressLine2,
                            Area: profileData.Address?.Area,
                            Pincode: profileData.Address?.Pincode,
                            GoogleMapLink: profileData.Address?.GoogleMapLink,
                            Latitude: profileData.Address?.Latitude,
                            Longitude: profileData.Address?.Longitude,
                        }
                    })
                };


                console.log("Sample Format===", sampleFormat);
                if (sampleFormat) {
                    fetch(API_ROUTES.postSignUp, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(sampleFormat),
                    })
                        .then((response) => {
                            return response.text();  // Read the response as text
                        })
                        .then((data) => {
                            // Check for specific error messages
                            if (data === "Duplicate username") {
                                setOpenDuplicateSnackbar(true);
                                setDuplicateMessage("The username is already in use. Please try another one.");
                            } else if (data === "Duplicate E-mail") {
                                setOpenDuplicateSnackbar(true);
                                setDuplicateMessage("The email address is already in use. Please use a different one.")
                                console.log("Error: Duplicate E-mail");
                            } else {
                                const jsonData = JSON.parse(data); // Parse valid JSON
                                console.log("Response of SignUp", jsonData);
                                setEmail(jsonData?.eMail);
                                setPassword(profileData?.NewPassword);
                                setOpenSubmitErrorSnackbar(false);
                                setOpenSubmitSnackbar(true);
                                setOpenSignup(false);
                            }
                        })
                        .catch((error) => {
                            console.error('postSignUp API request failed:', error);
                        });
                }

            }
            else {
                setOpenSubmitErrorSnackbar(true);

            }
        }
    }
    return (
        <div>
            <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs" style={{ borderRadius: "20px" }}>
                <DialogTitle >
                    <Typography variant="h6" style={{ justifyContent: 'center', display: 'flex', color: '#4C4C4C' }}>{t("userLogin")}</Typography>
                    <Button onClick={onClose} color="primary" style={{ position: "absolute", right: "8px", top: "8px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M13 1L1 13" stroke="#4C4C4C" strokeWidth="2" strokeLinecap="round" />
                            <path d="M13 13L1 1" stroke="#4C4C4C" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </Button>
                </DialogTitle>
                <DialogContent>
                    {/* <div className="modal-icon">
                    <img src={MODAL_ICON} alt="Modal Icon" />
                </div> */}
                    <div className="google-signinBtn">
                        <a href={apiEndpointGoogle}>
                            <GoogleLoginButton className="google-signinBtnIcon" style={{ color: '#4C4C4C', fontWeight: '400', font: 'inter' }} />

                        </a>
                    </div>



                    <div className="google-signinBtn">
                        <a href={apiEndpointFacebook}>
                            <FacebookLoginButton className="facebook-signinBtnIcon" style={{ fontWeight: '400', font: 'inter' }} />
                        </a>
                    </div>
                    <Typography variant="subtitle1" align="center" gutterBottom>
                        {t("or")}
                    </Typography>
                    <form>
                        <TextField

                            type="email"
                            label={t("emailAddress")}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                "&.MuiInputBase-root,.MuiFilledInput-root,.MuiSelect-root": {
                                    backgroundColor: " #EDEDED !important",
                                    borderRadius: "20px",

                                },
                                "&.MuiSelect-select,.MuiInputBase-input,.MuiFilledInput-input:focus ": {
                                    // paddingTop: "0px !important",
                                    backgroundColor: "#EDEDED !important",
                                    borderRadius: "20px",

                                },

                            }}
                        />
                        <TextField
                            className="text-email-box"
                            type="Password"
                            label={t("password")}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                "&.MuiInputBase-root,.MuiFilledInput-root,.MuiSelect-root": {
                                    backgroundColor: " #EDEDED !important",
                                    borderRadius: "20px",

                                },
                                "&.MuiSelect-select,.MuiInputBase-input,.MuiFilledInput-input:focus ": {
                                    // paddingTop: "0px !important",
                                    backgroundColor: "#EDEDED !important",
                                    borderRadius: "20px",

                                },

                            }}
                        />
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{
                                marginTop: "16px", borderRadius: "14px",
                                background: "#54C7E9",
                            }}
                            onClick={(e) => handleLocalLogin(e)}
                        >
                            {t("login")}
                        </Button>
                    </form>
                    <Typography variant="body1" align="center" style={{ marginTop: "16px" }}>
                        {t("ifYouDontHaveAnAccountYouCan")} <span className="text-blue" onClick={handleSignUp}>{t("signUpHere")}</span>
                    </Typography>
                </DialogContent>
            </Dialog>


            <Dialog open={openSignup} onClose={handleCloseSignup} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Typography variant="h6" style={{ justifyContent: 'center', display: 'flex', color: '#4C4C4C' }}>
                        {t("signUpForm")}
                    </Typography>

                </DialogTitle>
                <DialogContent>
                    <div style={{ marginTop: "-20px" }}>
                        <ProfilePageEdit
                            profileData={profileData}
                            handleFieldChange={handleFieldChange}
                            setFieldErrors={setFieldErrors}
                            isSignUp={true}
                            setProfileData={setProfileData}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSignup} class="cancel-profile-btn">
                        {t("cancel")}
                    </Button>
                    <Button onClick={signUpSubmit} class="signup-btn" >
                        {t("signUp")}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbars
                openSnackbar={openPasswordSnackbar}
                handleCloseSnackbar={handleClosePasswordSnackbar}
                type="error"
                message={t("passwordsNotMatching")}
            />
            <Snackbars
                openSnackbar={openSubmitErrorSnackbar}
                handleCloseSnackbar={handleCloseSubmitErrorSnackbar}
                type="error"
                message={t("completeTheDetailsWithoutError")}
            />
            <Snackbars
                openSnackbar={openSubmitSnackbar}
                handleCloseSnackbar={handleCloseSubmitSnackbar}
                type="success"
                message={t("signupSuccessfull.PleaseLoginToContinue")}
            />
            <Snackbars
                openSnackbar={openDuplicateSnackbar}
                handleCloseSnackbar={handleCloseDuplicateSnackbar}
                type="error"
                message={t("duplicateMessage")}
            />
        </div>
    );
}

export default Pop;
