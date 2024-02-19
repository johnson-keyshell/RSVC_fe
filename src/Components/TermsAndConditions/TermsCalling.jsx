import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TermsAndConditionsDialog from './TermsAndConditionsDialog/TermsAndConditionsDialog';
import RejectContractDialog from './RejectReason/RejectReasonDialog';
import { useTranslation } from "react-i18next";

const TermsCalling = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const { i18n, t } = useTranslation();

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
      <TermsAndConditionsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAccept={handleAccept}
        onReject={handleReject}
      />

      {rejectDialogOpen && (
        <RejectContractDialog
          open={rejectDialogOpen}
          onClose={handleCloseRejectDialog}
        />
      )}
    </div>
  );
};

export default TermsCalling;
