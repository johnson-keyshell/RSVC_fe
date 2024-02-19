import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Quickinfo.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Tiles({
  agentCount,
  sailCount,
  prospectiveBuyerCount,
}) {
  const { i18n, t } = useTranslation();
  const [options, setOptions] = useState([
    {
      title: t("agents"),
      count: agentCount,
      page: "/seller/agents"
    },
    {
      title: t("unitsSold"),
      count: sailCount,
      page:"/sellers"
    },
    {
      title: t("prospectiveBuyers"),
      count: prospectiveBuyerCount,
      page:"/sellers"

    },
  ]);
  const handleViewAllClick = (page) => {
    window.location.href = page;
  }
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          "@media (max-width: 768px)": {
            width: "100%",
            flexDirection: "column",
            alignItems: "left",
          },
        }}
      >
        {options.map((option, index) => (
          <div class="main-container" key={index}>
            <Card key={index} class="card">
              <div>
                <CardContent class="cardContent">
                  <Typography class="Heading" variant="h5" component="div">
                    {/* here add the value for each/ */}
                    {option?.title}
                  </Typography>
                </CardContent>
              </div>
              <div class="num-and-btn">
                <Typography class="number" variant="body2">
                  {option?.count}
                </Typography>
                <CardActions class="btn-dd">
                  <Button class="btn" size="small"
                    onClick={() => handleViewAllClick(option?.page)}
                  >
                    {t("viewAll")}
                  </Button>
                </CardActions>
              </div>
            </Card>
          </div>
        ))}
      </Box>
    </div>
  );
}
