import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";

const AddRejectComment = ({ open, onClose, onReject }) => {
  const [subject, setSubject] = useState('');
  const { i18n, t } = useTranslation();

  const [rejectReason, setRejectReason] = useState('');

  const handleReject = () => {
    onReject(rejectReason);
    setRejectReason('')
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md"
      sx={{
        "&.MuiPaper-root,.MuiDialog-paper": {
          borderRadius: '20px',
          overflow: 'hidden',
          width: "585px",
        }
      }}>
      <div style={{ display: "flex", alignItems: "center" ,margin:"10px 0 0 20px"}}>
        <DialogTitle class="dialog-txt-not" style={{marginBottom:"0px"}}>
          {t("rejectReason")}
        </DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          style={{ position: 'absolute', right: '20px' }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent>

        {/* <TextField
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
          className='head-text'
          sx={{
            "&.MuiInputBase-input,.MuiOutlinedInput-input":{
                padding:0
            }
          }}
        /> */}
        <TextField

          className='content-text'
          margin="dense"
          id="description"
          placeholder={t("addComment")}
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />

      </DialogContent>
      <DialogActions >
        <Button class="btn-cancel" onClick={onClose} >
          {t("cancel")}
        </Button>
        <Button class="btn-cancel-upload" onClick={handleReject} >
          {t("reject")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRejectComment;
