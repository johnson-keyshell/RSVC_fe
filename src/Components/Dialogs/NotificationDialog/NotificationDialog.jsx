import './NotificationDialog.css'
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";

const NotificationDialog = ({ open, onClose }) => {
    const { i18n, t } = useTranslation();
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle class="dialog-txt-head-not">{t("thankyou")}</DialogTitle>
            <DialogContent>
                <DialogContentText class="dialog-txt-not">{t("yourInterestIsNotifiedToTheRespectiveAgentsYouWillBeNotifiedIn24Hours")}</DialogContentText>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
};

export default NotificationDialog;
