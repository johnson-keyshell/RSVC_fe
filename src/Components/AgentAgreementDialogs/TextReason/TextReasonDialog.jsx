import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './TextReasonDialog.css';
import { useTranslation } from "react-i18next";

const TextReasonDialog = ({ open, onClose ,sendAgreement}) => {
  const [description, setDescription] = useState('');
  const { i18n, t } = useTranslation();

  const handleText = () => {
    sendAgreement(description);
    
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md"
    sx={{
        "&.MuiPaper-root,.MuiDialog-paper":{
            borderRadius:'20px',
            overflow:'hidden',
            width:"585px",
        }
    }}>
      <DialogTitle>
        {t("additionalText")}
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
      <DialogContent>
        <TextField
          class='content-text'
          margin="dense"
          id="description"
          placeholder={t("enterTextHere")}
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            "&.MuiInputBase-input,.MuiOutlinedInput-input":{
                marginTop:'2%',
            }
          }}
        />
        
      </DialogContent>
      <DialogActions className='btn-container'>
        <Button class="Abtn-reject" onClick={onClose} >
          {t("cancel")}
        </Button>
        <Button class="Abtn-accept" onClick={handleText} >
          {t("send")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TextReasonDialog;
