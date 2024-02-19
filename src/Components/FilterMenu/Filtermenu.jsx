import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";


import './Filtermenu.css'
import LocationFinder from '../LocationFinder/LocationFinder';

export default function Filtermenu() {

  const [propertyType, setPropertyType] = React.useState('');
  const { i18n, t } = useTranslation();
  const [rooms, setRooms] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [sortBy, setSortBy] = React.useState('10');
  const [moreFilter, setMoreFilter] = React.useState('');

  const changePropertyType = (event) => {
    setPropertyType(event.target.value);
  };
  const changeRooms = (event) => {
    setRooms(event.target.value);
  };
  const changePrice = (event) => {
    setPrice(event.target.value);
  };
  const changeSortBy = (event) => {
    setSortBy(event.target.value);
  };
  const changeMoreFilter = (event) => {
    setMoreFilter(event.target.value);
  };

  return (
    <div className='container-main'>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* First Select */}
        <FormControl className="form-control-container" sx={{ flexGrow: 0.5, m: 1, minWidth: 120 }} >
          <InputLabel className="form-control-label" id="demo-simple-select-helper-label-1"
          sx={{
            font: 'inter',
            fontSize: '13px',
            fontWeight: '400',

          }}>{t("propertyType")}</InputLabel>
          <Select
            className="select-component"
            labelId="demo-simple-select-helper-label-1"
            id="demo-simple-select-helper-1"
            value={propertyType}
            onChange={changePropertyType}
            variant="standard"
            sx={{
              "&.MuiSelect-select,.MuiInputBase-input:focus ": {
                backgroundColor: "white !important",
              },
              "&.MuiSelect-select,.MuiInputBase-input,.MuiInput-input ":{
                padding:"0",
              },fontSize:"13px",
            }}
          >

            <MenuItem className="select-menu-item" value={'s'}>Studio</MenuItem>
            <MenuItem className="select-menu-item" value={'f'}>Flat</MenuItem>
            <MenuItem className="select-menu-item" value={'v'}>Villa</MenuItem>
          </Select>
          {/* <FormHelperText>With label + helper text</FormHelperText> */}
        </FormControl>
        <Divider className='divider' orientation="vertical" flexItem />
        {/* Second Select */}
        <FormControl className="form-control-container" sx={{ flexGrow: 0.5, m: 1, minWidth: 120 }}>
          <InputLabel className="form-control-label" id="demo-simple-select-helper-label-2" 
          sx={{
            font: 'inter',
            fontSize: '13px',
            fontWeight: '400',

          }}>{t("rooms")}</InputLabel>
          <Select
            className="select-component"
            labelId="demo-simple-select-helper-label-2"
            id="demo-simple-select-helper-2"
            value={rooms}
            onChange={changeRooms}
            variant="standard"
            sx={{
              "&.MuiSelect-select,.MuiInputBase-input:focus ": {
                backgroundColor: "white !important",
              },
              "&.MuiSelect-select,.MuiInputBase-input,.MuiInput-input ":{
                padding:"0",
              },fontSize:"13px",
            }}
          >

            <MenuItem className="select-menu-item" value={0.5}>1RK</MenuItem>
            <MenuItem className="select-menu-item" value={1}>1BHK</MenuItem>
            <MenuItem className="select-menu-item" value={2}>2BHK</MenuItem>
            <MenuItem className="select-menu-item" value={3}>3BHK</MenuItem>
          </Select>
          {/* <FormHelperText>With label + helper text</FormHelperText> */}
        </FormControl>
        <Divider className='divider' orientation="vertical" flexItem />
        {/* Third Select */}
        <FormControl className="form-control-container" sx={{ flexGrow: 0.5, m: 1, minWidth: 120 }}>
          <InputLabel className="form-control-label" id="demo-simple-select-helper-label-3" sx={{
                font: 'inter',
                fontSize: '13px',
                fontWeight: '400',

              }}>{t("price")}</InputLabel>
          <Select
            className="select-component"
            labelId="demo-simple-select-helper-label-3"
            id="demo-simple-select-helper-3"
            value={price}
            onChange={changePrice}
            variant="standard"
            sx={{
              "&.MuiSelect-select,.MuiInputBase-input:focus ": {
                backgroundColor: "white !important",
              },
              "&.MuiSelect-select,.MuiInputBase-input,.MuiInput-input ":{
                padding:"0",
              },fontSize:"13px",
            }}
          >

            <MenuItem className="select-menu-item" value={149000}>€ 50000  -  € 150000</MenuItem>
            <MenuItem className="select-menu-item" value={190000}>€ 150000  -  € 200000</MenuItem>
            <MenuItem className="select-menu-item" value={200000}> {`>`}€ 200000</MenuItem>
          </Select>
          {/* <FormHelperText>With label + helper text</FormHelperText> */}
        </FormControl>
        <Divider className='divider' orientation="vertical" flexItem />
        {/* Forth Select */}
        <FormControl className="form-control-container" sx={{ flexGrow: 0.5, m: 1, minWidth: 120 }}>
        {/* <div className='shortlist-container' style={{ display: 'flex', alignItems: 'center' }}> */}
          <InputLabel className="form-control-label" id="demo-simple-select-helper-label-4"
          sx={{
            font: 'inter',
            fontSize: '13px',
            fontWeight: '400',

          }}>{t("moreFilters")}</InputLabel>
          <Select
            className="select-component"
            labelId="demo-simple-select-helper-label-4"
            id="demo-simple-select-helper-4"
            value={moreFilter}
            onChange={changeMoreFilter}
            variant="standard"
            sx={{
              "&.MuiSelect-select,.MuiInputBase-input:focus ": {
                backgroundColor: "white !important",
              },
              "&.MuiSelect-select,.MuiInputBase-input,.MuiInput-input ":{
                padding:"0",
              },fontSize:"13px",
            }}
          >

            <MenuItem className="select-menu-item" value={1}>Option 1</MenuItem>
            <MenuItem className="select-menu-item" value={2}>Option 2</MenuItem>
            <MenuItem className="select-menu-item" value={3}> Option 3</MenuItem>
          </Select>
          {/* <FormHelperText>With label + helper text</FormHelperText> */}
        </FormControl>
        <Divider className='divider' orientation="vertical" flexItem />

        <div className='locBar'  >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon className='navIcon'
              sx={{
                "&.MuiSvgIcon-root": {
                  height: '50px',
                  width: '40px'
                }
              }}
            />
            <LocationFinder className="locFinder" sx={{ flexGrow: 0.5, m: 1, minWidth: 120, border: 'none' }} />
          </div>
        </div>

        <Divider className='divider' orientation="vertical" flexItem />
        <FormControl className="form-control-container" sx={{ flexGrow: 0.5, m: 1, minWidth: 120 }}>

          <div className='shortlist-container' style={{ display: 'flex', alignItems: 'center' }}>
            <Typography className='txt-shortlist' variant="subtitle1"
              sx={{
                font: 'inter',
                fontSize: '13px',
                fontWeight: '400',

              }}
            >{t("sortBy")} :</Typography>
            <Select

              className="select-component"
              labelId="demo-simple-select-helper-label-3"
              id="demo-simple-select-helper-3"
              value={sortBy}
              onChange={changeSortBy}
              variant="standard"
              sx={{
                "&.MuiSelect-select,.MuiInputBase-input:focus ": {
                  backgroundColor: "white !important",
                },
                "&.MuiSelect-select,.MuiInputBase-input,.MuiInput-input ":{
                  padding:"10",
                },fontSize:"13px",
              }}
            >

              <MenuItem className="select-menu-item" value={10}>Relevance</MenuItem>
              <MenuItem className="select-menu-item" value={20}>Price</MenuItem>
              <MenuItem className="select-menu-item" value={30}>Listed Date</MenuItem>
            </Select>
          </div>
          {/* <FormHelperText>With label + helper text</FormHelperText> */}
        </FormControl>
      </div>
    </div>
  );
}
