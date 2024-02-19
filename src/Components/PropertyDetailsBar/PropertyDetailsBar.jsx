import React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; 
import { FormControl } from '@mui/material';
import './PropertyDetailsBar.css'
import mainImage from '../../Images/main.jpg'
import { API_ROUTES } from '../../Api';
import { useTranslation } from "react-i18next";


const PropertyDetailsBar = () => {
  const [newdata, setnewData] = React.useState(null);
  const { i18n, t } = useTranslation();


  useEffect(() => {
    fetch(API_ROUTES.getPropertyInfo)
      .then((response) => response.json())
      .then((data) => {
        setnewData(data);
        console.log("Details page data is  ",data)
      })
      .catch((error) => {
        console.error('getUserData API request failed:', error);
      });
  }, []);

  // Sample property data in a JSON object
  const initialProperty = {
    price: '500,000',
    address: {
      street: 'Taylorweg 102, Veghel',
      buildingName: 'Maddison square Terrace garden',
    },
    agents: [
      {
        name: 'Agent 1',
        avatar: mainImage,
        details: 'Agent 1 Details',
      },
      {
        name: 'Agent 2',
        avatar: '/path-to-agent-2-image.jpg',
        details: 'Agent 2 Details',
      },
      {
        name: 'Agent 3',
        avatar: mainImage,
        details: 'Agent 3 Details',
      },
    ],
    isFavorite: false,
  };
  const handlePrevious = () => {
    window.location.href = '/propertylistings';
  };

  const [property, setProperty] = React.useState(initialProperty);

  const toggleFavorite = () => {
    setProperty({
      ...property,
      isFavorite: !property.isFavorite,
    });
  };
  return (
    <div class='mains' style={{ display: 'flex', flexWrap: 'wrap' }}>
      {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}> */}

      <FormControl className="form-control-container" sx={{
        flexGrow: 0.5, m: 1, minWidth: 120,
        "&.MuiFormControl-root": {
          margin: "0"
        }
      }} >
        <Button
          className='btn-backtolisting'
          key="backToListingBtn"
          disableRipple
          sx={{
            textTransform: 'capitalize',
            font: 'inter',
            fontSize: '13px',
            fontWeight: '400',
            my: 2, color: "#54C7E9", display: "block",
            width: '100%',
            "&.MuiButtonBase-root,.MuiIconButton-root:hover": { backgroundColor: 'white' },
            "&.MuiButtonBase-root,.MuiIconButton-root:focus": { backgroundColor: 'white' },
            "&.MuiButtonBase-root,MuiButton-root": { width: '100%', borderRadius: '20px', marginTop: '20px' },
          }}
          onClick={handlePrevious}
        >
          <ArrowBackIosIcon className='icons'
            sx={{ fontSize: "13px" }} />

          {t("backToListing")}
        </Button>

      </FormControl>
      <Divider className='dividers' orientation="vertical" flexItem />

      {/* Address */}
      <FormControl className="form-control-container" sx={{ flexGrow: 0.5, m: 1, minWidth: 120 }} >
        <div class='buildText-container'>
          <Typography className='txt-street' variant="subtitle1"
            sx={{
              font: 'inter',
              fontSize: '13px',
              fontWeight: '400',

            }}
          >{property.address.street}</Typography>
          <Typography className='txt-buildname' variant="subtitle2"
            sx={{
              font: 'inter',
              fontSize: '20px',
              fontWeight: '600',

            }}>{newdata?.propertyName}</Typography>
        </div>
      </FormControl>
      <Divider className='dividers' orientation="vertical" flexItem />
      {/* Property Price */}
      <FormControl className="form-control-container" sx={{ flexGrow: 0.5, m: 1, minWidth: 120 }} >
        <div class='buildText-container'>
          <Typography className='txt-street' variant="subtitle1"
            sx={{
              font: 'inter',
              fontSize: '13px',
              fontWeight: '400',

            }}
          >{newdata?.price}</Typography>
          <Typography className='txt-buildname' variant="subtitle2"
            sx={{
              font: 'inter',
              fontSize: '20px',
              fontWeight: '600',

            }}>€ {property.price}</Typography>
        </div>
      </FormControl>
      <Divider className='dividers' orientation="vertical" flexItem />
      {/* Agents */}
      <FormControl className="form-control-container" sx={{ flexGrow: 0.5, m: 1, minWidth: 120 }} >
        <div class="agents" style={{ display: 'flex', alignItems: 'center' }}>
          <div class="avatarContainer">
            {property.agents.map((agent, index) => (
              <div class='avatar' key={index}>
                <Avatar alt={agent.name} src={agent.avatar} />
                {/* <Typography variant="subtitle2">{agent.name}</Typography>
              <button onClick={() => console.log(agent.details)}>View Details</button> */}
              </div>
            ))}
          </div>
          <Typography className='txt-agent' variant="subtitle1"
            sx={{
              font: 'inter',
              fontSize: '13px',
              fontWeight: '400',
              marginLeft: "10px"
            }}
          >{t("agents")} ({initialProperty.agents.length})</Typography>
        </div>
      </FormControl>
      {/* Favorite Button */}
      <Divider className='dividers' orientation="vertical" flexItem />
      <FormControl className="form-control-container" sx={{ flexGrow: 0.5, m: 1, minWidth: 120, alignItems: "center" }} >
        <div className='shortlist-container' style={{ display: 'flex', alignItems: 'center' }}>
          <Typography className='txt-shortlist' variant="subtitle1"
            sx={{
              font: 'inter',
              fontSize: '13px',
              fontWeight: '400',

            }}
          >{t("shortListToFavourites")}</Typography>
          <IconButton
            edge="end"
            aria-label="favorite"
            onClick={toggleFavorite}
          >
            {property.isFavorite ? (
              <FavoriteIcon className='fav-icons-fill' />
            ) : (
              <FavoriteBorderIcon className='fav-icons-border' />
            )}

          </IconButton>
        </div>
      </FormControl>
      {/* </div > */}
    </div >
  );
};

export default PropertyDetailsBar;
