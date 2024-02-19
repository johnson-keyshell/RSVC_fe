import { React, useState, useRef, useEffect } from "react";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog/ConfirmationDialog";
import OpenImageDialogBox from "../../Dialogs/OpenImageDialog/OpenImageDialog";
import { DeleteIcon } from "@chakra-ui/icons";
import Loader from '../../Loader/Loader';

import {
    Grid,
    Box,
    Button,
    Typography,
    FormControl,
    TextField,
    Select,
    MenuItem,
    Divider,
    IconButton,
    Dialog,
    DialogContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import { isSupportedImage, openFileSelection } from "../../openFileSelection";
import axios from "axios";
import { API_ROUTES } from "../../../Api";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Amenities from "../../Amenities/Amenities";//important line if removed all css will go
import InputFieldWithTitle from "../../../Elements/InputFieldWithTitle";
import SelectMenuWithTitle from "../../../Elements/SelectMenuWithTitle";
import { streetOptions, placesOption, signUpTypeOptions, buyingConditionOptions, rentalConditionOptions, typeOptions } from "../../../Constants/BuildingOptions";
import { isSupportedExcel } from "../../openFileSelection";
import UploadPop from "../../Dialogs/UploadPop";


function ApartmentSpecificDetails({ floors, floor, apartment, setFloors }) {

    const nextPageKeys = [
        "HouseNumber",
        "Address",
        "Rent",
        "PurchasePrice",
        "SignUpType",
        "BuyingCondition",
        "RentalConditions",
        "PerYear",
        "PerMonth",
        "M2PerYear",
        "InUnitsFrom",
        "OfWhichIndustrialHall",
        "OfWhichOffice",
        "Area",
        "TypeOf",
        "Street",
        "Postcode",
        "Place",
        "TotalUnits",
        "RemainingUnits",
        "YearOfConstructionOrPeriod"

    ]
    const { i18n, t } = useTranslation();

    const handleApartmentFieldChange = (FloorName, ApartmentName, field, newValue) => {
        const updatedFloors = floors.map((floor) => {
            if (floor.FloorName === FloorName) {
                const updatedApartments = floor.apartments.map((apartment) => {
                    if (apartment.ApartmentName === ApartmentName) {
                        if (field === "Price") {
                            return {
                                ...apartment, [field]: newValue,
                            };
                        }
                        else {
                            return {
                                ...apartment,
                                additionalFields: {
                                    ...apartment.additionalFields,
                                    [field]: newValue, // Update the specified field dynamically
                                },
                            };
                        }
                    }
                    return apartment;
                });
                return { ...floor, apartments: updatedApartments };
            }
            return floor;
        });
        setFloors(updatedFloors);
    };




    //   const handleFieldChangeExcel = (field, value) => {
    //     console.log("Build data in change", aptData);
    //     console.log("ExcelData", excelData);
    //     console.log("field and value", field, value);
    //     setAptData((prevData) => {
    //       const newData = { ...prevData };
    //       newData[field] = value;
    //       return newData;
    //     });
    //     setExcelData((prevData) => {
    //       const newData = [...prevData]; // Create a shallow copy of the array

    //       const index = newData.findIndex((entry) => entry.key === field);

    //       if (index !== -1) {
    //         newData[index] = { key: field, value };
    //       } else {
    //         newData.push({ key: field, value });
    //       }

    //       return newData;
    //     });
    //   };

    // const updateAptData = (blad1Data) => {
    //     const addedKeyValues = [];
    //     const notAddedKeyValues = [];

    //     Object.entries(blad1Data).forEach(([key, value]) => {
    //         const cleanedKey = key.replace(/\s/g, '');
    //         if (aptData.hasOwnProperty(cleanedKey)) {
    //             setAptData((prevData) => {
    //                 const newData = { ...prevData };
    //                 newData[cleanedKey] = value;
    //                 return newData;
    //             });
    //             addedKeyValues.push({ key, value });
    //         } else {
    //             notAddedKeyValues.push({ key, value });
    //         }
    //     });

    //     setAptData((prevData) => {
    //         const newData = { ...prevData };
    //         notAddedKeyValues.forEach(({ key, value }) => {
    //             // Remove spaces from the key before adding to newData
    //             const cleanedKey = key.replace(/\s/g, '');
    //             newData[cleanedKey] = value;
    //         });
    //         return newData;
    //     });


    //     return { addedKeyValues, notAddedKeyValues };
    // };
    const convertCamelToLabel = (camelCaseString) => {
        return camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2');
    };



    return (
        <div>
            <div style={{ marginTop: "20px" }}>
                <Grid container spacing={2} sx={{ alignItems: "center" }}>
                    <Grid item xs={6} md={4} sx={{ paddingTop: "0 !important" }} >
                        <InputFieldWithTitle
                            title={t("PurchasePrice")}
                            placeholder={t("enterPurchasePrice")}
                            value={apartment?.additionalFields?.PurchasePrice}
                            onChange={(value) =>
                                handleApartmentFieldChange(
                                    floor.FloorName,
                                    apartment.ApartmentName,
                                    "PurchasePrice",
                                    value
                                )
                            } />
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ paddingTop: "0 !important" }}>
                        <InputFieldWithTitle
                            title={t("Area")}
                            placeholder={t("enterAreaInSqft")}
                            value={apartment?.additionalFields?.Area}
                            onChange={(value) =>
                                handleApartmentFieldChange(
                                    floor.FloorName,
                                    apartment.ApartmentName,
                                    "Area",
                                    value
                                )
                            } />
                    </Grid>

                    {/* <Grid item xs={6} md={4}>
                                          <SelectMenuWithTitle
                                            title={"Street"}
                                            options={streetOptions}
                                          value={aptData.Street}
                                          onChange={(value) => handleFieldChange("Street", value)}
                                          />
                                        </Grid> */}
                    <Grid item xs={6} md={4} sx={{ paddingTop: "0 !important" }} >
                        <InputFieldWithTitle
                            title={t("HouseNumber")}
                            placeholder={t("enterNumber")}
                            value={apartment?.additionalFields?.HouseNumber}
                            onChange={(value) =>
                                handleApartmentFieldChange(
                                    floor.FloorName,
                                    apartment.ApartmentName,
                                    "HouseNumber",
                                    value
                                )
                            } />
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ paddingTop: "0 !important" }}>
                        <InputFieldWithTitle
                            title={t("address")}
                            placeholder={t("enterAddress")}
                            value={apartment?.additionalFields?.Address}
                            onChange={(value) =>
                                handleApartmentFieldChange(
                                    floor.FloorName,
                                    apartment.ApartmentName,
                                    "Address",
                                    value
                                )
                            } />
                    </Grid>

                    <Grid item xs={6} md={4} sx={{ paddingTop: "0 !important" }}>
                        <SelectMenuWithTitle
                            title={t("SignUpType")}
                            options={signUpTypeOptions}
                            value={apartment?.additionalFields?.SignUpType}
                            onChange={(e) =>
                                handleApartmentFieldChange(
                                    floor.FloorName,
                                    apartment.ApartmentName,
                                    "SignUpType",
                                    e.target.value
                                )
                            } />
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ paddingTop: "0 !important" }}>
                        <SelectMenuWithTitle
                            title={t("BuyingCondition")}
                            options={buyingConditionOptions}
                            value={apartment?.additionalFields?.BuyingCondition}
                            onChange={(e) =>
                                handleApartmentFieldChange(
                                    floor.FloorName,
                                    apartment.ApartmentName,
                                    "BuyingCondition",
                                    e.target.value
                                )
                            } />
                    </Grid>


                    <Grid item xs={6} md={4} sx={{ paddingTop: "0 !important" }}>
                        <InputFieldWithTitle
                            id={`apartment-rent-${floor.FloorName}-${apartment.ApartmentName}`}
                            key={`apartment-rent-${floor.FloorName}-${apartment.ApartmentName}`}
                            title={t("Rent")}
                            placeholder={t("enterRent")}
                            value={apartment?.additionalFields?.Rent}
                            onChange={(value) =>
                                handleApartmentFieldChange(
                                    floor.FloorName,
                                    apartment.ApartmentName,
                                    "Rent",
                                    value
                                )
                            } />
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ paddingTop: "0 !important" }}>
                        <SelectMenuWithTitle
                            title={t("RentalConditions")}
                            options={rentalConditionOptions}
                            value={apartment?.additionalFields?.RentalConditions}
                            onChange={(e) =>
                                handleApartmentFieldChange(
                                    floor.FloorName,
                                    apartment.ApartmentName,
                                    "RentalConditions",
                                    e.target.value
                                )
                            } />
                    </Grid>

                    <Grid item xs={6} md={4} sx={{ paddingTop: "0 !important" }}>
                        <InputFieldWithTitle
                            title={t("PerYear")}
                            placeholder={t("enterPerYear")}
                            value={apartment?.additionalFields?.PerYear}
                            onChange={(value) =>
                                handleApartmentFieldChange(
                                    floor.FloorName,
                                    apartment.ApartmentName,
                                    "PerYear",
                                    value
                                )
                            } />
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ paddingTop: "0 !important" }}>
                        <InputFieldWithTitle
                            title={t("PerMonth")}
                            placeholder={t("perMonth")}
                            value={apartment?.additionalFields?.PerMonth}
                            onChange={(value) =>
                                handleApartmentFieldChange(
                                    floor.FloorName,
                                    apartment.ApartmentName,
                                    "perMonth",
                                    value
                                )
                            } />
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ paddingTop: "0 !important" }}>
                        <InputFieldWithTitle
                            title={t("M2PerYear")}
                            placeholder={t("M2PerYear")}
                            value={apartment?.additionalFields?.M2PerYear}
                            onChange={(value) =>
                                handleApartmentFieldChange(
                                    floor.FloorName,
                                    apartment.ApartmentName,
                                    "M2PerYear",
                                    value
                                )
                            } />
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ paddingTop: "0 !important" }}>
                        <InputFieldWithTitle
                            title={t("OfWhichIndustrialHall")}
                            placeholder={t("OfWhichIndustrialHall")}
                            value={apartment?.additionalFields?.OfWhichIndustrialHall}
                            onChange={(value) =>
                                handleApartmentFieldChange(
                                    floor.FloorName,
                                    apartment.ApartmentName,
                                    "OfWhichIndustrialHall",
                                    value
                                )
                            } />
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ paddingTop: "0 !important" }}>
                        <InputFieldWithTitle
                            title={t("OfWhichOffice")}
                            placeholder={t("OfWhichOffice")}
                            value={apartment?.additionalFields?.OfWhichOffice}
                            onChange={(value) =>
                                handleApartmentFieldChange(
                                    floor.FloorName,
                                    apartment.ApartmentName,
                                    "OfWhichOffice",
                                    value
                                )
                            } />
                    </Grid>
                    <Grid item xs={6} md={4} sx={{ paddingTop: "0 !important" }}>
                        <SelectMenuWithTitle
                            title={t("TypeOf")}
                            options={typeOptions}
                            value={apartment?.additionalFields?.TypeOf}
                            onChange={(e) =>
                                handleApartmentFieldChange(
                                    floor.FloorName,
                                    apartment.ApartmentName,
                                    "TypeOf",
                                    e.target.value
                                )
                            } />
                    </Grid>



                </Grid>
            </div>

            <div className="mt-3" >
                <Grid container spacing={2} sx={{ alignItems: "center" }}>
                    {(() => {
                        if (apartment?.additionalFields) {
                            const renderedFields = Object.entries(apartment?.additionalFields)
                                .filter(([key]) => !nextPageKeys.includes(key))
                                .map(([key, value]) => {
                                    return (
                                        <Grid item xs={6} md={4} sx={{ paddingTop: "0 !important" }} key={key}>
                                            <InputFieldWithTitle
                                                title={t(key)}
                                                placeholder={`Enter ${key}`}
                                                value={value}
                                                onChange={(newValue) =>
                                                    handleApartmentFieldChange(floor.FloorName, apartment.ApartmentName, key, newValue)
                                                }
                                            />
                                        </Grid>
                                    );
                                });
                            return renderedFields;
                        }
                        return null; // Or any fallback content
                    })()}
                </Grid>
            </div>
        </div>
    )
}

export default ApartmentSpecificDetails