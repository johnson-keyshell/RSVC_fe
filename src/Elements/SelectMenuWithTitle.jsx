import React from 'react'
import { Typography, Select, MenuItem } from '@mui/material'
import { useTranslation } from "react-i18next";

function SelectMenuWithTitle({ title, disabled, options, value, onChange }) {
    let currentLanguage = localStorage.getItem("language");
    const storedLanguage = localStorage.getItem("language");
    const { i18n, t } = useTranslation();
    if (storedLanguage) {
        currentLanguage=storedLanguage;
    } else {
        currentLanguage="en"
    }

    return (
        <div>
            <Typography class="heading-for-all-additional" variant="body1">
                {title}
            </Typography>
            <Select
                fullWidth
                onChange={onChange}
                value={value}
                disabled={disabled}
                variant="outlined"
                displayEmpty
                sx={{
                    "&.MuiInputBase-root,.MuiFilledInput-root,.MuiSelect-root":
                    {
                        backgroundColor: !disabled ? "#EDEDED !important" : "transparent", 
                        borderRadius: "20px",
                        marginBottom: "7px",
                        display: "flex",
                        flexGrow: "1",
                        alignItems: "center",
                    },
                    "&.MuiSelect-select,.MuiInputBase-input,.MuiFilledInput-input:focus ":
                    {
                        backgroundColor: !disabled ? "#EDEDED !important" : "transparent",
                        borderRadius: "20px",
                        padding: "10px",
                    },
                    "&.MuiFormControl-root": {
                        width: "100%",
                        marginTop: "0px",
                    },
                }}
            >
                <MenuItem disabled value="">
                    {t("selectAnyOption")}
                </MenuItem>
                {options[currentLanguage].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </div>
    )
}

export default SelectMenuWithTitle
