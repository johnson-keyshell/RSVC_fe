import React from 'react'
import {
    IconButton,
    Dialog,
    DialogContent,
  } from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseOutlined";


function OpenImageDialogBox({open, handleClose, selectedImage}) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
        >
            <DialogContent>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {selectedImage && (
                    <img
                        src={selectedImage}
                        alt={selectedImage.name}
                        style={{ maxWidth: "100%" }}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}

export default OpenImageDialogBox