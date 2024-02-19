import React from 'react'
import {
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import BoldViewWithTitle from '../../../Elements/BoldViewWithTitle';
import convertPriceToNED from '../../../Components/convertPriceToNED';

export default function CurrentlySelected({ selectedApartments, from }) {
    const { i18n, t } = useTranslation();
    console.log({ selectedApartments });

    let floorNames = "";
    let totalPrice = 0;
    let floorSum = 0;
    let totalRent = 0;
    let totalArea = 0

    if (from === "selected" && selectedApartments) {
        floorNames = selectedApartments
            ? [...new Set(selectedApartments?.flatMap(({ floorDetails }) => floorDetails.FloorName))].join(", ")
            : "";
        totalPrice = selectedApartments
        ? selectedApartments.reduce((sum, { apartments }) => {
            return sum + apartments.reduce((apartmentSum, { additionalFields }) => apartmentSum + (parseInt(additionalFields?.PurchasePrice)), 0);
        }, 0)
        : 0;
        floorSum = Object.values(selectedApartments).reduce((sum, { apartments }) => {
            return sum + (apartments ? apartments.length : 0);
        }, 0);
        totalRent = selectedApartments
            ? selectedApartments.reduce((sum, { apartments }) => {
                return sum + apartments.reduce((apartmentSum, { additionalFields }) => apartmentSum + (parseInt(additionalFields?.Rent)), 0);
            }, 0)
            : 0;
        totalArea = selectedApartments
        ? selectedApartments.reduce((sum, { apartments }) => {
            return sum + apartments.reduce((apartmentSum, { additionalFields }) => apartmentSum + (parseInt(additionalFields?.TotalUp)), 0);
        }, 0)
        : 0;



    }
    else {
        floorNames = selectedApartments
            ? [...new Set(selectedApartments?.flatMap((apartment) => apartment.floorName))].join(", ")
            : "";
        totalPrice = selectedApartments?.reduce((total, apartment) => total + (parseInt(apartment.additionalFields?.PurchasePrice)), 0)
        floorSum = selectedApartments?.length;
        totalRent = selectedApartments?.reduce((total, apartment) => total + (parseInt(apartment.additionalFields?.Rent)), 0)
        totalArea = selectedApartments?.reduce((total, apartment) => total + (parseInt(apartment.additionalFields?.TotalUp)), 0)

    }

    return (
        <div>

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
                    {t("detailsOfCurrentlyPicked")}
                </Typography>
                <BoldViewWithTitle
                    title={t("floor")}
                    text={floorNames}
                />
                <BoldViewWithTitle
                    title={t("totalUnits")}
                    text={floorSum}
                />
                <BoldViewWithTitle
                    title={t("TotalUp")}
                    text={`${totalArea} m²`}
                />
                <BoldViewWithTitle
                    title={t("totalPrice")}
                    text={`€ ${convertPriceToNED(totalPrice.toString())}`}
                />
                <BoldViewWithTitle
                    title={t("totalRent")}
                    text={`€ ${convertPriceToNED(totalRent.toString())}`}
                />
            </div>
        </div >
    )
}
