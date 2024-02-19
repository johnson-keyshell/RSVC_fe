import React, { useEffect, useState } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Modal.css'
import Pop from "../Pop";
import { styled } from '@mui/material/styles';
import { useTranslation } from "react-i18next";
function Modal() {






  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   let dataforLogin = {
  //     "e-mail": email,
  //     password,
  //   };
  //   await axios
  //     .post(`${config.BASE_URL}/auth/local`, dataforLogin)
  //     .then((res) => {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Success!",
  //         text: "Successfully Loggedin....",
  //       }).then(() => {
  //         localStorage.setItem(
  //           "loginData",
  //           JSON.stringify(res?.data?.data?.user)
  //         );
  //         window.location.href = "/agent";
  //         // window.location.reload(); // NEED TO CHANGE THE PATH
  //       });
  //     })
  //     .catch((err) => {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: "Invalid Email or Password",
  //       });
  //     });
  // };

  // const [loginData, setLoginData] = useState(
  //   localStorage.getItem("loginData")
  //     ? JSON.parse(localStorage.getItem("loginData"))
  //     : null
  // );

  // const clientId =
  //   "83205341113-pucvu201pl9ci69eh2fhavoge31ral93.apps.googleusercontent.com"; //
  // useEffect(() => {
  //   gapi.load("client:auth2", () => {
  //     gapi.auth2.init({ clientId: clientId });
  //   });
  // }, []);

  // const handleFailure = (result) => {
  //   console.log("Error while signin", result);
  // };

  // const handleLogin = async (googleData) => {
  //   const res = await fetch(config.BASE_URL + "/auth/google-signin", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       token: googleData.tokenId,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const data = await res.json();

  //   if (data) {
  //     setLoginData(data.data);
  //     localStorage.setItem("loginData", JSON.stringify(data.data));
  //     window.location.reload();
  //   }
  // };



  const [anchorEl, setAnchorEl] = useState(null);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [userType, setuserType] = useState(null);
  const { i18n, t } = useTranslation();

//For Selection Login Options agent,seller,buyer

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleBuyerLogin = () => {
  //   console.log("pop is clicking")
  //   setuserType("buyer")
  //   setIsPopOpen(true);
  // };

  // const handleAgentLogin = () => {
  //   setuserType("agent")
  //   setIsPopOpen(true); 
  // };
  // const handleSellerLogin = () => {
  //   setuserType("seller")
  //   setIsPopOpen(true);
  // };
  const handleClosePop = () => {
    setIsPopOpen(false); 
  };

  //For no login selection option 
  const handleLogin=()=>{
    setIsPopOpen(true);
  }

  return (
    <div>
      <div>
        <Button
          class="loginBtnHead"
          aria-controls="login-menu"
          aria-haspopup="true"
          onClick={handleLogin}
        >
          {t("login")}
        </Button>

{/* Options Hidden by commenting */}
        
        {/* <Menu
          id="login-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{
            top: '0',
            left: '0'
          }}

        >

          <MenuItem
            class="menu-item-login-btn"
            onClick={handleBuyerLogin}>
            <Box
              sx={{
                display: 'flex',
                justifyItems: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Typography className="Text-log">{t("buyerLogin")}</Typography>
              <div class='arrow-cont-buyer'>
                <ArrowForwardIosIcon sx={{ color: 'white' }} />
              </div>
            </Box>

          </MenuItem>
          <MenuItem
            class="menu-item-login-btn"

            onClick={handleAgentLogin}><Box
              sx={{
                display: 'flex',
                justifyItems: 'center',
                alignItems: 'center',
                flexDirection: 'row'
              }}
            >
              <Typography className="Text-log">{t("agentLogin")}</Typography>
              <div class='arrow-cont-agent'>
                <ArrowForwardIosIcon sx={{ color: 'white' }} />
              </div>
            </Box></MenuItem>
            <MenuItem
            class="menu-item-login-btn"
            onClick={handleSellerLogin}
            >
            <Box
              sx={{
                display: 'flex',
                justifyItems: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Typography className="Text-log">{t("sellerLogin")}</Typography>
              <div class='arrow-cont-seller'>
                <ArrowForwardIosIcon sx={{ color: 'white' }} />
              </div>
            </Box>

          </MenuItem>
        </Menu> */}
        {isPopOpen && <Pop isOpen={isPopOpen} onClose={handleClosePop}
        handleClosePop={handleClosePop}
        handleLogin={handleLogin}
        //  userType={userType} 
         />}
      </div>

    </div >
  );
}

export default Modal;
