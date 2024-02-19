import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Grid
} from "@mui/material";
import Card from '@mui/material/Card';
import { useTranslation } from "react-i18next";
import BoldViewWithTitle from '../../Elements/BoldViewWithTitle'
import Loader from "../Loader/Loader";
import ProfilePageEdit from "./ProfilePageEdit";
import ConfirmationDialog from "../Dialogs/ConfirmationDialog/ConfirmationDialog";
import contactIcon from '../../icons/contact.png'
import CardMedia from '@mui/material/CardMedia';
import { API_ROUTES } from "../../Api";
import Snackbars from "../Dialogs/Snackbar/Snackbars";


const ProfilePage = () => {
    const { i18n, t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [openSubmitSnackbar, setOpenSubmitSnackbar] = useState(false);
    const [openSubmitErrorSnackbar, setOpenSubmitErrorSnackbar] = useState(false);
    const [openPasswordSnackbar, setOpenPasswordSnackbar] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({
        FirstName: false,
        LastName: false,
        eMail: false,
        PhoneNumber: false,
        AddressLine1: false,
        AddressLine2: false,
        Area: false,
        Pincode: false,
        GoogleMapLink: false,
    });

    const handleCloseSubmitSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSubmitSnackbar(false);
    };
    const handleClosePasswordSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenPasswordSnackbar(false);
    };
    const handleCloseSubmitErrorSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSubmitErrorSnackbar(false);
    };


    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };
    const handleConfirm = () => {
        setIsEditing(!isEditing);
        setOpen(false);
    };


    // Sample data, replace it with your actual data
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(API_ROUTES.getLoggedInUserData)
            .then((response) => response.json())
            .then((data) => {
                setProfileData(data);
                localStorage.setItem('userDetails', JSON.stringify(data));
                setIsLoading(false);
                console.log("Profile Data ", data);
            })
            .catch((error) => {
                console.error(' getLoggedInUserData API request failed:', error);
            });


    }, [isEditing]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

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

    const handleSubmitProfileData = () => {
        const hasError = Object.values(fieldErrors).some((error) => error);
        if (profileData?.NewPassword !== profileData.ConfirmNewPassword) {
            setOpenPasswordSnackbar(true);
        }
        else {
            if (!hasError) {
                let sampleFormat = {
                    FirstName: profileData?.FirstName,
                    LastName: profileData?.LastName,
                    eMail: profileData?.eMail,
                    // UserName:profileData?.UserName,
                    PhoneNumber: profileData?.PhoneNumber,
                    PreferredContactMethod: profileData?.PreferredContactMethod,
                    HashPassword: profileData?.NewPassword,
                    ProfilePic: profileData?.ProfilePic?.ImageID,
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
                    fetch(API_ROUTES.postSaveProfile, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(sampleFormat),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log("Response of saving profile", data);
                            setIsEditing(false);
                            setOpenSubmitErrorSnackbar(false);
                            setOpenSubmitSnackbar(true);
                        })
                        .catch((error) => {
                            console.error('postSaveProfile API request failed:', error);
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
            {isLoading ? (
                <Loader /> // Display the loader while data is loading
            ) : (
                <main>
                    <Box sx={{
                        display: "flex",
                        alignItems: "left",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexGrow: "1",
                        "@media (max-width: 768px)": {
                            width: "100%",
                            flexDirection: "column",
                            alignItems: "left",
                        },
                    }}>
                        <div class="path">
                            <h2 class="inactive">{t("account")}</h2>
                            <h2>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="6"
                                    height="12"
                                    viewBox="0 0 6 12"
                                    fill="none"
                                >
                                    <path
                                        d="M1 11L4 6L1 1"
                                        stroke="#8B8B8B"
                                        strokeWidth={2} // Use 'strokeWidth' instead of 'strokeWidth'
                                        strokeLinecap="round" // Use 'strokeLinecap' instead of 'strokeLinecap'
                                    />
                                </svg>
                            </h2>
                            <h2 class="active-menu">{t("profile")}</h2>
                        </div>
                        {isEditing ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "flex-end",
                                }}
                            >
                                <Button class="cancel-profile-btn" onClick={handleOpenDialog}>
                                    {t("cancel")}
                                </Button>
                                <ConfirmationDialog
                                    open={open}
                                    onClose={handleCloseDialog}
                                    onConfirm={handleConfirm}
                                />

                                <Button class="save-profile-btn" onClick={() => handleSubmitProfileData()}>
                                    {t("save")}
                                </Button>
                            </Box>
                        ) : (
                            <Button class="edit-btn" onClick={handleEditToggle}>
                                {t("edit")}
                            </Button>
                        )}
                    </Box>
                    {!isEditing ? (<div className="container-fluid-buyer-document">
                        <Box>

                            <Container maxWidth="100%" sx={{ marginTop: 4 }}>

                                <Box sx={{ display: "flex", flexDirection: "row" }}>
                                    <Grid container spacing={2} sx={{ alignItems: "center" }}>
                                        <Grid item xs={12} md={12}>
                                            <Typography class="heading-for-all" variant="body1">
                                                {t("profilePicture")}
                                            </Typography>
                                            <Card className="profilePic-card" >

                                                <Box sx={{
                                                    display: "flex",
                                                    justifyContent: "left",
                                                }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="140"
                                                        image={profileData?.ProfilePic || contactIcon}
                                                        onError={contactIcon}
                                                        alt={profileData?.FirstName}
                                                        sx={{
                                                            borderRadius: "25%",
                                                            objectFit: "cover",
                                                            width: "60%",
                                                            height: "50%",
                                                            marginTop: "5px"
                                                        }}
                                                    />
                                                </Box>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={12} md={6}>

                                            <BoldViewWithTitle
                                                title={t("username")}
                                                text={profileData?.UserName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <BoldViewWithTitle
                                                title={t("email")}
                                                text={profileData?.eMail}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <BoldViewWithTitle
                                                title={t("firstName")}
                                                text={profileData?.FirstName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <BoldViewWithTitle
                                                title={t("lastName")}
                                                text={profileData?.LastName}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <BoldViewWithTitle
                                                title={t("phoneNumber")}
                                                text={profileData?.PhoneNumber}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <BoldViewWithTitle
                                                title={t("preferredContactMethod")}
                                                text={profileData?.PreferredContactMethod}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <BoldViewWithTitle
                                                title={t("signUpMethod")}
                                                text={profileData.SignUpMethod}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <BoldViewWithTitle
                                                title={t("addressLine1")}
                                                text={profileData?.Address?.AddressLine1}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <BoldViewWithTitle
                                                title={t("addressLine2")}
                                                text={profileData?.Address?.AddressLine2}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <BoldViewWithTitle
                                                title={t("area")}
                                                text={profileData?.Address?.Area}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <BoldViewWithTitle
                                                title={t("pincode")}
                                                text={profileData?.Address?.Pincode}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <BoldViewWithTitle
                                                title={t("googleMapLink")}
                                                text={profileData?.Address?.GoogleMapLink}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Container>
                        </Box>
                    </div>) : (<div>
                        <ProfilePageEdit
                            profileData={profileData}
                            handleFieldChange={handleFieldChange}
                            setProfileData={setProfileData}
                            setFieldErrors={setFieldErrors}
                        />
                    </div>
                    )}

                </main>

            )}
            <Snackbars
                openSnackbar={openSubmitSnackbar}
                handleCloseSnackbar={handleCloseSubmitSnackbar}
                type="success"
                message={t("profileDetailsSubmittedSuccessfully!!!")}
            />
            <Snackbars
                openSnackbar={openSubmitErrorSnackbar}
                handleCloseSnackbar={handleCloseSubmitErrorSnackbar}
                type="error"
                message={t("completeTheDetailsWithoutError")}
            />
             <Snackbars
                openSnackbar={openPasswordSnackbar}
                handleCloseSnackbar={handleClosePasswordSnackbar}
                type="error"
                message={t("passwordsNotMatching")}
            />
        </div>
    );
};

export default ProfilePage;
