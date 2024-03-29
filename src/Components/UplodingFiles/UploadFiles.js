import React from 'react';
import './UploadFiles.css';
import { Typography } from '@mui/material';
import { CCloseButton } from '@coreui/react'
import { useTranslation } from "react-i18next";

export default function Uploads() {
    const { i18n, t } = useTranslation();
    return (
        <div className="rect-box">
            <div className='row' style={{ right: "-5px", display: 'flex', justifyContent: 'space-between' }}>
                <p className='title'>
                    {t("uploadFile")}
                </p>
                <svg className='mt-4' style={{ left: "-30px", position: 'relative', color: '#6B6B6B' }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M13.6899 0.320713C13.5917 0.222272 13.475 0.144172 13.3465 0.090885C13.2181 0.0375978 13.0803 0.010169 12.9413 0.010169C12.8022 0.010169 12.6645 0.0375978 12.536 0.090885C12.4076 0.144172 12.2909 0.222272 12.1926 0.320713L7 5.50274L1.80736 0.310093C1.70905 0.211782 1.59233 0.133796 1.46388 0.0805904C1.33543 0.0273845 1.19776 1.03588e-09 1.05873 0C0.919692 -1.03588e-09 0.78202 0.0273845 0.653569 0.0805904C0.525118 0.133796 0.408405 0.211782 0.310093 0.310093C0.211782 0.408405 0.133796 0.525118 0.0805904 0.653569C0.0273845 0.78202 -1.03588e-09 0.919692 0 1.05873C1.03588e-09 1.19776 0.0273845 1.33543 0.0805904 1.46388C0.133796 1.59233 0.211782 1.70905 0.310093 1.80736L5.50274 7L0.310093 12.1926C0.211782 12.291 0.133796 12.4077 0.0805904 12.5361C0.0273845 12.6646 0 12.8022 0 12.9413C0 13.0803 0.0273845 13.218 0.0805904 13.3464C0.133796 13.4749 0.211782 13.5916 0.310093 13.6899C0.408405 13.7882 0.525118 13.8662 0.653569 13.9194C0.78202 13.9726 0.919692 14 1.05873 14C1.19776 14 1.33543 13.9726 1.46388 13.9194C1.59233 13.8662 1.70905 13.7882 1.80736 13.6899L7 8.49726L12.1926 13.6899C12.291 13.7882 12.4077 13.8662 12.5361 13.9194C12.6646 13.9726 12.8022 14 12.9413 14C13.0803 14 13.218 13.9726 13.3464 13.9194C13.4749 13.8662 13.5916 13.7882 13.6899 13.6899C13.7882 13.5916 13.8662 13.4749 13.9194 13.3464C13.9726 13.218 14 13.0803 14 12.9413C14 12.8022 13.9726 12.6646 13.9194 12.5361C13.8662 12.4077 13.7882 12.291 13.6899 12.1926L8.49726 7L13.6899 1.80736C14.0934 1.40384 14.0934 0.724231 13.6899 0.320713Z" fill="#6B6B6B" />
                </svg>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-3 col-sm-6">
                        <div class="progress blue">
                            <span class="progress-left">
                                <span class="progress-bar"></span>
                            </span>
                            <span class="progress-right">
                                <span class="progress-bar"></span>
                            </span>
                            <div class="progress-value">90%
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='upload'>
                    <Typography variant="body2" component="h1">
                        {t("uploadingFiles")}
                    </Typography>
                </div>
            </div>
        </div>
    );
}