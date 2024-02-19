import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import '../../Documents/Documents.css'
import { useTranslation } from "react-i18next";

const DeleteDialog = ({ open, handleClose, handleConfirm }) => {
    const { i18n, t } = useTranslation();
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle >
                {t("delete")}
            </DialogTitle>
            <DialogContent >
                <Typography class="main-reason-pop">
               {t("AreYouSureYouWantToDeleteThisDocument")}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button class="btn-accept" onClick={handleClose} >
                    {t("cancel")}
                </Button>
                <Button class="btn-cancel-upload" onClick={handleConfirm} >
                    {t("delete")}
                </Button>
            </DialogActions>
        </Dialog >
    );
};

export default DeleteDialog;
