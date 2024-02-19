import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Snackbars({openSnackbar,handleCloseSnackbar,type,message}) {
  return (
    <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}  
                onClose={handleCloseSnackbar}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseSnackbar}
                    severity={type}  // or "info", "warning", "error","success"
                >
                    {message}
                </MuiAlert>
            </Snackbar>
  )
}


export default Snackbars
