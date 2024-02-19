import { React, useState } from "react";
import OpenImageDialogBox from '../../../Components/Dialogs/OpenImageDialog/OpenImageDialog';
import {
    Grid,
    Box,
    Typography,
    IconButton,
    Collapse
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useTranslation } from "react-i18next";
import { priceList } from "../../../Constants/BuildingOptions";
import convertPriceToNED from "../../../Components/convertPriceToNED"

function CurrentApartmentDetails({ selectedLayout }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [openImageDialog, setOpenImageDialog] = useState(false);
    const { i18n, t } = useTranslation();
    const [showDetails, setShowDetails] = useState(false);
    const [showAmenities, setShowAmenities] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    const toggleAmenities = () => {
        setShowAmenities(!showAmenities);
    };
    const handleClose = () => {
        setSelectedImage(null);
        setOpenImageDialog(false);
    };
    const handleViewImage = (amenityId, imageId) => {
        var image = null;
        selectedLayout.amenities?.map((amenity) => {
            if (amenity.AmenityID === amenityId) {
                amenity.Images.map((image) => {
                    if (image.ImageID === imageId) {
                        try {
                            image = URL.createObjectURL(image.ImageID);
                            setSelectedImage(image);
                        } catch (error) {
                            setSelectedImage(image.ImageLink);
                        }
                    }
                })

            }
        })
        setOpenImageDialog(true);
        console.log("Image view", selectedImage);
    };

    return (
        <div>
            {selectedLayout && (
                <div>
                    <Typography
                        className="txt-street"
                        variant="subtitle2"
                        sx={{
                            font: "inter",
                            fontSize: "13px",
                            fontWeight: "400",
                            marginTop: "20px",
                        }}
                    >
                        {t("selectedUnitDetails")}
                    </Typography>
                    <Typography
                        className="txt-buildname"
                        variant="subtitle2"
                        sx={{
                            font: "inter",
                            fontSize: "16px",
                            fontWeight: "600",
                        }}
                    >
                        {selectedLayout?.ApartmentName}

                    </Typography>

                    {selectedLayout?.amenities?.length !== 0 ? (
                        <div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: "space-around"
                                }}>
                                <IconButton onClick={toggleAmenities}>
                                    <Typography
                                        className="txt-street"
                                        variant="subtitle2"
                                        sx={{
                                            font: "inter",
                                            fontSize: "13px",
                                            fontWeight: "400",
                                        }}
                                    >
                                        {showAmenities ? (
                                            <>
                                                {t("hideAmenities")}
                                                <ArrowDropUpIcon />
                                            </>
                                        ) : (
                                            <>
                                                {t("showAmenities")}
                                                <ArrowDropDownIcon />
                                            </>
                                        )}
                                    </Typography>
                                </IconButton>

                            </Box>
                            <Collapse in={showAmenities} timeout="auto" unmountOnExit>

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        margin: "2%",
                                    }}
                                >
                                    {selectedLayout.amenities?.map((amenity) => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                margin: "2%",
                                            }}
                                        >
                                            <Grid
                                                container
                                                spacing={2}
                                                key={amenity.AmenityID}
                                            >
                                                <Grid item xs={6} md={6}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            flexGrow: 1,
                                                        }}
                                                    >
                                                        <Typography
                                                            className="txt-street"
                                                            variant="subtitle2"
                                                            sx={{
                                                                font: "inter",
                                                                fontSize: "13px",
                                                                fontWeight: "400",
                                                                marginTop: "10px",
                                                            }}
                                                        >
                                                            {amenity.AmenityType}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={3} md={3}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            flexGrow: 1,
                                                        }}
                                                    >
                                                        <Typography
                                                            className="txt-street"
                                                            variant="subtitle2"
                                                            sx={{
                                                                font: "inter",
                                                                fontSize: "13px",
                                                                fontWeight: "400",
                                                                marginTop: "10px",
                                                            }}
                                                        >
                                                            {amenity.Number}
                                                        </Typography>
                                                    </Box>
                                                </Grid>

                                                <Grid item xs={12} md={12} sx={{ paddingTop: "0px !important" }}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            flexGrow: 1,
                                                        }}
                                                    >
                                                        {amenity.Images && (
                                                            <div>
                                                                {amenity?.Images.map((image) => (

                                                                    <Box
                                                                        sx={{
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            flexGrow: 0,
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            class="layout-image-name"
                                                                            variant="body1"
                                                                        >
                                                                            {image.ImageName}
                                                                        </Typography>
                                                                        <IconButton
                                                                            class="viewIcon-layout-image"
                                                                            onClick={() =>
                                                                                handleViewImage(amenity.AmenityID, image.ImageID)
                                                                            }
                                                                        >
                                                                            <VisibilityIcon className="visibilityIcon" />
                                                                        </IconButton>

                                                                    </Box>
                                                                ))}

                                                            </div>
                                                        )}
                                                    </Box>
                                                </Grid>

                                            </Grid>
                                        </Box>
                                    ))}
                                </Box>
                            </Collapse>
                        </div>
                    ) : (<Typography
                        className="txt-street"
                        variant="subtitle2"
                        sx={{
                            font: "inter",
                            fontSize: "13px",
                            fontWeight: "400",
                        }}
                    >
                        {t("noAmenitiesinthisApartment")}
                    </Typography>)}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: "space-around"
                        }}>
                        <IconButton onClick={toggleDetails}>
                            <Typography
                                className="txt-street"
                                variant="subtitle2"
                                sx={{
                                    font: "inter",
                                    fontSize: "13px",
                                    fontWeight: "400",
                                }}
                            >
                                {showDetails ? (
                                    <>
                                        {t("viewLessDetails")}
                                        <ArrowDropUpIcon />
                                    </>
                                ) : (
                                    <>
                                        {t("viewMoreDetails")}
                                        <ArrowDropDownIcon />
                                    </>
                                )}
                            </Typography>
                        </IconButton>

                    </Box>
                    <Collapse in={showDetails} timeout="auto" unmountOnExit>
                        {/* <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row",
                                margin: "2%",
                            }}
                        >
                            <Typography
                                className="txt-street"
                                variant="subtitle2"
                                sx={{
                                    font: "inter",
                                    fontSize: "13px",
                                    fontWeight: "400",
                                    marginTop: "10px",
                                }}
                            >
                                {t("status")}
                            </Typography>
                            <Typography
                                className="txt-buildname"
                                variant="subtitle2"
                                sx={{
                                    font: "inter",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                }}
                            >
                                {selectedLayout?.Status}
                            </Typography>
                        </Box> */}
                        {/* <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row",
                                margin: "2%",
                            }}
                        >
                            <Typography
                                className="txt-buildname"
                                variant="subtitle2"
                                sx={{
                                    font: "inter",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                            >
                                {t("price")}
                            </Typography>
                            <Typography
                                className="txt-street"
                                variant="subtitle2"
                                sx={{
                                    font: "inter",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    marginTop: "10px",
                                }}
                            >

                                {selectedLayout?.Price ? `€${selectedLayout.Price}` : 'NA'}
                            </Typography>
                        </Box> */}
                        {selectedLayout?.additionalFields && Object.entries(selectedLayout?.additionalFields)
                            .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                            .map(([key, value]) => (
                                value && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            flexDirection: "row",
                                            margin: "2%",
                                        }}
                                    >
                                        <Grid container spacing={3}>
                                            <Grid item xs={6} md={8}>
                                                <Typography
                                                    className="txt-buildname"
                                                    variant="subtitle2"
                                                    sx={{
                                                        font: "inter",
                                                        fontSize: "14px",
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {t(key)}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} md={4}>
                                                <Typography
                                                    className="txt-street"
                                                    variant="subtitle2"
                                                    sx={{
                                                        font: "inter",
                                                        fontSize: "14px",
                                                        fontWeight: "400",
                                                    }}
                                                >
                                                    {priceList.includes(key) ? `€${convertPriceToNED(value)}` : `${t(value)}`}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )
                            ))}
                    </Collapse>

                </div>
            )

            }
            <OpenImageDialogBox
                open={openImageDialog}
                handleClose={handleClose}
                selectedImage={selectedImage}
            />
        </div>
    )
}

export default CurrentApartmentDetails