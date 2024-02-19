import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import main_image from '../../Images/main.jpg'
import { useTranslation } from "react-i18next";
import LocationOnIcon from '@mui/icons-material/LocationOn';

function GridView({ nextStep, level, properties }) {
  console.log("level is", level)

  const { i18n, t } = useTranslation();

  const handleViewForSeller = (propertyId) => {
    window.location.href = `/seller/detailspage/${propertyId}`;
  };
  const handleNextPage = () => {
    window.location.href = "/buyerdetailspage";
  };
  const [viewMode, setViewMode] = useState("grid");

  const switchToGridView = () => {
    setViewMode("grid");
  };

  const switchToListView = () => {
    setViewMode("list");
  };

  const renderGridView = () => {
    return (
      <div className="grid-container mt-4">
        {properties?.map((data) => (
          <div key={data?.propertyId} className="grid-item">
            <div class="grid-image-container">
              <Typography
                className="commercial-text"
                sx={{ fontWeight: 600 }}
              >
                {t(data?.PropertyType)}
              </Typography>
              <img
                src={data?.mainImage}
                alt={data.title}
                class="image-grid-item"
              />
            </div>
            <div className="container-fluid mt-3">
              <h4
                class="grid-title"
                style={{
                  fontWeight: 600,
                }}
              >
                {data?.propertyName}
              </h4>
              <Box
                sx={{
                  display: "flex",

                }}
              >
                <LocationOnIcon
                  sx={{ color: "#F8665D" }}
                />
                <Typography
                  className="txt-street"
                  variant="subtitle1"
                  sx={{
                    font: "inter",
                    fontSize: "13px",
                    fontWeight: "400",
                  }}
                >
                  {data?.address?.Area}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <div
                  className="text-center mt-2"
                  style={{ display: "flex", justifyContent: "center", position: 'absolute', bottom: "5px" }}
                >
                  {level === "buyer" ? (<button
                    className="viewEditBtn"
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      fontWeight: 500,
                      padding: "7px 24px",
                      whiteSpace: "nowrap",
                      height: "30px",
                      borderBottom: "40px",
                    }}
                    // onClick={(nextStep = "-1")}
                    onClick={handleNextPage}
                  >
                    {t("view")}
                  </button>) : (<button
                    className="viewEditBtn"
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      fontWeight: 500,
                      padding: "7px 24px",
                      whiteSpace: "nowrap",
                      height: "30px",
                      borderBottom: "40px",
                    }}
                    // onClick={(nextStep = "-1")}
                    onClick={(e) => handleViewForSeller(data?.propertyId)}
                  >
                    {t("viewEdit")}
                  </button>)}

                </div>
              </Box>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderListView = () => {
    return (
      <ul className="list-container mt-2">
        {properties?.map((data) => (
          <li key={data?.propertyId} className="list-item">
            <Box
              sx={{
                display: "flex",
                alignItems: "left",
                justifyContent: "space-between",
                alignItems: "center",
                flexGrow: "1",
                "@media (max-width: 768px)": {
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "left",
                },
              }}
            >
              <img
                src={data?.mainImage}
                alt={data?.title}
                class="image-grid-item"
              />
              <h4>
                {data?.propertyName}
              </h4>
              <div
                className="text-center"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {level === "buyer" ? (
                  <button
                    className="viewEditBtn"
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      fontWeight: 500,
                      padding: "7px 24px",
                      whiteSpace: "nowrap",
                      height: "30px",
                      borderBottom: "40px",
                    }}

                    // onClick={(nextStep = "-1")}
                    onClick={handleNextPage}
                  >

                    {t("view")}
                  </button>
                ) : (<button
                  className="viewEditBtn"
                  style={{
                    width: "100px",
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "7px 24px",
                    whiteSpace: "nowrap",
                    height: "30px",
                    borderBottom: "40px",
                  }}

                  // onClick={(nextStep = "-1")}
                  onClick={(e) => handleViewForSeller(data?.propertyId)}
                >

                  {t("viewEdit")}
                </button>)}
              </div>
            </Box>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div>
      <div className="grid-screen" style={{ marginBottom: "20px" }}>
        <div className="view-buttons">
          <Button
            onClick={switchToGridView}
            class={viewMode === "grid" ? "active-icon" : "deactive-icon"}
          >
            <GridViewIcon />
          </Button>
          <Button
            onClick={switchToListView}
            class={viewMode === "list" ? "active-icon" : "deactive-icon"}
          >
            <ListIcon />
          </Button>
        </div>
        {viewMode === "grid" ? renderGridView() : renderListView()}
      </div>
    </div>
  );
}

export default GridView;
