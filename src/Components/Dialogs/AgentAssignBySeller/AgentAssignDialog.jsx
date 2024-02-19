import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";


function AgentAssignDialog({ openDialog, setOpenDialog, agent, properties, assignProperty,selectedAgent }) {
    const [selectedProperty, setSelectedProperty] = useState(properties[0].propertyId);
    const { i18n, t } = useTranslation();
    const [agentNum, setAgentNum] = useState("agent1");
    const handleAgentNum = (agent) => {
        setAgentNum(agent);
    }

    const handlePropertySelect = (propertyId) => {
        setSelectedProperty(propertyId);
    };

    const handleAssignButtonClick = () => {
        // Call your API with the selected propertyId
        console.log('Assign property with propertyId:', selectedProperty);
        assignProperty(selectedProperty, selectedAgent, agentNum)
        // Close the dialog
        setOpenDialog(false);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle className="txt-buildname">{t("selectProperty")}</DialogTitle>
            <DialogContent>
                <DialogContentText class="dialog-txt-not">
                    {t("chooseaPropertyToAssignTo")} {agent?.FirstName}.
                </DialogContentText>
                <Select
                    value={selectedProperty}
                    onChange={(e) => handlePropertySelect(e.target.value)}
                    label="Select Property"
                >
                    {properties.map((property) => (
                        <MenuItem key={property.propertyId} value={property.propertyId}>
                            {property.propertyName}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    value={agentNum}
                    onChange={(e) => handleAgentNum(e.target.value)}
                    label="Select Agent"
                >
                    <MenuItem key="agent1" value="agent1">
                        {t("agent1")}
                    </MenuItem>
                    <MenuItem key="agent2" value="agent2">
                        {t("agent2")}
                    </MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button class="btn-cancel" onClick={handleCloseDialog}>{t("cancel")}</Button>
                <Button class="btn-accept" onClick={handleAssignButtonClick} disabled={!selectedProperty}>
                    {t("assign")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AgentAssignDialog