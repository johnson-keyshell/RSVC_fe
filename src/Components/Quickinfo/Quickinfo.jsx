import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Quickinfo.css";
import GridView from "./GridView";
import Tiles from "./Tiles";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { API_ROUTES } from "../../Api";
import Loader from '../Loader/Loader'

export default function Quickinfo({ nextStep, formData, setFormData }) {
  const { i18n, t } = useTranslation();
  const [landingPageDetails, setLandingPageDetails] = useState({});
  const [properties, setProperties] = useState([]);
  const [agentCount, setAgentCount] = useState(0);
  const [sailCount, setSailCount] = useState(0);
  const [prospectiveBuyerCount, setProspectiveBuyerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios.get(API_ROUTES.getSellerLandingPage).then((resp) => {
        if (resp) {
          console.log("Sellerpage data", resp?.data);
          setProperties(resp.data?.properties);
          setAgentCount(resp?.data?.agentCount);
          setSailCount(resp?.data?.sailCount);
          setProspectiveBuyerCount(resp?.data?.prospectiveBuyerCount);
          setLoading(false);
        }
      });
    };
    fetchData();
  }, []);
  return (
    <div>
      {loading ? (<Loader />) : (
        <div class="container-fluid--screen">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 class="active-menu">{t("quickInfo")} </h2>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Button class="nextBtn" onClick={() => {
                localStorage.setItem("propertyId", null);
                nextStep("AddNewListing");
              }}>
                {t("AddNewListing")}
              </Button>
            </Box>
          </Box>
          <div>
            {" "}
            <Tiles
              agentCount={agentCount}
              sailCount={sailCount}
              prospectiveBuyerCount={prospectiveBuyerCount}
            />
          </div>
          <div class="card-listing-section">
            <h2 class="active-menu">{t("listing")}</h2>
            <div class="mt-5">
              {properties.length == 0 ? (
                <>
                  <p>{t("noPropertyFound")}</p>
                </>
              ) : (
                <>
                  <GridView
                    properties={properties}
                    nextStep={nextStep}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
