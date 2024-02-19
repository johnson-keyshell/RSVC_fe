import "./SellerDetailsPage.css";
import React from "react";
import { FULL_WIDTH_IMAGE, LIGHTBOX_IMAGES } from "../../../config/urls";
import Lightbox from "../../../Components/LightBox/Lightbox";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Header from "../../../Components/Header/Header";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { API_ROUTES } from "../../../Api";
import Loader from "../../../Components/Loader/Loader";
import LeftNavOwner from "../../../Components/LeftNav/LeftNavOwner/LeftNavOwner";
import TitleAndDetailForBuyerdetails from "../../../Elements/TitleAndDetailForBuyerdetails";

function DetailsPage({ nextStepCallback, formData, setFormData }) {
  const { i18n, t } = useTranslation();

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState({});
  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      await axios.get(API_ROUTES.getPropertyDetails + `/${id}`).then((resp) => {
        if (resp) {
          setProperty(resp?.data);
          setLoading(false);
        }
      });
    };
    fetchProperty();
  }, []);

  // const handleEditListing = () => {
  //   // Navigate to the "AddNewListing" step
  //   window.location.href = "/seller";
  // };

  const handleEditListing = () => {
    // Navigate to the "AddNewListing" step with a query parameter
    window.location.href = `/sellers?step=AddNewListing&propertyId=${id}`;
  };

  const handleClickOnQuick = () => {
    window.location.href = "/sellers";
  };
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="container-fluid p-4">
        {loading ? (
          <Loader />
        ) : (
          <>
            {console.log("PROPERTY=============", property)}
            <Tabs className="vertical-tabs">
              <TabList className="hidden-tab-list">
                <Tab className="hidden-tab-list"></Tab>
              </TabList>
              <LeftNavOwner />
              <TabPanel>
                <div class="details-page">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      flexGrow: "1",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexGrow: "1",
                      }}
                    >
                      <div class="path">
                        <h2 class="inactive" onClick={handleClickOnQuick}>
                          {t("quickInfo")}
                        </h2>
                        <h2>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="6"
                            height="12"
                            viewBox="0 0 6 12"
                            fill="none"
                          >
                            <path
                              d="M1 11L4 6L1 1"
                              stroke="#8B8B8B"
                              strokeWidth={2} // Use 'strokeWidth' instead of 'strokeWidth'
                              strokeLinecap="round" // Use 'strokeLinecap' instead of 'strokeLinecap'
                            />
                          </svg>
                        </h2>
                        <h2 class="active-menu">
                          {/* Maddison square Terrace garden */}
                          {property?.propertyName}
                        </h2>
                      </div>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                        }}
                      >
                        <Button class="editBtn" onClick={handleEditListing}>
                          {t("editListing")}
                        </Button>
                      </Box>
                    </Box>
                    <div class="lightbox-full">
                      {/* <img src={FULL_WIDTH_IMAGE} class="w-100" /> */}
                      <Lightbox images={property?.images} />
                    </div>
                    <div class="descriptionBox ">
                      <h2>{t("description")}</h2>
                      <Typography class="desc-content">
                        {property?.description}
                      </Typography>
                    </div>
                    <div class="descriptionBox mt-3 p-4">
                      <h2>{t("address")}</h2>
                      <div class="row-amenity">
                        <Grid container spacing={3}>
                          <Grid item xs={6} md={3}>
                            <TitleAndDetailForBuyerdetails
                              title={t("addressLine1")}
                              value={property?.address?.AddressLine1}
                            />

                          </Grid>
                          <Grid item xs={6} md={3}>
                            <TitleAndDetailForBuyerdetails
                              title={t("addressLine2")}
                              value={property?.address?.AddressLine2}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <TitleAndDetailForBuyerdetails
                              title={t("street")}
                              value={property?.address?.Area}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <TitleAndDetailForBuyerdetails
                              title={t("city")}
                              value={property?.address?.Place}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <TitleAndDetailForBuyerdetails
                              title={t("postcode")}
                              value={property?.address?.Pincode}
                            />
                          </Grid>
                          {property?.address?.GoogleMapLink && (<Grid item xs={6} md={3}>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                              onClick={() => window.open(property?.address?.GoogleMapLink, '_blank')}
                            >
                              <Typography class='amenity-type'>{t("googleMapLink")}</Typography>
                              <Typography class='buyerDetailsGoogleMapLink'
                                sx={{
                                  cursor: 'pointer',
                                  textDecoration: 'underline',
                                }}
                              > {t("showLocation")}</Typography>
                            </Box>
                          </Grid>
                          )}

                        </Grid>
                      </div>
                    </div>
                    <div class="descriptionBox mt-3 p-4">

                      <div class="row-amenity">
                        <Grid container spacing={3}>
                          <Grid item xs={6} md={3}>
                            <TitleAndDetailForBuyerdetails
                              title={t("houseType")}
                              value={property?.HouseType}
                            />

                          </Grid>
                          <Grid item xs={6} md={3}>
                            <TitleAndDetailForBuyerdetails
                              title={t("ageOfBuilding")}
                              value={property?.AgeOfBuilding}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <TitleAndDetailForBuyerdetails
                              title={t("yearOfConstruction")}
                              value={property?.YearOfConstructionOrPeriod}
                            />
                          </Grid>
                          {property?.additionalFields && Object.entries(property?.additionalFields).map(([key, value]) => (
                            <Grid item xs={6} md={3}>
                              <TitleAndDetailForBuyerdetails
                                title={t(key)}
                                value={value}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </div>
                    </div>
                    {/* <div class="hidden"></div> */}
                  </Box>
                </div>
              </TabPanel>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailsPage;
