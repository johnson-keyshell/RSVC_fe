import { React, useEffect, useState } from "react";
import ConfirmationDialog from '../../Dialogs/ConfirmationDialog/ConfirmationDialog'
import NewListing from "../../GeneralDetails/General";
import AdditionalDetails from "../../AdditionalDetails/AdditionalDetails";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import "../../../Components/AdditionalDetails/AdditionalDetails.css";
import axios from "axios";
import { API_ROUTES } from "../../../Api";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import InputFieldWithTitle from "../../../Elements/InputFieldWithTitle";
import SelectMenuWithTitle from "../../../Elements/SelectMenuWithTitle";
import { streetOptions, placesOption, signUpTypeOptions, buyingConditionOptions, rentalConditionOptions, typeOptions, buildingTypeOptions } from "../../../Constants/BuildingOptions";
import { isSupportedExcel } from "../../openFileSelection";
import UploadPop from "../../Dialogs/UploadPop";
import Loader from "../../Loader/Loader";

function AdditionalDetailsForm({ nextStep, formData }) {
  const [buildData, setBuildData] = useState({
    Street: "",
    // Number: "",
    // Add: "",
    Postcode: "",
    Place: "",
    // SignUpType: "",
    // PurchasePrice: "",
    // BuyingCondition: "",
    // Rent: "",
    // RentalConditions: "",
    // PerYear: "",
    // PerMonth: "",
    // M2PerYear: "",
    TotalUnits: "",
    RemainingUnits: "",
    // OfWhichIndustrialHall: "",
    // OfWhichOffice: "",
    YearofConstructionorPeriod: "",
    // TypeOf: "",
    // The Commented fields are specific for apartments
  });





  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [triggerRender, setTriggerRender] = useState(false);
  const [excelData, setExcelData] = useState(null);
  const [isLoading, setIsloading] = useState(true);



  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  // const [propertyType, setPropertyType] = useState("Commercial");

  const handleConfirm = async () => {
    //  window.location.href = "/seller";
    let propertyId = searchParams.get("propertyId");
    console.log("PROPRETY ID**************", propertyId);
    if (!propertyId) {
      propertyId = localStorage.getItem("propertyId");
    }
    let data = {
      ...building, propertyId, detailsId: "",
      //  propertyType
    };
    await axios.post(API_ROUTES.addAdditionalDetails, { data }).then((resp) => {
      if (resp && resp.status == 200) {
        Swal.fire({
          icon: "success",
          title: t("success!"),
          text: t("successfullyAddedProperty"),
        }).then(() => {
          localStorage.removeItem("propertyId");
          window.location.href = "/sellers";
        });
      } else {
        alert("Something went wrong");
      }
    });
  };
  const [building, setBuilding] = useState({});
  useEffect(() => {
    const fetchAdditionalDetails = async () => {
      let propertyId = searchParams.get("propertyId");
      if (propertyId) {
        await axios
          .get(API_ROUTES.getAdditionalDetails + `/${propertyId}`)
          .then((result) => {
            if (result && result.data) {
              setBuilding(result?.data);
              setIsloading(false)
              console.log("response in generaldetails====", result?.data);

            }
          });
      }
    };
    fetchAdditionalDetails();
  }, []);

  const handleAddCustomField = () => {
    const updatedBuilding = { ...building };

    var count = 0;
    if (!building.customFields.length) {
      count = building.customFields.length;
    } else {
      const index = building.customFields.length;
      count = building.customFields[index - 1].id + 1;
    }
    // const floorCount = building.floors.length;
    const newCustomFeild = `CF ${count}`;
    const newCF = {
      id: count,
      head: "", // You can set a default name or prompt the user for a name
      desc: "", // Initialize with empty
    };

    // Clone the existing building object and add the new floor
    updatedBuilding.customFields.push(newCF);

    // Update the state or do whatever you need to do with the updated building object
    console.log(updatedBuilding);

    setBuilding(updatedBuilding);
  };

  const handleCustomFieldChange = (fieldId, field, value) => {
    // Clone the building object to make a copy
    const updatedBuilding = { ...building };

    // Find the index of the custom field based on its id or any other identifier
    const fieldIndex = updatedBuilding.customFields.findIndex(
      (cf) => cf.id === fieldId
    );

    if (fieldIndex !== -1) {
      // Update the specific custom field in the cloned object
      updatedBuilding.customFields[fieldIndex][field] = value;

      // Update the state with the updated building object
      setBuilding(updatedBuilding);
    }
  };
  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedFile(null);
  };
  const handleFieldChange = (field, value) => {
    console.log("Build data in change", buildData);
    console.log("field and value", field, value);
    setBuildData((prevData) => {
      const newData = { ...prevData };
      newData[field] = value;
      return newData;
    });

  };
  const downloadCSVFile = () => {
    // try {
    //   if (!building.image) {
    //     throw new Error('No CSV file uploaded');
    //   }

    // } catch (error) {
    //   console.error(error);
    // }
    console.log("Download is called");
  };
  const handleFieldChangeExcel = (field, value) => {
    console.log("Build data in change", buildData);
    console.log("ExcelData", excelData);
    console.log("field and value", field, value);
    // setBuildData((prevData) => {
    //   const newData = { ...prevData };
    //   newData[field] = value;
    //   return newData;
    // });
    setExcelData((prevData) => {
      const newData = [...prevData]; // Create a shallow copy of the array

      const index = newData.findIndex((entry) => entry.key === field);

      if (index !== -1) {
        newData[index] = { key: field, value };
      } else {
        newData.push({ key: field, value });
      }

      return newData;
    });
  };

  const updateBuildData = (blad1Data) => {
    const addedKeyValues = [];
    const notAddedKeyValues = [];

    Object.entries(blad1Data).forEach(([key, value]) => {
      const cleanedKey = key.replace(/\s/g, '');
      if (buildData.hasOwnProperty(cleanedKey)) {
        setBuildData((prevData) => {
          const newData = { ...prevData };
          newData[cleanedKey] = value;
          return newData;
        });
        addedKeyValues.push({ key, value });
      } else {
        notAddedKeyValues.push({ key, value });
      }
    });

    setBuildData((prevData) => {
      const newData = { ...prevData };
      notAddedKeyValues.forEach(({ key, value }) => {
        // Remove spaces from the key before adding to newData
        const cleanedKey = key.replace(/\s/g, '');
        newData[cleanedKey] = value;
      });
      return newData;
    });


    return { addedKeyValues, notAddedKeyValues };
  };


  const handleExcelUpload = () => {
    var formData = new FormData();
    formData.append('document', selectedFile);

    if (formData) {
      fetch(API_ROUTES.postConvertExcel, {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Excel uploaded successfully.', data);
          const blad1Data = data.Blad1[0];

          const { addedKeyValues, notAddedKeyValues } = updateBuildData(blad1Data);
          console.log(addedKeyValues, notAddedKeyValues);
          setExcelData(notAddedKeyValues);

          setTriggerRender(prevState => !prevState);
        })
        .catch(error => {
          console.error('postConvertExcel API request failed:', error);
        });
    }

    handlePopupClose();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    if (file.type.includes('image')) {
      if (!isSupportedExcel(fileName)) {
        alert('Unsupported file format. Please upload an excel sheet');
        return;

      }
      else {
        setSelectedFile(file);
        setShowPopup(true);
      }
    }
    else {
      setSelectedFile(file);
      setShowPopup(true);
    }

  }
  const convertCamelToLabel = (camelCaseString) => {
    return camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2');
  };
  return (
    <div>
      {isLoading ? (<Loader />) :
        (
          <div class="step3">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexGrow: "1",
                width: "100%",
                "@media (max-width: 768px)": {
                  alignItems: "left",
                  flexDirection: "column", // Change to a column layout on smaller screens
                },
              }}
            >
              <div class="path">
                <h2 class="inactive" onClick={handleOpenDialog}>
                  {t("quickInfo")}{" "}
                </h2>
                <h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="12"
                    viewBox="0 0 6 12"
                    fill="none"
                  >
                    <path
                      d="M1 11L4 6L1 1"
                      stroke="#8B8B8B"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </h2>
                <h2 class="inactive" onClick={() => nextStep("AddNewListing")}>
                  {t("AddNewListing")}
                </h2>
                <h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="12"
                    viewBox="0 0 6 12"
                    fill="none"
                  >
                    <path
                      d="M1 11L4 6L1 1"
                      stroke="#8B8B8B"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </h2>
                <h2 class="inactive" onClick={() => nextStep("Amenities")}>
                  {t("generalDetails")}
                </h2>
                <h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="12"
                    viewBox="0 0 6 12"
                    fill="none"
                  >
                    <path
                      d="M1 11L4 6L1 1"
                      stroke="#8B8B8B"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </h2>
                <h2 class="active-menu">{t("additionalDetails")}</h2>
              </div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Button class="candelBtn" onClick={handleOpenDialog}>
                  {t("cancel")}
                </Button>
                <ConfirmationDialog
                  open={open}
                  onClose={handleCloseDialog}
                  onConfirm={handleConfirm}
                />

                <Button class="nextBtn" onClick={handleConfirm}>
                  {t("submit")}
                </Button>
              </Box>
            </Box>
            {/* <AdditionalDetails /> */}
            <div class="addtl-wrapper">
              <Box p={4} display="flex" flexDirection="column">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography class="additional-head">{t("generalDetails")}</Typography>
                  {/* <Box
              class="button-container"
              style={{
                flex: 1,
                overflow: "hidden",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Button class="btn-download-csv" onClick={downloadCSVFile}>
                {t("downloadCSVFormat")}
              </Button>
              <div>
                <label htmlFor="uploadcsvbtn" style={{ marginBottom: "0px" }}>
                  <div
                    class="btn-upload-excel"
                    id="uploadcsvbutton"
                    component="span"
                  >
                    {t("uploadCSVGeneral")}
                  </div>
                </label>
                <input
                  type="file"
                  id="uploadcsvbtn"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
              </div>
            </Box> */}
                </Box>
                <Divider sx={{ mt: 1, mb: 2 }} />
                <Grid item xs={12} md={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={6} md={4}>
                      <Typography class="heading-for-all-additional">
                        {t("description")}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <TextField
                        className="des-add-text"
                        margin="dense"
                        id="description"
                        placeholder={t("descriptionHere")}
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={building.description}
                        onChange={(e) =>
                          setBuilding({ ...building, description: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <InputFieldWithTitle
                        title={t("ageOfBuilding")}
                        placeholder={t("enterDetailsHere")}
                        value={building.AgeOfBuilding}
                        onChange={(value) => setBuilding({ ...building, AgeOfBuilding: parseInt(value) })}
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <SelectMenuWithTitle
                        title={t("propertyType")}
                        options={buildingTypeOptions}
                        value={building.PropertyType}
                        onChange={(e) => setBuilding({ ...building, PropertyType: (e.target.value) })}
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <InputFieldWithTitle
                        title={t("yearOfConstructionOrPeriod")}
                        disabled={false}
                        placeholder={t("yearOfConstructionOrPeriod")}
                        value={building.YearOfConstructionOrPeriod}
                        onChange={(value) => setBuilding({ ...building, YearOfConstructionOrPeriod: (value) })}
                      />
                    </Grid>
                    {building.additionalFields && (
                      Object.entries(building.additionalFields).map(([key, value]) => (
                        <Grid item xs={6} md={4} key={key}>
                          <InputFieldWithTitle
                            title={t(key)}
                            disabled={false}
                            placeholder={t("enterChanges")}
                            value={value}
                            onChange={(newValue) => setBuilding({ ...building, additionalFields: { ...building.additionalFields, [key]: newValue } })}
                          />
                        </Grid>
                      ))
                    )}
                  </Grid>
                </Grid>
              </Box>
            </div>
            {showPopup && (
              <UploadPop
                open={showPopup}
                onClose={handlePopupClose}
                selectedFile={selectedFile}
                handleUpload={handleExcelUpload}
                handlePopupClose={handlePopupClose}
              />
            )}
          </div>
        )}
    </div>

  );
}

export default AdditionalDetailsForm;
