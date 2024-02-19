import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";


import './AgentAgreementDialog.css'


const AgentAgreementBuyerView = ({ open, onClose, onReject, onAccept }) => {
    const { i18n, t } = useTranslation();
    const handleAccept = () => {
        onAccept();
    };

    const handleReject = () => {

        onReject();
    };


    const contents = [
        {
            heading: 'Section 1: Introduction',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            heading: 'Section 2: Acceptance',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            heading: 'Section 3: Dcceptance',
            content: 'Oorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            heading: 'Section 4: Wcceptance',
            content: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            heading: 'Section 5: Ecceptance',
            content: 'Xorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },

    ];

    return (
        <div className="Awrapper" style={{ overflowX: 'hidden' }}>
            <Box
                sx={{
                    display: "flex",
                    alignItem: "center",
                    flexgrow: "1",
                    overflow: "hidden"
                }}
            >
                <Dialog className=" dialog" open={open} onClose={onClose} fullWidth maxWidth="md"
                    sx={{
                        "&.MuiPaper-root,.MuiDialog-paper": {
                            overflow: 'hidden',
                            borderRadius: '20px'
                        }
                    }}
                >
                    <DialogTitle className='dialog-title' >
                        <Typography className='Ahead' variant="h6">{t("agentAgreement")}</Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={onClose}
                            aria-label="close"
                            style={{ position: 'absolute', top: '10px', right: '20px' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent  >
                        <DialogContentText  >
                            {contents.map((content, index) => (
                                <div key={index}>
                                    <Typography className="Asubtitle" variant="subtitle1" fontWeight={500}>
                                        {content.heading}
                                    </Typography>
                                    <p className="Asubcontent">{content.content}</p>
                                </div>
                            ))}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className='Abtn-container'>
                        <Button className="Abtn-reject" onClick={handleReject} color="error">
                            {t("reject")}
                        </Button>
                        <Button className="Abtn-accept" onClick={handleAccept} color="success">
                            {t("acceptAgreement")}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

        </div>
    );
};

export default AgentAgreementBuyerView;