import React, { useState } from "react";
import { useEffect } from "react";
import Header from "../../Components/Header/Header";
import { LIGHTBOX_IMAGES } from "../../config/urls";
import Lightbox from "../../Components/LightBox/Lightbox";
import "./Buyer.css";
import PropertyDetailsBar from "../../Components/PropertyDetailsBar/PropertyDetailsBar";
import './BuyerDetailsPage.css'
import { Grid, Typography, Box, Button } from "@mui/material";
import { API_ROUTES } from '../../Api';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Loader from "../../Components/Loader/Loader";
import { useTranslation } from "react-i18next";
import Pop from "../../Components/Header/Pop";
import TitleAndDetailForBuyerdetails from "../../Elements/TitleAndDetailForBuyerdetails";
import { priceList } from "../../Constants/BuildingOptions";

function BuyerDetailsPage({
  nextStep
}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(LIGHTBOX_IMAGES[0]);
  const [imageLinks, setImageLinks] = useState(null);
  const [isLogin, setIsLogin] = React.useState(
    localStorage.getItem("isLoggedIn")
      ? localStorage.getItem("isLoggedIn")
      : false);

  const [newdata, setnewData] = React.useState(null);
  // useEffect(() => {
  //   fetch(API_ROUTES.getIsUserLoggedIn)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setIsLogin(data.isLoggedIn);
  //       console.log("IsLoggedIn ", data);
  //     })
  //     .catch((error) => {
  //       console.error(' getIsUserLoggedIn API request failed:', error);
  //     });
  // }, [isLogin]);

  useEffect(() => {
    fetch(API_ROUTES.getPropertyInfo)
      .then((response) => response.json())
      .then((data) => {
        setnewData(data);
        setImageLinks(data?.images);
        setIsLoading(false);
        console.log("Details page data is  ", data)
      })
      .catch((error) => {
        console.error('getUserData API request failed:', error);
      });
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const dialogContent = (
    <div>
      <DialogTitle class="dialog-txt-head">{t("logIn")}</DialogTitle>
      <DialogContent>
        <DialogContentText class="dialog-txt">{t("pleaseLoginToSeeTheLayoutAndSelectLayout")}</DialogContentText>
      </DialogContent>
    </div>
  );

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleViewClick = () => {
    console.log("isLogin value in details", isLogin)

    if (isLogin ==='true') {
      window.location.href = '/layoutscreen';
    }
    else {
      // setDialogOpen(true);
      setIsPopOpen(true);
    }
  };

  const handleClosePop = () => {
    setIsPopOpen(false);
  };
  return (

    <div>
      {isLoading ? (
        <Loader /> // Display the loader while data is loading
      ) : (
        <div>
          <Header />
          {/* <PropertyDetailsBar /> */}
          <main>
            <div className="container-fluid p-2">
              <div class="lightbox-full">
                {/* <img src={FULL_WIDTH_IMAGE} class="w-100" /> */}
                {imageLinks && imageLinks.length > 0 && <Lightbox images={imageLinks} />}
              </div>
              <div className="row" style={{ marginLeft: "0", marginRight: "0" }}>
                <div className="col-md-8">
                  <div class="descriptionBox-buyer p-4">
                    <h2>{t("description")}</h2>
                    <Typography class="desc-content">
                      {newdata?.description}
                      <br />
                      <br />
                    </Typography>

                  </div>
                  <div class="descriptionBox-buyer p-4">

                    {/* <h2>{t("amenities")}</h2>
                    <div class="row-amenity">
                      <Grid container spacing={3}>
                        <Grid item xs={6} md={4}>
                          <Box
                            sx={{
                              display: 'flex',
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                            >
                              <path
                                d="M2.1001 13.6913C2.1001 13.6066 2.1001 13.5637 2.1023 13.5285C2.11963 13.262 2.23332 13.0109 2.42216 12.8221C2.611 12.6332 2.8621 12.5195 3.1286 12.5022C3.1649 12.5 3.2056 12.5 3.2914 12.5H20.7088C20.7935 12.5 20.8353 12.5 20.8716 12.5022C21.1381 12.5195 21.3892 12.6332 21.578 12.8221C21.7669 13.0109 21.8806 13.262 21.8979 13.5285C21.9001 13.5637 21.9001 13.6055 21.9001 13.6913C21.9001 14.1258 21.9001 14.3436 21.8847 14.5878C21.6548 18.2035 18.5814 21.3957 14.9767 21.7598C14.7336 21.7851 14.5917 21.7906 14.3079 21.8016C13.539 21.8319 12.7696 21.8481 12.0001 21.85C11.2851 21.85 10.4997 21.8313 9.6923 21.8016C9.4085 21.7906 9.2666 21.7851 9.0246 21.7609C5.4188 21.3957 2.3454 18.2035 2.1166 14.5878C2.1001 14.3436 2.1001 14.1258 2.1001 13.6913Z"
                                stroke="#4C4C4C"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M5.4 21.3L4.3 23.5L5.4 21.3ZM18.6 21.3L19.7 23.5L18.6 21.3ZM1 12.5H23H1Z"
                                fill="#4C4C4C"
                              />
                              <path
                                d="M5.4 21.3L4.3 23.5M18.6 21.3L19.7 23.5M1 12.5H23"
                                stroke="#4C4C4C"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                              <path
                                d="M1.2749 13.5998C1.2749 13.8186 1.36182 14.0285 1.51654 14.1832C1.67126 14.3379 1.8811 14.4248 2.0999 14.4248C2.31871 14.4248 2.52855 14.3379 2.68327 14.1832C2.83798 14.0285 2.9249 13.8186 2.9249 13.5998H1.2749ZM5.7805 8.916L5.0127 9.2185C5.05332 9.32118 5.11413 9.41466 5.19153 9.4934C5.26893 9.57214 5.36136 9.63454 5.46332 9.6769C5.56528 9.71927 5.67471 9.74074 5.78513 9.74003C5.89554 9.73933 6.00469 9.71647 6.1061 9.6728L5.7805 8.916ZM12.3365 6.09231L12.6632 6.8513C12.8601 6.7665 13.0162 6.60839 13.0986 6.41046C13.1809 6.21253 13.183 5.99033 13.1043 5.7909L12.3365 6.09231ZM2.9249 13.5998V4.12331H1.2749V13.5998H2.9249ZM4.7234 2.3248C5.4593 2.3248 6.1204 2.7725 6.3932 3.4556L7.9255 2.8418C7.66964 2.20196 7.22795 1.65454 6.6574 1.26809C6.08685 0.88165 5.41361 0.675002 4.7245 0.674805L4.7234 2.3248ZM2.9249 4.12331C2.9249 3.13 3.7301 2.3248 4.7234 2.3248L4.7245 0.674805C3.8099 0.674805 2.93166 1.03813 2.28494 1.68485C1.63823 2.33157 1.2749 3.20871 1.2749 4.12331H2.9249ZM6.3932 3.4556L6.8112 4.4984L8.3424 3.8857L7.9255 2.8418L6.3932 3.4556ZM6.5472 8.6135C6.2705 7.90828 6.27601 7.12357 6.5626 6.4223L5.0336 5.8008C4.58729 6.89487 4.58052 8.11878 5.0127 9.2185L6.5472 8.6135ZM12.0109 5.33551L5.4538 8.15811L6.1061 9.6728L12.6621 6.8502L12.0109 5.33551ZM10.1101 4.8746C10.7943 5.1672 11.3036 5.7205 11.5698 6.3948L13.1043 5.7909C12.8945 5.24996 12.5791 4.75511 12.1764 4.33735C11.7738 3.91959 11.292 3.5862 10.7591 3.3566L10.1101 4.8746ZM6.5626 6.4223C6.82062 5.77265 7.3106 5.24301 7.9376 4.934L7.216 3.4512C6.22306 3.93764 5.44555 4.77471 5.0336 5.8008L6.5626 6.4223ZM7.9376 4.934C8.27402 4.76795 8.64243 4.67675 9.01746 4.66668C9.3925 4.65662 9.76526 4.72683 10.1101 4.8746L10.7591 3.3566C10.1966 3.11611 9.58885 3.00105 8.97733 3.01719C8.36582 3.03333 7.765 3.18138 7.216 3.4512L7.9376 4.934Z"
                                fill="#4C4C4C"
                              />
                            </svg>
                            <Typography class='amenity-type-content'>2 {t("bathrooms")}</Typography>
                          </Box>

                        </Grid>



                        <Grid item xs={6} md={4}>
                          <Box
                            sx={{
                              display: 'flex',
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                            >
                              <path
                                d="M1 25H25M9 7.66667H10.3333M9 13H10.3333M9 18.3333H10.3333M15.6667 7.66667H17M15.6667 13H17M15.6667 18.3333H17M3.66667 25V3.66667C3.66667 2.95942 3.94762 2.28115 4.44772 1.78105C4.94781 1.28095 5.62609 1 6.33333 1H19.6667C20.3739 1 21.0522 1.28095 21.5523 1.78105C22.0524 2.28115 22.3333 2.95942 22.3333 3.66667V25"
                                stroke="#4C4C4C"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <Typography class='amenity-type-content'>2 {t("bathrooms")}</Typography>
                          </Box>
                        </Grid>


                        <Grid item xs={6} md={4}>
                          <Box
                            sx={{
                              display: 'flex',
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="18"
                              viewBox="0 0 25 18"
                              fill="none"
                            >
                              <path
                                d="M20.8333 3.76744H10V10.0789H8.84615V7.93355C8.84481 6.71804 8.3636 5.5527 7.50809 4.69319C6.65258 3.83368 5.49264 3.35021 4.28276 3.34884H1.66667V0H0V18H1.66667V15.5018L23.3333 15.676V18H25V7.95349C24.9987 6.84367 24.5594 5.77966 23.7782 4.9949C22.9971 4.21013 21.938 3.7687 20.8333 3.76744ZM1.66667 5.02326H4.28276C5.05075 5.02413 5.78704 5.33102 6.33009 5.87659C6.87314 6.42217 7.17861 7.16188 7.17948 7.93345V10.0788H1.66667V5.02326ZM23.3333 14.0015L1.66667 13.8273V11.7533H23.3333V14.0015ZM23.3333 10.0789H11.6667V5.44186H20.8333C21.4961 5.44262 22.1316 5.70748 22.6003 6.17834C23.0689 6.6492 23.3326 7.2876 23.3333 7.95349V10.0789Z"
                                fill="#4C4C4C"
                              />
                            </svg>
                            <Typography class='amenity-type-content'>2 {t("bathrooms")}</Typography>
                          </Box>
                        </Grid>

                      </Grid>
                    </div>
                    <div class="row-amenity">

                      <Grid container spacing={3}>
                        <Grid item xs={6} md={4}>
                          <Box
                            sx={{
                              display: 'flex',
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="28"
                              height="22"
                              viewBox="0 0 28 22"
                              fill="none"
                            >
                              <path
                                d="M5 10.0909H3C2.46957 10.0909 1.96086 10.2825 1.58579 10.6234C1.21071 10.9644 1 11.4269 1 11.9091V21H7M5 10.0909C5.53043 10.0909 6.03914 10.2825 6.41421 10.6234C6.78929 10.9644 7 11.4269 7 11.9091V21M5 10.0909V6.45455C5 5.00791 5.63214 3.62053 6.75736 2.5976C7.88258 1.57467 9.4087 1 11 1H17C18.5913 1 20.1174 1.57467 21.2426 2.5976C22.3679 3.62053 23 5.00791 23 6.45455V10.0909M7 21H21M23 10.0909H25C25.5304 10.0909 26.0391 10.2825 26.4142 10.6234C26.7893 10.9644 27 11.4269 27 11.9091V21H21M23 10.0909C22.4696 10.0909 21.9609 10.2825 21.5858 10.6234C21.2107 10.9644 21 11.4269 21 11.9091V21M7 13.7273H21"
                                stroke="#4C4C4C"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <Typography class='amenity-type-content'>2 {t("bathrooms")}</Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={6} md={4}>
                          <Box
                            sx={{
                              display: 'flex',
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                            >
                              <path
                                d="M0 3.2C0 2.35131 0.32924 1.53737 0.915291 0.937258C1.50134 0.337142 2.2962 0 3.125 0H15.625C16.4538 0 17.2487 0.337142 17.8347 0.937258C18.4208 1.53737 18.75 2.35131 18.75 3.2V4.6304L23.8359 1.7008C23.9547 1.63243 24.0889 1.59706 24.2252 1.5982C24.3614 1.59935 24.495 1.63697 24.6127 1.70732C24.7304 1.77768 24.828 1.87833 24.896 1.99928C24.9639 2.12022 24.9998 2.25727 25 2.3968V13.6C24.9999 13.7398 24.9641 13.8771 24.8961 13.9982C24.828 14.1194 24.7302 14.2202 24.6123 14.2906C24.4944 14.361 24.3605 14.3986 24.224 14.3995C24.0875 14.4005 23.9532 14.3648 23.8344 14.296L18.75 11.36V12.8C18.75 13.6487 18.4208 14.4626 17.8347 15.0627C17.2487 15.6629 16.4538 16 15.625 16H12.5V17.6C12.5 19.2974 11.8415 20.9252 10.6694 22.1255C9.49732 23.3257 7.9076 24 6.25 24H2.34375C2.13655 24 1.93784 23.9157 1.79132 23.7657C1.64481 23.6157 1.5625 23.4122 1.5625 23.2V20C1.5625 19.7878 1.64481 19.5843 1.79132 19.4343C1.93784 19.2843 2.13655 19.2 2.34375 19.2H5.46875C6.09035 19.2 6.68649 18.9471 7.12603 18.4971C7.56557 18.047 7.8125 17.4365 7.8125 16.8V16H3.125C2.2962 16 1.50134 15.6629 0.915291 15.0627C0.32924 14.4626 0 13.6487 0 12.8V3.2ZM9.375 16V16.8C9.375 17.8609 8.96345 18.8783 8.23089 19.6284C7.49832 20.3786 6.50475 20.8 5.46875 20.8H3.125V22.4H6.25C7.4932 22.4 8.68549 21.8943 9.56456 20.9941C10.4436 20.0939 10.9375 18.873 10.9375 17.6V16H9.375ZM3.125 14.4H15.625C16.0394 14.4 16.4368 14.2314 16.7299 13.9314C17.0229 13.6313 17.1875 13.2243 17.1875 12.8V3.2C17.1875 2.77565 17.0229 2.36869 16.7299 2.06863C16.4368 1.76857 16.0394 1.6 15.625 1.6H3.125C2.7106 1.6 2.31317 1.76857 2.02015 2.06863C1.72712 2.36869 1.5625 2.77565 1.5625 3.2V12.8C1.5625 13.2243 1.72712 13.6313 2.02015 13.9314C2.31317 14.2314 2.7106 14.4 3.125 14.4ZM18.7578 6.464V9.5264L23.4375 12.2304V3.7664L18.7578 6.464Z"
                                fill="#4C4C4C"
                              />
                            </svg>
                            <Typography class='amenity-type-content'>2 {t("bathrooms")}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={4}>
                          <Box
                            sx={{
                              display: 'flex',
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="27"
                              height="19"
                              viewBox="0 0 27 19"
                              fill="none"
                            >
                              <path
                                d="M26.1 7.43478H24.885L21.7597 0.980978C21.6183 0.688984 21.3877 0.440903 21.0957 0.266789C20.8038 0.0926762 20.4631 3.82499e-06 20.115 0H6.885C6.53686 3.82499e-06 6.19619 0.0926762 5.90426 0.266789C5.61233 0.440903 5.38168 0.688984 5.24025 0.980978L2.115 7.43478H0.9C0.661305 7.43478 0.432387 7.52182 0.263604 7.67674C0.0948211 7.83166 0 8.04178 0 8.26087C0 8.47996 0.0948211 8.69008 0.263604 8.845C0.432387 8.99992 0.661305 9.08696 0.9 9.08696H1.8V17.3478C1.8 17.786 1.98964 18.2062 2.32721 18.5161C2.66477 18.8259 3.12261 19 3.6 19H6.3C6.77739 19 7.23523 18.8259 7.57279 18.5161C7.91036 18.2062 8.1 17.786 8.1 17.3478V15.6957H18.9V17.3478C18.9 17.786 19.0896 18.2062 19.4272 18.5161C19.7648 18.8259 20.2226 19 20.7 19H23.4C23.8774 19 24.3352 18.8259 24.6728 18.5161C25.0104 18.2062 25.2 17.786 25.2 17.3478V9.08696H26.1C26.3387 9.08696 26.5676 8.99992 26.7364 8.845C26.9052 8.69008 27 8.47996 27 8.26087C27 8.04178 26.9052 7.83166 26.7364 7.67674C26.5676 7.52182 26.3387 7.43478 26.1 7.43478ZM6.885 1.65217H20.115L22.9151 7.43478H4.08488L6.885 1.65217ZM6.3 17.3478H3.6V15.6957H6.3V17.3478ZM20.7 17.3478V15.6957H23.4V17.3478H20.7ZM23.4 14.0435H3.6V9.08696H23.4V14.0435ZM5.4 11.5652C5.4 11.3461 5.49482 11.136 5.6636 10.9811C5.83239 10.8262 6.06131 10.7391 6.3 10.7391H8.1C8.33869 10.7391 8.56761 10.8262 8.7364 10.9811C8.90518 11.136 9 11.3461 9 11.5652C9 11.7843 8.90518 11.9944 8.7364 12.1493C8.56761 12.3043 8.33869 12.3913 8.1 12.3913H6.3C6.06131 12.3913 5.83239 12.3043 5.6636 12.1493C5.49482 11.9944 5.4 11.7843 5.4 11.5652ZM18 11.5652C18 11.3461 18.0948 11.136 18.2636 10.9811C18.4324 10.8262 18.6613 10.7391 18.9 10.7391H20.7C20.9387 10.7391 21.1676 10.8262 21.3364 10.9811C21.5052 11.136 21.6 11.3461 21.6 11.5652C21.6 11.7843 21.5052 11.9944 21.3364 12.1493C21.1676 12.3043 20.9387 12.3913 20.7 12.3913H18.9C18.6613 12.3913 18.4324 12.3043 18.2636 12.1493C18.0948 11.9944 18 11.7843 18 11.5652Z"
                                fill="#4C4C4C"
                              />
                            </svg>
                            <Typography class='amenity-type-content'>2 {t("bathrooms")}</Typography>
                          </Box>
                        </Grid>

                      </Grid>
                    </div> */}

                    <h2>{t("address")}</h2>
                    <div class="row-amenity">
                      <Grid container spacing={3}>
                        <Grid item xs={6} md={4}>
                          <TitleAndDetailForBuyerdetails
                            title={t("addressLine1")}
                            value={newdata?.address?.AddressLine1}
                          />

                        </Grid>
                        <Grid item xs={6} md={4}>
                          <TitleAndDetailForBuyerdetails
                            title={t("addressLine2")}
                            value={newdata?.address?.AddressLine2}
                          />
                        </Grid>
                        <Grid item xs={6} md={4}>
                          <TitleAndDetailForBuyerdetails
                            title={t("street")}
                            value={newdata?.address?.Area}
                          />
                        </Grid>
                        <Grid item xs={6} md={4}>
                          <TitleAndDetailForBuyerdetails
                            title={t("city")}
                            value={newdata?.address?.Place}
                          />
                        </Grid>
                        <Grid item xs={6} md={4}>
                          <TitleAndDetailForBuyerdetails
                            title={t("postcode")}
                            value={newdata?.address?.Pincode}
                          />
                        </Grid>
                        {newdata?.address?.GoogleMapLink && (<Grid item xs={6} md={4}>
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

                </div>

                <div class="col-md-4">
                  <div class="descriptionBox-buyer p-4">

                    {/* <h2>Property Details</h2> */}
                    <div class="row-amenity">
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                          <Typography class='amenity-type-content-se'>{newdata?.propertyName}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <TitleAndDetailForBuyerdetails
                            title={t("houseType")}
                            value={newdata?.HouseType}
                          />

                        </Grid>
                        <Grid item xs={6} md={6}>
                          <TitleAndDetailForBuyerdetails
                            title={t("ageOfBuilding")}
                            value={newdata?.AgeOfBuilding}
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <TitleAndDetailForBuyerdetails
                            title={t("yearOfConstruction")}
                            value={newdata?.YearOfConstructionOrPeriod}
                          />
                        </Grid>
                        {newdata?.additionalFields && Object.entries(newdata?.additionalFields).map(([key, value]) => (
                          <Grid item xs={6} md={6}>
                            <TitleAndDetailForBuyerdetails
                              title={t(key)}
                              value={priceList.includes(key) ? `€${t(value)}` : `${t(value)}`}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                    <div class="row-amenity">
                      <div >
                        <button
                          class="view-and-select-btn"
                          onClick={handleViewClick}
                        >{t("view&Selectunits")}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden"></div>
            </div>
          </main>
          {/* <Dialog
            open={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            aria-labelledby="login-dialog-title"
            aria-describedby="login-dialog-description"
          >
            {dialogContent}
          </Dialog> */}

          {isPopOpen && <Pop isOpen={isPopOpen} onClose={handleClosePop} />}


        </div>
      )}
    </div>
  );
}

export default BuyerDetailsPage;
