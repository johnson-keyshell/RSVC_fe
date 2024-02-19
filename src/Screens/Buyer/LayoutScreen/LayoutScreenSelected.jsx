import React from "react";
import {
    Grid,
    Paper,
    Typography,
    Button,
    Box,
} from "@mui/material";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import mainImage from "../../../Images/main.jpg";
import Dialog from '@mui/material/Dialog';
import { useState, useEffect } from "react";
import "./LayoutScreen.css";
import FloorSelector from './FloorSelector/FloorSelector'
import Header from "../../../Components/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftNav from "../../../Components/LeftNav/LeftNav/LeftNav";
import { API_ROUTES } from '../../../Api';
import Loader from "../../../Components/Loader/Loader";
import CurrentlySelected from "./CurrentlySelected";
import { useTranslation } from "react-i18next";
import CurrentApartmentDetails from "./CurrentApartmentDetails";

function LayoutScreen({ nextStep }) {

    const [isLoading, setIsLoading] = React.useState(true);
    const { i18n, t } = useTranslation();
    const [buildData, setBuildData] = useState();
    const [selectedFloor, setSelectedFloor] = useState(undefined);
    const [selectedLayout, setSelectedLayout] = useState(undefined);
    const [numberOfFloors, setNumberOfFloors] = useState(undefined);
    const [floors, setFloors] = useState(undefined);
    const [selectArray, setSelectArray] = useState(undefined);
    const [property, setProperty] = useState(undefined);



    useEffect(() => {
        const getBuyerProperty = fetch(API_ROUTES.getBuyerProperty)
            .then((response) => response.json())
            .catch((error) => {
                console.error('getBuyerProperty API request failed:', error);
                throw error;
            });

        const getSelection = fetch(API_ROUTES.getSelection)
            .then((response) => response.json())
            .catch((error) => {
                console.error('getSelection API request failed:', error);
                throw error;
            });

        Promise.all([getBuyerProperty, getSelection])
            .then(([propertyData, selectionData]) => {
                console.log("Layout page building data is", propertyData);
                setProperty(propertyData);
                setNumberOfFloors(propertyData?.floors?.length);
                setFloors(propertyData?.floors);

                console.log("Layout page Selected sail data is", selectionData);
                setBuildData(selectionData);

                const firstKey = Object.keys(selectionData?.selection)?.[0];
                const apartmentsArray = Object.values(selectionData?.selection)?.[0]?.apartments;
                setSelectedFloor(firstKey);
                setSelectArray(Object.values(selectionData.selection));
                setSelectedLayout(apartmentsArray?.[0]);

                setIsLoading(false);
            })
            .catch((error) => {
                console.error('At least one API request failed:', error);
            });
    }, []);


    const handleFloorSelect = (floor) => {
        setSelectedFloor(floor); // Store the selected floor in the state
        // You can also perform any other actions with the selected floor here
        setSelectedLayout(null);
        console.log("click on button", floor);
    };
    const handleLayoutSelect = (layout) => {
        console.log({ layout });
        setSelectedLayout(layout);
    };

    const [currentUser, setCurrentUser] = useState(
        localStorage.getItem("loginData")
            ? JSON.parse(localStorage.getItem("loginData"))
            : null
    );



    return (

        <div>
            {isLoading ? (
                <Loader /> // Display the loader while data is loading
            ) : (
                <div>
                    <Header
                        nextStep={nextStep}
                    />
                    {/* <Filtermenu /> */}
                    <div className="container-fluid p-4">
                        <Tabs className="vertical-tabs">
                            <TabList className="hidden-tab-list" >
                                <Tab className="hidden-tab-list"></Tab>
                            </TabList>
                            <LeftNav />
                            <TabPanel>
                                <div class="card-listing-section">
                                    <h2 class="active-menu">{t("listings")}</h2>
                                    <div class="">
                                        <ToastContainer />
                                        <div class="container-layout-scrren">
                                            <Grid container spacing={1}>
                                                <Grid item md={8} xs={12}>
                                                    <Paper class="left-box">
                                                        <div class="buildText-container">
                                                            <Typography
                                                                className="txt-street"
                                                                variant="subtitle1"
                                                                sx={{
                                                                    font: "inter",
                                                                    fontSize: "13px",
                                                                    fontWeight: "400",
                                                                }}
                                                            >
                                                                {property.address?.AddressLine1}, {property.address?.Area}
                                                            </Typography>
                                                            <Typography
                                                                className="txt-buildname"
                                                                variant="subtitle2"
                                                                sx={{
                                                                    font: "inter",
                                                                    fontSize: "20px",
                                                                    fontWeight: "600",
                                                                }}
                                                            >
                                                                {buildData?.propertyName}
                                                            </Typography>
                                                        </div>
                                                        <div class="left-second-container">
                                                            <Grid container spacing={1}>
                                                                <Grid item md={4} xs={6}>
                                                                    <div class="floor-select-div">
                                                                        <FloorSelector
                                                                            floors={floors}
                                                                            numberOfFloors={numberOfFloors}
                                                                            mainImage={mainImage}
                                                                            onSelect={handleFloorSelect}
                                                                            selectedFloor={selectedFloor}
                                                                            role={"view"}
                                                                        />

                                                                    </div>
                                                                    <CurrentApartmentDetails
                                                                        selectedLayout={selectedLayout}
                                                                    />
                                                                </Grid>
                                                                <Grid item md={8} xs={6}>
                                                                    <div class="floor-select-left-right">
                                                                        <Typography
                                                                            className="txt-street"
                                                                            variant="subtitle1"
                                                                            sx={{
                                                                                font: "inter",
                                                                                fontSize: "13px",
                                                                                fontWeight: "400",
                                                                            }}
                                                                        >
                                                                            {t("noOfFloorsSelected")}
                                                                        </Typography>
                                                                        <Typography
                                                                            className="txt-buildname"
                                                                            variant="subtitle2"
                                                                            sx={{
                                                                                font: "inter",
                                                                                fontSize: "20px",
                                                                                fontWeight: "600",
                                                                            }}
                                                                        >
                                                                            {selectArray?.length}
                                                                        </Typography>
                                                                        <div>

                                                                            {Object.entries(buildData?.selection).map(([key, value]) => (
                                                                                <Button
                                                                                    class={
                                                                                        key === selectedFloor
                                                                                            ? "button-floor-selector-buy-select"
                                                                                            : "button-floor-selector-buy"
                                                                                    }
                                                                                    key={value.floorDetails.FloorId}
                                                                                    onClick={() => handleFloorSelect(key)}
                                                                                >
                                                                                    {key}
                                                                                </Button>
                                                                            ))}
                                                                        </div>
                                                                        {selectedFloor && (
                                                                            <div>
                                                                                <div>
                                                                                    <Typography
                                                                                        className="txt-street"
                                                                                        variant="subtitle1"
                                                                                        sx={{
                                                                                            font: "inter",
                                                                                            fontSize: "13px",
                                                                                            fontWeight: "400",
                                                                                            marginTop: "10px",
                                                                                        }}
                                                                                    >
                                                                                        {t("floorPlan")}
                                                                                    </Typography>
                                                                                    {selectedFloor &&
                                                                                        selectArray.find((floor) => floor.floorDetails.FloorName === selectedFloor)
                                                                                            ?.floorDetails.layoutImage ? (
                                                                                        <div class="floorImageContainer">
                                                                                            <img
                                                                                                class="floor-image-show"
                                                                                                src={
                                                                                                    selectArray.find(
                                                                                                        (floor) => floor.floorDetails.FloorName === selectedFloor
                                                                                                    )?.floorDetails.layoutImage?.ImageLink
                                                                                                }
                                                                                                alt="Floor Image"
                                                                                            />

                                                                                        </div>
                                                                                    ) : (
                                                                                        <Typography
                                                                                            className="txt-buildname"
                                                                                            variant="subtitle2"
                                                                                            sx={{
                                                                                                font: "inter",
                                                                                                fontSize: "20px",
                                                                                                fontWeight: "600",
                                                                                            }}
                                                                                        >
                                                                                            {t("floorPlanNotAvailable")}
                                                                                        </Typography>
                                                                                    )}
                                                                                </div>

                                                                                <div>
                                                                                    <Typography
                                                                                        className="txt-street"
                                                                                        variant="subtitle1"
                                                                                        sx={{
                                                                                            font: "inter",
                                                                                            fontSize: "13px",
                                                                                            fontWeight: "400",
                                                                                            marginTop: "10px",
                                                                                        }}
                                                                                    >
                                                                                        {t("units")}
                                                                                    </Typography>
                                                                                    {selectedFloor ? (
                                                                                        selectArray.find(
                                                                                            (floor) => floor.floorDetails.FloorName === selectedFloor
                                                                                        )?.apartments.length > 0 ? (
                                                                                            <>
                                                                                                {selectArray
                                                                                                    .find(
                                                                                                        (floor) => floor.floorDetails.FloorName === selectedFloor
                                                                                                    )
                                                                                                    ?.apartments?.map((apartment) => (
                                                                                                        <Button
                                                                                                            class={

                                                                                                                apartment.ApartmentName === selectedLayout?.ApartmentName
                                                                                                                    ? "button-floor-selector-buy-select"
                                                                                                                    : "button-floor-selector-buy"


                                                                                                            }
                                                                                                            key={apartment.ApartmentId}
                                                                                                            onClick={() =>
                                                                                                                handleLayoutSelect(apartment)
                                                                                                            }

                                                                                                        >
                                                                                                            {apartment.ApartmentName}
                                                                                                        </Button>
                                                                                                    ))}
                                                                                                {selectedLayout && (<div>
                                                                                                    <Typography
                                                                                                        className="txt-street"
                                                                                                        variant="subtitle1"
                                                                                                        sx={{
                                                                                                            font: "inter",
                                                                                                            fontSize: "13px",
                                                                                                            fontWeight: "400",
                                                                                                            marginTop: "10px",
                                                                                                        }}
                                                                                                    >
                                                                                                        {t("3dPlan")}
                                                                                                    </Typography>

                                                                                                    {selectedLayout &&
                                                                                                        selectArray
                                                                                                            .find(
                                                                                                                (floor) => floor.floorDetails.FloorName === selectedFloor
                                                                                                            )
                                                                                                            .apartments.find(
                                                                                                                (apartment) =>
                                                                                                                    apartment.ApartmentName === selectedLayout.ApartmentName
                                                                                                            )?.Image ? (
                                                                                                        <div className="floorImageContainer">
                                                                                                            {selectArray.map((floor) => {
                                                                                                                if (floor.floorDetails.FloorName === selectedFloor) {
                                                                                                                    const layout = floor.apartments.find(
                                                                                                                        (apartment) =>
                                                                                                                            apartment.ApartmentName === selectedLayout.ApartmentName
                                                                                                                    );
                                                                                                                    if (layout) {
                                                                                                                        return (
                                                                                                                            <img
                                                                                                                                className="floor-image-show"
                                                                                                                                src={layout.Image.ImageLink}
                                                                                                                                alt="3D Image"
                                                                                                                            />
                                                                                                                        );
                                                                                                                    }
                                                                                                                }
                                                                                                                return null;
                                                                                                            })}
                                                                                                        </div>
                                                                                                    ) : (
                                                                                                        <Typography
                                                                                                            className="txt-buildname"
                                                                                                            variant="subtitle2"
                                                                                                            sx={{
                                                                                                                font: "inter",
                                                                                                                fontSize: "20px",
                                                                                                                fontWeight: "600",
                                                                                                            }}
                                                                                                        >
                                                                                                            {t("3dImageNotAvailable")}
                                                                                                        </Typography>
                                                                                                    )}

                                                                                                </div>)}

                                                                                            </>
                                                                                        ) : (
                                                                                            <Typography
                                                                                                className="txt-buildname"
                                                                                                variant="subtitle2"
                                                                                                sx={{
                                                                                                    font: "inter",
                                                                                                    fontSize: "20px",
                                                                                                    fontWeight: "600",
                                                                                                }}
                                                                                            >
                                                                                                {t("noUnits")}{" "}
                                                                                            </Typography>
                                                                                        )
                                                                                    ) : null}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    </Paper>
                                                </Grid>
                                                <Grid item md={4} xs={12}>
                                                    <Paper class="right-box">
                                                        <CurrentlySelected
                                                            selectedApartments={selectArray}
                                                            from="selected"
                                                        />

                                                        {/* for checkout */}
                                                        <div class="selected-layout-details">
                                                            <Typography
                                                                className="txt-buildname"
                                                                variant="subtitle2"
                                                                sx={{
                                                                    font: "inter",
                                                                    fontSize: "16px",
                                                                    fontWeight: "600",
                                                                }}
                                                            >
                                                                {t("unitsPicked")}
                                                            </Typography>
                                                            {
                                                                selectArray.map((floor) => (
                                                                    floor.apartments.map((apartment) => (
                                                                        <div key={apartment.ApartmentName}>
                                                                            <Box
                                                                                sx={{
                                                                                    display: "flex",
                                                                                    flexDirection: "row",
                                                                                    justifyContent: "left",
                                                                                    alignItems: "center",
                                                                                    justifyContent: "space-between",
                                                                                    margin: "5%",
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
                                                                                    {apartment.ApartmentName}
                                                                                </Typography>
                                                                            </Box>
                                                                        </div>
                                                                    ))
                                                                ))
                                                            }

                                                        </div>
                                                        <div class="chat-with-agent-btn-container">
                                                            <Button class="not-btn-from-layout" disabled>
                                                                {t("notified")}
                                                            </Button>
                                                        </div>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </div>

                            </TabPanel>
                        </Tabs>
                    </div>

                </div>)
            }
        </div >

    );
}
export default LayoutScreen;
