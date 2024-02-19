import React, { useEffect, useState } from "react";
import AddNewListing from "../../AddNewListing/AddNewListing";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog/ConfirmationDialog";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Grid,
  Box,
  Button,
  Typography,
  FormControl,
  TextField,
  Divider,
  IconButton,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import { isSupportedImage, openFileSelection } from "../../openFileSelection";
import axios from "axios";
import { API_ROUTES } from "../../../Api";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import OpenImageDialogBox from "../../Dialogs/OpenImageDialog/OpenImageDialog";
import SelectMenuWithTitle from "../../../Elements/SelectMenuWithTitle";
import InputFieldWithTitle from "../../../Elements/InputFieldWithTitle";
import { streetOptions, placesOption, signUpTypeOptions, buyingConditionOptions, rentalConditionOptions, typeOptions } from "../../../Constants/BuildingOptions"


function AddNewListingForm({ nextStep, formData, setFormData }) {
  const [searchParams] = useSearchParams();
  let propertyId = searchParams.get("propertyId");
  if (!propertyId) {
    propertyId = localStorage.getItem("propertyId");
  }

  const [open, setOpen] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);

  const { i18n, t } = useTranslation();

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    window.location.href = "/sellers";
  };
  const buildings = {
    BuildingID: "building Id",
    buildingName: "name",
    csv: null,
    thumbnail: null,
    main_image: null,
    images: [],
    floors: [],
  };

  const [building, setBuilding] = React.useState(buildings);

  const handleViewBuildImage = (floorId, title) => {
    var image = null;
    if (title === "thumbnail") {
      try {
        image = URL.createObjectURL(building.thumbnail.ImageID);
        setSelectedImage(image);
      } catch (error) {
        image = building.thumbnail;
        setSelectedImage(image.ImageLink);
      }
    } else if (title === "main_image") {
      try {
        image = URL.createObjectURL(building.main_image.ImageID);
        setSelectedImage(image);
      } catch (error) {
        console.log("in catch of view building", building);
        image = building.main_image;
        setSelectedImage(image.ImageLink);
      }
    } else if (title === "floor") {
      building.floors.map((floor) => {

        if (floor.FloorID === floorId) {
          setSelectedImage(floor?.LayoutImage?.ImageLink);
        }
      });
    } else if (title === "more") {
      building.images.map((image) => {
        if (floorId === image.ImageID) {
          image = image.ImageLink;
          setSelectedImage(image);
        }
      });
    }

    setOpenImageDialog(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setOpenImageDialog(false);
  };

  const [thumbnailImage, setThumbnailImage] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [area, setArea] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [pincode, setPincode] = useState("");
  const [place, setPlace] = useState("");
  const [googleMapLink, setGoogleMapLink] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [pid, setPid] = useState("");
  const [aid, setAid] = useState("");

  useEffect(() => {
    if (propertyId) {
      const fetchData = async () => {
        await axios
          .get(API_ROUTES.getListingInfo + `/${propertyId}`)
          .then((resp) => {
            if (resp && resp?.data) {
              setPropertyName(resp?.data?.propertyName);
              setArea(resp?.data?.address?.Area);
              setAddressLine1(resp?.data?.address?.AddressLine1);
              setAddressLine2(resp?.data?.address?.AddressLine2);
              setPincode(resp?.data?.address?.Pincode);
              setPlace(resp?.data?.address?.Place)
              setGoogleMapLink(resp?.data?.address?.GoogleMapLink);
              console.log(
                "ADDRESSS ID IN USE EFFECT : ",
                resp?.data?.address?.AddressID
              );
              setAid(resp?.data?.address?.AddressID);
              setPid(propertyId);
              building.BuildingID = pid
              building.main_image = resp?.data?.mainImage;
              building.thumbnail = resp?.data?.thumbnailImage;
              setThumbnailImage(resp?.data?.thumbnailImage?.ImageLink);
              setMainImage(resp?.data?.mainImage?.ImageLink);
              console.log("RESP===============", resp?.data);
              building.images = resp?.data?.images;
              building.floors = resp?.data.floors;
            }
          });
      };
      fetchData();
    }
  }, []);

  const uploadImage = async (file, imageTitle, floorID) => {
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
        console.log("Image upload result-----!!!", result);
        const imageUrl = URL.createObjectURL(file); // Create URL for rendering

        if (imageTitle === "thumbnail") {
          setBuilding((prevBuilding) => ({
            ...prevBuilding,
            thumbnail: {
              ...prevBuilding.thumbnail,
              ImageID: result?.data,
              ImageLink: imageUrl,
            },
          }));
          setThumbnailImage(imageUrl);
        }
        else if (imageTitle === "main_image") {
          setBuilding((prevBuilding) => ({
            ...prevBuilding,

            main_image: {
              ...prevBuilding.main_image,
              ImageID: result?.data,
              ImageLink: imageUrl,
            },
          }));
          setMainImage(imageUrl);
        }
        else if (imageTitle === "more") {
          if (building?.images?.length === 0) {
            building?.images.push({ ImageLink: imageUrl, ImageID: result?.data, ImageName: file.name });
          }
          else {
            setBuilding((prevBuilding) => ({
              ...prevBuilding,
              images: [
                ...prevBuilding.images,
                { ImageLink: imageUrl, ImageID: result?.data, ImageName: file.name },
              ],
            }));
          }

        }

        else if (imageTitle === "floor") {
          setBuilding((prevBuilding) => ({
            ...prevBuilding,
            floors: prevBuilding.floors.map((floor) => {
              if (floor.FloorID === floorID) {
                return {
                  ...floor,

                  LayoutImage: {
                    ImageID: result.data,
                    ImageLink: imageUrl,
                  },
                };
              }
              return floor;
            }),
          }));
        }

        return result.data;
      }
    } catch (error) {
      console.log("Error while uploading image: ", error);
    }
  };

  const handleBuildingImageUpload = (imageTitle, floorID) => async (e) => {
    try {
      console.log("File started....");
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

      try {
        const imageId = await uploadImage(file, imageTitle, floorID);
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBuildingImage = (imageId, title) => {
    console.log("The images pending before", building.images);
    const updatedBuilding = { ...building };
    if (title === "more") {
      updatedBuilding.images = updatedBuilding.images.filter(
        (image) => image.ImageID !== imageId
      );
    } else if (title === "thumbnail") {
      updatedBuilding.thumbnail = null;
    } else if (title === "main_image") {
      updatedBuilding.main_image = null;
    }
    setBuilding(updatedBuilding);
    console.log("The images pending after", building.images);
  };

  const handleAddFloor = (BuildingID) => {
    console.log("building id passed in add floor", BuildingID);
    console.log("building id of building in add floor", building);

    const updatedBuilding = { ...building };
    if (BuildingID === building.BuildingID) {
      var floorCount = 0;
      let newFloorName = "";
      if (!building.floors.length) {
        floorCount = building.floors.length;
        newFloorName = `Floor ${floorCount}`;
      } else {
        const index = building.floors.length;
        if (BuildingID == "building Id") {
          floorCount = building.floors[index - 1].FloorID + 1;
          newFloorName = `Floor ${floorCount}`;

        }
        else {
          floorCount = building.floors.length + 1 + Math.floor(Math.random() * 100);
          newFloorName = "New Floor";

        }

      }
      const newFloor = {
        FloorID: floorCount,
        FloorName: newFloorName, // You can set a default name or prompt the user for a name
        UnitCount: 0, // Initialize with empty
        LayoutImage: null, // Set the image to null initially
        imageSrc: "",
      };
      console.log("Floor added ", newFloor);

      // Clone the existing building object and add the new floor
      const updatedBuilding = { ...building };
      updatedBuilding.floors.push(newFloor);

      // Update the state or do whatever you need to do with the updated building object
    }
    setBuilding(updatedBuilding);
    console.log("Floor added updated building ", building);

  };

  const handleDeleteFloorImage = (floorId) => {
    console.log("floorId", floorId);
    const updatedBuilding = { ...building };
    // Update the floor-level image in the building object
    const updatedFloors = updatedBuilding.floors.map((floor) => {
      if (floor.FloorID === floorId) {
        return { ...floor, LayoutImage: null }; // Set the floor-level image to null
      }
      return floor;
    });
    updatedBuilding.floors = updatedFloors;
    setBuilding(updatedBuilding);
  };

  const handleDeleteFloor = (BuildingID, floorId) => {
    // Clone the existing building object
    const updatedBuilding = { ...building };
    // Find the floor you want to update within the building's floors array
    updatedBuilding.floors = updatedBuilding.floors.filter(
      (floor) => floor.FloorID !== floorId
    );
    // Update the state with the modified building object
    setBuilding(updatedBuilding);
  };

  const handleFloorUnitChange = (floorId, newValue) => {
    // Clone the existing building object
    const updatedBuilding = { ...building };
    // Find the floor you want to update within the building's floors array
    const updatedFloors = updatedBuilding.floors.map((floor) => {
      if (floor.FloorID === floorId) {
        return { ...floor, UnitCount: newValue };
      }
      return floor;
    });
    // Update the building's floors array with the modified floors
    updatedBuilding.floors = updatedFloors;

    // Update the state with the modified building object
    setBuilding(updatedBuilding);
  };

  const handleFloorNameChange = (floorId, newName) => {

    console.log("PASSED FLOOR ID-------------", floorId);
    console.log("NEW NAME----------", newName);

    setBuilding((prevBuilding) => {
      const updatedFloors = prevBuilding.floors.map((floor) => {
        if (floor.FloorID === floorId) {
          console.log("TARGETED FLOOR----------", floor);
          return { ...floor, FloorName: newName };
        }
        return floor;
      });

      // Update the building's floors array with the modified floors
      return { ...prevBuilding, floors: updatedFloors };
    });
  };

  function isObjectEmpty(obj) {
    for (const key in obj) {
      if (key !== "addressId" && key !== "propertyId") {
        if (obj[key] === null || obj[key] === "" || obj[key] === undefined) {
          return true;
        }
      }
    }
    return false;
  }

  const handleSubmitPageOne = async () => {
    console.log("PROPERTY ID IN FUNTION-----------", pid);
    console.log("ADDRESS ID IN FUNCTION--------------", aid);
    console.log("Building in function submit", building);
    const transformedFloors = building?.floors.map((floor) => ({
      FloorID: typeof floor?.FloorID === 'number' && Number.isInteger(floor?.FloorID) ? null : floor?.FloorID,
      floorName: floor?.FloorName ?? '',
      units: floor?.UnitCount ?? 0,
      layoutImage: floor?.LayoutImage?.ImageID ?? null,
    }));
    let sampleFormat = {
      addressId: aid,
      propertyId: pid,
      propertyName,
      area,
      Pincode: pincode,
      Place: place,
      addressLine1,
      addressLine2,
      googleMapLink,
      thumbnailImage: building.thumbnail?.ImageID,
      mainImage: building.main_image?.ImageID,
      images: building.images?.map((image) => image.ImageID),
      floors: transformedFloors,
    };
    console.log("SAMPLE FORMAT------------", sampleFormat);
    if (isObjectEmpty(sampleFormat)) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("pleaseFillAlltheData"),
      });
    } else {
      await axios
        .post(API_ROUTES.addPropertyDetails, {
          data: sampleFormat,
        })
        .then((resp) => {
          if (resp) {
            localStorage.setItem("propertyId", resp?.data);
            nextStep("Amenities");
          }
        });
    }
    // nextStep("Amenities");
  };

  return (
    <div class="step1">
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
            {t("quickInfo")}
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
                strokeWidth={2} // Use 'strokeWidth' instead of 'strokeWidth'
                strokeLinecap="round" // Use 'strokeLinecap' instead of 'strokeLinecap'
              />
            </svg>
          </h2>
          <h2 class="active-menu">{t("AddNewListing")}</h2>
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
          <Button class="nextBtn" onClick={() => handleSubmitPageOne()}>
            {t("next")}
          </Button>
        </Box>
      </Box>
      {/* <AddNewListing /> */}
      <>
        <div class="wrapper-add-new-listing">
          <Grid item xs={12} md={12}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                md={3.8}
                sx={{
                  "&.MuiGrid-root,.MuiGrid-item": {
                    paddingLeft: "0",
                    margin: "0",
                  },
                }}
              >
                <Paper class="details-page-paper" sx={{ padding: "10px" }}>
                  <InputFieldWithTitle
                    title={t("nameOfTheProperty")}
                    placeholder={t("enterNameHere")}
                    value={propertyName}
                    onChange={(value) => setPropertyName(value)}
                  />

                  <InputFieldWithTitle
                    title={t("addressLine01")}
                    placeholder={t("enterAddressHere")}
                    value={addressLine1}
                    onChange={(value) => setAddressLine1(value)}
                  />
                  <InputFieldWithTitle
                    title={t("addressLine02")}
                    placeholder={t("enterAddressHere")}
                    value={addressLine2}
                    onChange={(value) => setAddressLine2(value)}
                  />
                  <SelectMenuWithTitle
                    title={t("street")}
                    options={streetOptions}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                  <InputFieldWithTitle
                    title={t("postcode")}
                    placeholder={t("enterPostcode")}
                    value={pincode}
                    onChange={(value) => setPincode(value)}
                  />

                  <SelectMenuWithTitle
                    title={t("city")}
                    options={placesOption}
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                  <InputFieldWithTitle
                    title={t("googleMapLink")}
                    placeholder={t("pasteGoogleMapLinkHere")}
                    value={googleMapLink}
                    onChange={(value) => setGoogleMapLink(value)}
                  />
                </Paper>
              </Grid>
              <Grid
                item
                xs={0}
                sx={{
                  "&.MuiGrid-root,.MuiGrid-item": {
                    paddingLeft: "0px",
                    marginRight: "5px",
                  },
                }}
              >
                <Divider orientation="vertical" className="vertical-divider" />
              </Grid>
              <Grid
                item
                xs={12}
                md={3.2}
                sx={{
                  "&.MuiGrid-root,.MuiGrid-item": {
                    paddingLeft: "0",
                  },
                }}
              >
                <Paper class="details-page-paper" sx={{ padding: "10px" }}>
                  <Typography class="heading-for-all" variant="body1">
                    {t("thumbnailImage")} (330px230px)
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 0,
                      }}
                    >
                      {building.thumbnail ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            flexGrow: 0,
                            width: "229px",
                            height: "119px",
                            backgroundColor: "#E0E0E0",
                            borderRadius: "10px",
                          }}
                        >
                          {console.log(
                            "Thumbanail IMAGE LINK---------------",
                            thumbnailImage
                          )}
                          <img
                            src={
                              thumbnailImage
                            }
                            alt="more Image" // Provide a description for the image (alt text)
                            style={{
                              width: "100%", // Ensure the image takes the full width of the box
                              height: "100%", // Ensure the image takes the full height of the box
                              objectFit: "cover",
                              borderRadius: "10px", // Control how the image fits inside the box
                            }}
                          />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "center",
                            flexGrow: 0,
                            width: "229px",
                            height: "119px",
                            backgroundColor: "#E0E0E0",
                            borderRadius: "10px",
                          }}
                        >
                          <Button
                            class="floor-image-btn"
                            color="primary"
                            id="building-thumbnail-upload-button"
                            key="building-thumbnail-upload-button"
                            onClick={(e) =>
                              handleBuildingImageUpload("thumbnail")(e)
                            }
                          >
                            {t("upload")}
                          </Button>
                        </Box>
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "top",
                          flexGrow: 0,
                        }}
                      >
                        <IconButton
                          class="viewIcon-floor-image"
                          onClick={() =>
                            handleViewBuildImage(undefined, "thumbnail")
                          }
                        >
                          <VisibilityIcon className="visibilityIcon" />
                        </IconButton>
                        <IconButton
                          class="delete-icon-floor-image"
                          onClick={() =>
                            handleDeleteBuildingImage(undefined, "thumbnail")
                          }
                        >
                          <DeleteIcon class="floorDeleteIcon" />
                        </IconButton>
                      </Box>


                    </Box>
                    <Divider orientation="horizontal" />
                    <Typography class="heading-for-all" variant="body1">
                      {t("mainImage")} (1380px650px)
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 0,
                      }}
                    >
                      {building.main_image ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            flexGrow: 0,
                            width: "229px",
                            height: "119px",
                            backgroundColor: "#E0E0E0",
                            borderRadius: "10px",
                          }}
                        >
                          {console.log(
                            "MAIN IMAGE LINK---------------",
                            mainImage
                          )}
                          <img
                            src={mainImage
                            }
                            alt="more Image" // Provide a description for the image (alt text)
                            style={{
                              width: "100%", // Ensure the image takes the full width of the box
                              height: "100%", // Ensure the image takes the full height of the box
                              objectFit: "cover",
                              borderRadius: "10px", // Control how the image fits inside the box
                            }}
                          />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "center",
                            flexGrow: 0,
                            width: "229px",
                            height: "119px",
                            backgroundColor: "#E0E0E0",
                            borderRadius: "10px",
                          }}
                        >
                          <Button
                            class="floor-image-btn"
                            color="primary"
                            id="building-main_image-upload-button"
                            key="building-main_image-upload-button"
                            onClick={(e) =>
                              handleBuildingImageUpload("main_image")(e)
                            }
                          >
                            {t("upload")}
                          </Button>
                        </Box>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "top",
                          flexGrow: 0,
                        }}
                      >
                        <IconButton
                          class="viewIcon-floor-image"
                          onClick={() =>
                            handleViewBuildImage(undefined, "main_image")
                          }
                        >
                          <VisibilityIcon className="visibilityIcon" />
                        </IconButton>
                        <IconButton
                          class="delete-icon-floor-image"
                          onClick={() =>
                            handleDeleteBuildingImage(undefined, "main_image")
                          }
                        >
                          <DeleteIcon class="floorDeleteIcon" />
                        </IconButton>
                      </Box>


                    </Box>
                    <Divider orientation="horizontal" />

                    <Typography class="heading-for-all" variant="body1">
                      {t("addMoreImage")} (1380px650px)
                    </Typography>

                    {building?.images?.map(
                      (image) =>
                        image.ImageID && (
                          <div key={`more_image-${image.ImageID}`}>
                            <Box
                              id={`more_image-${image.ImageID}`} // Make sure to include a unique key when rendering a list of elements
                              key={`more_image-${image.ImageID}`} // Make sure to include a unique key when rendering a list of elements
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                flexGrow: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "168px",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "top",
                                    flexGrow: "0",
                                    height: "55px",
                                    width: "81px",
                                    background: "grey",
                                    borderRadius: "5px",
                                    backgroundColor: "green",
                                    overflow: "hidden",
                                  }}
                                >
                                  <img
                                    src={image?.ImageLink} // Use the image URL from building.image
                                    alt="more Image" // Provide a description for the image (alt text)
                                    style={{
                                      width: "100%", // Ensure the image takes the full width of the box
                                      height: "100%", // Ensure the image takes the full height of the box
                                      objectFit: "cover", // Control how the image fits inside the box
                                    }}
                                  />
                                </Box>
                                <Typography
                                  class="more-images-name"
                                  variant="body1"
                                >
                                  {image.ImageName}
                                </Typography>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "top",
                                  flexGrow: 0,
                                }}
                              >
                                <IconButton
                                  id={image.ImageID}
                                  key={image.ImageID}
                                  class="viewIcon-floor-image"
                                  onClick={() =>
                                    handleViewBuildImage(image.ImageID, "more")
                                  }
                                >
                                  <VisibilityIcon className="visibilityIcon" />
                                </IconButton>
                                <IconButton
                                  class="delete-icon-floor-image"
                                  id={image.ImageID}
                                  key={image.ImageID}
                                  onClick={() =>
                                    handleDeleteBuildingImage(image.ImageID, "more")
                                  }
                                >
                                  <DeleteIcon class="floorDeleteIcon" />
                                </IconButton>


                                <Divider orientation="horizontal" />
                              </Box>
                            </Box>
                            <Divider
                              class="divider-more-image-count"
                              orientation="horizontal"
                            />
                          </div>
                        )
                    )}

                    <Button
                      class="floor-image-btn"
                      color="primary"
                      id="building-main_image-upload-button"
                      key="building-main_image-upload-button"
                      onClick={(e) => handleBuildingImageUpload("more")(e)}
                    >
                      {t("upload")}
                    </Button>
                  </Box>
                </Paper>
              </Grid>
              <Grid
                item
                xs={0}
                sx={{
                  "&.MuiGrid-root,.MuiGrid-item": {
                    paddingLeft: "0px",
                    marginLeft: "5px",
                  },
                }}
              >
                <Divider orientation="vertical" className="vertical-divider" />
              </Grid>
              <Grid
                item
                xs={12}
                md={4.8}
                sx={{
                  "&.MuiGrid-root,.MuiGrid-item": {
                    paddingLeft: "0",
                    marginLeft: "2px",
                  },
                }}
              >
                <Paper class="details-page-paper" sx={{ padding: "10px" }}>
                  <Typography class="heading-for-all" variant="body1">
                    {t("numberOfFloors")}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexGrow: 0,
                    }}
                  >
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexGrow: 0,
                        }}
                      >
                        <Grid item xs={7} md={3.5}>
                          <Typography
                            variant="body1"
                            class="header-text"
                            fontWeight={500}
                          >
                            {t("floorNumber/Name")}
                          </Typography>
                        </Grid>
                        <Grid item xs={3} md={1.8}>
                          <Typography
                            variant="body1"
                            class="header-text"
                            fontWeight={500}
                          >
                            {t("units")}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} md={6.7}>
                          <Typography
                            variant="body1"
                            class="header-text"
                            fontWeight={500}
                          >
                            {t("floorPlanImage")}
                          </Typography>
                        </Grid>
                      </Box>
                    </Grid>
                  </Box>

                  <Grid item xs={12}>
                    {building.floors.map((floor) => (
                      <div key={`floor-${floor.FloorID}-${floor.FloorName}`}>
                        {console.log("FLOOR----------------", floor)}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            justifyContent: "center",
                            flexGrow: 0,
                          }}
                        >
                          <Grid
                            container
                            spacing={0.5}
                            key={floor.FloorID}
                          >
                            <Grid item xs={7} md={3.5}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  flexGrow: 1,
                                }}
                              >
                                <FormControl fullWidth sx={{ border: "none" }}>
                                  <TextField
                                    variant="filled"
                                    id={`FloorName-${floor.FloorID}-${floor.FloorName}`}
                                    key={`FloorName-${floor.FloorID}-${floor.FloorName}`}

                                    value={floor.FloorName}
                                    sx={{
                                      "&.MuiInputBase-root,.MuiFilledInput-root,.MuiSelect-root":
                                      {
                                        backgroundColor: " white !important",
                                        borderRadius: "20px",
                                        maxWidth: "258px !important",
                                        // paddingTop: "10px",
                                        marginBottom: "5px",
                                        maxHeight: "40px",
                                        display: "flex",
                                        flexGrow: "1",
                                        alignItems: "center",
                                      },
                                      "&.MuiSelect-select,.MuiInputBase-input,.MuiFilledInput-input:focus ":
                                      {
                                        // paddingTop: "0px !important",
                                        backgroundColor: "#EDEDED !important",
                                        borderRadius: "20px",
                                        padding: "10px",
                                      },
                                      "&.MuiFormControl-root": {
                                        width: "90%",
                                        marginTop: "0px",
                                      },
                                    }}
                                    onChange={(e) => handleFloorNameChange(floor.FloorID, e.target.value)
                                    }
                                    autoFocus
                                  >


                                  </TextField>
                                </FormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={4} md={1.8}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  flexGrow: 1,
                                }}
                              >
                                <TextField
                                  id={`floorCount-${floor.FloorID}-${floor.FloorName}`}
                                  key={`floorCount-${floor.FloorID}-${floor.FloorName}`}
                                  type="number"
                                  value={String(floor.UnitCount).padStart(
                                    2,
                                    "0"
                                  )}
                                  sx={{
                                    "&.MuiInputBase-input,.MuiInput-input": {
                                      backgroundColor: "#EDEDED",
                                      borderRadius: "20px",
                                      alignItems: "center",
                                      padding: "9px",
                                      paddingLeft: "10px",
                                      maxHeight: "40px",
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
                                      maxWidth: "170px",
                                      display: "flex",
                                      flexGrow: "1",
                                    },
                                  }}
                                  onChange={(e) =>
                                    handleFloorUnitChange(
                                      floor.FloorID,
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

                            <Grid item xs={12} md={6}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  flexGrow: 1,
                                  flexDirection: "row",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexGrow: 1,
                                  }}
                                >
                                  {floor.LayoutImage ? (
                                    <Box
                                      id={`floorImage-${floor.FloorID}-${floor.FloorName}`}
                                      key={`floorImage-${floor.FloorID}-${floor.FloorName}`}
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexGrow: 0,
                                        padding: "5px",
                                        marginBottom: "12px",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          flexGrow: 0,
                                        }}
                                      >
                                        <Typography
                                          class="floor-image-names"
                                          id={`floor-image-input-button-${floor.FloorID}-${floor.FloorName}`}
                                          key={`floor-image-input-button-${floor.FloorID}-${floor.FloorName}`}
                                          variant="body1"
                                        >
                                          {`${floor.FloorName}-Plan`}
                                        </Typography>
                                      </Box>
                                      <IconButton
                                        class="viewIcon-floor-image"
                                        id={`floor-image-view-button-${floor.FloorID}-${floor.FloorName}`}
                                        key={`floor-image-view-button-${floor.FloorID}-${floor.FloorName}`}
                                        onClick={() =>
                                          handleViewBuildImage(
                                            floor.FloorID,
                                            "floor"
                                          )
                                        }
                                      >
                                        <VisibilityIcon className="visibilityIcon" />
                                      </IconButton>
                                      <IconButton
                                        class="delete-icon-floor-image"
                                        id={`floor-image-delete-button-${floor.FloorID}-${floor.FloorName}`}
                                        key={`floor-image-delete-button-${floor.FloorID}-${floor.FloorName}`}
                                        onClick={() =>
                                          handleDeleteFloorImage(floor.FloorID)
                                        }
                                      >
                                        <DeleteIcon class="floorDeleteIcon" />
                                      </IconButton>
                                    </Box>
                                  ) : (
                                    <div class="button-container">
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          flexGrow: 1,
                                          marginBottom: "12px",
                                        }}
                                      >
                                        <Button
                                          class="floor-image-btn"
                                          color="primary"
                                          id={`floor-image-upload-button-${floor.FloorID}-${floor.FloorName}`}
                                          key={`floor-image-upload-button-${floor.FloorID}-${floor.FloorName}`}
                                          onClick={(e) =>
                                            handleBuildingImageUpload("floor", floor.FloorID)(e)
                                          }
                                        >
                                          {t("upload")}
                                        </Button>
                                      </Box>
                                    </div>
                                  )}

                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexGrow: 1,
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    class="remove-text"
                                    id={`floor-detele-button-${floor.FloorID}-${floor.FloorName}`}
                                    key={`floor-delete-button-${floor.FloorID}-${floor.FloorName}`}
                                    onClick={() =>
                                      handleDeleteFloor(building.BuildingID, floor.FloorID)
                                    }
                                  >
                                    {t("remove")}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                        <Divider
                          class="divider-floor-count"
                          orientation="horizontal"
                        />
                      </div>
                    ))}

                    <div class="add-btn-container">
                      <Button
                        class="add-btn"
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddFloor(building.BuildingID)}
                      >
                        {t("addMore")}
                      </Button>
                    </div>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <OpenImageDialogBox
          open={openImageDialog}
          handleClose={handleClose}
          selectedImage={selectedImage}
        />
      </>
    </div>
  );
}

export default AddNewListingForm;
