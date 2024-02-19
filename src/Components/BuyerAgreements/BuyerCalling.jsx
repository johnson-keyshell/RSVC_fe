import React, { useState } from 'react';
import Button from '@mui/material/Button';
import BuyerAgreement from './BuyerAgreements';
import RejectContract from './RejectReason/RejectReasonContract';
import { useTranslation } from "react-i18next";


const BuyerCalling = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const { i18n, t } = useTranslation()

  const handleAccept = () => {
    // Handle acceptance logic here
    console.log('Accepted');
  };


  const handleReject = () => {
    // Handle rejection logic here
    setRejectDialogOpen(true);
    console.log('Rejected');
  };


  const handleCloseRejectDialog = () => {
    // Handle close rejection logic here
    setRejectDialogOpen(false);
    setDialogOpen(true)
    console.log('Reject dialogue closed');
  };
  

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
        {t("showTermsAndConditions")}
      </Button>
      <BuyerAgreement
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAccept={handleAccept}
        onReject={handleReject}
      />

       {rejectDialogOpen && (
        <RejectContract
          open={rejectDialogOpen}
          onClose={handleCloseRejectDialog}
        /> 
      )} 
    </div>
  );
};

export default BuyerCalling;