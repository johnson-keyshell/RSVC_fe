import React, { useState, useEffect } from "react";
import CustomFileInput from "../CustomFileInput";
import { SAMPLE_IMAGE } from "../../config/urls";
import Table from "../Table";
import "./AddNewListing.css";
import Paper from "@mui/material/Paper";
import { openFileSelection, isSupportedImage } from "../openFileSelection"
// import { DeleteIcon } from '@chakra-ui/icons'
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import mainImage from "../../Images/main.jpg"
import { useTranslation } from "react-i18next";



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
  Input,
  Dialog,
  DialogContent,
} from "@mui/material";

import { styled } from "@mui/material/styles";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function AddNewListing() {


  //geos starts here
  const buildings = {
    id: "building Id",
    buildingName: "name",
    csv: null,
    thumbnail: null,
    main_image: null,
    more_images: [],
    floors: [
    ],
  };

  const [building, setBuilding] = React.useState(buildings);


  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [moreImages, setMoreImages] = useState(true);
  const { i18n, t } = useTranslation();

  const handleViewBuildImage = (imageId, title) => {
    var image = null
    if (title === "thumbnail") {
      image = building.thumbnail;
    }
    else if (title === "main_image") {
      image = building.main_image
    }
    else if (title === "floor") {
      building.floors.map((floor) => {
        if (floor.id === imageId) {
          image = floor.image
        }
      })
    }
    else if (title === "more") {
      building.more_images.map((image) => {
        if (imageId === image.id) {
          image = image.image
          console.log("view more images", image)
        }
      })
    }

    setSelectedImage(image);
    setOpen(true);
  };


  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  const handleBuildingImageUpload = (imageTitle) => async (e) => {
    try {
      const file = await openFileSelection();
      if (!file) {
        throw new Error('No file selected');
      }
      const fileName = file.name;
      if (!isSupportedImage(fileName)) {
        alert('Unsupported file format. Please upload an image (jpg, jpeg, png, or gif).');
        return;
      }

      const updatedBuilding = { ...building };


      if (imageTitle === "more") {
        const count = building.more_images.length
        if (count === 0) {
          const new_image = {
            id: count,
            image: file
          }
          updatedBuilding.more_images.push(new_image)
          setBuilding(updatedBuilding)
        }
        else {
          const new_image = {
            id: building.more_images[count - 1].id + 1,
            image: file
          }
          updatedBuilding.more_images.push(new_image)
          setBuilding(updatedBuilding)
        }

      }
      else {
        if (imageTitle === "thumbnail") {
          updatedBuilding.thumbnail = file;
          setBuilding(updatedBuilding);
        }
        else if (imageTitle === "main_image") {
          updatedBuilding.main_image = file;
          setBuilding(updatedBuilding);
        }
      }



    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBuildingImage = (imageId, title) => {
    console.log("The images pending before", building.more_images)
    const updatedBuilding = { ...building };
    if (title === "more") {

      updatedBuilding.more_images = updatedBuilding.more_images.filter((image) => image.id !== imageId);
    }
    else if (title === "thumbnail") {
      updatedBuilding.thumbnail = null;
    }
    else if (title === "main_image") {
      updatedBuilding.main_image = null;
    }
    setBuilding(updatedBuilding);
    console.log("The images pending after", building.more_images)
  };

  const handleAddFloor = (buildingId) => {

    const updatedBuilding = { ...building };
    if (buildingId === building.id) {
      var floorCount = 0;
      if (!building.floors.length) {
        floorCount = building.floors.length;
      }
      else {
        const index = building.floors.length;
        floorCount = building.floors[index - 1].id + 1;
      }
      // const floorCount = building.floors.length;
      const newFloorName = `Floor ${floorCount}`;
      const newFloor = {
        id: floorCount,
        name: newFloorName, // You can set a default name or prompt the user for a name
        units: "", // Initialize with empty
        image: null, // Set the image to null initially
      };

      // Clone the existing building object and add the new floor
      const updatedBuilding = { ...building };
      updatedBuilding.floors.push(newFloor);

      // Update the state or do whatever you need to do with the updated building object

    }
    setBuilding(updatedBuilding);

  };

  const handleFloorImageUpload = (floorId) => async (e) => {
    try {
      const file = await openFileSelection();

      if (!file) {
        throw new Error('No file selected');
      }

      const fileName = file.name;
      // Validate the file.
      if (!isSupportedImage(fileName)) {
        alert('Unsupported file format. Please upload an image (jpg, jpeg, png, or gif).');
        return;
      }

      // Clone the existing building object
      const updatedBuilding = { ...building };

      // Update the floor-level image in the building object
      const updatedFloors = updatedBuilding.floors.map((floor) => {
        if (floor.id === floorId) {

          return { ...floor, image: file };
        }
        return floor;
      });

      console.log(updatedFloors);

      // Update the building's floors array with the modified floors
      updatedBuilding.floors = updatedFloors;

      console.log(updatedBuilding);


      // Update the state with the modified building object
      setBuilding(updatedBuilding);
      console.log("the filename is", building)

    } catch (error) {
      console.error(error);
    }
  };


  const handleDeleteFloorImage = (floorId) => {
    console.log("floorId", floorId);
    const updatedBuilding = { ...building };
    // Update the floor-level image in the building object
    const updatedFloors = updatedBuilding.floors.map((floor) => {
      if (floor.id === floorId) {
        return { ...floor, image: null }; // Set the floor-level image to null
      }
      return floor;
    });
    updatedBuilding.floors = updatedFloors;
    setBuilding(updatedBuilding);

  };





  const handleDeleteFloor = (buildingId, floorId) => {
    // Clone the existing building object
    const updatedBuilding = { ...building };

    // Find the floor you want to update within the building's floors array
    updatedBuilding.floors = updatedBuilding.floors.filter((floor) => floor.id !== floorId);

    // Update the state with the modified building object
    setBuilding(updatedBuilding);
  };


  const handleFloorUnitChange = (floorId, newValue) => {
    // Clone the existing building object
    const updatedBuilding = { ...building };

    // Find the floor you want to update within the building's floors array
    const updatedFloors = updatedBuilding.floors.map((floor) => {
      if (floor.id === floorId) {
        return { ...floor, units: newValue };
      }
      return floor;
    });

    // Update the building's floors array with the modified floors
    updatedBuilding.floors = updatedFloors;

    // Update the state with the modified building object
    setBuilding(updatedBuilding);
  };

  const handleFloorNameChange = (floorId, newName) => {
    const updatedBuilding = { ...building };
    const updatedFloors = updatedBuilding.floors.map((floor) => {
      if (floor.id === floorId) {
        return { ...floor, name: newName };
      }
      return floor;
    });

    // Update the building's floors array with the modified floors
    updatedBuilding.floors = updatedFloors;

    // Update the state with the modified building object
    setBuilding(updatedBuilding);
  };
  const [selectedOptionForArea, setSelectedOptionForArea] = useState(0); // Set the default value to 2

  const handleChangeForArea = (event) => {
    setSelectedOptionForArea(event.target.value);
  };


  //geos ends here


  const [images, setImages] = useState([
    {
      text: "Image 1",
      src: "https://s3-alpha-sig.figma.com/img/d238/fd00/a1d980e1f9d497784bfa621cdcb6a5c2?Expires=1697414400&Signature=X7V9NaQdytCYL4ObSf2gcyXmqW3FwCZg7SUxeg0fP1YkXtFPB4qrAxLGv0hsfw-rJke1GR3hpFFxoG7~TzdSbsZFmrDaeJENIlTQnbjUYexi9Rcxr1J3cVqOPyLxy-l5Kb0PeYSZZ0lQ2Vb5ITl-dk7sgIuOa09g4woo6uDD~7u2bXdQ3cKYrN6hmlx9TnD0Ga118MY50HLFfp72lNcMmLm1c2lJ056pZmPrXe9Y0PSHqZxgiaa2UJyzGajrKm-32wsfudb~yv0TZfyaAOSxN~NCsfbwQVZ6RsrCSlFXHdeOQflJKfS60hwcz9VJhd4Tdp7ceGMBL0rZHkr5MJ790g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
    {
      text: "Image 2",
      src: "https://s3-alpha-sig.figma.com/img/d238/fd00/a1d980e1f9d497784bfa621cdcb6a5c2?Expires=1697414400&Signature=X7V9NaQdytCYL4ObSf2gcyXmqW3FwCZg7SUxeg0fP1YkXtFPB4qrAxLGv0hsfw-rJke1GR3hpFFxoG7~TzdSbsZFmrDaeJENIlTQnbjUYexi9Rcxr1J3cVqOPyLxy-l5Kb0PeYSZZ0lQ2Vb5ITl-dk7sgIuOa09g4woo6uDD~7u2bXdQ3cKYrN6hmlx9TnD0Ga118MY50HLFfp72lNcMmLm1c2lJ056pZmPrXe9Y0PSHqZxgiaa2UJyzGajrKm-32wsfudb~yv0TZfyaAOSxN~NCsfbwQVZ6RsrCSlFXHdeOQflJKfS60hwcz9VJhd4Tdp7ceGMBL0rZHkr5MJ790g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    },
  ]);

  return (

    <div class="wrapper-add-new-listing">
      <Grid item xs={12} md={12}>


        <Grid container spacing={1}>
          <Grid item xs={12} md={3.8}
            sx={{
              "&.MuiGrid-root,.MuiGrid-item": {
                paddingLeft: "0",
                margin: "0"
              }
            }}>
            <Paper class="details-page-paper" sx={{ padding: '10px' }}>
              <Typography class="heading-for-all" variant="body1">{t("nameOfTheProperty")}</Typography>
              <TextField
                fullWidth
            // label="Name of The Property"
                placeholder={t("enterNameHere")}
                variant="outlined"
                margin="normal"
                sx={{
                  "&.MuiInputBase-root,.MuiFilledInput-root,.MuiSelect-root": {
                    backgroundColor: " #EDEDED !important",
                    borderRadius: "20px",
                    maxWidth: "258px !important",
                    paddingTop: "10px",
                    marginBottom: "5px",
                    maxHeight: "40px",
                    display: "flex",
                    flexGrow: "1",
                    alignItems: "center",
                  },
                  "&.MuiSelect-select,.MuiInputBase-input,.MuiFilledInput-input:focus ": {
                    // paddingTop: "0px !important",
                    backgroundColor: "#EDEDED !important",
                    borderRadius: "20px",
                    padding: "10px"
                  },
                  "&.MuiFormControl-root": {
                    width: "90%",
                    marginTop: "0px"
                  },
                }}
              />
              <Typography class="heading-for-all" variant="body1">t{("Area/Locality")} </Typography>
              <TextField
                fullWidth
                // label="Area / Locality"
                placeholder={t("enterAreaName")}
                variant="outlined"
                margin="normal"
                select
                value={selectedOptionForArea} // Set the default value here
                onChange={handleChangeForArea}
                sx={{
                  "&.MuiInputBase-root,.MuiFilledInput-root,.MuiSelect-root": {
                    backgroundColor: " #EDEDED !important",
                    borderRadius: "20px",
                    maxWidth: "258px",
                    paddingTop: "10px",
                    marginBottom: "5px",
                    maxHeight: "40px",
                    display: "flex",
                    flexGrow: "1",
                    alignItems: "center",

                  },
                  "&.MuiSelect-select,.MuiInputBase-input,.MuiFilledInput-input:focus ": {
                    // paddingTop: "0px !important",
                    backgroundColor: "#EDEDED !important",
                    borderRadius: "20px",
                    padding: "10px"
                  },
                  "&.MuiFormControl-root": {
                    width: "90%",
                    marginTop: "0px",

                  },
                }}
              >
                <MenuItem value={0}>{t("selectAnOption")}</MenuItem>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
                <MenuItem value={4}>Option 4</MenuItem>
              </TextField>
              <Typography class="heading-for-all" variant="body1">{t("addressLine01")} </Typography>

              <TextField
                fullWidth
                // label="Address Line 01"
                placeholder={t("enterAddressHere")}
                variant="outlined"
                margin="normal"
                sx={{
                  "&.MuiInputBase-root,.MuiFilledInput-root,.MuiSelect-root": {
                    backgroundColor: " #EDEDED !important",
                    borderRadius: "20px",
                    maxWidth: "258px !important",
                    paddingTop: "10px",
                    marginBottom: "5px",
                    maxHeight: "40px",
                    display: "flex",
                    flexGrow: "1",
                    alignItems: "center",
                  },
                  "&.MuiSelect-select,.MuiInputBase-input,.MuiFilledInput-input:focus ": {
                    // paddingTop: "0px !important",
                    backgroundColor: "#EDEDED !important",
                    borderRadius: "20px",
                    padding: "10px"
                  },
                  "&.MuiFormControl-root": {
                    width: "90%",
                    marginTop: "0px"
                  },
                }}
              />
              <Typography class="heading-for-all" variant="body1">{t("addressLine02")} </Typography>

              <TextField
                fullWidth
                // label="Address Line 02"
                placeholder={t("enterAddressHere")}
                variant="outlined"
                margin="normal"
                sx={{
                  "&.MuiInputBase-root,.MuiFilledInput-root,.MuiSelect-root": {
                    backgroundColor: " #EDEDED !important",
                    borderRadius: "20px",
                    maxWidth: "258px !important",
                    paddingTop: "10px",
                    marginBottom: "5px",
                    maxHeight: "40px",
                    display: "flex",
                    flexGrow: "1",
                    alignItems: "center",
                  },
                  "&.MuiSelect-select,.MuiInputBase-input,.MuiFilledInput-input:focus ": {
                    // paddingTop: "0px !important",
                    backgroundColor: "#EDEDED !important",
                    borderRadius: "20px",
                    padding: "10px"
                  },
                  "&.MuiFormControl-root": {
                    width: "90%",
                    marginTop: "0px"
                  },
                }}
              />
              <Typography class="heading-for-all" variant="body1">{t("googleMapLink")} </Typography>

              <TextField
                fullWidth
                // label="Google Map link"
                placeholder={t("pasteGoogleMapLinkHere")}
                variant="outlined"
                margin="normal"
                sx={{
                  "&.MuiInputBase-root,.MuiFilledInput-root,.MuiSelect-root": {
                    backgroundColor: " #EDEDED !important",
                    borderRadius: "20px",
                    maxWidth: "258px !important",
                    paddingTop: "10px",
                    marginBottom: "5px",
                    maxHeight: "40px",
                    display: "flex",
                    flexGrow: "1",
                    alignItems: "center",
                  },
                  "&.MuiSelect-select,.MuiInputBase-input,.MuiFilledInput-input:focus ": {
                    // paddingTop: "0px !important",
                    backgroundColor: "#EDEDED !important",
                    borderRadius: "20px",
                    padding: "10px"
                  },
                  "&.MuiFormControl-root": {
                    width: "90%",
                    marginTop: "0px"
                  },

                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={0}
            sx={{
              "&.MuiGrid-root,.MuiGrid-item": {
                paddingLeft: "0px",
                marginRight: "5px"
              }
            }}>
            <Divider orientation="vertical" className="vertical-divider" />
          </Grid>
          <Grid item xs={12} md={3.2}
            sx={{
              "&.MuiGrid-root,.MuiGrid-item": {
                paddingLeft: "0"
              }
            }}>
            <Paper class="details-page-paper" sx={{ padding: '10px' }}>
              <Typography class="heading-for-all" variant="body1">{t("thumbnailImage")} (330px230px)</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                        borderRadius: "10px"
                      }}
                    >
                      <img
                        src={mainImage} // Use the image URL from building.image
                        alt="more Image" // Provide a description for the image (alt text)
                        style={{
                          width: "100%", // Ensure the image takes the full width of the box
                          height: "100%", // Ensure the image takes the full height of the box
                          objectFit: "cover",
                          borderRadius: "10px" // Control how the image fits inside the box
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
                        borderRadius: "10px"
                      }}
                    >
                      <Button
                        class="floor-image-btn"
                        color="primary"
                        id="building-thumbnail-upload-button"
                        key="building-thumbnail-upload-button"
                        onClick={(e) => handleBuildingImageUpload("thumbnail")(e)}
                      >
                  {t("upload")}
                      </Button>

                    </Box>
                  )
                  }


                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "top",
                      flexGrow: 0,
                    }}
                  >

                    <IconButton
                      class="viewIcon-floor-image"
                      onClick={() => handleViewBuildImage(undefined, "thumbnail")}

                    >
                      <VisibilityIcon className="visibilityIcon" />
                    </IconButton>
                    <IconButton
                      class='delete-icon-floor-image'
                      onClick={() => handleDeleteBuildingImage(undefined, "thumbnail")}
                    >
                      {/* <DeleteIcon class="floorDeleteIcon" /> */}
                    </IconButton>
                  </Box>

                  <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="md"
                    fullWidth
                  >
                    <DialogContent>
                      <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        style={{ position: 'absolute', top: '5px', right: '5px' }}
                      >
                        <CloseIcon />
                      </IconButton>
                      {selectedImage && (
                        <img src={selectedImage.url} alt={selectedImage.name} style={{ maxWidth: '100%' }} />
                      )}
                    </DialogContent>
                  </Dialog>
                </Box>
                <Divider orientation="horizontal" />
                <Typography class="heading-for-all" variant="body1">{t("mainImage")} (1380px650px)</Typography>
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
                        borderRadius: "10px"
                      }}
                    >
                      <img
                        src={mainImage} // Use the image URL from building.image
                        alt="more Image" // Provide a description for the image (alt text)
                        style={{
                          width: "100%", // Ensure the image takes the full width of the box
                          height: "100%", // Ensure the image takes the full height of the box
                          objectFit: "cover",
                          borderRadius: "10px" // Control how the image fits inside the box
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
                        borderRadius: "10px"
                      }}
                    >
                      <Button
                        class="floor-image-btn"
                        color="primary"
                        id="building-main_image-upload-button"
                        key="building-main_image-upload-button"
                        onClick={(e) => handleBuildingImageUpload("main_image")(e)}

                      >
                        {t("upload")}
                      </Button>

                    </Box>
                  )
                  }
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "top",
                      flexGrow: 0,
                    }}
                  >
                    <IconButton
                      class="viewIcon-floor-image"
                      onClick={() => handleViewBuildImage(undefined, "main_image")}

                    >
                      <VisibilityIcon className="visibilityIcon" />
                    </IconButton>
                    <IconButton
                      class='delete-icon-floor-image'
                      onClick={() => handleDeleteBuildingImage(undefined, "main_image")}
                    >
                      {/* <DeleteIcon class="floorDeleteIcon" /> */}
                    </IconButton>
                  </Box>

                  <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="md"
                    fullWidth
                  >
                    <DialogContent>
                      <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        style={{ position: 'absolute', top: '5px', right: '5px' }}
                      >
                        <CloseIcon />
                      </IconButton>
                      {selectedImage && (
                        <img src={selectedImage.url} alt={selectedImage.name} style={{ maxWidth: '100%' }} />
                      )}
                    </DialogContent>
                  </Dialog>
                </Box>
                <Divider orientation="horizontal" />

                <Typography class="heading-for-all" variant="body1">{t("addMoreImages")} (1380px650px)</Typography>
                {building.more_images.map((image) => (
                  image.image && (
                    <div 
                    key={`more_image-${image.id}`}
                    >
                      <Box
                        id={`more_image-${image.id}`} // Make sure to include a unique key when rendering a list of elements
                        key={`more_image-${image.id}`} // Make sure to include a unique key when rendering a list of elements
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
                              overflow: "hidden"
                            }}
                          >
                            <img
                              src={mainImage} // Use the image URL from building.image
                              alt="more Image" // Provide a description for the image (alt text)
                              style={{
                                width: "100%", // Ensure the image takes the full width of the box
                                height: "100%", // Ensure the image takes the full height of the box
                                objectFit: "cover", // Control how the image fits inside the box
                              }}
                            />
                          </Box>
                          <Typography class="more-images-name" variant="body1">{image.image.name} </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "top",
                            flexGrow: 0,
                          }}
                        >
                          <IconButton
                            class="viewIcon-floor-image"
                            onClick={() => handleViewBuildImage(image.id, "more")}

                          >
                            <VisibilityIcon className="visibilityIcon" />
                          </IconButton>
                          <IconButton
                            class='delete-icon-floor-image'
                            id={image.id}
                            key={image.id}
                            onClick={() => handleDeleteBuildingImage(image.id, "more")}
                          >
                            {/* <DeleteIcon class="floorDeleteIcon" /> */}
                          </IconButton>

                          <Dialog
                            open={open}
                            onClose={handleClose}
                            maxWidth="md"
                            fullWidth
                          >
                            <DialogContent>
                              <IconButton
                                edge="end"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                                style={{ position: 'absolute', top: '5px', right: '5px' }}
                              >
                                <CloseIcon />
                              </IconButton>
                              {selectedImage && (
                                <img src={selectedImage.url} alt={selectedImage.name} style={{ maxWidth: '100%' }} />
                              )}
                            </DialogContent>
                          </Dialog>
                          <Divider orientation="horizontal" />
                        </Box>

                      </Box>
                      <Divider class="divider-more-image-count" orientation="horizontal" />
                    </div>

                  )
                ))}

                <Button
                  class="floor-image-btn"
                  color="primary"
                  id="building-main_image-upload-button"
                  key="building-main_image-upload-button"
                  onClick={() => handleBuildingImageUpload("more")()}
                >
                  {t("upload")}
                </Button>

              </Box>
            </Paper>
          </Grid>
          <Grid item xs={0}
            sx={{
              "&.MuiGrid-root,.MuiGrid-item": {
                paddingLeft: "0px",
                marginLeft: "5px"
              }
            }}>
            <Divider orientation="vertical" className="vertical-divider" />
          </Grid>
          <Grid item xs={12} md={4.8}
            sx={{
              "&.MuiGrid-root,.MuiGrid-item": {
                paddingLeft: "0",
                marginLeft: "2px"
              }
            }}>
            <Paper class="details-page-paper" sx={{ padding: '10px' }}>
              <Typography class="heading-for-all" variant="body1">{t("numberOfFloors")}</Typography>


              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 0,
                }}
              >
                <Grid item xs={12}  >

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexGrow: 0,
                    }}
                  >
                    <Grid item xs={7} md={3.5}>
                      <Typography variant="body1" class="header-text" fontWeight={500}>
                        {t("FloorNumber/Name")}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} md={1.8}>
                      <Typography variant="body1" class="header-text" fontWeight={500}>
                        {t("units")}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} md={6.7}>
                      <Typography variant="body1" class="header-text" fontWeight={500}>
                        {t("floorPlanImage")}
                      </Typography>
                    </Grid>
                  </Box>
                </Grid>

              </Box>

              <Grid item xs={12} >
                {building.floors.map((floor) => (
                  <div
                  key={`floor-${floor.id}`}
                  >
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
                        key={floor.id}
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
                                id={`floor-${floor.id}`}
                                key={`floor-${floor.id}`}
                                value={floor.name}
                                sx={{
                                  "&.MuiInputBase-root,.MuiFilledInput-root,.MuiSelect-root": {
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
                                  "&.MuiSelect-select,.MuiInputBase-input,.MuiFilledInput-input:focus ": {
                                    // paddingTop: "0px !important",
                                    backgroundColor: "#EDEDED !important",
                                    borderRadius: "20px",
                                    padding: "10px"
                                  },
                                  "&.MuiFormControl-root": {
                                    width: "90%",
                                    marginTop: "0px"
                                  },
                                }}
                                onChange={(e) =>
                                  handleFloorNameChange(
                                    floor.id,
                                    e.target.value
                                  )
                                }
                              ></TextField>
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
                              key={`floor-units-${floor.id}`}
                              id={`floor-units-${floor.id}`}
                              type="number"
                              value={String(floor.units).padStart(2, '0')} sx={{
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
                                "&.MuiInputBase-root,.MuiFilledInput-root,.MuiSelect-root": {
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
                                  floor.id,
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
                              flexDirection: 'row'

                            }}
                          >
                            <Box

                              sx={{
                                display: "flex",
                                alignItems: "center",
                                flexGrow: 1,

                              }}
                            >
                              {floor.image ? (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexGrow: 0,
                                    padding: "5px",
                                    marginBottom: "12px"

                                  }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      flexGrow: 0,

                                    }}>
                                    <Typography class="floor-image-names" variant="body1">{floor.image.name}</Typography>
                                  </Box>
                                  <IconButton
                                    class="viewIcon-floor-image"
                                    onClick={() => handleViewBuildImage(floor.id, "floor")}

                                  >
                                    <VisibilityIcon className="visibilityIcon" />
                                  </IconButton>
                                  <IconButton
                                    class='delete-icon-floor-image'
                                    onClick={() => handleDeleteFloorImage(floor.id)}
                                  >
                                    {/* <DeleteIcon class="floorDeleteIcon" /> */}
                                  </IconButton>
                                </Box>
                              ) : (
                                <div class="button-container">
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      flexGrow: 1,
                                      marginBottom: "12px"
                                    }}>
                                    <Button
                                      class="floor-image-btn"
                                      color="primary"
                                      id={`floor-image-input-button-${floor.id}`}
                                      key={`floor-image-input-button-${floor.id}`}
                                      onClick={(e) => handleFloorImageUpload(floor.id)(e)}>
                                      {t("upload")}
                                    </Button>
                                  </Box>

                                </div>

                              )
                              }
                              <Dialog
                                open={open}
                                onClose={handleClose}
                                maxWidth="md"
                                fullWidth
                              >
                                <DialogContent>
                                  <IconButton
                                    edge="end"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                    style={{ position: 'absolute', top: '5px', right: '5px' }}
                                  >
                                    <CloseIcon />
                                  </IconButton>
                                  {selectedImage && (
                                    <img src={selectedImage.url} alt={selectedImage.name} style={{ maxWidth: '100%' }} />
                                  )}
                                </DialogContent>
                              </Dialog>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                flexGrow: 1,
                              }}>
                              <Typography
                                variant="body2"
                                class="remove-text"
                                onClick={() => handleDeleteFloor(building.id, floor.id)}
                              >
                                {t("remove")}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>

                    </Box>
                    <Divider class="divider-floor-count" orientation="horizontal" />
                  </div>
                ))}


                <div class="add-btn-container">
                  <Button
                    class="add-btn"
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddFloor(building.id)}
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

  );
}

export default AddNewListing;
