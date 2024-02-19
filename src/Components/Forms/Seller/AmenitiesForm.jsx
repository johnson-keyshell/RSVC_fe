import { React, useState, useRef, useEffect } from "react";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog/ConfirmationDialog";
import OpenImageDialogBox from "../../Dialogs/OpenImageDialog/OpenImageDialog";
import { DeleteIcon } from "@chakra-ui/icons";
import Loader from '../../Loader/Loader';

import {
  Grid,
  Box,
  Button,
  Typography,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Divider,
  IconButton,
  Dialog,
  DialogContent,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import { isSupportedImage, openFileSelection } from "../../openFileSelection";
import axios from "axios";
import { API_ROUTES } from "../../../Api";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Amenities from "../../Amenities/Amenities";//important line if removed all css will go
import InputFieldWithTitle from "../../../Elements/InputFieldWithTitle";
import SelectMenuWithTitle from "../../../Elements/SelectMenuWithTitle";
import { streetOptions, placesOption, signUpTypeOptions, buyingConditionOptions, rentalConditionOptions, typeOptions } from "../../../Constants/BuildingOptions";
import { isSupportedExcel } from "../../openFileSelection";
import UploadPop from "../../Dialogs/UploadPop";
import ApartmentSpecificDetails from "./ApartmentSpecificDetails";
import Snackbars from "../../Dialogs/Snackbar/Snackbars";

function AmenitiesForm({ nextStep, formData, setFormData }) {
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams] = useSearchParams();
  let propertyId = searchParams.get("propertyId");
  const [excelData, setExcelData] = useState();

  const availableAmenityOptions = [
    "Select an option",
    "Bedroom",
    "Bathroom",
    "Kitchen",
    "Hall",
    "Wifi",
    "Conference Room",
    "Other",
  ];
  const commonFeilds = [
    "Street",
    "Postcode",
    "Place",
    "YearOfConstructionOrPeriod"

  ]
  const [floors, setFloors] = useState(null);
  const [property, setProperty] = useState(null);
  const [editingLayoutId, setEditingLayoutId] = useState(null);
  const [newLayoutName, setNewLayoutName] = useState("");
  const [floorStates, setFloorStates] = useState();
  const { i18n, t } = useTranslation();

  const [currentPropertyId, setCurrentPropertyId] = useState(
    localStorage.getItem("propertyId")
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [triggerRender, setTriggerRender] = useState(false);
  const [openExcelUploadSnackbar, setOpenExcelUploadSnackbar] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);

  const handleCloseLoader = () => {
    setOpenLoader(false);
  };
  const handleCloseExcelUploadSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenExcelUploadSnackbar(false);
  };


  useEffect(() => {
    if (!propertyId) {
      propertyId = currentPropertyId;
    }
    fetch(API_ROUTES.getOwnerGeneralDetails(propertyId))
      .then((response) => response.json())
      .then((data) => {
        // setFloors(data?.floors);
        setCurrentPropertyId(data?.propertyId)
        setFloors(data?.floors);
        setProperty(data?.property)
        setFloorStates(data?.floors.map((floor) => ({
          id: floor?.FloorID,
          expanded: false,
        })))
        console.log("Response in Amenities====", data);
        setIsLoading(false);

      })
      .catch((error) => {
        console.error(' getOwnerGeneralDetails API request failed:', error);
      });


  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  const [openImageDialog, setOpenImageDialog] = useState(false);

  const handleViewImage = (floorID, apartmentID, amenityId, title, imageId) => {
    var image = null;

    if (title === "apartment") {
      floors.map((floor) => {

        if (floor.FloorID === floorID) {
          floor.apartments.map((apartment) => {
            if (apartment.ApartmentID === apartmentID) {
              try {
                image = URL.createObjectURL(floor.apartment.Image.ImageID);
                setSelectedImage(image);
              } catch (error) {
                image = apartment?.Image;
                setSelectedImage(image.ImageLink);
              }
            }
          })
        }
      });
    } else if (title === "amenity") {
      floors.map((floor) => {
        if (floor.FloorID === floorID) {
          floor.apartments.map((apartment) => {
            if (apartment.ApartmentID === apartmentID) {
              apartment.amenities.map((amenity) => {
                if (amenity.AmenityID === amenityId) {
                  amenity.Images.map((image) => {
                    if (image.ImageID === imageId) {
                      try {
                        image = URL.createObjectURL(image.ImageID);
                        setSelectedImage(image);
                      } catch (error) {

                        setSelectedImage(image.ImageLink);
                      }
                    }
                  })

                }
              })

            }
          })
        }
      });
    }
    setOpenImageDialog(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setOpenImageDialog(false);
  };
  // Function to toggle the expanded/collapsed state of a floor
  const toggleFloorState = (floorId) => {
    setFloorStates((prevFloorStates) =>
      prevFloorStates.map((state) =>
        state.id === floorId ? { ...state, expanded: !state.expanded } : state
      )
    );
  };

  //Expand when click on add layout

  const isAmenityOptionSelected = (layout, option) => {
    return layout.amenities.some((amenity) => amenity.AmenityType === option);
  };

  const handleFloorNameChange = (floorId, newName) => {
    const updatedFloors = floors.map((floor) => {
      if (floor.FloorID === floorId) {
        return { ...floor, name: newName };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };

  const layoutImageInputRefs = useRef({});

  const handleAddLayout = (floorId) => {
    const updatedFloors = floors.map((floor) => {
      if (floor.FloorID === floorId) {

        var apartmentCount = 0;
        let newLayoutName = "";
        if (!floor.apartments.length) {
          apartmentCount = floor.apartments.length;
          newLayoutName = `Apartment ${apartmentCount}`;
        } else {
          apartmentCount = floor.apartments.length + 1 + Math.floor(Math.random() * 100);
          newLayoutName = t("newApartment");
        }

        const newLayout = {
          floor: floorId,
          ApartmentID: apartmentCount,
          ApartmentName: newLayoutName,
          amenities: [
            {
              floor: floorId,
              layout: apartmentCount,
              // id: 0,
              AmenityType: "Select an option", // Keep the type null for now
              Number: 0,
              images: [{ image: null }],
              imageSrc: "",
            },
          ],
          image: null,
          price: null,
          availableAmenityOptions: [
            "Select an option",
            "Bedroom",
            "Bathroom",
            "Kitchen",
            "Hall",
            "Other",
          ],
        };

        if (!floor.apartments) {
          floor.apartments = [];
        }
        // Check if the last added layout has an empty amenity type
        // if (floor.apartments.length) {
        //   const lastLayout = floor.apartments[floor.apartments.length - 1];
        //   const hasNullTypeAmenity = lastLayout.amenities.some(
        //     (amenity) => amenity.AmenityType === "Select an option"
        //   );
        //   const hasNoAmenity = lastLayout.amenities.length;

        //   if (hasNullTypeAmenity || !hasNoAmenity) {
        //     // Set an error for this layout using its ID
        //     setAmenityErrors((prevErrors) => ({
        //       ...prevErrors,
        //       [`${floor.FloorID}-${lastLayout.ApartmentID}`]:
        //         "Please complete current layout.",
        //     }));
        //   } else {
        //     // Clear the error for this layout using its ID
        //     setAmenityErrors((prevErrors) => ({
        //       ...prevErrors,
        //       [`${floor.FloorID}-${lastLayout.ApartmentID}`]: "",
        //     }));
        //     if (floor.apartments) {
        //       floor.apartments.push(newLayout);
        //     } else {
        //       floor.apartments.push(newLayout);
        //     }
        //   }
        // } else {

        floor.apartments.push(newLayout);
        // }
      }
      return floor;
    });
    console.log(
      "FLOOR--------------",
      updatedFloors ? updatedFloors : "no floor"
    );
    setFloors(updatedFloors);
  };
  const handleDeleteApartment = (floorId, apartmentID) => {
    const updatedFloors = floors.map((floor) => {
      if (floor.FloorID === floorId) {
        const updatedApartments = floor.apartments.filter(
          (apartment) => apartment.ApartmentID !== apartmentID
        );
        return { ...floor, apartments: updatedApartments };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };

  const handleApartmentNameChange = (floorId, apartmentID, newName) => {
    const updatedFloors = floors.map((floor) => {
      if (floor.FloorID === floorId) {
        const updatedApartments = floor.apartments.map((apartment) => {
          if (apartment.ApartmentID === apartmentID) {
            return { ...apartment, ApartmentName: newName };
          }
          return apartment;
        });
        return { ...floor, apartments: updatedApartments };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };

  const [amenityErrors, setAmenityErrors] = useState({}); // State to store amenity errors

  const handleAddAmenity = (floorId, apartmentID) => {
    const updatedFloors = floors.map((floor) => {
      if (floor.FloorID === floorId) {
        const updatedApartments = floor.apartments.map((apartment) => {
          if (apartment.ApartmentID === apartmentID) {
            var count = 0;
            var index = 0;
            index = apartment.amenities?.length;
            count = apartment.amenities[index - 1]?.AmenityID;
            // Check if any existing amenity within the same layout has a null type
            const hasNullTypeAmenity = apartment.amenities.some(
              (amenity) => amenity.AmenityType === "Select an option"
            );

            if (hasNullTypeAmenity) {
              // Set an error for this amenity using its ID
              console.log("error count", `${floor.FloorID}-${apartment.ApartmentID}-${count}`);
              setAmenityErrors((prevErrors) => ({
                ...prevErrors,
                [`${floor.FloorID}-${apartment.ApartmentID}-${count}`]:
                  t("pleaseSelectAnAmenityTypeBeforeAddingMore"),
              }));
              console.log("error ", amenityErrors);
            } else {
              // Clear the error for this amenity using its ID
              setAmenityErrors((prevErrors) => ({
                ...prevErrors,
                [`${floor.FloorID}-${apartment.ApartmentID}-${count}`]: "",
              }));
              const defaultType = "Select an option";

              const amenityCopy = [...apartment.amenities];

              return {
                ...apartment,
                amenities: [
                  ...amenityCopy,
                  {
                    floor: floorId,
                    apartment: apartmentID,
                    AmenityID: index + Math.floor(Math.random() * 100),
                    AmenityType: defaultType,
                    Number: 0,
                    images: [{ image: null }],
                    imageSrc: "",
                  },
                ],
              };
            }
          }
          return apartment;
        });
        return { ...floor, apartments: updatedApartments };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };

  const handleAmenityCountChange = (floorId, apartmentID, amenityId, newValue) => {
    newValue = Math.max(0, newValue);
    const updatedFloors = floors.map((floor) => {
      if (floor.FloorID === floorId) {
        const updatedApartments = floor.apartments.map((apartment) => {
          if (apartment.ApartmentID === apartmentID) {
            const updatedAmenities = apartment.amenities.map((amenity) => {
              if (amenity.AmenityID === amenityId) {
                return { ...amenity, Number: newValue };
              }
              return amenity;
            });
            return { ...apartment, amenities: updatedAmenities };
          }
          return apartment;
        });
        return { ...floor, apartments: updatedApartments };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };

  const handleAmenityTypeChange = (floorId, apartmentID, amenityId, newValue) => {
    const updatedFloors = floors.map((floor) => {
      if (floor.FloorID === floorId) {
        const updatedApartments = floor.apartments.map((apartment) => {
          if (apartment.ApartmentID === apartmentID) {
            const updatedAmenities = apartment.amenities.map((amenity) => {
              if (amenity.AmenityID === amenityId) {
                const selectedAmenity = amenity;
                const optionIndex = availableAmenityOptions.indexOf(
                  selectedAmenity.AmenityType
                );
                setAmenityErrors((prevErrors) => ({
                  ...prevErrors,
                  [`${floor.FloorID}-${apartment.ApartmentID}-${amenityId}`]: "",
                }));
                setAmenityErrors((prevErrors) => ({
                  ...prevErrors,
                  [`${floor.FloorID}-${apartment.ApartmentID}`]: "",
                }));
                if (optionIndex !== -1) {
                  availableAmenityOptions.splice(optionIndex, 1);
                }
                selectedAmenity.AmenityType = newValue;
                return selectedAmenity;
              }
              return amenity;
            });
            return { ...apartment, amenities: updatedAmenities };
          }
          return apartment;
        });
        return { ...floor, apartments: updatedApartments };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };


  const handleAmenityImageUpload =
    (floorId, apartmentID, amenityId) => async () => {
      try {
        const file = await openFileSelection();

        if (!file) {
          throw new Error("No file selected");
        }

        const fileName = file.name;

        if (!isSupportedImage(fileName)) {
          alert(
            "Unsupported file format. Please upload an image (jpg, jpeg, png, or gif)."
          );
          return;
        }

        const updatedFloors = await Promise.all(
          floors.map(async (floor) => {
            if (floor.FloorID === floorId) {
              const updatedApartments = await Promise.all(
                floor.apartments.map(async (apartment) => {
                  if (apartment.ApartmentID === apartmentID) {
                    const updatedAmenities = await Promise.all(
                      apartment.amenities.map(async (amenity) => {
                        if (amenity.AmenityID === amenityId) {
                          const formData = new FormData();
                          formData.append("image", file);
                          const result = await axios.post(
                            API_ROUTES.uploadPropertyImage,
                            formData,
                            {
                              headers: {
                                "Content-Type": "multipart/form-data",
                                "x-rapidapi-host":
                                  "file-upload8.p.rapidapi.com",
                                "x-rapidapi-key": "your-rapidapi-key-here",
                              },
                            }
                          );

                          amenity.Images = amenity.Images || [];
                          if (result?.data) {
                            const imageUrl = URL.createObjectURL(file);

                            // Create an object with image details
                            const imageDetails = {
                              ImageID: result.data,
                              ImageName: file.name,
                              ImageLink: imageUrl,
                            };

                            // Add the image details to the amenity.Images array
                            amenity.Images.push(imageDetails);
                          }
                          return amenity;

                        }
                        return amenity;
                      })
                    );
                    return { ...apartment, amenities: updatedAmenities };
                  }
                  return apartment;
                })
              );
              return { ...floor, apartments: updatedApartments };
            }
            return floor;
          })
        );

        setFloors(updatedFloors);
      } catch (error) {
        console.error(error);
      }
    };

  const handleDeleteAmenityImage = (floorId, apartmentID, amenityId, imageId) => {
    const updatedFloors = floors.map((floor) => {
      if (floor.FloorID === floorId) {
        const updatedApartments = floor.apartments.map((apartment) => {
          if (apartment.ApartmentID === apartmentID) {
            const updatedAmenities = apartment.amenities.map((amenity) => {
              if (amenity.AmenityID === amenityId) {
                const updatedImages = amenity.Images.filter((image) => image.ImageID !== imageId);
                return { ...amenity, Images: updatedImages };
              }
              return amenity;
            });
            return { ...apartment, amenities: updatedAmenities };
          }
          return apartment;
        });
        return { ...floor, apartments: updatedApartments };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };



  const handleDeleteAmenity = (floorId, apartmentID, amenityId) => {
    const updatedFloors = floors.map((floor) => {
      if (floor.FloorID === floorId) {
        const updatedApartments = floor.apartments.map((apartment) => {
          if (apartment.ApartmentID === apartmentID) {
            const updatedAmenities = apartment.amenities.filter(
              (amenity) => amenity.AmenityID !== amenityId
            );
            return { ...apartment, amenities: updatedAmenities };
          }
          return apartment;
        });
        return { ...floor, apartments: updatedApartments };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };

  const handleApartmentImageUpload = (floorID, apartmentID) => async (e) => {
    // function to upload apartment image
    try {
      const file = await openFileSelection();

      if (!file) {
        throw new Error("No file selected");
      }

      const fileName = file.name;

      // Validate the file.
      if (!isSupportedImage(fileName)) {
        alert(
          "Unsupported file format. Please upload an image (jpg, jpeg, png, or gif)."
        );
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      try {
        const result = await axios.post(
          API_ROUTES.uploadPropertyImage,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-rapidapi-host": "file-upload8.p.rapidapi.com",
              "x-rapidapi-key": "your-rapidapi-key-here",
            },
          }
        );

        if (result) {
          const imageUrl = URL.createObjectURL(file);
          console.log("Image uploaded for apartment");
          // Update the floors state with the new image file.
          const updatedFloors = floors.map((floor) => {
            if (floor.FloorID === floorID) {
              const updatedApartments = floor.apartments.map((apartment) => {
                if (apartment.ApartmentID === apartmentID) {

                  apartment.Image = apartment.Image ?? {};
                  if (result?.data) {
                    apartment.Image.ImageID = result.data;
                    apartment.Image.ImageName = file.name;
                    apartment.Image.ImageLink = imageUrl;

                    return apartment;
                  }
                }
                return apartment;
              });
              return { ...floor, apartments: updatedApartments };
            }
            return floor;
          });
          setFloors(updatedFloors);
        }
      } catch (error) {
        console.log("Error while uploading image: ", error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCSVUpload = () => async (e) => {
    try {
      const file = await openFileSelection();

      if (!file) {
        throw new Error("No file selected");
      }

      const fileName = file.name;

      // Validate the file.
      if (!isSupportedImage(fileName)) {
        alert(
          "Unsupported file format. Please upload an image (jpg, jpeg, png, or gif)."
        );
        return;
      }

      // Update the floors state with the new image file.
    } catch (error) {
      console.error(error);
    }
  };
  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedFile(null);
  };


  const downloadCSVFile = () => {
    console.log("Download is called");
    const link = document.createElement('a');
    // Set the href attribute to the API endpoint or file URL
    link.href = API_ROUTES.getExcelTemplate;
    document.body.appendChild(link);
    // Programmatically click the link to trigger the download
    link.click();
    // Remove the link from the document body
    document.body.removeChild(link);
  };


  const updateFloorDataAfterExcelUpload = (excelData, floorData) => {
    const updatedData = [...floorData];
    let alertShown = false;

    excelData.forEach((excelFloor) => {
      const floorName = excelFloor.FloorName;
      const existingFloorIndex = updatedData.findIndex((floor) => floor.FloorName === floorName);

      if (existingFloorIndex !== -1) {
        const existingApartmentIndex = updatedData[existingFloorIndex]?.apartments?.findIndex(
          (apartment) => apartment.ApartmentName === excelFloor.ApartmentName
        );

        if (existingApartmentIndex !== -1) {
          const existingApartment = updatedData[existingFloorIndex].apartments[existingApartmentIndex];

          // Clone additionalFields using the spread operator
          const additionalFields = { ...existingApartment?.additionalFields };

          const keysToReplace = Object.keys(excelFloor);
          keysToReplace.forEach((key) => {
            if (key !== 'FloorName' && key !== 'ApartmentName') {
              // Update or add the key-value pair
              additionalFields[key] = excelFloor[key];
            }
          });

          // Update the existingApartment immutably
          const updatedApartment = {
            ...existingApartment,
            additionalFields: additionalFields,
            // Price: excelFloor?.PurchasePrice
          };
          updatedData[existingFloorIndex] = {
            ...updatedData[existingFloorIndex],
            apartments: [
              ...updatedData[existingFloorIndex].apartments.slice(0, existingApartmentIndex),
              updatedApartment,
              ...updatedData[existingFloorIndex].apartments.slice(existingApartmentIndex + 1),
            ],
          };


        }

        else {
          updatedData[existingFloorIndex].apartments.push({
            ApartmentID: excelFloor.ApartmentName,
            ApartmentName: excelFloor.ApartmentName,
            // Price: excelFloor?.PurchasePrice,
            amenities: [],
            additionalFields: {
              ...Object.fromEntries(Object.entries(excelFloor).filter(([key]) => key !== 'FloorName' && key !== 'ApartmentName')),
            },
          });
        }
      } else {
        if (!alertShown) {
          alert(
            'This Excel Contains Floornames which are different from those given in the previous page. Go back to the previous page and provide correct floor names in the floor section as well.'
          );
          alertShown = true;
          nextStep("AddNewListing");
        }
      }
    });

    return updatedData;
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
          const blad1Data = data.Blad1;
          setExcelData(data.Blad2);
          const updatedFloorData = updateFloorDataAfterExcelUpload(blad1Data, floors);
          console.log("Update floor data", updatedFloorData);
          setOpenExcelUploadSnackbar(true);
          setFloors(updatedFloorData);

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

  const handleDeleteLayoutImage = (floorId, apartmentID) => {
    console.log("entering delete");
    const updatedFloors = floors.map((floor) => {
      if (floor.FloorID === floorId) {
        const updatedApartments = floor.apartments.map((apartment) => {
          if (apartment.ApartmentID === apartmentID) {
            return { ...apartment, Image: null, Status: 0 };
          }
          return apartment;
        });
        return { ...floor, apartments: updatedApartments };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };
  const [open, setOpen] = useState(false);


  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    window.location.href = "/sellers";
  };

  const handleSubmitFloors = async () => {
    setOpenLoader(true);
    // e.preventDefault();
    let dataArr = [];
    if (floors && floors.length > 0) {
      for (let i = 0; i < floors.length; i++) {
        const elem = floors[i];
        delete elem["id"];
        let respoObj = {
          id: elem?.FloorID,
          layout: elem.apartments ? elem.apartments : [],
        };
        dataArr.push(respoObj);
      }
    }
    console.log({ floors });
    let sampleFormat = {
      data: {
        propertyId: currentPropertyId,
        floors: floors.map((floor) => ({
          id: floor.FloorID,
          layout: floor.apartments.map((apartment) => ({
            id: apartment.ApartmentID !== apartment.ApartmentName ? apartment.ApartmentID : undefined,
            name: apartment.ApartmentName,
            Image: apartment.Image?.ImageID,
            Price: apartment.Price,
            additionalFields: apartment.additionalFields,
            amenities: apartment.amenities.map((amenity) => ({
              id: amenity.AmenityID,
              name: amenity.AmenityType,
              number: amenity.Number,
              images: amenity?.Images?.map((image) => image.ImageID) || [],
            })),
          })),
        })),
        property: property
      },

    };
    if (excelData && excelData[0]) {
      sampleFormat.data.property.YearOfConstructionOrPeriod = excelData[0]?.YearOfConstructionOrPeriod;
      sampleFormat.data.property.address.Area = excelData[0]?.Street;
      sampleFormat.data.property.address.Pincode = excelData[0]?.Postcode;
      sampleFormat.data.property.address.Place = excelData[0]?.Place;
      sampleFormat.data.property.PropertyType = excelData[0]?.PropertyType;
      if (sampleFormat.data.property) {
        const additionalDetails = sampleFormat.data.property?.additionalDetails || {};
        Object.entries(excelData[0])
          .filter(([key]) => !commonFeilds.includes(key))
          .forEach(([key, value]) => {
            additionalDetails[key] = value;
          });
        sampleFormat.data.property.additionalFields = additionalDetails;
      }

    }
    console.log("Sample Format===", sampleFormat);

    await axios
      .post(API_ROUTES.addGeneralDetails, sampleFormat)
      .then((resp) => {
        if (resp.status == 200) {
          setOpenLoader(false);
          nextStep("AdditionalDetails");
        }
      });
  };

  return (

    <div>

      {isLoading ?
        (<Loader />) :

        (<div class="step2">
          <Box
            sx={{
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
              alignItems: "center",
              flexGrow: "1",
              "@media (max-width: 768px)": {
                width: "100%",
                flexDirection: "column",
                alignItems: "left",
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

              <h2 class="active-menu"> {t("generalDetails")}</h2>
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
              {/* <Button class="nextBtn" onClick={() => nextStep("AdditionalDetails")}>
            {t("next")}
          </Button> */}
              <Button class="nextBtn" onClick={() => handleSubmitFloors()}>
                {t("next")}
              </Button>
            </Box>
          </Box>
          {/* <Amenities /> */}
          <>
            <div class="wrapper">
              <div class="floor">
                <div>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      class="text-amenities"
                      variant="body1"
                      fontWeight={500}
                    >
                      {t("AddAmenities")}
                    </Typography>
                    {/* need change in this page */}
                    <Box
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
                        {t("downloadExcelFormat")}
                      </Button>
                      <div>
                        <label htmlFor="uploadcsvbtn" style={{ marginBottom: "0px" }}>
                          <div
                            class="btn-upload-excel"
                            id="uploadcsvbutton"
                            component="span"
                          >
                            {t("uploadExcel")}
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
                    </Box>
                  </Box>
                </div>
                <div>
                  <Divider
                    class="amenities-divider"
                    variant="middle"
                    color="#D9D9D9"
                    sx={{ mt: "35px", mb: 0, ml: 0 }}
                  />
                </div>

                {floors.
                  sort((floorA, floorB) => floorA.FloorName.localeCompare(floorB.FloorName)).
                  map((floor) => (
                    <div key={floor.FloorID}>
                      <Grid item xs={12} key={floor.FloorID}>
                        <div
                          class="floor-header"
                          onClick={() => toggleFloorState(floor.FloorID)}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexGrow: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                flexGrow: 1,
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                variant="body1"
                                class="text-floor-name"
                                fontWeight={400}
                              >
                                {floor?.FloorName}
                              </Typography>
                            </Box>

                            <button
                              class={`expand-button ${floorStates.find((state) => state.id === floor.FloorID)
                                ?.expanded
                                ? "expanded"
                                : ""
                                }`}
                            >
                              {floorStates.find((state) => state.id === floor.FloorID)
                                ?.expanded ? (
                                <ExpandLessOutlinedIcon />
                              ) : (
                                <ExpandMoreIcon />
                              )}
                            </button>
                          </Box>
                        </div>
                        {floorStates.find((state) => state.id === floor.FloorID)
                          ?.expanded && (
                            // Render floor details if the floor is expanded
                            <div class="floor-details">
                              {floor.apartments?.
                                sort((a, b) => a.ApartmentName.localeCompare(b.ApartmentName)).
                                map((apartment) => (
                                  <div class="layout-container" key={apartment.ApartmentID}>
                                    <div class="layout-content">
                                      <Grid item xs={12} key={apartment.ApartmentID}>
                                        <Grid container spacing={2} class="main-grid">
                                          <Grid item xs={12} md={6} >
                                            {editingLayoutId === apartment.ApartmentID ? (
                                              <input
                                                type="text"
                                                value={newLayoutName}
                                                onChange={(e) =>
                                                  setNewLayoutName(e.target.value)
                                                }
                                                onBlur={() =>
                                                  handleApartmentNameChange(
                                                    floor.FloorID,
                                                    apartment.ApartmentID,
                                                    newLayoutName
                                                  )
                                                }
                                                onKeyPress={(e) => {
                                                  if (e.key === "Enter") {
                                                    handleApartmentNameChange(
                                                      floor.FloorID,
                                                      apartment.ApartmentID,
                                                      newLayoutName
                                                    );
                                                    setEditingLayoutId(null);
                                                  }
                                                }}
                                                autoFocus
                                              />
                                            ) : (
                                              <Typography
                                                variant="body1"
                                                class="text-layout-name"
                                                fontWeight={600}
                                                onClick={() => {
                                                  setEditingLayoutId(apartment.ApartmentID);
                                                  setNewLayoutName(apartment.ApartmentName);
                                                }}
                                              >
                                                {apartment.ApartmentName}
                                              </Typography>
                                            )}
                                          </Grid>
                                          <Grid item xs={12} md={6} >

                                            <Box
                                              class="button-container"
                                              style={{
                                                flex: 1,
                                                overflow: "hidden",
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                alignItems: "center",
                                              }}
                                            >
                                              {apartment.Image ? (
                                                <div class="layout-image-container">
                                                  <Box
                                                    sx={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      flexGrow: 1,
                                                    }}
                                                  >
                                                    <Typography
                                                      class="layout-image-name"
                                                      variant="body1"
                                                    >
                                                      {apartment.Image?.ImageName}
                                                    </Typography>
                                                    <IconButton
                                                      class="viewIcon-layout-image"
                                                      onClick={() =>
                                                        handleViewImage(
                                                          floor.FloorID,
                                                          apartment.ApartmentID,
                                                          undefined,
                                                          "apartment"
                                                        )
                                                      }
                                                    >
                                                      <VisibilityIcon className="visibilityIcon" />
                                                    </IconButton>
                                                    <IconButton
                                                      class="delete-icon-layout-image"
                                                      onClick={(e) =>
                                                        handleDeleteLayoutImage(
                                                          floor.FloorID,
                                                          apartment.ApartmentID
                                                        )
                                                      }
                                                    >
                                                      <DeleteIcon className="deleteIcon" />
                                                    </IconButton>
                                                  </Box>
                                                </div>
                                              ) : (
                                                <div class="button-container">
                                                  <Button
                                                    class="amenity-image-btn"
                                                    id={`layout-image-input-button-${floor.FloorID}-${apartment.ApartmentID}`}
                                                    key={`layout-image-input-button-${floor.FloorID}-${apartment.ApartmentID}`}
                                                    onClick={(e) =>
                                                      handleApartmentImageUpload(
                                                        floor.FloorID,
                                                        apartment.ApartmentID
                                                      )(e)
                                                    }
                                                  >
                                                    {/* <label htmlFor={`layout-image-input-${floor.FloorID}-${layout.ApartmentID}`}> */}
                                                    {t("uploadApartmentImage")}
                                                    {/* </label> */}
                                                  </Button>

                                                </div>
                                              )}
                                              <Typography
                                                variant="body2"
                                                class="remove-text"
                                                onClick={() =>
                                                  handleDeleteApartment(
                                                    floor.FloorID,
                                                    apartment.ApartmentID,

                                                  )
                                                }
                                              >
                                                {t("removeApartment")}
                                              </Typography>
                                            </Box>
                                          </Grid>
                                        </Grid>

                                        <Grid container spacing={2} class="main-grid">
                                          <Grid item xs={6} md={4}>
                                            <Typography
                                              variant="body1"
                                              class="header-text"
                                              fontWeight={500}
                                            >
                                              {t("amenity")}
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6} md={3}>
                                            <Typography
                                              variant="body1"
                                              class="header-text"
                                              fontWeight={500}
                                            >
                                              {t("number")}
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                        <Grid
                                          container
                                          spacing={2}
                                          class="amenity-container"
                                        >
                                          {apartment.amenities.map((amenity) => (
                                            <Grid
                                              container
                                              spacing={2}
                                              key={amenity.AmenityID}
                                            // class="amenity-container"
                                            >
                                              <Grid item xs={6} md={4}>
                                                <Box
                                                  sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    flexGrow: 1,
                                                  }}
                                                >
                                                  <FormControl
                                                    fullWidth
                                                    sx={{ border: "none" }}
                                                  >
                                                    <Select
                                                      variant="filled"
                                                      labelId="amenity-type"
                                                      id="amenity-type"
                                                      key="amenity-type"
                                                      value={
                                                        amenity.AmenityType || "Select an option"
                                                      }
                                                      sx={{
                                                        "&.MuiInputBase-root,.MuiFilledInput-root,.MuiSelect-root":
                                                        {
                                                          backgroundColor:
                                                            " #EDEDED !important",
                                                          borderRadius: "20px",
                                                          maxWidth: "258px",
                                                          paddingTop: "10px",
                                                          marginBottom: "5px",
                                                          maxHeight: "40px",
                                                          display: "flex",
                                                          flexGrow: "1",
                                                          alignItems: "center",
                                                        },
                                                        "&.MuiSelect-select,.MuiInputBase-input,.MuiFilledInput-input:focus ":
                                                        {
                                                          paddingTop: "0px !important",
                                                          backgroundColor:
                                                            "#EDEDED !important",
                                                          borderRadius: "20px",
                                                        },
                                                        "&.MuiFormControl-root": {
                                                          width: "fit-content",
                                                        },
                                                      }}
                                                      onChange={(e) =>
                                                        handleAmenityTypeChange(
                                                          floor.FloorID,
                                                          apartment.ApartmentID,
                                                          amenity.AmenityID,
                                                          e.target.value
                                                        )
                                                      }
                                                    >
                                                      {availableAmenityOptions.map(
                                                        (option) => (
                                                          <MenuItem
                                                            key={option}
                                                            value={option}
                                                            disabled={
                                                              option !== "Other" &&
                                                              isAmenityOptionSelected(
                                                                apartment,
                                                                option
                                                              )
                                                            }
                                                          >
                                                            {option}
                                                          </MenuItem>
                                                        )
                                                      )}
                                                    </Select>
                                                    {amenityErrors[
                                                      `${floor.FloorID}-${apartment.ApartmentID}-${amenity.AmenityID
                                                      }`
                                                    ] && (
                                                        <Typography
                                                          variant="body2"
                                                          class="error-text"
                                                        >
                                                          {
                                                            amenityErrors[
                                                            `${floor.FloorID}-${apartment.ApartmentID}-${amenity.AmenityID
                                                            }`
                                                            ]
                                                          }
                                                        </Typography>
                                                      )}
                                                  </FormControl>
                                                </Box>
                                              </Grid>
                                              <Grid item xs={6} md={3}>
                                                <Box
                                                  sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    flexGrow: 1,
                                                  }}
                                                >
                                                  <TextField
                                                    id={`amenity-count-${floor.FloorID}-${apartment.ApartmentID}-${amenity.AmenityID}`}
                                                    key={`amenity-count-${floor.FloorID}-${apartment.ApartmentID}-${amenity.AmenityID}`}
                                                    type="number"
                                                    value={String(
                                                      amenity.Number
                                                    ).padStart(2, "0")}
                                                    sx={{
                                                      "&.MuiInputBase-input,.MuiInput-input":
                                                      {
                                                        backgroundColor: "#EDEDED",
                                                        borderRadius: "20px",
                                                        alignItems: "center",
                                                        paddingLeft: "10px",
                                                        marginBottom: "5px",
                                                        maxWidth: "64px",
                                                        height: "30px",
                                                        display: "flex",
                                                        flexGrow: "1",
                                                      },
                                                      "&.MuiInputBase-root,.MuiFilledInput-root,.MuiSelect-root":
                                                      {
                                                        backgroundColor: "white",
                                                      },
                                                      "&.MuiInput-input": {
                                                        background: "#EDEDED",
                                                        borderRadius: "20px",
                                                        alignItems: "center",
                                                        // padding: "10px",
                                                        maxWidth: "170px",
                                                        height: "20px",
                                                        display: "flex",
                                                        flexGrow: "1",
                                                      },
                                                    }}
                                                    onChange={(e) =>
                                                      handleAmenityCountChange(
                                                        floor.FloorID,
                                                        apartment.ApartmentID,
                                                        amenity.AmenityID,
                                                        e.target.value
                                                      )
                                                    }
                                                    InputLabelProps={{
                                                      shrink: true,
                                                    }}
                                                    variant="standard"
                                                  />
                                                </Box>
                                              </Grid>



                                              <Grid item xs={6} md={3}>
                                                <div class="button-container">
                                                  <Box
                                                    sx={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      flexGrow: 1,
                                                    }}
                                                  >
                                                    <Button
                                                      class="amenity-image-btn"
                                                      color="primary"
                                                      id={`amenity-image-input-button-${floor.FloorID}-${apartment.ApartmentID}-${amenity.AmenityID}`}
                                                      key={`amenity-image-input-button-${floor.FloorID}-${apartment.ApartmentID}-${amenity.AmenityID}`}
                                                      onClick={(e) =>
                                                        handleAmenityImageUpload(
                                                          floor.FloorID,
                                                          apartment.ApartmentID,
                                                          amenity.AmenityID
                                                        )(e)
                                                      }
                                                    >
                                                      {/* <label htmlFor={`amenity-image-input-${floor.FloorID}-${layout.ApartmentID}-${amenity.AmenityID}`}> */}
                                                      {t("uploadImage")}
                                                      {/* </label> */}
                                                    </Button>
                                                  </Box>
                                                </div>

                                              </Grid>
                                              <Grid item xs={6} md={2}>
                                                <Typography
                                                  variant="body2"
                                                  class="remove-text"
                                                  onClick={() =>
                                                    handleDeleteAmenity(
                                                      floor.FloorID,
                                                      apartment.ApartmentID,
                                                      amenity.AmenityID
                                                    )
                                                  }
                                                >
                                                  {t("remove")}
                                                </Typography>
                                              </Grid>
                                              <Grid item xs={6} md={6} sx={{
                                                paddingTop: "0 !important",
                                                marginBottom: "10px"
                                              }}>
                                                <Box
                                                  sx={{
                                                    display: "flex",
                                                    flexGrow: 1,
                                                    flexDirection: "column",

                                                  }}
                                                >{amenity?.Images && (
                                                  <div>
                                                    <Typography
                                                      variant="body1"
                                                      class="header-text"
                                                      fontWeight={500}
                                                    >
                                                      {t("amenityImages")}
                                                    </Typography>
                                                    {amenity.Images.map((image) => (
                                                      <Box
                                                        sx={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          flexGrow: 0,
                                                        }}
                                                        key={image.ImageID}
                                                      >
                                                        <Grid item xs={8} md={8}>
                                                          <Typography
                                                            class="layout-image-name"
                                                            variant="body1"
                                                          >
                                                            {image.ImageName}
                                                          </Typography>
                                                        </Grid>
                                                        <Grid item xs={2} md={2}>
                                                          <IconButton
                                                            class="viewIcon-layout-image"
                                                            onClick={() =>
                                                              handleViewImage(
                                                                floor.FloorID,
                                                                apartment.ApartmentID,
                                                                amenity.AmenityID,
                                                                "amenity",
                                                                image.ImageID,

                                                              )
                                                            }
                                                          >
                                                            <VisibilityIcon className="visibilityIcon" />
                                                          </IconButton>
                                                        </Grid>
                                                        <Grid item xs={2} md={2}>
                                                          <IconButton
                                                            class="delete-icon-layout-image"
                                                            onClick={() =>
                                                              handleDeleteAmenityImage(
                                                                floor.FloorID,
                                                                apartment.ApartmentID,
                                                                amenity.AmenityID,
                                                                image.ImageID,
                                                              )
                                                            }
                                                          >
                                                            <DeleteIcon className="deleteIcon" />
                                                          </IconButton>
                                                        </Grid>
                                                      </Box>
                                                    ))}
                                                  </div>
                                                )}

                                                </Box>
                                              </Grid>
                                            </Grid>

                                          ))}
                                        </Grid>
                                        <div class="add-btn-container">
                                          <Button
                                            class="add-btn"
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                              handleAddAmenity(floor.FloorID, apartment.ApartmentID)
                                            }
                                          >
                                            {t("addMore")}
                                          </Button>
                                        </div>
                                        <ApartmentSpecificDetails
                                          floors={floors}
                                          floor={floor}
                                          apartment={apartment}
                                          setFloors={setFloors}
                                        />
                                      </Grid>
                                    </div>
                                    {amenityErrors[`${floor.FloorID}-${apartment.ApartmentID}`] && (
                                      <Typography variant="body2" class="error-text">
                                        {amenityErrors[`${floor.FloorID}-${apartment.ApartmentID}`]}
                                      </Typography>
                                    )}
                                  </div>
                                ))}

                              <div class="add-btn-container">
                                <Button
                                  class="add-layout-btn"
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleAddLayout(floor.FloorID)}
                                >
                                  {t("addApartment")}
                                </Button>
                              </div>
                            </div>
                          )}
                        <Divider
                          class="floor-divider"
                          variant="middle"
                          color="#D9D9D9"
                          sx={{ mt: 4, mb: 1, ml: 0 }}
                        />
                      </Grid>
                    </div>
                  ))}
              </div>
              <OpenImageDialogBox
                open={openImageDialog}
                handleClose={handleClose}
                selectedImage={selectedImage}
              />
            </div>
          </>
        </div>)
      }
      {showPopup && (
        <UploadPop
          open={showPopup}
          onClose={handlePopupClose}
          selectedFile={selectedFile}
          handleUpload={handleExcelUpload}
          handlePopupClose={handlePopupClose}
        />
      )}
      <Snackbars
        openSnackbar={openExcelUploadSnackbar}
        handleCloseSnackbar={handleCloseExcelUploadSnackbar}
        type="success"
        message="Excel Uploaded Successfully and data imported into respective apartments"
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onClick={handleCloseLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>

  );
}

export default AmenitiesForm;
