import "./Header.css";
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Modal from "./Modal/Modal";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LanguageSelect from "./LanguageSelect/LanguageSelect";
import { useTranslation } from "react-i18next";
import { API_ROUTES } from '../../Api';
import Loader from '../../Components/Loader/Loader';
import LoginItems from "./LoginItems";
import Cookies from 'js-cookie';

function Header() {

  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const [proPic, setProPic] = useState(null);
  const [isMobile, setIsMobile] = useState(false)
  const [profileType, setProfileType] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  })
  useEffect(() => {
    if (window.innerWidth <= 900 && isLogin) {
      setIsMobile(true);
    }
  }, [])

  useEffect(() => {
    setIsLogin(localStorage.getItem("isLoggedIn")
      ? localStorage.getItem("isLoggedIn")
      : false);
    setLoginData(JSON.parse(localStorage.getItem('userDetails')));
    setProPic(JSON.parse(localStorage.getItem('userDetails'))?.ProfilePic);
    setProfileType(Cookies.get('role'))

    console.log("Logged in", localStorage.getItem("isLoggedIn"))
    console.log("userDetails", JSON.parse(localStorage.getItem('userDetails')))
    console.log("role", Cookies.get('role'))
    if (localStorage.getItem("isLoggedIn") !== 'true') {
      fetch(API_ROUTES.getIsUserLoggedIn)
        .then((response) => response.json())
        .then((data) => {
          setIsLogin(data.isLoggedIn);
          localStorage.setItem('isLoggedIn', data.isLoggedIn);
          console.log("IsLoggedIn ", data);

          if (data.isLoggedIn === true) {
            fetch(API_ROUTES.getLoggedInUserData)
              .then((response) => response.json())
              .then((userData) => {
                setProPic(userData.ProfilePic);
                setLoginData(userData);
                console.log("User Data ", userData);
                localStorage.setItem('userDetails', JSON.stringify(userData));
                localStorage.setItem('isLoggedIn', 'true');
              })
              .catch((error) => {
                console.error('getLoggedInUserData API request failed:', error);
              });
          }
        })
        .catch((error) => {
          console.error('getIsUserLoggedIn API request failed:', error);
        });
    }


    setIsLoading(false);
  }, []);


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { i18n, t } = useTranslation();

  const languageOptions = [
    { value: "nl", label: "Dutch", countryCode: "NL" },
    { value: "en", label: "English", countryCode: "US" },
  ];
  const agentMainPages = [
    { label: t("propertyListings"), path: '/agentlisting' },

    { label: t("aboutUs"), path: '/' },
    { label: t("contact"), path: '/' },
  ];
  const agentMobilePages = [
    { label: t("chats"), path: '/agent/chat' },
    { label: t("documents"), path: '/agent/documents' },
    { label: t("myInfo"), path: "/agent/myinfo" },
    { label: t("profile"), path: "/agent/profile" },
    { label: t("help"), path: "/help" },

  ]
  const buyerMainPages = [
    { label: t("propertyListings"), path: '/buyerdetailspage' },
    { label: t("aboutUs"), path: '/' },
    { label: t("contact"), path: '/' },
  ];
  const buyerMobilePages = [
    { label: t("chats"), path: '/buyer/chat' },
    { label: t("documents"), path: '/buyer/documents' },
    { label: t("myInfo"), path: "/buyer/myinfo" },
    { label: t("agents"), path: "/buyer/agents" },
    { label: t("myOrders"), path: "/layoutscreen" },
    { label: t("profile"), path: "/buyer/profile" },
    { label: t("help"), path: "/help" },
  ];
  const sellerMainPages = [
    { label: t("propertyListings"), path: '/sellers' },
    { label: t("aboutUs"), path: '/' },
    { label: t("contact"), path: '/' },
  ];
  const sellerMobilePages = [
    { label: t("chats"), path: '/seller/chat' },
    { label: t("documents"), path: '/seller/documents' },
    { label: t("myInfo"), path: "/seller/myinfo" },
    { label: t("agents"), path: "/seller/agents" },
    { label: t("profile"), path: "/seller/profile" },
    { label: t("help"), path: "/help" },
  ];
  const [pages, setPages] = useState([{
    label: t("propertyListings"), path: '/buyerdetailspage'
  },
  { label: t("aboutUs"), path: '/' },
  { label: t("contact"), path: '/' },
  ]);

  useEffect(() => {
    switch (profileType) {
      case "buyer":
        setPages(isMobile ? [...buyerMainPages, ...buyerMobilePages] : [...buyerMainPages]);
        break;
      case "agent":
        setPages(isMobile ? [...agentMainPages, ...agentMobilePages] : [...agentMainPages]);
        break;
      case "owner":
        setPages(isMobile ? [...sellerMainPages, ...sellerMobilePages] : [...sellerMainPages]);
        break;
      default:
        setPages([...pages]);
        break;
    }
  }, [profileType, isMobile])


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <div>
      {isLoading ? (
        <Loader /> // Display the loader while data is loading
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            width: "100%",
          }}
        >
          <AppBar
            class="appbar"
            position="static"
            sx={{ backgroundColor: "white" }}
          >
            <Container maxWidth="100%">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href={
                    profileType === 'buyer'
                      ? '/'
                      : profileType === 'agent'
                        ? '/agentlisting'
                        : profileType === 'owner'
                          ? '/sellers'
                          : '/'
                  } sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    font: "inter",
                    fontWeight: 600,
                    letterSpacing: ".3rem",
                    color: "black",
                    textDecoration: "none",
                    minWidth: "10%",
                  }}
                >
                  RSVC
                </Typography>

                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "flex", md: "none" },
                    color: "black",
                  }}
                >
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">
                          {" "}
                          <Link
                            to={page.path}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {page.label}
                          </Link>
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href={
                    profileType === 'buyer'
                      ? '/'
                      : profileType === 'agent'
                        ? '/agentlisting'
                        : profileType === 'owner'
                          ? '/sellers'
                          : '/'
                  } sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 600,
                    font: "black",
                    letterSpacing: ".3rem",
                    color: "black",
                    textDecoration: "none",
                    minWidth: "20%",
                    margin: "0px"
                  }}
                >
                  RSVC
                </Typography>
                <Box sx={{ flexGrow: 0.1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                    <Button
                      key={page.label}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "#8B8B8B", display: "block" }}
                    >
                      <Link
                        to={page.path}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {page.label}
                      </Link>
                    </Button>
                  ))}
                </Box>
                {/* <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flexGrow: 1,
                width: "30%"
              }}>
                <TextField
                  variant="outlined"
                  placeholder={t("search_place")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon
                          sx={{ marginTop: "8px" }}
                        />
                      </InputAdornment>),
                  }}
                  sx={{
                    width: "75%",
                    bgcolor: "#EDEDED",
                    borderRadius: "20px",
                    height: "40px",
                    padding: "0",

                    "&.MuiInputBase-input,.MuiOutlinedInput-input": {
                      padding: "0px !important",
                      marginTop: "8px",
                    }
                  }}
                />
              </Box> */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <LanguageSelect languageOptions={languageOptions} />
                  </Box>
                  {localStorage.getItem("isLoggedIn") === 'true' ? (
                    <LoginItems
                      profileType={profileType}
                      isLogin={isLogin}
                      setIsLogin={setIsLogin}
                      loginData={loginData}
                      proPic={proPic}
                      setProPic={setProPic}
                    />
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Modal />
                    </Box>
                  )}
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </Box >
      )}

    </div >
  );
}

export default (Header);
