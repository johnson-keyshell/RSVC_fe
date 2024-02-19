import './ConfirmationDialog.css'
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";




const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
    const { i18n, t } = useTranslation();
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle class="dialog-txt-head">{t("confirm")}</DialogTitle>
            <DialogContent>
                <DialogContentText class="dialog-txt">{t("areYouSureYouWantToExitWithoutSaving?")}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button class="btn-no" onClick={onClose}  >
                    {t("no")}
                </Button>
                <Button class="btn-yess" onClick={onConfirm}  >
                    {t("yes")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
