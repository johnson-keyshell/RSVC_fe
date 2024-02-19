import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

const CustomFileInput = ({ onFileChange }) => {
  const { i18n, t } = useTranslation();
  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    onFileChange(selectedFile);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <label
        htmlFor="fileInput"
        onClick={triggerFileInput}
        className="uploadBtn"
      >
        <p style={{ top: "6px", position: "relative" ,color:"white"}}>{t("upload")}</p>
      </label>
      <input
        type="file"
        id="fileInput"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default CustomFileInput;
