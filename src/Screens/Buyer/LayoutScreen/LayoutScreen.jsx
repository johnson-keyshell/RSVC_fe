import React from "react";
import { useState, useEffect } from "react";
import "./LayoutScreen.css";
import "react-toastify/dist/ReactToastify.css";
import { API_ROUTES } from '../../../Api';
import Loader from "../../../Components/Loader/Loader";
import LayoutScreenBuyer from './LayoutScreenBuyers'
import LayoutScreenSelected from "./LayoutScreenSelected";


function LayoutScreen({ nextStep }) {

  const [isLoading, setIsLoading] = React.useState(true);
  const [sailData, setSailData] = useState();
  useEffect(() => {
    fetch(API_ROUTES.getSelection)
      .then((response) => response.json())
      .then((data) => {
        console.log("Layout page Selected sail data is  ", data);
        setSailData(data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('getSelection API request failed:', error);
      });
  }, []);

 

  return (

    <div>
      {isLoading ? (
        <Loader /> 
      ) : (
        <div>
          {sailData?.sailStatus === undefined ?
            (<LayoutScreenBuyer />) : (<LayoutScreenSelected />)
          }
        </div>)
      }
    </div >
  );
}

export default LayoutScreen;
