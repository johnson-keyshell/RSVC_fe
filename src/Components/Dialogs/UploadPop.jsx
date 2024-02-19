import React from 'react'
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import { useTranslation } from "react-i18next";

function UploadPop({selectedFile,open,onClose,handleUpload}) {
    const { i18n, t } = useTranslation();
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t("attachmentPreview")}</DialogTitle>
            <DialogContent>
                {/* Display image or document preview here based on the file type */}
                {selectedFile && selectedFile.type.includes('image') && (
                    <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ maxWidth: '100%' }} />
                )}
                {selectedFile && !selectedFile.type.includes('image') && (
                    <div>
                        <DescriptionIcon style={{ fontSize: 100 }} />
                        <label>{selectedFile.name}</label>
                    </div>
                )}

            </DialogContent>
            <DialogActions>
                <Button class="btn-accept" onClick={handleUpload}>{t("upload")}</Button>
                <Button class="btn-cancel-upload" onClick={onClose}>{t("cancel")}</Button>
            </DialogActions>
        </Dialog>)
}

export default UploadPop