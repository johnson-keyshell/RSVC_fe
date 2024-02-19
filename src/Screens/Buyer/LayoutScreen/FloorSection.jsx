import React from 'react'
import {
    Typography,
    Button,
} from "@mui/material";
import "./LayoutScreen.css";
import { useTranslation } from "react-i18next";

function FloorSection({ selectedFloor, selectArray, selectedLayout, handleLayoutSelect, addApartment }) {
    const { i18n, t } = useTranslation();
    return (
        <div>
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
                            selectArray.find((floor) => floor.FloorName === selectedFloor)
                                ?.LayoutImage ? (
                            <div class="floorImageContainer">
                                <img
                                    class="floor-image-show"
                                    src={
                                        selectArray.find(
                                            (floor) => floor.FloorName === selectedFloor
                                        )?.layoutImage?.ImageLink
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

                        {selectedFloor && selectArray
                            .find(
                                (floor) => floor.FloorName === selectedFloor
                            )
                            ?.apartments?.length ? (
                            <div>
                                {selectedFloor && selectArray
                                    .find(
                                        (floor) => floor.FloorName === selectedFloor
                                    )
                                    ?.apartments?.sort((a, b) => a.ApartmentName.localeCompare(b.ApartmentName))
                                    .map((apartment) => (
                                        <Button
                                            class={
                                                apartment.Status === "Available"
                                                    ? apartment.ApartmentName === selectedLayout?.ApartmentName
                                                        ? "button-floor-selector-buy-select"
                                                        : "button-floor-selector-buy"
                                                    : apartment.Status === "Sold"
                                                        ? "button-floor-selector-sold"
                                                        : apartment.Status === "Under Option"
                                                            ? apartment.ApartmentName === selectedLayout?.ApartmentName
                                                                ? "button-floor-selector-hold-selected"
                                                                : "button-floor-selector-hold"

                                                            : "button-floor-selector-buy"
                                            }
                                            key={apartment.ApartmentId}
                                            id={apartment.ApartmentId}
                                            onClick={() => handleLayoutSelect(apartment)}
                                            disabled={
                                                apartment.Status === "Sold"

                                            }
                                        >
                                            {apartment.ApartmentName}
                                        </Button>
                                    ))}

                                {selectedLayout && (
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
                                            {t("3dPlan")}
                                        </Typography>

                                        {selectedLayout && selectArray
                                            .find(
                                                (floor) => floor.FloorName === selectedFloor
                                            )
                                            .apartments.find(
                                                (apartment) =>
                                                    apartment.ApartmentName === selectedLayout?.ApartmentName
                                            )?.Image ? (
                                            <div className="floorImageContainer">
                                                {selectArray.map((floor) => {
                                                    if (floor.FloorName === selectedFloor) {
                                                        const layout = floor.apartments.find(
                                                            (apartment) =>
                                                                apartment.ApartmentName === selectedLayout?.ApartmentName
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
                                        )
                                        }
                                    </div>
                                )}

                                {/* {selectArray
                                    .find(
                                        (floor) => floor.FloorName === selectedFloor
                                    )
                                    .apartments.find(
                                        (apartment) =>
                                            apartment.ApartmentName ===  selectedLayout?.ApartmentName
                                    ) ?
                                    (<div>

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
                                } */}

                            </div>) : (
                            <Typography
                                className="txt-buildname"
                                variant="subtitle2"
                                sx={{
                                    font: "inter",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                }}
                            >
                                {t("noUnits")}
                            </Typography>
                        )}

                    </div>
                </div>
            )}
        </div>
    )
}

export default FloorSection