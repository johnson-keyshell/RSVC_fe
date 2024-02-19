import React from 'react'
import { Grid } from '@mui/material';
import {
    Typography,
    Button,
    Divider,
    Paper,
    TextField,
    List,
    ListItem,
    ListItemText,
    Box
} from '@mui/material';
import '../Documents.css'
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

function SellerDocumentList({ documentType, documents, handleFileChange, setDocumentType, handleReject, handleAccept }) {
    const { i18n, t } = useTranslation();
    return (
        <Paper style={{ padding: '16px', boxShadow: 'none' }}>
            <Typography class="doc-head" sx={{ fontWeight: 600 }} >
                {documentType}
            </Typography>

            {(documents[documentType].length == 0) &&
                (<Typography class="main-reason-doc" >
                    {t("noDocumentsUploaded")}
                </Typography>
                )}
            <List>
                {
                    documents[documentType]?.map((document) => (

                        <ListItem key={document.sailDocumentId}>
                            <Box sx={{
                                display: "flex",
                                flexGrow: 1,
                                flexDirection: 'row',
                                maxWidth: '100%'
                            }}>
                                <div class="content">

                                    <Grid container spacing={2} sx={{ alignItems: "center" }}>
                                        <Grid item xs={12} md={7}>
                                            <Box sx={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                flexGrow: 1,
                                                flexDirection: 'column'
                                            }}>
                                                <Typography class="main-doc-name" >{document.documentName}</Typography>
                                                <Box sx={{
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    flexGrow: 1,
                                                    flexDirection: 'row',
                                                }}>
                                                    <Typography class="main-person-name" >{t("agentVerificationStatus")} </Typography>
                                                    <Typography class="main-reason-doc" >{t(document.agentVerificationStatus)}</Typography>
                                                    {((document.agentVerificationStatus === 'Approved') &&
                                                        <CheckCircleOutlineIcon style={{ color: '#20CD50' }} />) ||
                                                        ((document.agentVerificationStatus === 'Rejected') &&
                                                            (<CancelIcon style={{ color: '#FF2E00' }} />)) ||
                                                        ((document.agentVerificationStatus === 'Pending') &&
                                                            (<WatchLaterIcon style={{ color: '#FF9900' }} />))
                                                    }
                                                </Box>
                                                <Box sx={{
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    flexGrow: 1,
                                                    flexDirection: 'row',
                                                }}>
                                                    <Typography class="main-person-name" >{t("sellerVerificationStatus")} </Typography>
                                                    <Typography class="main-reason-doc" >{t(document.sellerVerificationStatus)}</Typography>
                                                    {((document.sellerVerificationStatus === 'Approved') &&
                                                        <CheckCircleOutlineIcon style={{ color: '#20CD50' }} />) ||
                                                        ((document.sellerVerificationStatus === 'Rejected') &&
                                                            (<CancelIcon style={{ color: '#FF2E00' }} />)) ||
                                                        ((document.sellerVerificationStatus === 'Pending') &&
                                                            (<WatchLaterIcon style={{ color: '#FF9900' }} />))
                                                    }
                                                </Box>

                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={5}>

                                            <Box sx={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                flexGrow: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'space-around'
                                            }}>
                                                <Link className="link-style" to={document.link} target="_blank">
                                                    <VisibilityIcon className="visibilityIcon" />
                                                    <span>{t("view")}</span>
                                                </Link>
                                                {(document.sellerVerificationStatus === 'Rejected') && (<div class="ver-btns" onClick={() => handleAccept(document?.sailDocumentId)} >
                                                    <TaskAltIcon style={{ color: '#20CD50' }} />
                                                    <span>{t("accept")}</span>
                                                </div>)}
                                                {(document.sellerVerificationStatus === 'Approved') && (<div class="ver-btns" onClick={() => handleReject(document?.sailDocumentId)}>
                                                    <CancelIcon style={{ color: '#FF2E00' }} />
                                                    <span>{t("reject")}</span>
                                                </div>)}
                                                {(document.sellerVerificationStatus === 'Pending') && (
                                                    <Box sx={{
                                                        display: "flex",
                                                        alignItems: "flex-start",
                                                        flexGrow: 1,
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-around'
                                                    }}>
                                                        <div class="ver-btns" onClick={() => handleAccept(document?.sailDocumentId)} >
                                                            <TaskAltIcon style={{ color: '#20CD50' }} />
                                                            <span>{t("accept")}</span>
                                                        </div>
                                                        <div class="ver-btns" onClick={() => handleReject(document?.sailDocumentId)}>
                                                            <CancelIcon style={{ color: '#FF2E00' }} />
                                                            <span>{t("reject")}</span>
                                                        </div>
                                                    </Box>)}


                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {/* Add condition if there is comment to show this */}
                                            {(document.agentVerificationStatus === 'Rejected') &&
                                                (<Box sx={{
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    flexGrow: 1,
                                                    flexDirection: 'row',
                                                }}>
                                                    <Typography class="main-person-name" >{t("agentRejectionReason")}: </Typography>
                                                    <Typography class="reject-reason-doc" >{document.AgentRejectionReason}</Typography>

                                                </Box>)}
                                        </Grid>
                                        <Grid item xs={12} sx={{ paddingTop: "0px !important" }}>
                                            {/* Add condition if there is comment to show this */}
                                            {(document.sellerVerificationStatus === 'Rejected') &&
                                                (<Box sx={{
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    flexGrow: 1,
                                                    flexDirection: 'row',
                                                }}>
                                                    <Typography class="main-person-name" >{t("sellerRejectionReason")}: </Typography>
                                                    <Typography class="reject-reason-doc" >{document.SellerRejectionReason}</Typography>

                                                </Box>)}
                                        </Grid>
                                    </Grid>
                                </div>

                            </Box>
                        </ListItem>
                    ))
                }

            </List>
            {/* <label htmlFor={`upload-btn-${documentType.toLowerCase().replace(/\s/g, '-')}`}>
                <div
                    class="upld-btn-doc"
                    id={`upload-button-${documentType.toLowerCase().replace(/\s/g, '-')}`}
                    component="span"
                >
                    Upload
                </div>
            </label>
            <input
                type="file"
                id={`upload-btn-${documentType.toLowerCase().replace(/\s/g, '-')}`}
                style={{ display: 'none' }}
                onChange={(e) => {
                    handleFileChange(e);
                    setDocumentType(documentType);
                    console.log(documentType, "doc type");
                }}
            /> */}
        </Paper>
    )
}

export default SellerDocumentList