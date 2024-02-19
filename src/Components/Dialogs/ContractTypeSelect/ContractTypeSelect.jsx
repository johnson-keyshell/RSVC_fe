import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
    customRadio: {
        '& .MuiSvgIcon-root': {
            fontSize: '1em', // Adjust the size of the circle as needed
            color: ' #4C4C4C',
        },
    },
    
});

function ContractTypeSelect({ open, selectedContractType, handleContractTypeChange, handleClose, handleSubmit }) {
    const classes = useStyles();

    const { i18n, t } = useTranslation();
    return (



        <Dialog open={open} onClose={handleClose}>
            {/* <DialogTitle class="dialog-txt-head">Select Contract Type</DialogTitle> */}
            <DialogContent>
                <DialogContentText class="dialog-txt-not">
                    {t("chooseTheContractType")}
                </DialogContentText>
                {/* <Select
                    label="Contract Type"
                    value={selectedContractType}
                    onChange={handleContractTypeChange}
                >
                    <MenuItem value="0">Casco Only</MenuItem>
                    <MenuItem value="1">Semi-finished</MenuItem>
                    <MenuItem value="2">Customised</MenuItem>
                </Select> */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <IconButton
                        id="Casco Only"
                        className={classes.customRadio}
                        onClick={() => handleContractTypeChange('0')}
                    >
                        {selectedContractType === '0' ? (
                            <RadioButtonCheckedIcon />
                        ) : (
                            <RadioButtonUncheckedIcon />
                        )}
                    </IconButton>
                    <Typography class="contr-pop-select" >{t("cascoOnly")}</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <IconButton
                        id="Semi-finished"
                        className={classes.customRadio}
                        onClick={() => handleContractTypeChange('1')}
                    >
                        {selectedContractType === '1' ? (
                            <RadioButtonCheckedIcon />
                        ) : (
                            <RadioButtonUncheckedIcon />
                        )}
                    </IconButton>
                    <Typography class="contr-pop-select">{t("semifinished")}</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <IconButton
                        id="Customised"
                        className={classes.customRadio}
                        onClick={() => handleContractTypeChange('2')}
                    >
                        {selectedContractType === '2' ? (
                            <RadioButtonCheckedIcon />
                        ) : (
                            <RadioButtonUncheckedIcon />
                        )}
                    </IconButton>
                    <Typography class="contr-pop-select" >{t("customised")}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button class="btn-cancel" onClick={handleClose} >
                {t("cancel")}
                </Button>
                <Button class="btn-accept" onClick={handleSubmit} >
                    {t("submit")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ContractTypeSelect