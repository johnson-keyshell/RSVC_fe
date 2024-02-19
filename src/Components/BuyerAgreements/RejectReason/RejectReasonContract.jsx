import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './RejectReasonContract.css'
import { useTranslation } from "react-i18next";

const RejectContract = ({ open, onClose }) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const { i18n, t } = useTranslation()
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
          placeholder={t("EnterDetailsHere")}
          type="text"
          fullWidth
          multiline
          variant="outlined"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className='head-text'
          sx={{
            "&.MuiInputBase-input,.MuiOutlinedInput-input":{
                padding:0
            }
          }}
        />
        <TextField
        
            className='content-text'
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
        />
        
      </DialogContent>
      <DialogActions className='btn-container'>
       
        <Button className="btn-reject" onClick={handleReject} >
          {t("cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RejectContract;
