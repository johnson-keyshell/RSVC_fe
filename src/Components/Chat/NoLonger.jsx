import React from 'react'
import { Typography, Box } from '@mui/material';
import { useTranslation } from "react-i18next";

function NoLonger() {
  const { i18n, t } = useTranslation();
  return (
    <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                backgroundColor='#EDEDED'
                width="90%"
                marginLeft="5%"
                borderRadius="20px"
                padding="2%"
                marginTop= "2%"
              >
                <div>
                  <Typography variant="h7" color="#878787">
                  {t("noLongerAbleToSendMessage")}
                  </Typography>
                </div>
              </Box>
  )
}

export default NoLonger