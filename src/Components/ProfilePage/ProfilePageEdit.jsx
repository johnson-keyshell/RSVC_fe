import React, { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import {
    Grid,
    Box,
    Button,
    Container,
    Typography,
    FormControl,
    TextField,
    Divider,
    IconButton,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import { isSupportedImage, openFileSelection } from "../openFileSelection"
import axios from "axios";
import { useTranslation } from "react-i18next";
import OpenImageDialogBox from "../Dialogs/OpenImageDialog/OpenImageDialog";
import InputFieldWithTitle from "../../Elements/InputFieldWithTitle";
import { API_ROUTES } from "../../Api";
import SelectMenuWithTitle from "../../Elements/SelectMenuWithTitle";
import { prefferedContactType } from "../../Constants/Profile";

function ProfilePageEdit({ profileData, handleFieldChange, setProfileData, setFieldErrors, isSignUp }) {
    const [openImageDialog, setOpenImageDialog] = useState(false);
    const [profilePic, setProfilePic] = useState(profileData?.ProfilePic);
    const [selectedImage, setSelectedImage] = useState(null);
    const { i18n, t } = useTranslation();

    const handleViewProfilePic = () => {
        var image = null;

        try {
            // image = URL.createObjectURL(profileData.ProfilePic.ImageID);
            setSelectedImage(profilePic);
        } catch (error) {
            image = profileData.ProfilePic;
            setSelectedImage(image);
        }
        setOpenImageDialog(true);
    };

    const handleClose = () => {
        setSelectedImage(null);
        setOpenImageDialog(false);
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            let API = null;
            if (isSignUp) {
                API = API_ROUTES.postImageUploadSignup;
            }
            else {
                API = API_ROUTES.postUploadImage;
            }
            const result = await axios.post(
                API,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-rapidapi-host": "file-upload8.p.rapidapi.com",
                        "x-rapidapi-key": "your-rapidapi-key-here",
                    },
                }
            );

            if (result) {
                console.log("Image upload result-----!!!", result);
                const imageUrl = URL.createObjectURL(file); // Create URL for rendering
                setProfileData((prevData) => ({
                    ...prevData,
                    ProfilePic: {
                        ImageID: result?.data,
                        ImageLink: imageUrl,
                    },
                }));
                setProfilePic(imageUrl);


                return result.data;
            }
        } catch (error) {
            console.log("Error while uploading image: ", error);
        }
    };

    const handleProfilePicUpload = () => async (e) => {
        try {
            console.log("File started....");
            const file = await openFileSelection();
            if (!file) {
                throw new Error("No file selected");
            }
            const fileName = file.name;
            if (!isSupportedImage(fileName)) {
                alert(
                    "Unsupported file format. Please upload an image (jpg, jpeg, png, or gif)."
                );
                return;
            }

            try {
                const imageId = await uploadImage(file);
            } catch (uploadError) {
                console.error("Error uploading image:", uploadError);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteProfilePic = () => {
        const updatedProfileData = { ...profileData };
        updatedProfileData.ProfilePic = null;
        setProfileData(updatedProfileData);
    };

    return (
        <div class="container-fluid-buyer-document">
            <Container maxWidth="100%" sx={{ marginTop: 4 }}>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            sx={{
                                "&.MuiGrid-root,.MuiGrid-item": {
                                    paddingLeft: "0",
                                    margin: "0",
                                },
                            }}
                        >
                            <Paper class="details-page-paper" sx={{ padding: "10px" }}>
                                <InputFieldWithTitle
                                    title={t("firstName")}
                                    field={"FirstName"}
                                    placeholder={t("enterFirstName")}
                                    value={profileData?.FirstName}
                                    required={true}
                                    setFieldErrors={setFieldErrors}
                                    regex={/^[a-zA-Z0-9\s]*$/}
                                    errorMessage={t("invalidFirstName.onlyLetters,numbers,andSpacesareAllowed.")}
                                    onChange={(value) => handleFieldChange("FirstName", value)}

                                />
                                <InputFieldWithTitle
                                    title={t("lastName")}
                                    field={"LastName"}
                                    placeholder={t("enterLastName")}
                                    value={profileData?.LastName}
                                    required={true}
                                    setFieldErrors={setFieldErrors}
                                    regex={/^[a-zA-Z0-9\s]*$/}
                                    errorMessage={t("invalidLastName.onlyLetters,numbers,andSpacesareAllowed.")}
                                    onChange={(value) => handleFieldChange("LastName", value)}
                                />
                                <InputFieldWithTitle
                                    title={t("username")}
                                    field={"UserName"}
                                    placeholder={t("enterUserName")}
                                    required={true}
                                    disabled={!isSignUp}
                                    value={profileData?.UserName}
                                    regex={/^[a-zA-Z0-9]*$/}
                                    errorMessage={"Invalid user Name. Only letters, numbers are allowed."}
                                    onChange={(value) => handleFieldChange("UserName", value)}
                                />
                                <InputFieldWithTitle
                                    title={t("email")}
                                    field={"eMail"}
                                    placeholder={t("entereMail")}
                                    value={profileData?.eMail}
                                    required={true}
                                    disabled={!isSignUp && !profileData?.SignUpMethod === "Default"}
                                    setFieldErrors={setFieldErrors}
                                    regex={/^([\w-]+(\.[\w-]+)*)?@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})?$/}
                                    errorMessage={t("invalidEmail.onlyValidEmailsareAllowed.")}
                                    onChange={(value) => handleFieldChange("eMail", value)}
                                />
                                <InputFieldWithTitle
                                    title={t("phoneNumber")}
                                    field={"PhoneNumber"}
                                    placeholder={t("enterPhoneNumber")}
                                    value={profileData?.PhoneNumber}
                                    required={true}
                                    setFieldErrors={setFieldErrors}
                                    regex={/^[+]?[0-9\s-()]{5,}$/}
                                    errorMessage={t("invalidPhoneNumber.onlyNumbersareAllowedandMinimum5DigitsRequired.")}
                                    onChange={(value) => handleFieldChange("PhoneNumber", value)}
                                />
                                <SelectMenuWithTitle
                                    title={t("prefferedContactType")}
                                    options={prefferedContactType}
                                    value={profileData?.PreferredContactMethod}
                                    onChange={(e) => handleFieldChange("PreferredContactMethod", e.target.value)}
                                />
                                {profileData?.SignUpMethod !== "Google" && (
                                    <div>

                                        {/* {!isSignUp && (
                                            <div>
                                                <Typography class="heading-for-all" variant="body1">
                                                    {t("passwordSettings")}
                                                </Typography>
                                                <InputFieldWithTitle
                                                    title={t("currentPassword")}
                                                    type="Password"
                                                    placeholder={t("enterCurrentPassword")}
                                                    value={profileData?.CurrentPassword}
                                                    onChange={(value) => handleFieldChange("CurrentPassword", value)}
                                                />
                                            </div>
                                        )} */}

                                        <InputFieldWithTitle
                                            title={t("newPassword")}
                                            type="Password"
                                            field={"NewPassword"}
                                            placeholder={t("enterNewPassword")}
                                            value={profileData?.NewPassword}
                                            required={isSignUp}
                                            onChange={(value) => handleFieldChange("NewPassword", value)}
                                            regex={/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{6,}$/}
                                            errorMessage={t("passwordmustbeatleast6characterslongandcontainAmixofNumbers,Letters,Andatleastonespecialcharacter(!@#$%^&*).")}
                                        />
                                        <InputFieldWithTitle
                                            title={t("confirmNewPassword")}
                                            type="Password"
                                            field={"ConfirmNewPassword"}
                                            placeholder={t("enterConfirmNewPassword")}
                                            value={profileData?.ConfirmNewPassword}
                                            required={isSignUp}
                                            onChange={(value) => handleFieldChange("ConfirmNewPassword", value)}
                                            regex={/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{6,}$/}
                                            errorMessage={t("passwordmustbeatleast6characterslongandcontainAmixofNumbers,Letters,Andatleastonespecialcharacter(!@#$%^&*).")}
                                        />
                                    </div>
                                )}

                            </Paper>
                        </Grid>
                        <Grid
                            item
                            xs={0}
                            sx={{
                                "&.MuiGrid-root,.MuiGrid-item": {
                                    paddingLeft: "0px",
                                    marginRight: "15px",
                                    marginLeft: "15px",
                                },
                            }}
                        >
                            <Divider orientation="vertical" className="vertical-divider" />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            sx={{
                                "&.MuiGrid-root,.MuiGrid-item": {
                                    paddingLeft: "0",
                                },
                            }}
                        >
                            <Paper class="details-page-paper" sx={{ padding: "10px" }}>
                                <Typography class="heading-for-all" variant="body1">
                                    {t("profilePicture")}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            flexGrow: 0,
                                        }}
                                    >
                                        {profileData?.ProfilePic ? (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    flexDirection: "row",
                                                    flexGrow: 0,
                                                    width: "229px",
                                                    height: "119px",
                                                    backgroundColor: "#E0E0E0",
                                                    borderRadius: "10px",
                                                }}
                                            >
                                                {console.log(
                                                    "Profile Pic IMAGE LINK---------------",
                                                    profilePic
                                                )}
                                                <img
                                                    src={
                                                        profilePic
                                                    }
                                                    alt="Profile Pic" // Provide a description for the image (alt text)
                                                    style={{
                                                        width: "100%", // Ensure the image takes the full width of the box
                                                        height: "100%", // Ensure the image takes the full height of the box
                                                        objectFit: "cover",
                                                        borderRadius: "10px", // Control how the image fits inside the box
                                                    }}
                                                />
                                            </Box>
                                        ) : (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                    flexGrow: 0,
                                                    width: "229px",
                                                    height: "119px",
                                                    backgroundColor: "#E0E0E0",
                                                    borderRadius: "10px",
                                                }}
                                            >
                                                <Button
                                                    class="floor-image-btn"
                                                    color="primary"
                                                    id="building-thumbnail-upload-button"
                                                    key="building-thumbnail-upload-button"
                                                    onClick={(e) =>
                                                        handleProfilePicUpload()(e)
                                                    }
                                                >
                                                    {t("upload")}
                                                </Button>
                                            </Box>
                                        )}

                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "top",
                                                flexGrow: 0,
                                            }}
                                        >
                                            <IconButton
                                                class="viewIcon-floor-image"
                                                onClick={() =>
                                                    handleViewProfilePic()
                                                }
                                            >
                                                <VisibilityIcon className="visibilityIcon" />
                                            </IconButton>
                                            <IconButton
                                                class="delete-icon-floor-image"
                                                onClick={() =>
                                                    handleDeleteProfilePic()
                                                }
                                            >
                                                <DeleteIcon class="floorDeleteIcon" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    {/* <Divider orientation="horizontal" /> */}
                                </Box>
                                <InputFieldWithTitle
                                    title={t("addressLine1")}
                                    field={"AddressLine1"}
                                    placeholder={t("enterAddressLine1")}
                                    value={profileData?.Address?.AddressLine1}
                                    onChange={(value) => handleFieldChange("AddressLine1", value, "address")}
                                    required={false}
                                    setFieldErrors={setFieldErrors}
                                    regex={/^[a-zA-Z0-9\s]*$/}
                                    errorMessage={t("invalidAddressLine1.onlyLetters,numbers,andSpacesareAllowed.")} />
                                <InputFieldWithTitle
                                    title={t("addressLine2")}
                                    field={"AddressLine2"}
                                    placeholder={t("enterAddressLine2")}
                                    value={profileData?.Address?.AddressLine2}
                                    onChange={(value) => handleFieldChange("AddressLine2", value, "address")}
                                    required={false}
                                    setFieldErrors={setFieldErrors}
                                    regex={/^[a-zA-Z0-9\s]*$/}
                                    errorMessage={t("invalidAddressLine2.onlyLetters,numbers,andSpacesareAllowed.")}
                                />
                                <InputFieldWithTitle
                                    title={t("area")}
                                    field={"Area"}

                                    placeholder={t("enterArea")}
                                    value={profileData?.Address?.Area}
                                    onChange={(value) => handleFieldChange("Area", value, "address")}
                                    required={false}
                                    setFieldErrors={setFieldErrors}
                                    regex={/^[a-zA-Z0-9\s]*$/}
                                    errorMessage={t("invalidArea.onlyLetters,numbers,andSpacesareAllowed.")}
                                />
                                <InputFieldWithTitle
                                    title={t("pincode")}
                                    field={"Pincode"}
                                    placeholder={t("enterPincode")}
                                    value={profileData?.Address?.Pincode}
                                    onChange={(value) => handleFieldChange("Pincode", value, "address")}
                                    required={false}
                                    setFieldErrors={setFieldErrors}
                                    regex={/^[a-zA-Z0-9\s]{5,}$/}
                                    errorMessage={t("invalidPincode.onlyLetters,numbers,andSpacesareAllowed.")}
                                />
                                <InputFieldWithTitle
                                    title={t("googleMapLink")}
                                    field={"GoogleMapLink"}
                                    placeholder={t("enterGoogleMapLink")}
                                    value={profileData?.Address?.GoogleMapLink}
                                    onChange={(value) => handleFieldChange("GoogleMapLink", value, "address")}
                                    required={false}
                                    setFieldErrors={setFieldErrors}
                                    regex={/^https:\/\/maps\.app\.goo\.gl\/[a-zA-Z0-9-]*$/}
                                    errorMessage={t("invalidgooglemapLink.onlyLetters,numbers,andSpacesareAllowed.")}

                                />


                            </Paper>
                        </Grid>


                    </Grid>

                </Grid>

            </Container>
            <OpenImageDialogBox
                open={openImageDialog}
                handleClose={handleClose}
                selectedImage={selectedImage}
            />
        </div>

    );
}

export default ProfilePageEdit;
