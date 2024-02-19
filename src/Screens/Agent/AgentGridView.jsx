import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import main_image from '../../Images/main.jpg'
import AgentDetailsPage from './AgentDetailsPage'
import { useTranslation } from "react-i18next";
import { API_ROUTES } from "../../Api";
import Loader from "../../Components/Loader/Loader";

function AgentGridView({ nextStep }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailsPageVisible, setDetailsPageVisible] = useState(false);
  const [isGridVisible, setGridVisible] = useState(true);
  const { i18n, t } = useTranslation();


  useEffect(() => {
    fetch(API_ROUTES.getPropertyInfo)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
        console.log("Details page data is  ", data)
      })
      .catch((error) => {
        console.error('getUserData API request failed:', error);
      });
  }, []);

  const handleNextPage = () => {
    setDetailsPageVisible(true);
  };
  const handlePrevPage = () => {
    setDetailsPageVisible(false);
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
        <div key={data?.propertyId} className="grid-item">
          <div class="grid-image-container">
            <Typography
              className="commercial-text"
              sx={{ fontWeight: 600 }}
            >
              {t(data?.PropertyType)}
            </Typography>
            <img
              src={data?.images[0]?.ImageLink}
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
            <div className="row m-0 card-details">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
              >
                <path
                  d="M15.3636 14.7245L10.469 19.4166C10.2762 19.6015 10.0471 19.7483 9.79508 19.8484C9.54301 19.9485 9.27283 20 8.99998 20C8.72712 20 8.45694 19.9485 8.20488 19.8484C7.95281 19.7483 7.7238 19.6015 7.53092 19.4166L2.63638 14.7245C1.80061 13.9236 1.13762 12.9728 0.68527 11.9264C0.232919 10.8799 6.43079e-05 9.75837 1.33181e-08 8.62569C-6.42813e-05 7.49301 0.232663 6.37141 0.684895 5.32493C1.13713 4.27844 1.80001 3.32757 2.63569 2.5266C3.47137 1.72563 4.46348 1.09025 5.55538 0.656735C6.64729 0.223221 7.8176 6.16133e-05 8.99949 1.27566e-08C10.1814 -6.15877e-05 11.3517 0.222975 12.4437 0.656376C13.5356 1.08978 14.5278 1.72506 15.3636 2.52594C16.1994 3.32687 16.8625 4.27775 17.3148 5.32427C17.7672 6.37079 18 7.49246 18 8.62522C18 9.75799 17.7672 10.8797 17.3148 11.9262C16.8625 12.9727 16.1994 13.9236 15.3636 14.7245ZM13.8959 3.93382C12.5974 2.68941 10.8363 1.98898 8.99998 1.98898C7.16365 1.98898 5.40253 2.68808 4.10405 3.93249C2.80557 5.17691 2.07609 6.86469 2.07609 8.62456C2.07609 10.3844 2.80557 12.0722 4.10405 13.3166L8.99998 18.0074L13.8959 13.3179C14.539 12.7018 15.0491 11.9704 15.3971 11.1653C15.7451 10.3602 15.9242 9.49732 15.9242 8.62589C15.9242 7.75446 15.7451 6.89156 15.3971 6.08649C15.0491 5.28142 14.539 4.54993 13.8959 3.93382ZM8.99998 11.2798C8.63121 11.2878 8.26448 11.2251 7.92134 11.0954C7.5782 10.9657 7.26556 10.7716 7.00177 10.5245C6.73798 10.2774 6.52835 9.98226 6.38521 9.65646C6.24206 9.33066 6.16827 8.98073 6.16818 8.62723C6.16809 8.27372 6.24169 7.92376 6.38467 7.59789C6.52765 7.27202 6.73711 6.97681 7.00078 6.72959C7.26444 6.48237 7.57698 6.28812 7.92006 6.15826C8.26313 6.02839 8.62982 5.96552 8.99859 5.97333C9.72213 5.98866 10.4107 6.27484 10.9168 6.77061C11.4229 7.26637 11.7064 7.93232 11.7066 8.6259C11.7067 9.31948 11.4236 9.98556 10.9177 10.4816C10.4119 10.9776 9.72351 11.2641 8.99998 11.2798Z"
                  fill="#F8665D"
                />
              </svg>
              <p style={{ marginLeft: "10px" }}>{data?.address?.AddressLine1},{data?.address?.Area}</p>
            </div>
            <div
              className="text-center mt-2"
              style={{ display: "flex", justifyContent: "center" }}
            >
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

            </div>
          </div>
        </div>
      </div >
    );
  };

  const renderListView = () => {
    return (
      <ul className="list-container mt-2">

        <li key={data?.propertyId} className="list-item">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexGrow: '1',
              '@media (max-width: 768px)': {
                width: '100%',
                flexDirection: 'column',
                alignItems: 'left',
              },
            }}
          >
            <img src={data?.images[0]?.ImageLink} alt={data?.title} />
            <h4>{data?.propertyName}</h4>
            <div
              className="text-center"
              style={{ display: "flex", justifyContent: "center" }}
            >

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

                onClick={handleNextPage}
              >

                {t("view")}
              </button>

            </div>
          </Box>
        </li>
      </ul>
    );
  };
  return (
    <div>
      {isLoading ? (<Loader />) : (
        <div>
          {isDetailsPageVisible ? (
            <AgentDetailsPage handlePrevPage={handlePrevPage} />
          ) : (
            <div className="grid-screen">
              <h2 class="active-menu">{t("listings")}</h2>
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
          )}
        </div>
      )}

    </div>
  );
}

export default AgentGridView;
