import React from 'react';
import { useState, useEffect } from 'react';
import { API_ROUTES } from '../../../Api';
import {
    Typography,
    Button,
    Divider,
    Tooltip,
    Paper,
    TextField,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import Loader from '../../Loader/Loader';
import UploadPop from '../../Dialogs/UploadPop';
import { isSupportedImage, isSupportedDocument } from "../../openFileSelection";
import SellerDocumentList from './SellerDocumentList';
import Snackbars from '../../Dialogs/Snackbar/Snackbars';
import { t } from 'i18next';
import ContractItem from './ContractItem';
import AddRejectComment from '../../Dialogs/AddRejectComment/AddRejectComment';
import AddAcceptComment from '../../Dialogs/AddAcceptComment/AddAcceptComment';
import queryString from 'query-string';
import ChatIcon from '@mui/icons-material/Chat';
import SailStatusDropDown from './SailStatusDropDown';




const DocumentUploadPage = ({ currentChat }) => {
    const [openAcceptSnackbar, setOpenAcceptSnackbar] = useState(false);
    const [openRejectSnackbar, setOpenRejectSnackbar] = useState(false);
    const [openRejectCommentDialog, setOpenRejectCommentDialog] = useState(false);
    const [openAcceptCommentDialog, setOpenAcceptCommentDialog] = useState(false);
    const [rejectionComment, setRejectionComment] = useState('');


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

    const [documents, setDocuments] = useState([]);
    const [sailDocID, setSailDocID] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [documentType, setDocumentType] = useState(1);
    const [triggerRender, setTriggerRender] = useState(false);
    const [noDocs, setNoDocs] = useState(false);
    const documentTypes = {
        'My Documents': 0,
        'Buyer Info': 1,
        'Contract': 2,
    };


    useEffect(() => {
        console.log("Current Documents for ", currentChat)
        const sailId = currentChat?.sailId;
        fetch(API_ROUTES.getDocumentList(sailId))
            .then((response) => response.json())
            .then((data) => {
                setDocuments(data);
                setIsLoading(false);
                setNoDocs(false);
                console.log("Documents for this account ", data);
            })
            .catch((error) => {
                setNoDocs(true);
                setIsLoading(false);
                console.error(' getDocumentList API request failed:', error);
            });


    }, [triggerRender, currentChat]);


    const handleMyDocumentsUpload = () => {

        var formData = new FormData();
        formData.append('document', selectedFile);
        formData.append('sailId', currentChat.sailId);
        formData.append('documentType', documentTypes[documentType]);
        console.log("Uploading Sail document body", formData)
        if (formData) {
            fetch(API_ROUTES.postUploadSailDocument, {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Sail Document uploaded successfully.', data);
                    setTriggerRender(prevState => !prevState);
                })
                .catch(error => {
                    console.error('postUploadSailDocument API request failed:', error);
                });
        }
        handlePopupClose();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileName = file.name;
        if (file.type.includes('image')) {
            if (!isSupportedImage(fileName)) {
                alert('Unsupported file format. Please upload an image (jpg, jpeg, png, or gif).');
                return;

            }
            else {
                setSelectedFile(file);
                setShowPopup(true);
            }
        }
        else if (!isSupportedDocument(fileName)) {
            alert('Unsupported file format. Please upload a document (doc, docx, pdf, or txt).');
            return;

        }
        else {
            setSelectedFile(file);
            setShowPopup(true);
        }

    }
    const handlePopupClose = () => {
        setShowPopup(false);
        setSelectedFile(null);
    };

    const reject = (sailDocumentId) => {
        setSailDocID(sailDocumentId);
        setOpenRejectCommentDialog(true);
    }
    const onReject = (rejectionComment) => {
        handleReject(sailDocID, rejectionComment);
        setOpenRejectCommentDialog(false);
    };
    const handleReject = async (sailDocumentId, rejectionComment) => {
        console.log("Rejection comment ", rejectionComment);
        const sampleData = {
            reason: rejectionComment
        }
        fetch(API_ROUTES.postRejectSailDocument(sailDocumentId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sampleData),
        })
            .then(response => {
                if (!response) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response;
            })
            .then(data => {
                console.log('Document Reject successfully. ', data);
                setOpenRejectSnackbar(true);
                setOpenAcceptSnackbar(false);
                setTriggerRender(prevState => !prevState);
            })
            .catch(error => {
                console.error('postRejectSailDocument API request failed:', error);
            });
    };

    // const accept = (sailDocumentId) => {
    //     setSailDocID(sailDocumentId);
    //     setOpenAcceptCommentDialog(true);
    // }
    // const onAccept = (acceptComment) => {
    //     handleAccept(sailDocID, acceptComment);
    //     setOpenAcceptCommentDialog(false);
    // };
    const handleAccept = async (sailDocumentId, acceptComment) => {
        console.log("Accept comment ", acceptComment);
        fetch(API_ROUTES.postApproveSailDocument(sailDocumentId), {
            method: 'POST',
        })
            .then(response => {
                if (!response) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response;
            })
            .then(data => {
                console.log('Document Approved successfully. ', data);
                setOpenAcceptSnackbar(true);
                setOpenRejectSnackbar(false);
                setTriggerRender(prevState => !prevState);
            })
            .catch(error => {
                console.error('postApproveSailDocument API request failed:', error);
            });
    };


    const handleInfoClick = () => {
        window.location.href = '/layoutscreen';
    };
    const handleChatClick = () => {
        const queryStringParams = queryString.stringify({ currentChat: JSON.stringify(currentChat) });
        // Append the query string to the URL
        const url = `/seller/chat?${queryStringParams}`;
        window.location.href = url;
    };

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <div class="message-header p-2">
                        <div>
                            <h2>{t("documentUploaded")}</h2>
                            <p>{currentChat?.property.addressLine1}</p>
                            <h3>{currentChat?.property.name}</h3>
                            <div>
                                <div style={{ display: 'flex', alignItems: "baseline" }}>
                                    <p>{t("agent")}:</p>
                                    <h3>{currentChat.agent?.name}</h3>
                                </div>
                                <div style={{ display: 'flex', alignItems: "baseline" }}>
                                    <p>{t("buyer")}:</p>
                                    <h3>{currentChat.buyer?.name}</h3>
                                </div>
                            </div>
                        </div>
                        {currentChat.buyer?.role === 'buyer' && (
                            <div class="mr-2 mt-2">
                                {/* <Button onClick={handleInfoClick}>
                                 <InfoOutlinedIcon sx={{ color: "black" }} />
                                </Button> */}
                                <Tooltip title={t("goToChat")} arrow>
                                    <Button onClick={handleChatClick}>
                                        <ChatIcon sx={{ color: "black" }} />
                                    </Button>
                                </Tooltip>
                                
                            </div>
                        )}


                    </div>
                    <Divider style={{ margin: '16px 0' }} />
                    {noDocs ? (<p>{t("documentsCanBneViewedOnlyAfterAgentAgreementAcceptanceByBuyer")}</p>) : (
                        <div>{Object.keys(documents).slice(0, -1).map((documentTypeKey) => (
                            <div key={documentTypeKey}>
                                <SellerDocumentList
                                    documentType={documentTypeKey}
                                    documents={documents}
                                    setDocumentType={setDocumentType}
                                    handleFileChange={handleFileChange}
                                    handleReject={reject}
                                    handleAccept={handleAccept}
                                />
                                <Divider style={{ margin: '16px 0' }} />

                            </div>

                        ))}
                            <div key="Contract">
                                <ContractItem
                                    documentType="Contract"
                                    documents={documents}
                                    currentChat={currentChat}
                                    handleReject={reject}
                                    handleAccept={handleAccept}
                                    setTriggerRender={setTriggerRender}
                                />
                            </div>
                        </div>
                    )}

                </div>
            )}
            {showPopup && (
                <UploadPop
                    open={showPopup}
                    onClose={handlePopupClose}
                    selectedFile={selectedFile}
                    handleUpload={handleMyDocumentsUpload}
                    handlePopupClose={handlePopupClose}
                />
            )}
            <Snackbars
                openSnackbar={openAcceptSnackbar}
                handleCloseSnackbar={handleCloseAcceptSnackbar}
                type="success"
                message={t("documentApprovedSuccessfully!")}

            />
            <Snackbars
                openSnackbar={openRejectSnackbar}
                handleCloseSnackbar={handleCloseRejectSnackbar}
                type="error"
                message={t("documentRejectedSuccessfully!")}

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
        </div>

    );

};

export default DocumentUploadPage;
