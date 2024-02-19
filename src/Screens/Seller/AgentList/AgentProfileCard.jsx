import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import './AgentList.css'
import contactIcon from '../../../icons/contact.png'
import { useTranslation } from "react-i18next";


const AgentProfileCard = ({ agent, handleInitiateChat, isBuyer }) => {
  const [proPic, setProPic] = useState(agent?.ProfilePic)
  const { i18n, t } = useTranslation();


  return (
    <Card className="agent-card" >
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
            marginTop:"5px"
          }}
        />
      </Box>
      <CardContent>
        <Typography className="txt-agent-name-card">
          {agent?.FirstName} {agent?.LastName}
        </Typography>
        <Typography className="txt-agentList-card">
          {t("phone")}: {agent?.PhoneNumber}
        </Typography>
        <Typography className="txt-agentList-card">
          {t("email")}: {agent?.eMail}
        </Typography>
        <Typography className="txt-street">
          {t("property")}: {agent?.property?.name}
        </Typography>
        {!isBuyer && (<Box sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px"
        }}>
          <Button class="initiate-chat-btn" onClick={() => handleInitiateChat(agent)} variant="outlined">
          {t("initiateChat")}
          </Button>
        </Box>)}
      </CardContent>


    </Card>
  );
};

export default AgentProfileCard;
