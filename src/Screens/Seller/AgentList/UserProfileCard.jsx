import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import './AgentList.css'
import contactIcon from '../../../icons/contact.png'
import AgentAssignDialog from '../../../Components/Dialogs/AgentAssignBySeller/AgentAssignDialog';
import { useTranslation } from "react-i18next";


const UserProfileCard = ({ agent, properties, assignProperty }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const { i18n, t } = useTranslation();


  const handleAssignProperty = (agent) => {
    setSelectedAgent(agent)
    setOpenDialog(true);
  };
  const [proPic, setProPic] = useState(agent?.ProfilePic);
  return (
    <div>
      <Card className="agent-card">
        <Box sx={{
          display: "flex",
          justifyContent: "center",
        }}>
          <CardMedia
            component="img"
            height="140"
            image={proPic || contactIcon}
            onError={() => setProPic(contactIcon)}
            alt={agent?.name}
            sx={{
              borderRadius: "25%",
              objectFit: "cover",
              width: "60%",
              height: "50%",
              marginTop: "5px"
            }}
          />
        </Box>
        <CardContent>
          <Typography className="txt-agent-name-card" s>
            {agent?.FirstName} {agent?.LastName}
          </Typography>
          <Typography className="txt-agentList-card">
          {t("phone")}: {agent?.PhoneNumber}
          </Typography>
          <Typography className="txt-agentList-card" >
          {t("email")}: {agent?.eMail}
          </Typography>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px"
          }}>
            <Button class="upld-btn-doc" onClick={() => handleAssignProperty(agent)} >
              {t("assignProperty")}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <AgentAssignDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        agent={agent}
        properties={properties}
        assignProperty={assignProperty}
        selectedAgent={selectedAgent}
      />
    </div>

  );
};

export default UserProfileCard;
