import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './RejectReasonDialog.css';
import { useTranslation } from "react-i18next";

const RejectContractDialog = ({ open, onClose }) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const { i18n, t } = useTranslation();

  const handleReject = () => {
    // Handle the rejection logic here with 'subject' and 'description' values
    console.log('Subject:', subject);
    console.log('Description:', description);
    
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
        {t("rejectContract")}
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
          autoFocus
          margin="dense"
          id="subject"
          placeholder={t("enterDetailsHere")}
          type="text"
          fullWidth
          multiline
          variant="outlined"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          class='head-text'
          sx={{
            "&.MuiInputBase-input,.MuiOutlinedInput-input":{
                padding:0
            }
          }}
        />
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
        <Button class="btn-cancel" onClick={onClose} >
          {t("cancel")}
        </Button>
        <Button class="btn-reject" onClick={handleReject} >
          {t("reject")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RejectContractDialog;
