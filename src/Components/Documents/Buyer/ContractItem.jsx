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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { useTranslation } from "react-i18next";
import Loader from '../../Loader/Loader';
import ContractTypeSelect from '../../Dialogs/ContractTypeSelect/ContractTypeSelect';
import Snackbars from '../../Dialogs/Snackbar/Snackbars';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CircularProgress from '@mui/material/CircularProgress';

export default function ContractItem({ documentType, documents, currentChat }) {
    const { i18n, t } = useTranslation();
    const [sailStatus, setSailStatus] = useState(null);
    const [triggerRender, setTriggerRender] = useState(false);
    const [contractType, setContractType] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSign, setIsLoadingSign] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedContractType, setSelectedContractType] = useState('0');
    const [openContractTypeSnackbar, setOpenContractTypeSnackbar] = useState(false);
    const [contractEnvelope, setContractEnvelope] = useState(null);
    const [buyerSignStatus, setBuyerSignStatus] = useState(null);
    const [document, setDocument] = useState(documents[documentType][0])



    const handleCloseContractSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenContractTypeSnackbar(false);
    };
    useEffect(() => {
        const sailId = currentChat?.sailId;
        fetch(API_ROUTES.getContractSailRecord(sailId))
            .then((response) => response.json())
            .then((data) => {
                setContractType(data?.ContractType);
                setContractEnvelope(data?.EnvelopeID);
                setSailStatus(data?.SailStatus)
                setDocument(documents[documentType][0]);
                setIsLoading(false)
                console.log("SailRecord for this sailId ", data);
            })
            .catch((error) => {
                console.error(' getContractSailRecord API request failed:', error);
            });


    }, [currentChat]);

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
    }, [triggerRender])




    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleContractTypeChange = (event) => {
        setSelectedContractType(event);
    };

    const handleSubmit = () => {
        let sampleSailContract = {
            sailId: currentChat?.sailId,
            contractType: selectedContractType
        }
        fetch(API_ROUTES.postSelectContractType, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sampleSailContract),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Response of data for setting contract type", data);
                setContractType(selectedContractType);
                handleClose();
                setOpenContractTypeSnackbar(true);
            })
            .catch((error) => {
                console.error('postSelectContractType API request failed:', error);
            });

    };

    const handleSignContract = () => {
        setIsLoadingSign(true);
        fetch(API_ROUTES.getBuyerSignUrl(currentChat?.sailId))
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then((data) => {
                console.log("Buyer sign url is", data);
                window.location.href = data;
                setTriggerRender(prevState => !prevState);
            })
            .catch((error) => {
                console.error("getBuyerSignUrl API request failed:", error);
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
                                <Typography class="sail-status-title">{t("sailStatus")}: </Typography>
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
                            <List>
                                {
                                    documents[documentType]?.map((document) => (
                                        <ListItem key={document.sailDocumentId}>
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
                                                                flexDirection: 'row',
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
                                                        </Box>
                                                    </Grid>

                                                </Grid>
                                            </div>
                                        </ListItem>
                                    ))

                                }

                            </List>
                            <Grid container spacing={2} sx={{ alignItems: "center" }}>

                                <Grid item xs={12} sx={{ paddingLeft: '0 !important' }}>
                                    {console.log("Contract and envelope", contractType, contractEnvelope)}
                                    {contractType === null ? (
                                        <div>
                                            <Button class="upld-btn-doc"
                                                onClick={handleOpen}
                                                sx={{ minWidth: "fit-content" }}
                                            >
                                                {t("selectContractType")}
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            {(contractEnvelope === null && (document?.length === 0 || document === undefined)) ? (
                                                <Typography class="main-reason-doc" >
                                                    {t("contractTypeSelectedbyBuyerandAgentdontSendanyAgreement")}
                                                </Typography>
                                            ) : (
                                                <div>
                                                    {document?.sellerVerificationStatus !== 'Approved' ? (
                                                        <div>
                                                            {document?.sellerVerificationStatus === 'Pending' ? (
                                                                <Typography class="main-reason-doc" >
                                                                    {t("OwnerNotVerifiedTheContractYet")}
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
                                                                    {t("ownerRejectedTheContractPleaseContactAgentForNewContract")}
                                                                </Typography>
                                                            </div>)}

                                                        </div>

                                                    ) : (<div>
                                                        {buyerSignStatus?.buyer !== "completed" && (
                                                            <div>
                                                                <Typography class="main-reason-doc" >
                                                                    {t("pleaseSignTheContract,OnlyAfterYourSignatureOwnerWillSign.")}
                                                                </Typography>
                                                                <Button class="add-btn"
                                                                    onClick={handleSignContract}
                                                                    disabled={isLoadingSign}
                                                                    startIcon={isLoadingSign && <CircularProgress size={20} />}                                        >
                                                                    {isLoadingSign ? 'Loading...' : 'Sign Contract'}

                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>)}


                                                </div>
                                            )}
                                        </div>

                                    )}
                                </Grid>
                            </Grid>


                        </Paper>
                        <ContractTypeSelect
                            open={open}
                            handleClose={handleClose}
                            selectedContractType={selectedContractType}
                            handleContractTypeChange={handleContractTypeChange}
                            handleSubmit={handleSubmit}
                        />
                        <Snackbars
                            openSnackbar={openContractTypeSnackbar}
                            handleCloseSnackbar={handleCloseContractSnackbar}
                            type="success"
                            message={t("contractTypeSelectedSuccessfully")}
                        />
                    </div>)
            }
        </div>

    );
}
