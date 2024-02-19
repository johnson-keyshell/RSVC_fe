import React from "react";
import {
    Grid,
    Paper,
    Typography,
    Button,
    Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import mainImage from "../../../Images/main.jpg";
import { useState, useEffect } from "react";
import "./LayoutScreen.css";
import FloorSelector from './FloorSelector/FloorSelector'
import Header from "../../../Components/Header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftNav from "../../../Components/LeftNav/LeftNav/LeftNav";
import { API_ROUTES } from '../../../Api';
import Loader from "../../../Components/Loader/Loader";
import { DeleteIcon } from "@chakra-ui/icons";
import NoApartmentSelectedDialog from '../../../Components/Dialogs/NoApartmentSelectedDialog/NoApartmentSelectedDialog'
import FloorSection from "./FloorSection";
import CurrentlySelected from "./CurrentlySelected";
import { Divider } from "@mui/material";
import CurrentApartmentDetails from "./CurrentApartmentDetails";
import NotificationDialog from '../../../Components/Dialogs/NotificationDialog/NotificationDialog'


function LayoutScreen({ nextStep }) {

    const [isLoading, setIsLoading] = React.useState(true);
    const [buildData, setBuldData] = useState();
    const { i18n, t } = useTranslation();
    useEffect(() => {
        fetch(API_ROUTES.getBuyerProperty)
            .then((response) => response.json())
            .then((data) => {
                console.log("Layout page building data is  ", data);
                setBuldData(data);
                setIsLoading(false)
            })
            .catch((error) => {
                console.error('getBuyerProperty API request failed:', error);
            });
    }, []);


    const [isDialogOpen, setDialogOpen] = useState(false);
    const [notSend, setNotSend] = useState(false);
    const [noApartmentSelected, setNoApartmentSelected] = useState(false);

    const statusList = [t("available"), t("underOption"), t("sold")];

    const [selectedFloor, setSelectedFloor] = useState(undefined);
    const [selectedLayout, setSelectedLayout] = useState(undefined);

    const handleFloorSelect = (floor) => {
        setSelectedFloor(floor);
        setSelectedLayout(null);
        console.log("click on button", floor);
    };
    const handleLayoutSelect = (layout) => {
        setSelectedLayout(layout);
        console.log({ layout });
        console.log({ selectedLayout });

    };

    const [currentUser, setCurrentUser] = useState(
        localStorage.getItem("loginData")
            ? JSON.parse(localStorage.getItem("loginData"))
            : null
    );


    const [selectedApartments, setSelectedApartments] = useState([]);

    const addApartment = (Apartment, Floor) => {
        console.log("Insisde add apartment checking props", Apartment, Floor)
        const newApartment = {
            apartmentName: Apartment.ApartmentName,
            apartmentId: Apartment.ApartmentID,
            floorName: Floor.FloorName,
            floorId: Floor.FloorID,
            price: Apartment.Price,
            additionalFields: Apartment?.additionalFields
        };

        if (!selectedApartments.some(apartment => apartment.apartmentName === Apartment.ApartmentName)) {
            setSelectedApartments([...selectedApartments, newApartment]);
            console.log("Appartment added the selected apartments now are", selectedApartments)
        }
    };


    const removeApartment = (Apartment) => {
        const updatedApartments = selectedApartments.filter(apartment => apartment.apartmentName !== Apartment.apartmentName);
        setSelectedApartments(updatedApartments);
        console.log("Appartment removed the selected apartments now are", selectedApartments)


    };
    const handleContactAgents = () => {
        const aptDetails = selectedApartments;
        console.log("Selected Apartments before calling api to notify agents", aptDetails)


        if (aptDetails.length) {
            fetch(API_ROUTES.postNotifyAgents, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aptDetails),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Notify Agents ", data);
                    if (data.status === "Success") {
                        setDialogOpen(true);
                    }
                    else if (data.status === "Fail") {

                    }
                })
                .catch((error) => {
                    console.error('postNotifyAgents API request failed:', error);
                });
        }
        else {
            setNoApartmentSelected(true);
        }
    }
    //apt ends
    let selectArray = [];
    if (buildData) {
        selectArray = (buildData?.floors);
    }
    const numberOfFloors = selectArray.length;
    const nxtLayout = () => {
        return (
            <LayoutScreen />
        );
    };

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
                                                                {buildData.address?.AddressLine1}, {buildData.address?.Area}

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
                                                                    <Typography
                                                                        className="txt-street"
                                                                        variant="subtitle2"
                                                                        sx={{
                                                                            font: "inter",
                                                                            fontSize: "13px",
                                                                            fontWeight: "400",
                                                                        }}
                                                                    >
                                                                        {t("selectFloors")}
                                                                    </Typography>
                                                                    <div class="floor-select-div">
                                                                        <FloorSelector
                                                                            floors={selectArray}
                                                                            numberOfFloors={numberOfFloors}
                                                                            mainImage={mainImage}
                                                                            onSelect={handleFloorSelect}
                                                                            selectedFloor={selectedFloor}
                                                                            role={"select"}
                                                                        />
                                                                    </div>
                                                                    <CurrentApartmentDetails
                                                                        selectedLayout={selectedLayout}
                                                                    />
                                                                    <div>
                                                                        {selectArray
                                                                            .find(
                                                                                (floor) => floor.FloorName === selectedFloor
                                                                            )
                                                                            ?.apartments?.find(
                                                                                (apartment) =>
                                                                                    apartment.ApartmentName === selectedLayout?.ApartmentName
                                                                            ) ?
                                                                            (<div class="add-cart-btn-container">

                                                                                <Button
                                                                                    class="add-to-cart-btn "
                                                                                    id="toggle-apartment-add-button" onClick={() => {
                                                                                        const matechedApt = selectArray.find(
                                                                                            (floor) => floor.FloorName === selectedFloor)
                                                                                            .apartments.find((apartment) =>
                                                                                                apartment.ApartmentName === selectedLayout?.ApartmentName)

                                                                                        const matechedFloor = selectArray.find(
                                                                                            (floor) => floor.FloorName === selectedFloor)

                                                                                        addApartment(matechedApt, matechedFloor);
                                                                                    }}>
                                                                                    {t("addToCart")}
                                                                                </Button>


                                                                            </div>
                                                                            ) : null
                                                                        }
                                                                    </div>
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
                                                                            {t("totalNoFloors")}
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
                                                                            {numberOfFloors}
                                                                        </Typography>
                                                                        <div>

                                                                            {buildData?.floors.
                                                                                sort((floorA, floorB) => floorA.FloorName.localeCompare(floorB.FloorName)).
                                                                                map((floor) => (
                                                                                    <Button
                                                                                        class={
                                                                                            floor.FloorName === selectedFloor
                                                                                                ? "button-floor-selector-buy-select"
                                                                                                : "button-floor-selector-buy"
                                                                                        }
                                                                                        key={floor.FloorId}
                                                                                        onClick={() => handleFloorSelect(floor.FloorName)}
                                                                                    >
                                                                                        {floor.FloorName}
                                                                                    </Button>
                                                                                ))}
                                                                        </div>
                                                                        <FloorSection
                                                                            selectedFloor={selectedFloor}
                                                                            selectArray={selectArray}
                                                                            selectedLayout={selectedLayout}
                                                                            handleLayoutSelect={handleLayoutSelect}
                                                                            addApartment={addApartment}

                                                                        />
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    </Paper>
                                                </Grid>
                                                <Grid item md={4} xs={12}>
                                                    <Paper class="right-box">
                                                        <CurrentlySelected
                                                            selectedApartments={selectedApartments}
                                                        />
                                                        <div class="selected-layout-details">
                                                            <Typography
                                                                className="txt-street"
                                                                variant="subtitle2"
                                                                sx={{
                                                                    font: "inter",
                                                                    fontSize: "13px",
                                                                    fontWeight: "400",
                                                                }}
                                                            >
                                                                {t("unitsPicked")}
                                                            </Typography>
                                                            {selectedApartments.map((apt, index) => (
                                                                <div>
                                                                    {index > 0 && <Divider orientation="horizontal" className="horizontal-divider-grey" />}

                                                                    <Box
                                                                        sx={{
                                                                            display: "flex",
                                                                            justifyContent: "left",
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
                                                                                fontSize: "16px",
                                                                                fontWeight: "600",
                                                                                marginTop: "10px",

                                                                            }}

                                                                        >{apt.apartmentName}
                                                                        </Typography>
                                                                        {buildData?.sailStatus != "Notified" ? (
                                                                            <Button
                                                                                class="delete-icon-layout-item"
                                                                                id="toggle-apartment-button"
                                                                                onClick={() => removeApartment(apt)}>
                                                                                <DeleteIcon class="floor-DeleteIcon-Layout" />
                                                                            </Button>
                                                                        ) : null}
                                                                    </Box>


                                                                </div>
                                                            ))
                                                            }
                                                        </div>
                                                        {/* //checkout ends */}
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "left",
                                                                alignItems: "center",
                                                                justifyContent: "space-around",
                                                                flexDirection: "row",
                                                                marginTop: '5%',
                                                                marginBottom: '5%'
                                                            }}
                                                        >
                                                            {statusList.map((unit) => (
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        justifyContent: "left",
                                                                        alignItems: "center",

                                                                    }}
                                                                >
                                                                    <div
                                                                        class="circles"
                                                                        style={{
                                                                            // Add some spacing between the circle and unit name
                                                                            backgroundColor:
                                                                                unit === t("underOption")
                                                                                    ? "orange"
                                                                                    : unit === t("available")
                                                                                        ? "green"
                                                                                        : "red",
                                                                        }}
                                                                    />
                                                                    <span class="circle-text">{unit}</span>
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                        <div class="chat-with-agent-btn-container">
                                                            <Button class="chat-btn-from-layout"
                                                                onClick={() => handleContactAgents()}
                                                            >
                                                                {t("contactAgents")}
                                                            </Button>
                                                        </div>
                                                    </Paper>
                                                </Grid>
                                            </Grid>

                                            <NotificationDialog
                                                open={isDialogOpen}
                                                onClose={() => {
                                                    setDialogOpen(false)
                                                    window.location.href = '/layoutscreen';
                                                }
                                                }
                                            />
                                            <NoApartmentSelectedDialog
                                                open={noApartmentSelected}
                                                onClose={() =>
                                                    setNoApartmentSelected(false)
                                                }
                                            />
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
