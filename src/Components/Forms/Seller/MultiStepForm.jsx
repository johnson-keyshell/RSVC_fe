import React, { useEffect, useState } from "react";
import AddNewListingForm from "./AddNewListingForm";
import AmenitiesForm from "./AmenitiesForm";
import AdditionalDetailsForm from "./AdditionalDetailsForm";
import SellerDetailsPage from '../../../Screens/Seller/SellerDetailsPage/SellerDetailsPage' 
import Quickinfo from "../../Quickinfo/Quickinfo";
import { useLocation } from "react-router-dom";

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState("Quickinfo");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const targetStep = queryParams.get("step");

    if (targetStep) {
      setCurrentStep(targetStep);
    }
  }, [location.search]);

  const nextStep = (page) => {
    setCurrentStep(page || getNextStep(currentStep));
  };

  const getNextStep = (currentStep) => {
    switch (currentStep) {
      case "Quickinfo":
        return "AddNewListing";
      case "AddNewListing":
        return "Amenities";
      case "Amenities":
        return "AdditionalDetails";
      // Add more cases as needed based on your step sequence
      default:
        return currentStep;
    }
  };
  


  // const nextStep = (page) => {
  //   setCurrentStep(page);
  // };
  return (
    <div>
      {currentStep === "DetailsPage" && (
        <SellerDetailsPage
        nextStepCallback={nextStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === "Quickinfo" && (
        <Quickinfo
          nextStep={nextStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === "AddNewListing" && (
        <AddNewListingForm
          nextStep={nextStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === "Amenities" && (
        <AmenitiesForm
          nextStep={nextStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === "AdditionalDetails" &&
        <AdditionalDetailsForm
          nextStep={nextStep}
          formData={formData} />}
    </div>
  );
}

export default MultiStepForm;
