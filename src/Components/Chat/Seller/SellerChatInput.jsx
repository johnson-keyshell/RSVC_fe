import React, { useState, useRef, useEffect } from "react";
import SendIcon from '@mui/icons-material/Send';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import { Box } from "@mui/material";
import { isSupportedImage, isSupportedDocument } from "../../openFileSelection";
import { API_ROUTES } from "../../../Api";
import { useTranslation } from "react-i18next";
import UploadPop from "../../Dialogs/UploadPop";

function SellerChatInput({ handleSendMsg, currentChat }) {
  const [msg, setMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { i18n, t } = useTranslation();
  const inputRef = useRef(null);

  useEffect(() => {
    // Set focus on the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setMsg("");
  }, [currentChat]);

  const sendChat = (event) => {
    event.preventDefault();
    console.log('message-----------', msg ? msg : 'no msg')
    if (msg.length > 0) {
      let message = {
        message: msg,
        messageType: "Text"
      }
      handleSendMsg(message);
      setMsg("");
    }
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

  const handleUpload = () => {
    // Call the respective API based on file type (image or document)
    if (selectedFile.type.includes('image')) {
      var formData = new FormData();
      // Append the file to the FormData object
      formData.append('image', selectedFile);
      formData.append('chatId', currentChat.chatId);
      console.log("Uploading image body", formData)
      if (formData) {
        fetch(API_ROUTES.postUploadChatImage, {
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
            console.log('Image uploaded successfully. Image ID:', data);
            let message = {
              messageType: "image",
              message: data.ImageID,
            }
            handleSendMsg(message);
          })
          .catch(error => {
            console.error('postUploadImage API request failed:', error);
          });
      }

    } else {
      var formData = new FormData();
      formData.append('document', selectedFile);
      formData.append('chatId', currentChat.chatId);
      console.log("Uploading document body", formData)
      if (formData) {
        fetch(API_ROUTES.postUploadDocument, {
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
            console.log('Document uploaded successfully. Document ID:', data);
            let message = {
              messageType: "Document",
              message: data.DocumentID,
              documentName: data.DocumentName

            }
            handleSendMsg(message);
          })
          .catch(error => {
            console.error('postUploadDocument API request failed:', error);
          });
      }



    }
    handlePopupClose();
  };

  return (
    <div className="mt-2 mb-2">
      <form onSubmit={(event) => sendChat(event)}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            height: '50px'
          }}
        >

          <input
            ref={inputRef}
            type="text"
            className="input-box-agent-chat"
            placeholder={t("typeYourMessageHere")}
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />

          <div class="attachment-icon" style={{ flex: '0 0 auto', minWidth: '40px' }}>
            <label htmlFor="fileInput">
              <AttachFileRoundedIcon className="sendbtn-attach-icon" sx={{ width: "40px", height: "auto" }} />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          <button
            class="btn-send-chat"
            onClick={(event) => sendChat(event)}
            sx={{ flex: '0 0 auto', minWidth: '40px' }}
          >
            <SendIcon className="sendBtn-agent-chat" sx={{ width: "40px", height: "auto" }} />
          </button>
        </Box>
      </form>

      {showPopup && (
        <UploadPop
          open={showPopup}
          onClose={handlePopupClose}
          selectedFile={selectedFile}
          handleUpload={handleUpload}
          handlePopupClose={handlePopupClose}
        />
      )}
    </div>
  );
}

export default SellerChatInput;
