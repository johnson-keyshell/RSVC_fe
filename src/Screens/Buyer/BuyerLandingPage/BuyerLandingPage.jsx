import React from 'react'
import { useEffect } from 'react'
import Header from '../../../Components/Header/Header'
import './BuyerLandingPage.css'
import { Typography, Box, Button } from '@mui/material'
import { API_ROUTES } from '../../../Api';
import Loader from '../../../Components/Loader/Loader';
import { useTranslation } from "react-i18next";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import mainImage from '../../../Images/main.jpg'


function BuyerLandingPage() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [newData, setNewData] = React.useState(null);
    const { i18n, t } = useTranslation();
    const [images, setImages] = React.useState([]);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);


    useEffect(() => {
        fetch(API_ROUTES.getNonPrivLandingPage)
            .then((response) => response.json())
            .then((data) => {
                setNewData(data);
                setImages(data.images)
                setIsLoading(false)
                console.log("data is ", data);
            })
            .catch((error) => {
                console.error('API request failed:', error);
            });
    }, []);


    useEffect(() => {
        if (!images) {
            return
        }
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images?.length);
        }, 3000);

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount

    }, [currentImageIndex, images]);


    const handleViewClick = () => {
        window.location.href = '/buyerdetailspage';
    };

    const handleDotClick = (index) => {
        setCurrentImageIndex(index);
    };

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    return (

        <div>
            {isLoading ? (
                <Loader /> // Display the loader while data is loading
            ) : (
                <div>
                    <Header />
                    <div className="image-container-buyer">
                        <div class="mainImageContainer">
                            {/* <img src={newData?.mainImage?.ImageLink} alt="Your Image" class="main-image-build" /> */}
                            {images && images[currentImageIndex] ? (
                                <img src={images[currentImageIndex]?.ImageLink} alt="Your Image" className="main-image-build" />
                            ) : (
                                <img src={mainImage} alt="Your Image" className="main-image-build" />

                            )}
                            <div className="dots-container">
                                {images && images.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => handleDotClick(index)}
                                    ></span>
                                ))}
                            </div>
                            {/* <div className="arrow-container">
                                <button class="arrow-container-prevbtn" onClick={handlePrevClick}>
                                   
                                        <ArrowBackIosIcon className='arrowIcon' />
                                </button>
                                <button class="arrow-container-nextbtn" onClick={handleNextClick}>
                                    <ArrowForwardIosIcon className='arrowIcon'/>
                                </button>
                            </div> */}
                        </div>


                        <div className="overlay-component-buyer">

                            <div class="heading-buildname">
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    flexGrow: 1,
                                    width: "30%",
                                    justifyContent: "center"
                                }}>
                                    <Typography class="building-name-buyer-land" sx={{ fontWeight: '600' }}>
                                        {newData?.propertyName}
                                    </Typography>
                                    <Typography class="building-name-tagline-land" sx={{ fontWeight: '600' }}>
                                        {newData?.tagLine}
                                    </Typography>
                                    <Button class="view-btn-from-land"
                                        onClick={handleViewClick}
                                    >
                                        {t("viewDetails")}
                                    </Button>
                                </Box>

                            </div>
                        </div>
                    </div>
                </div>
            )}



        </div >
    )
}

export default BuyerLandingPage