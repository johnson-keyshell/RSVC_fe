import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { API_ROUTES } from '../../../Api';
import { Box, Typography } from '@mui/material';
import Snackbars from '../../Dialogs/Snackbar/Snackbars';
import { useTranslation } from "react-i18next";

const SailStatusDropDown = ({ sailData }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const { i18n, t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState(sailData?.SailStatus);
    const [openSailStatusSnackbar, setOpenSailStatusSnackbar] = useState(false);
    const handleCloseSailStatusSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSailStatusSnackbar(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelection = (selectedValue) => {
        setSelectedOption(selectedValue);
        handleClose();
        let sampleData = {
            sailId: sailData?.SailID,
            status: parseInt(selectedValue)
        }
        console.log("SampleData for setting sail status", sampleData);
        fetch(API_ROUTES.postSailStatus, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sampleData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Response of setting sailStatus", data);
                setOpenSailStatusSnackbar(true);

            })
            .catch((error) => {
                console.error('postSailStatus API request failed:', error);
            });

    };

    return (
        <div>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
            }}>
                <Typography class="sail-status-title">{t("sailStatus")} : </Typography>
                <span
                    style={{
                        marginRight: '5px',
                        marginLeft: '5px',
                        color:
                            selectedOption === "2"
                                ? 'green'
                                : selectedOption === "3"
                                    ? 'orange'
                                    : selectedOption === "4"
                                        ? 'red'
                                        : 'black', // Default color if none of the conditions match
                    }}
                >
                    {selectedOption === "2" ? t("inProgress") : selectedOption === "3" ? t("rejected") : selectedOption === "4" ? t("sold") : 'None'}
                </span>
                <IconButton
                    aria-label="more"
                    aria-controls="dropdown-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <ArrowDropDownIcon />
                </IconButton>
                <Menu
                    id="dropdown-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={() => handleSelection("2")}
                        style={{ color: 'green' }}
                    >
                        {t("inProgress")}
                    </MenuItem>
                    <MenuItem
                        onClick={() => handleSelection("3")}
                        style={{ color: 'orange' }}
                    >
                        {t("rejected")}
                    </MenuItem>
                    <MenuItem
                        onClick={() => handleSelection("4")}
                        style={{ color: 'red' }}
                    >
                        {t("sold")}
                    </MenuItem>
                </Menu>
            </Box>
            <Snackbars
                openSnackbar={openSailStatusSnackbar}
                handleCloseSnackbar={handleCloseSailStatusSnackbar}
                type="success"
                message={t("sailStatusChangedSuccessfully!!!")} />
        </div>
    );
};

export default SailStatusDropDown;
