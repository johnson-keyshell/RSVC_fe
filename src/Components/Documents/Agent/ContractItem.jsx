import React from 'react'
import { useState, useEffect } from 'react';
import { API_ROUTES } from '../../../Api';
import {
    Typography,
    Button,
    Divider,
    Paper,
    TextField,
    List,
    ListItem,
    ListItemText,
    Box,
    Grid
} from '@mui/material';
import { DeleteIcon } from "@chakra-ui/icons";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { useTranslation } from "react-i18next";
import Loader from '../../Loader/Loader';
import Snackbars from '../../Dialogs/Snackbar/Snackbars';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CircularProgress from '@mui/material/CircularProgress';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import DeleteDialog from '../../Dialogs/DeleteDialog/DeleteDialog';


export default function ContractItem({ documentType, documents, currentChat, setTriggerRender }) {
    const { i18n, t } = useTranslation();
    const [contractType, setContractType] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingContract, setIsLoadingContract] = useState(false);
    const [isLoadingSign, setIsLoadingSign] = useState(false);
    const [openContractGenerateSnackbar, setOpenContractGenerateSnackbar] = useState(false);
    const [contractEnvelope, setContractEnvelope] = useState(null);
    const [buyerSignStatus, setBuyerSignStatus] = useState(null);
    const [sailStatus, setSailStatus] = useState(null);

    const [isLoadingDelete, setIsLoadingDelete] = useState(false);


    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [documentToDelete, setDocumentToDelete] = useState(null);
    const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);


    const handleOpenConfirmationDialog = (documentId) => {
        setDocumentToDelete(documentId);
        setOpenDeleteDialog(true);
    };
    const handleCloseDeleteDialog = () => {
        setDocumentToDelete(null);
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = () => {
        if (documentToDelete) {
            handleDelete(documentToDelete);
            handleCloseDeleteDialog();
        }
    };
    const handleCloseDeleteSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenDeleteSnackbar(false);
    };
    const handleDelete = async (sailDocumentId) => {
        setIsLoadingDelete(true);
        fetch(API_ROUTES.deleteContractAgent(sailDocumentId), {
            method: 'DELETE',
        })
            .then(response => {
                if (!response) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response;
            })
            .then(data => {
                console.log('Contract Delete successfully. ', data);
                setOpenDeleteSnackbar(true);
                setIsLoadingDelete(false);
                setTriggerRender(prevState => !prevState);

            })
            .catch(error => {
                console.error('deleteContractAgent API request failed:', error);
            });
    };

    const handleCloseContractSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenContractGenerateSnackbar(false);
    };




    useEffect(() => {
        const sailId = currentChat?.sailId;
        fetch(API_ROUTES.getContractSailRecord(sailId))
            .then((response) => response.json())
            .then((data) => {
                setContractType(data?.ContractType);
                setContractEnvelope(data?.EnvelopeID);
                setSailStatus(data?.SailStatus)
                setIsLoading(false);
                console.log("SailRecord for this sailId ", data);
            })
            .catch((error) => {
                console.error(' getContractSailRecord API request failed:', error);
            });


    }, [currentChat, documents]);

    useEffect(() => {
        const sailId = currentChat?.sailId;
        fetch(API_ROUTES.getContractSignStatus(sailId))
            .then((response) => response.json())
            .then((data) => {
                setBuyerSignStatus(data);
                console.log("Contract Sign Status for this sailId ", data);
            })
            .catch((error) => {
                console.error(' getContractSignStatus API request failed:', error);
            });
    }, [currentChat, documents]);


    const handleGenerateContract = () => {
        setIsLoadingContract(true);

        fetch(API_ROUTES.postGenerateContract(currentChat?.sailId), {
            method: "POST"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then((data) => {
                console.log("Contract generate response of Agent", data);
                setOpenContractGenerateSnackbar(true);
                setContractEnvelope(data?.EnvelopeID);
            })
            .catch((error) => {
                console.error("postGenerateContract API request failed:", error);
            })
            .finally(() => {
                // Enable the button and hide loader after API response
                setIsLoadingContract(false);
                setTriggerRender(prevState => !prevState);
            });

    }

    const handleSignContract = () => {
        setIsLoadingSign(true);
        fetch(API_ROUTES.getAgentSignUrl(currentChat?.sailId))
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then((data) => {
                console.log("Agent sign url is", data);
                window.location.href = data;
                setTriggerRender(prevState => !prevState);
            })
            .catch((error) => {
                console.error("getAgentSignUrl API request failed:", error);
            })
            .finally(() => {
                // setIsLoadingSign(false);
            })

    }

    return (
        <div>
            {isLoading ? (<Loader />)
                : (
                    <div>
                        <Paper style={{ padding: '16px', boxShadow: 'none' }}>
                            <Typography class="doc-head" sx={{ fontWeight: 600 }} >
                                {documentType}
                            </Typography>
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                flexGrow: 1,
                            }}>
                                <Typography class="sail-status-title">{t("sailStatus")} : </Typography>
                                <span
                                    style={{
                                        marginRight: '5px',
                                        marginLeft: '5px',
                                        color:
                                            sailStatus === "2"
                                                ? 'green'
                                                : sailStatus === "3"
                                                    ? 'orange'
                                                    : sailStatus === "4"
                                                        ? 'red'
                                                        : 'black', // Default color if none of the conditions match
                                    }}
                                >
                                    {sailStatus === "2" ? t("inProgress") : sailStatus === "3" ? t("rejected") : sailStatus === "4" ? t("sold") : 'None'}
                                </span>
                            </Box>

                            {(documents[documentType].length == 0) &&
                                (<Typography class="main-reason-doc" >
                                    {t("noContractGenerated")}
                                </Typography>
                                )}
                            {(contractType === null) && (documents[documentType].length == 0) &&
                                (<Typography class="main-reason-doc" >
                                    {t("buyernotSelectedanytypeofContract")}
                                </Typography>
                                )}

                            {(contractType !== null) && (documents[documentType].length == 0) && (
                                <div>
                                    <div>
                                        {contractEnvelope === null && (
                                            <Typography class="main-reason-doc" >
                                                {t("contractTypeSelectedbyBuyer")}
                                            </Typography>)}
                                    </div>
                                    {contractEnvelope === null && (
                                        <Button class="agent-agreement-btn"
                                            onClick={handleGenerateContract}
                                            disabled={isLoadingContract}
                                            startIcon={isLoadingContract ? <CircularProgress size={20} /> : <FeedOutlinedIcon size={20} style={{ marginBottom: '3px' }} />}                                        >
                                            {isLoadingContract ? 'Loading...' : t("generateContract")}
                                        </Button>)
                                    }
                                </div>
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
                                                        <Grid item xs={12} md={7} sx={{ padding: '0 !important' }}>

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
                                                                }}>
                                                                    <Typography class="main-person-name" >{t("sellerVerificationStatus")} </Typography>
                                                                    <Typography class="main-reason-doc" >{t(document?.sellerVerificationStatus)}</Typography>
                                                                    {((document?.sellerVerificationStatus === 'Approved') &&
                                                                        <CheckCircleOutlineIcon style={{ color: '#20CD50' }} />) ||
                                                                        ((document?.sellerVerificationStatus === 'Rejected') &&
                                                                            (<CancelIcon style={{ color: '#FF2E00' }} />)) ||
                                                                        ((document?.sellerVerificationStatus === 'Pending') &&
                                                                            (<WatchLaterIcon style={{ color: '#FF9900' }} />))
                                                                    }
                                                                </Box>
                                                                {(document.sellerVerificationStatus === 'Approved') && (
                                                                    <div>
                                                                        <Box sx={{
                                                                            display: "flex",
                                                                            alignItems: "flex-start",
                                                                            flexGrow: 1,
                                                                            flexDirection: 'column'
                                                                        }}>
                                                                            <Box sx={{
                                                                                display: "flex",
                                                                                alignItems: "flex-start",
                                                                                flexGrow: 1,
                                                                            }}>
                                                                                <Typography class="main-person-name" >{t("buyerSignatureStatus")} </Typography>
                                                                                <Typography class="main-reason-doc" >{t(buyerSignStatus?.buyer)}</Typography>
                                                                                {((buyerSignStatus?.buyer === 'completed') &&
                                                                                    <CheckCircleOutlineIcon style={{ color: '#20CD50' }} />) ||
                                                                                    ((buyerSignStatus?.buyer === 'created') &&
                                                                                        (<CancelIcon style={{ color: '#FF2E00' }} />)) ||
                                                                                    ((buyerSignStatus?.buyer === 'sent') &&
                                                                                        (<WatchLaterIcon style={{ color: '#FF9900' }} />))
                                                                                }
                                                                            </Box>

                                                                            <Box sx={{
                                                                                display: "flex",
                                                                                alignItems: "flex-start",
                                                                                flexGrow: 1,
                                                                            }}>
                                                                                <Typography class="main-person-name" >{t("ownerSignatureStatus")} </Typography>
                                                                                <Typography class="main-reason-doc" >{t(buyerSignStatus?.owner)}</Typography>
                                                                                {((buyerSignStatus?.owner === 'completed') &&
                                                                                    <CheckCircleOutlineIcon style={{ color: '#20CD50' }} />) ||
                                                                                    ((buyerSignStatus?.owner === 'created') &&
                                                                                        (<CancelIcon style={{ color: '#FF2E00' }} />)) ||
                                                                                    ((buyerSignStatus?.owner === 'sent') &&
                                                                                        (<WatchLaterIcon style={{ color: '#FF9900' }} />))
                                                                                }
                                                                            </Box>
                                                                        </Box>
                                                                    </div>
                                                                )}
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={12} md={5} sx={{ padding: '0 !important' }}>


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
                                                                <div class="ver-btns" onClick={() => handleOpenConfirmationDialog(document?.sailDocumentId)}  >
                                                                    {isLoadingDelete ? (
                                                                        <div>
                                                                            <CircularProgress size={20} />
                                                                            <span>{t("deleting...")}</span>
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            <DeleteIcon class="floorDeleteIcon" />
                                                                            <span>{t("delete")}</span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={12} sx={{ paddingLeft: '0 !important' }}>
                                                            {contractType !== null && (
                                                                <div>
                                                                    {document?.sellerVerificationStatus !== 'Approved' ? (
                                                                        <div>
                                                                            {document?.sellerVerificationStatus === 'Pending' ? (
                                                                                <Typography class="main-reason-doc" >
                                                                                    {t("contarctNotYetVerifiedByTheOwner")}
                                                                                </Typography>
                                                                            ) : (<div>
                                                                                <Grid item xs={12} sx={{ paddingTop: "0px !important" }}>
                                                                                    {/* Add condition if there is comment to show this */}
                                                                                    {(document.sellerVerificationStatus === 'Rejected') &&
                                                                                        (<Box sx={{
                                                                                            display: "flex",
                                                                                            alignItems: "flex-start",
                                                                                            flexGrow: 1,
                                                                                            flexDirection: 'row',
                                                                                        }}>
                                                                                            <Typography class="main-person-name" >{t("sellerRejectionReason")}:</Typography>
                                                                                            <Typography class="reject-reason-doc" >{document.SellerRejectionReason}</Typography>

                                                                                        </Box>)}
                                                                                </Grid>
                                                                                <Typography class="main-reason-doc" >
                                                                                    {t("contarctRejectedByTheOwnerPleaseDoTheNecessary")}
                                                                                </Typography>
                                                                            </div>)}

                                                                        </div>
                                                                    ) : (<div>
                                                                        {buyerSignStatus?.buyer !== 'completed' ? (
                                                                            <Typography class="main-reason-doc" >
                                                                                {t("contractSendandBuyernotyetSigned")}
                                                                            </Typography>
                                                                        ) : (
                                                                            <div>

                                                                                {/* {buyerSignStatus.agent !== "completed" && (
                                                                                <Button class="add-btn"
                                                                                    onClick={handleSignContract}
                                                                                    disabled={isLoadingSign}
                                                                                    startIcon={isLoadingSign && <CircularProgress size={20} />}                                        >
                                                                                    {isLoadingSign ? 'Loading...' : 'Sign Contract'}
                
                                                                                </Button>)} */}

                                                                            </div>)}
                                                                    </div>)}


                                                                </div>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Box>
                                        </ListItem>
                                    ))
                                }

                            </List>


                        </Paper>

                        <Snackbars
                            openSnackbar={openContractGenerateSnackbar}
                            handleCloseSnackbar={handleCloseContractSnackbar}
                            type="success"
                            message={t("contractGeneratedSuccessfully")}
                        />
                        <DeleteDialog
                            open={openDeleteDialog}
                            handleClose={handleCloseDeleteDialog}
                            handleConfirm={handleConfirmDelete}
                        />
                        <Snackbars
                            openSnackbar={openDeleteSnackbar}
                            handleCloseSnackbar={handleCloseDeleteSnackbar}
                            type="error"
                            message={t("contractDeletedSuccessfully")}

                        />

                    </div>)
            }
        </div >

    );
}
