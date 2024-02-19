import React from 'react';
import queryString from 'query-string';
import { useState, useEffect } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { API_ROUTES } from '../../../Api';
import {
    Typography,
    Button,
    Tooltip,
    Divider,
    Paper,
    TextField,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import Loader from '../../Loader/Loader';
import UploadPop from '../../Dialogs/UploadPop';
import { isSupportedImage, isSupportedDocument } from "../../openFileSelection";
import DocumentList from './DocumentList';
import { useHistory } from 'react-router-dom';
import Snackbars from '../../Dialogs/Snackbar/Snackbars';
import { useTranslation } from "react-i18next";
import ContractItem from './ContractItem';



const DocumentUploadPage = ({ currentChat }) => {
    const [openUploadSnackbar, setOpenUploadSnackbar] = useState(false);
    const [openFailUploadSnackbar, setOpenFailUploadSnackbar] = useState(false);
    const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
    const { i18n, t } = useTranslation();
    const handleCloseUploadSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenUploadSnackbar(false);
    };

    const handleCloseDeleteSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenDeleteSnackbar(false);
    };
    const handleCloseFailUploadSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenFailUploadSnackbar(false);
    };

    const [documents, setDocuments] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [documentType, setDocumentType] = useState(null);
    const [triggerRender, setTriggerRender] = useState(false);
    const documentTypes = {
        'My Documents': 0,
        'Buyer Info': 1,
        'Contract': 2,
    };
    const handleInfoClick = () => {
        window.location.href = '/layoutscreen';
    };
    const handleChatClick = () => {
        const queryStringParams = queryString.stringify({ currentChat: JSON.stringify(currentChat) });
        // Append the query string to the URL
        const url = `/buyer/chat?${queryStringParams}`;
        window.location.href = url;
    };

    useEffect(() => {
        console.log("Current Documents for ", currentChat)
        const sailId = currentChat?.sailId;
        fetch(API_ROUTES.getDocumentList(sailId))
            .then((response) => response.json())
            .then((data) => {
                setDocuments(data);
                setIsLoading(false)
                console.log("Documents for this account ", data);
            })
            .catch((error) => {
                console.error(' getDocumentList API request failed:', error);
            });


    }, [triggerRender, currentChat]);


    const handleMyDocumentsUpload = () => {

        var formData = new FormData();
        formData.append('document', selectedFile);
        formData.append('sailId', currentChat.sailId);
        formData.append('documentType', documentTypes[documentType]);
        console.log(documentTypes[documentType]);
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
                    setOpenUploadSnackbar(true);
                    setOpenDeleteSnackbar(false);
                    setTriggerRender(prevState => !prevState);
                })
                .catch(error => {
                    setOpenFailUploadSnackbar(true);
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

    const handleDelete = async (sailDocumentId) => {
        fetch(API_ROUTES.deleteSailDocument(sailDocumentId), {
            method: 'DELETE',
        })
            .then(response => {
                if (!response) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response;
            })
            .then(data => {
                console.log('Document Delete successfully. ', data);
                setOpenDeleteSnackbar(true);
                setOpenUploadSnackbar(false);
                setTriggerRender(prevState => !prevState);
            })
            .catch(error => {
                console.error('deleteSailDocument API request failed:', error);
            });
    };



    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <div class="message-header p-2">
                        <div>
                            <h2>{t("documentUpload")}</h2>
                            <p>{currentChat?.property.addressLine1}</p>
                            <h3>{currentChat?.property.name}</h3>
                            <h3>{currentChat?.partner.name}</h3>
                        </div>
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

                    </div>

                    {Object.keys(documents).slice(0, -1).map((documentTypeKey) => (
                        <div key={documentTypeKey}>
                            <Divider style={{ margin: '16px 0' }} />
                            <DocumentList
                                documentType={documentTypeKey}
                                documents={documents}
                                setDocumentType={setDocumentType}
                                handleFileChange={handleFileChange}
                                handleDelete={handleDelete}
                            />
                        </div>
                    ))}
                    <div key="Contract">
                        <Divider style={{ margin: '16px 0' }} />
                        <ContractItem
                            documentType="Contract"
                            documents={documents}
                            currentChat={currentChat}
                        />
                    </div>

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
                openSnackbar={openUploadSnackbar}
                handleCloseSnackbar={handleCloseUploadSnackbar}
                type="success"
                message={t("documentUploadedSuccessfully!")}

            />
            <Snackbars
                openSnackbar={openDeleteSnackbar}
                handleCloseSnackbar={handleCloseDeleteSnackbar}
                type="error"
                message={t("documentDeletedSuccessfully!")}

            />
            <Snackbars
                openSnackbar={openFailUploadSnackbar}
                handleCloseSnackbar={handleCloseFailUploadSnackbar}
                type="warning"
                message={t("documentUploadFailedCheckIfYouHaveAcceptedAgentAgreement")}


            />
        </div>

    );

};

export default DocumentUploadPage;
