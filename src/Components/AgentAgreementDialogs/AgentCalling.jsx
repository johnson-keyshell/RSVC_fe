import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AgentAgreementDialog from './AgentAgreementDialog';
import TextReasonDialog from './TextReason/TextReasonDialog';

const AgentCalling = ({ onClose,sendAgreement }) => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [textDialogOpen, setTextDialogOpen] = useState(false);

  const handleAccept = () => {
    console.log('Accepted');
    setTextDialogOpen(true);

  };

  const handleCloseTextDialog = () => {
    setTextDialogOpen(false);
    setDialogOpen(true);
  };



  return (
    <div>
      {/* <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
        Show Terms and Conditions
      </Button> */}
      <AgentAgreementDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
          onClose();
        }}
        onAccept={handleAccept}
      />

      {textDialogOpen && (
        <TextReasonDialog
          open={textDialogOpen}
          onClose={handleCloseTextDialog}
          sendAgreement={sendAgreement}
        />
      )}
    </div>
  );
};

export default AgentCalling;