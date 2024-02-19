// import React, { useState } from "react";
// import Header from "../../Components/Header/Header";
// import BuyerDetailsPage from './BuyerDetailsPage'
// import PropertyListings from "./PropertyListings";
// import LayoutScreen from "../Buyer/LayoutScreen/LayoutScreen";
// import ChatScreen from "./ChatScreen";
// import BuyerLandingPage from "./BuyerLandingPage/BuyerLandingPage";

// function BuyerMultiStepForm() {
//   const [currentStep, setCurrentStep] = useState("PropertyListing");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//   });


//   const nextStep = (page) => {
//     setCurrentStep(page);
//   };
//   return (
//     <div>
      
//       {currentStep === "BuyerLandingPage" && (
//         <BuyerLandingPage
//           nextStep={nextStep}
//         />
//       )}
//       {currentStep === "PropertyListing" && (
//         <PropertyListings
//           nextStep={nextStep}
//         />
//       )}
//       {currentStep === "BuyerDetailsPage" && (
//         <BuyerDetailsPage
//           nextStep={nextStep}
//         />
//       )}
//       {currentStep === "LayoutScreen" && (
//         <LayoutScreen
//           nextStep={nextStep}
//         />
//       )}
//       {currentStep === "ChatScreen" && (
//         <ChatScreen
//           nextStep={nextStep}
//         />
//       )}
//     </div>
//   );
// }

// export default BuyerMultiStepForm;
