import React from "react";
import Header from "../../../Components/Header/Header";
import mainImage from "../../../Images/main.jpg";
import "./AgentLandingPage.css";
import { Typography, Box, Button } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function AgentLandingPage() {
  const { i18n, t } = useTranslation();
  const main =
    "https://www.99acres.com/microsite/articles/files/2023/08/image-2-7.jpg";

  const handleViewClick = () => {
    window.location.href = "/propertylistings";
  };
  return (
    <div>
      <Header />
      <div className="image-container-buyer">
        <div class="mainImageContainer">
          <img src={mainImage} alt="Your Image" class="main-image-build" />
        </div>
        <div className="overlay-component-buyer">
          <div class="heading-buildname">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                flexGrow: 1,
                width: "30%",
                justifyContent: "center",
              }}
            >
              <Typography
                class="building-name-buyer-land"
                sx={{ fontWeight: "600" }}
              >
                RSVC Overleg Hofmanweg 1 Haarlem
              </Typography>
              <Typography
                class="building-name-tagline-land"
                sx={{ fontWeight: "600" }}
              >
                Tagline comes here
              </Typography>
              <Button class="chat-btn-from-layout" onClick={handleViewClick}>
                {t("viewDetails")}
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentLandingPage;
