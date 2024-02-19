import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Typography,
    Select,
    MenuItem,
  } from "@mui/material";
import CountryFlag from 'react-country-flag';
import '../../../Translator/config';


const LanguageSelect = ({  languageOptions }) => {
  const { i18n, t } = useTranslation();

  var storedLanguage = localStorage.getItem('language');
  if (storedLanguage == null) {
    storedLanguage = "en";
  }
  const [selectedLanguage, setSelectedLanguage] = React.useState(storedLanguage);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value)
    i18n.changeLanguage(e.target.value);
    localStorage.setItem('language', e.target.value);
  };

  return (
    <Select
      value={selectedLanguage}
      onChange={handleLanguageChange}
      sx={{
        "&.MuiSelect-select, .MuiSelect-select:focus,MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input,.MuiSelect-select": {
          border: "none",
          backgroundColor: "none",
        },
        "&.MuiSelect-select:focus": {
          border: "none",
          backgroundColor: "none",
        }
      }}
    >
      {languageOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1
          }}>
            <CountryFlag
              countryCode={option.countryCode}
              svg
              style={{ fontSize: "1.5rem", marginRight: "8px" }}
              title={option.label}
            />
            <Typography className="flag-label">{option.label}</Typography>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSelect;
