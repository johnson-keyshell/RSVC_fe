import React, { useState } from 'react'
import { Typography, TextField } from '@mui/material'

function InputFieldWithTitle({ title, field, disabled, placeholder,type, value, onChange, required, regex, errorMessage, setFieldErrors }) {
    const [error, setError] = useState(false);
    const [require, setRequire] = useState(required && !value);
    const requiredMessage = "This feild is mandatory !!!"

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        console.log("input value", inputValue);
        setRequire(false);
        // Check if the input satisfies the regex condition
        if (regex && !regex.test(inputValue)) {
            setError(true);
            if (setFieldErrors) {
                setFieldErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
            }
        } else {
            setError(false);
            if (setFieldErrors) {
                setFieldErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
            }

        }
        // Pass the value to the parent component
        onChange(inputValue);
    };

    const handleBlur = () => {
        // Check for mandatory field condition when blurred
        if (required && !value.trim()) {
            setRequire(true);
            if (setFieldErrors) {
                setFieldErrors((prevErrors) => ({ ...prevErrors, [field]: true }));
            }

        }
        else {
            setRequire(false);
            if (setFieldErrors) {
                setFieldErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
            }

        }
    };

    return (
        <div>
            <Typography class="heading-for-all-additional" variant="body1">
                {title}
            </Typography>
            <TextField
                fullWidth
                type={type}
                onChange={handleInputChange}
                onBlur={handleBlur}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                variant="outlined"
                margin="normal"
                error={error || require}
                helperText={(error && errorMessage) || (require && requiredMessage)}
                sx={{
                    "&.MuiInputBase-root,.MuiFilledInput-root,.MuiSelect-root":
                    {
                        backgroundColor: !disabled ? "#EDEDED !important" : "transparent",
                        borderRadius: "20px",
                        maxWidth: "258px !important",
                        paddingTop: "10px",
                        marginBottom: "5px",
                        maxHeight: "40px",
                        display: "flex",
                        flexGrow: "1",
                        alignItems: "center",
                    },
                    "&.MuiSelect-select,.MuiInputBase-input,.MuiFilledInput-input:focus ":
                    {
                        // paddingTop: "0px !important",
                        backgroundColor: !disabled ? "#EDEDED !important" : "transparent",
                        borderRadius: "20px",
                        padding: "10px",
                    },
                    "&.MuiFormControl-root": {
                        width: "100%",
                        marginTop: "0px",
                    },

                }}
            /></div>
    )
}

export default InputFieldWithTitle