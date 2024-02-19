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
import CancelIcon from '@mui/icons-material/Cancel';
import { DeleteIcon } from "@chakra-ui/icons";
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
import AddRejectComment from '../../Dialogs/AddRejectComment/AddRejectComment';
import AddAcceptComment from '../../Dialogs/AddAcceptComment/AddAcceptComment';
import DeleteDialog from '../../Dialogs/DeleteDialog/DeleteDialog';
import SailStatusDropDown from './SailStatusDropDown';




export default function ContractItem({ documentType, documents, currentChat, setTriggerRender }) {
    const { i18n, t } = useTranslation();
    const [contractType, setContractType] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingContract, setIsLoadingContract] = useState(false);
    const [isLoadingSign, setIsLoadingSign] = useState(false);
    const [openContractGenerateSnackbar, setOpenContractGenerateSnackbar] = useState(false);
    const [contractEnvelope, setContractEnvelope] = useState(null);
    const [buyerSignStatus, setBuyerSignStatus] = useState(null);
    const [sailDocID, setSailDocID] = useState(null);
    const [sailID, setSailID] = useState(null);
    const [sailData,setSailData]=useState(null)
    const [openRejectCommentDialog, setOpenRejectCommentDialog] = useState(false);
    const [openAcceptCommentDialog, setOpenAcceptCommentDialog] = useState(false);
    const [openAcceptSnackbar, setOpenAcceptSnackbar] = useState(false);
    const [openRejectSnackbar, setOpenRejectSnackbar] = useState(false);

    const [isLoadingAccept, setIsLoadingAccept] = useState(false);
    const [isLoadingReject, setIsLoadingReject] = useState(false);
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
        fetch(API_ROUTES.deleteContractOwner(sailDocumentId), {
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
                console.error('deleteContractOwner API request failed:', error);
            });
    };

    const handleCloseAcceptSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAcceptSnackbar(false);
    };

    const handleCloseRejectSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenRejectSnackbar(false);
    };


    const handleCloseContractSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenContractGenerateSnackbar(false);
    };

    const reject = (sailDocumentId, sailID) => {
        setSailDocID(sailDocumentId);
        setSailID(sailID);
        setOpenRejectCommentDialog(true);
    }
    const onReject = (rejectionComment) => {
        handleReject(sailDocID, rejectionComment);
        setOpenRejectCommentDialog(false);
    };
    const handleReject = async (sailDocumentId, rejectionComment) => {
        setIsLoadingReject(true);
        console.log("Rejection comment ", rejectionComment);
        const rejectionData = {
            sailDocumentId: sailDocumentId,
            sailId: sailID,
            reason: rejectionComment
        }
        console.log("rejection data", rejectionData);
        fetch(API_ROUTES.postRejectContarct, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rejectionData),
        })
            .then(response => response)
            .then((data) => {
                console.log('Document Reject successfully. ', data);
                setOpenRejectSnackbar(true);
                setOpenAcceptSnackbar(false);
                setIsLoadingReject(false);
                setTriggerRender(prevState => !prevState);
            })
            .catch(error => {
                console.error('postrejectContarct API request failed:', error);
            });
    };

    const accept = (sailDocumentId, sailID) => {
        setSailDocID(sailDocumentId);
        setSailID(sailID);
        setOpenAcceptCommentDialog(true);
    }
    const onAccept = (acceptComment) => {
        handleAccept(sailDocID, acceptComment);
        setOpenAcceptCommentDialog(false);
    };
    const handleAccept = async (sailDocumentId, acceptComment) => {
        setIsLoadingAccept(true);
        fetch(API_ROUTES.postApproveContarct(sailID), {
            method: 'POST',
        })
            .then(response => {
                if (!response) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response;
            })
            .then(data => {
                console.log('Contract Approved successfully. ', data);
                setOpenAcceptSnackbar(true);
                setTriggerRender(prevState => !prevState);
                setIsLoadingAccept(false);
            })
            .catch(error => {
                console.error('postApproveContarct API request failed:', error);
            })

    };





    useEffect(() => {
        const sailId = currentChat?.sailId;
        fetch(API_ROUTES.getContractSailRecord(sailId))
            .then((response) => response.json())
            .then((data) => {
                setSailData(data);
                setContractType(data?.ContractType);
                setContractEnvelope(data?.EnvelopeID);
                setSailID(data.SailID)
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

        fetch(API_ROUTES.postGenerateContractSeller(currentChat?.sailId), {
            method: "POST"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then((data) => {
                console.log("Contract generate response of Seller", data);
                setOpenContractGenerateSnackbar(true);
                setContractEnvelope(data?.EnvelopeID);

            })
            .catch((error) => {
                console.error("postGenerateContractSeller API request failed:", error);
            })
            .finally(() => {
                // Enable the button and hide loader after API response
                setIsLoadingContract(false);
                setTriggerRender(prevState => !prevState);
            });

    }

    const handleSignContract = () => {
        setIsLoadingSign(true);
        fetch(API_ROUTES.getOwnerSignUrl(currentChat?.sailId))
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then((data) => {
                console.log("Owner sign url is", data);
                window.location.href = data;
                setTriggerRender(prevState => !prevState);
            })
            .catch((error) => {
                console.error("getOwnerSignUrl API request failed:", error);
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
                            <SailStatusDropDown
                                sailData={sailData } />

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
                                                        <Grid item xs={12} md={12} sx={{ padding: '0 !important' }}>

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
                                                        <Grid item xs={12} md={12} sx={{ padding: '0 !important' }}>

                                                            <Box sx={{
                                                                display: "flex",
                                                                alignItems: "flex-start",
                                                                flexGrow: 1,
                                                                justifyContent: 'space-around'
                                                            }}>
                                                                <Link className="link-style" to={document.link} target="_blank">
                                                                    <VisibilityIcon className="visibilityIcon" />
                                                                    <span>{t("view")}</span>
                                                                </Link>
                                                                {/* {(document.sellerVerificationStatus === 'Rejected') && (<div class="ver-btns" onClick={() => accept(document?.sailDocumentId, sailID)} >
                                                                    <TaskAltIcon style={{ color: '#20CD50' }} />
                                                                    <span>{t("accept")}</span>
                                                                </div>)} */}
                                                                {(document.sellerVerificationStatus === 'Approved') && (<div class="ver-btns" onClick={() => reject(document?.sailDocumentId, sailID)}>
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


                                                                        <div class="ver-btns" onClick={() => handleAccept(document?.sailDocumentId, sailID)} >
                                                                            {isLoadingAccept ? (
                                                                                <div>
                                                                                    <CircularProgress size={20} />
                                                                                    <span>{t("approving...")}</span>
                                                                                </div>
                                                                            ) : (
                                                                                <>
                                                                                    <TaskAltIcon style={{ color: '#20CD50' }} />
                                                                                    <span>{t("approve")}</span>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                        <div class="ver-btns" onClick={() => reject(document?.sailDocumentId, sailID)}>
                                                                            {isLoadingReject ? (
                                                                                <div>
                                                                                    <CircularProgress size={20} />
                                                                                    <span>{t("rejecting...")}</span>
                                                                                </div>
                                                                            ) : (
                                                                                <>
                                                                                    <CancelIcon style={{ color: '#FF2E00' }} />
                                                                                    <span>{t("reject")}</span>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </Box>)}
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
                                                                                    {t("pleaseApproveTheContractGeneratedByAgentSoThatBuyerCanSignIt.")}
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
                                                                                    {t("deleteTheExistingContractAndGenerateOneOrTellAgentToGenerateOne")}
                                                                                </Typography>
                                                                            </div>
                                                                            )
                                                                            }

                                                                        </div>


                                                                    ) : (<div>
                                                                        {buyerSignStatus?.buyer !== 'completed' ? (
                                                                            <Typography class="main-reason-doc" >
                                                                                {t("contractSendandBuyernotyetSigned")}
                                                                            </Typography>
                                                                        ) : (
                                                                            <div>

                                                                                {buyerSignStatus.owner !== "completed" && (
                                                                                    <Button class="add-btn"
                                                                                        onClick={handleSignContract}
                                                                                        disabled={isLoadingSign}
                                                                                        startIcon={isLoadingSign && <CircularProgress size={20} />}                                        >
                                                                                        {isLoadingSign ? 'Loading...' : 'Sign Contract'}

                                                                                    </Button>)}

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
                            message={t("contractGeneratedSuccessfully")} />
                        <Snackbars
                            openSnackbar={openAcceptSnackbar}
                            handleCloseSnackbar={handleCloseAcceptSnackbar}
                            type="success"
                            message={t("ContractAcceptedSuccessfully!")}

                        />
                        <Snackbars
                            openSnackbar={openRejectSnackbar}
                            handleCloseSnackbar={handleCloseRejectSnackbar}
                            type="error"
                            message={t("contractRejectedSuccessfully!")}

                        />
                        <AddRejectComment
                            open={openRejectCommentDialog}
                            onClose={() => setOpenRejectCommentDialog(false)}
                            onReject={onReject}
                        />
                        {/* <AddAcceptComment
                            open={openAcceptCommentDialog}
                            onClose={() => setOpenAcceptCommentDialog(false)}
                            onAccept={onAccept}
                        /> */}
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
        </div>

    );
}
