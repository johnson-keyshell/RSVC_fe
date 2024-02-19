import '../Seller/SellerDetailsPage/SellerDetailsPage'
import React from "react";
import Lightbox from "../../Components/LightBox/Lightbox";
import { Box, Button, Grid, Typography } from "@mui/material";
import { API_ROUTES } from '../../Api';
import { useTranslation } from "react-i18next";
import Loader from "../../Components/Loader/Loader";
import { useEffect } from "react";
import TitleAndDetailForBuyerdetails from '../../Elements/TitleAndDetailForBuyerdetails';


function DetailsPage({ handlePrevPage }) {
  const { i18n, t } = useTranslation();
  const [newdata, setnewData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);


  useEffect(() => {
    fetch(API_ROUTES.getPropertyInfo)
      .then((response) => response.json())
      .then((data) => {
        setnewData(data); 
        setIsLoading(false);
        console.log("Details page data is  ", data)
      })
      .catch((error) => {
        console.error('getUserData API request failed:', error);
      });
  }, []);

  const imageLinks = newdata?.images

  return (
    <div>

      {isLoading ? (<Loader />) : (
        <div class="details-page" >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              flexGrow: '1',
            }}
          >

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexGrow: '1'
              }}
            >
              <div class="path">
                <h2 class="inactive" onClick={(e) => handlePrevPage(e)}>
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
                <h2 class="active-menu">{newdata?.propertyName}</h2>
              </div>
              {/* <Box
                sx={{
                  display: 'flex',
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Button class="editBtn">{t("editListing")}</Button>
              </Box> */}
            </Box>
            <div class="lightbox-full">
              <Lightbox images={imageLinks} />
            </div>
            <div class="descriptionBox ">
              <h2>{t("description")}</h2>
              <Typography class="desc-content">
              {newdata?.description}
              </Typography>

            </div>
            <div class="descriptionBox mt-3 p-4">
            <h2>{t("address")}</h2>
                      <div class="row-amenity">
                        <Grid container spacing={3}>
                          <Grid item xs={6} md={3}>
                            <TitleAndDetailForBuyerdetails
                              title={t("addressLine1")}
                              value={newdata?.address?.AddressLine1}
                            />

                          </Grid>
                          <Grid item xs={6} md={3}>
                            <TitleAndDetailForBuyerdetails
                              title={t("addressLine2")}
                              value={newdata?.address?.AddressLine2}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <TitleAndDetailForBuyerdetails
                              title={t("street")}
                              value={newdata?.address?.Area}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <TitleAndDetailForBuyerdetails
                              title={t("city")}
                              value={newdata?.address?.Place}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <TitleAndDetailForBuyerdetails
                              title={t("postcode")}
                              value={newdata?.address?.Pincode}
                            />
                          </Grid>
                          {newdata?.address?.GoogleMapLink && (<Grid item xs={6} md={3}>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                              onClick={() => window.open(newdata?.address?.GoogleMapLink, '_blank')}
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
                              value={newdata?.HouseType}
                            />

                          </Grid>
                          <Grid item xs={6} md={3}>
                            <TitleAndDetailForBuyerdetails
                              title={t("ageOfBuilding")}
                              value={newdata?.AgeOfBuilding}
                            />
                          </Grid>
                          <Grid item xs={6} md={3}>
                            <TitleAndDetailForBuyerdetails
                              title={t("yearOfConstruction")}
                              value={newdata?.YearOfConstructionOrPeriod}
                            />
                          </Grid>
                          {newdata?.additionalFields && Object.entries(newdata?.additionalFields).map(([key, value]) => (
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
        </div>)}
    </div>






  );
}

export default DetailsPage;
