import "./Amenities.css";

import React, { useState, useRef } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/CloseOutlined';
// import { DeleteIcon } from '@chakra-ui/icons'
import { openFileSelection, isSupportedImage } from "../openFileSelection"
import { useTranslation } from "react-i18next";


export default function Amenities() {
  const building = {
    id: "building Id",
    buildingName: "name",
    csv: null,
    floors: [
      {
        id: "1",
        name: "Ground Floor",
        layouts: [],
      },
      {
        id: "2",
        name: "First Floor",
        layouts: [],
      },
      {
        id: "3",
        name: "Second Floor",
        layouts: [],
      },
    ],
  };

  const availableAmenityOptions = ["Select an option","Bedroom", "Bathroom", "Kitchen", "Hall", "Other"];
  const [floors, setFloors] = useState(building.floors);
  const [editingLayoutId, setEditingLayoutId] = useState(null);
  const [newLayoutName, setNewLayoutName] = useState("");
  const { i18n, t } = useTranslation();
  const [floorStates, setFloorStates] = useState(
    // Initialize the floor states with all floors collapsed
    building.floors.map((floor) => ({
      id: floor.id,
      expanded: false,
    }))
  );

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  //to show the layout image on click of viewicon
  const handleViewLayoutImage = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
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
    return layout.amenities.some((amenity) => amenity.type === option);
  };

  const handleFloorNameChange = (floorId, newName) => {
    const updatedFloors = floors.map((floor) => {
      if (floor.id === floorId) {
        return { ...floor, name: newName };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };

  const layoutImageInputRefs = useRef({});

  const handleAddLayout = (floorId) => {
    const updatedFloors = floors.map((floor) => {
      if (floor.id === floorId) {
        const layoutCount = floor.layouts.length;
        const newLayoutName = `Layout ${layoutCount + 1}`;
        const newLayoutId = layoutCount + 1;
        const newLayout = {
          floor: floorId,
          id: newLayoutId,
          name: newLayoutName,
          amenities: [
            {
              floor: floorId,
              layout: newLayoutId,
              id: 0,
              type: "Select an option", // Keep the type null for now
              count: "",
              image: null,
            }
          ],
          image: null,
          availableAmenityOptions: ["Select an option","Bedroom", "Bathroom", "Kitchen", "Hall", "Other"],
        };

        // Check if the last added layout has an empty amenity type
        if (layoutCount) {
          const lastLayout = floor.layouts[layoutCount - 1];
          const hasNullTypeAmenity = lastLayout.amenities.some((amenity) => amenity.type === "Select an option");
          const hasNoAmenity = lastLayout.amenities.length

          if (hasNullTypeAmenity || !hasNoAmenity) {
            // Set an error for this layout using its ID
            setAmenityErrors((prevErrors) => ({
              ...prevErrors,
              [`${floor.id}-${lastLayout.id}`]: "Please complete current layout.",
            }));
          } else {
            // Clear the error for this layout using its ID
            setAmenityErrors((prevErrors) => ({
              ...prevErrors,
              [`${floor.id}-${lastLayout.id}`]: "",
            }));
            floor.layouts.push(newLayout);
          }
        }
        else {

          floor.layouts.push(newLayout);
        }

      }
      return floor;
    });

    setFloors(updatedFloors);
  };

  const handleLayoutNameChange = (floorId, layoutId, newName) => {
    const updatedFloors = floors.map((floor) => {
      if (floor.id === floorId) {
        const updatedLayouts = floor.layouts.map((layout) => {
          if (layout.id === layoutId) {
            return { ...layout, name: newName };
          }
          return layout;
        });
        return { ...floor, layouts: updatedLayouts };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };


  const [amenityErrors, setAmenityErrors] = useState({}); // State to store amenity errors


  const handleAddAmenity = (floorId, layoutId) => {
    const updatedFloors = floors.map((floor) => {
      if (floor.id === floorId) {
        const updatedLayouts = floor.layouts.map((layout) => {
          if (layout.id === layoutId) {
            var count = 0;
            if (!layout.amenities.length) {
              count = layout.amenities.length; // Get the count from the layout's amenities
            }
            else {
              const index = layout.amenities.length;
              count = layout.amenities[index - 1].id + 1;
            }
            // Check if any existing amenity within the same layout has a null type
            const hasNullTypeAmenity = layout.amenities.some((amenity) => amenity.type === "Select an option");

            if (hasNullTypeAmenity) {
              // Set an error for this amenity using its ID
              console.log("error count", `${floor.id}-${layout.id}-${count}`)
              setAmenityErrors((prevErrors) => ({
                ...prevErrors,
                [`${floor.id}-${layout.id}-${count - 1}`]: "Please select an amenity type before adding more.",
              }));
              console.log("error ", amenityErrors)
            } else {
              // Clear the error for this amenity using its ID
              setAmenityErrors((prevErrors) => ({
                ...prevErrors,
                [`${floor.id}-${layout.id}-${count}`]: "",
              }));
              const defaultType = "Select an option";

              const amenityCountCopy = [...layout.amenities];

              return {
                ...layout,
                amenities: [
                  ...amenityCountCopy,
                  {
                    floor: floorId,
                    layout: layoutId,
                    id: count,
                    type: defaultType, // Keep the type null for now
                    count: "",
                    image: null,
                  },
                ],
              };
            }
          }
          return layout;
        });
        return { ...floor, layouts: updatedLayouts };
      }
      return floor;
    });

    setFloors(updatedFloors);
  };

  const handleAmenityCountChange = (floorId, layoutId, amenityId, newValue) => {
    newValue = Math.max(0, newValue);
    const updatedFloors = floors.map((floor) => {
      if (floor.id === floorId) {
        const updatedLayouts = floor.layouts.map((layout) => {
          if (layout.id === layoutId) {
            const updatedAmenities = layout.amenities.map((amenity) => {
              if (amenity.id === amenityId) {
                return { ...amenity, count: newValue };
              }
              return amenity;
            });
            return { ...layout, amenities: updatedAmenities };
          }
          return layout;
        });
        return { ...floor, layouts: updatedLayouts };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };

  const handleAmenityTypeChange = (floorId, layoutId, amenityId, newValue) => {
    const updatedFloors = floors.map((floor) => {
      if (floor.id === floorId) {
        const updatedLayouts = floor.layouts.map((layout) => {
          if (layout.id === layoutId) {
            const updatedAmenities = layout.amenities.map((amenity) => {
              if (amenity.id === amenityId) {
                const selectedAmenity = amenity;
                const optionIndex = availableAmenityOptions.indexOf(selectedAmenity.type);
                setAmenityErrors((prevErrors) => ({
                  ...prevErrors,
                  [`${floor.id}-${layout.id}-${amenityId}`]: "",
                }));
                setAmenityErrors((prevErrors) => ({
                  ...prevErrors,
                  [`${floor.id}-${layout.id}`]: "",
                }));
                if (optionIndex !== -1) {
                  availableAmenityOptions.splice(optionIndex, 1);
                }
                selectedAmenity.type = newValue;
                return selectedAmenity;
              }
              return amenity;
            });
            return { ...layout, amenities: updatedAmenities };
          }
          return layout;
        });
        return { ...floor, layouts: updatedLayouts };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };

  const handleAmenityChange = (floorId, layoutId, amenityId, newValue) => {
    const updatedFloors = floors.map((floor) => {
      if (floor.id === floorId) {
        const updatedLayouts = floor.layouts.map((layout) => {
          if (layout.id === layoutId) {
            const updatedAmenities = layout.amenities.map((amenity) => {
              if (amenity.id === amenityId) {
                return newValue;
              }
              return amenity;
            });
            return { ...layout, amenities: updatedAmenities };
          }
          return layout;
        });
        return { ...floor, layouts: updatedLayouts };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };




  const handleAmenityImageUpload = (floorId, layoutId, amenityId) => async () => {
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

      const updatedFloors = floors.map((floor) => {
        if (floor.id === floorId) {
          const updatedLayouts = floor.layouts.map((layout) => {
            if (layout.id === layoutId) {
              const updatedAmenities = layout.amenities.map((amenity) => {
                if (amenity.id === amenityId) {
                  console.log("printing before return", file.name)
                  return { ...amenity, image: file };
                }
                return amenity;
              });
              return { ...layout, amenities: updatedAmenities };
            }
            return layout;
          });
          return { ...floor, layouts: updatedLayouts };
        }
        return floor;
      });

      setFloors(updatedFloors);
    } catch (error) {
      console.error(error);
    }
  };



  const handleDeleteAmenityImage = (floorId, layoutId, amenityId) => () => {
    console.log("before returning image to null")
    const updatedFloors = floors.map((floor) => {
      if (floor.id === floorId) {
        const updatedLayouts = floor.layouts.map((layout) => {
          if (layout.id === layoutId) {
            const updatedAmenities = layout.amenities.map((amenity) => {
              if (amenity.id === amenityId) {
                console.log("before returning image to null", amenity.image.name)
                return { ...amenity, image: null };
              }
              return amenity;
            });
            return { ...layout, amenities: updatedAmenities };
          }
          return layout;
        });
        return { ...floor, layouts: updatedLayouts };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };


  const handleDeleteAmenity = (floorId, layoutId, amenityId) => {
    const updatedFloors = floors.map((floor) => {
      if (floor.id === floorId) {
        const updatedLayouts = floor.layouts.map((layout) => {
          if (layout.id === layoutId) {
            const updatedAmenities = layout.amenities.filter(
              (amenity) => amenity.id !== amenityId
            );
            return { ...layout, amenities: updatedAmenities };
          }
          return layout;
        });
        return { ...floor, layouts: updatedLayouts };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };

  const handleLayoutImageUpload = (floorId, layoutId) => async (e) => {
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

      // Update the floors state with the new image file.
      const updatedFloors = floors.map((floor) => {
        if (floor.id === floorId) {
          const updatedLayouts = floor.layouts.map((layout) => {
            if (layout.id === layoutId) {
              return { ...layout, image: file };

            }
            return layout;
          });
          return { ...floor, layouts: updatedLayouts };
        }
        return floor;
      });
      setFloors(updatedFloors);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCSVUpload = () => async (e) => {
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

      // Update the floors state with the new image file.
      building.image = file;
      console.log("the file csv is", building.image.name)
    } catch (error) {
      console.error(error);
    }
  };

  const downloadCSVFile = () => {
    // try {
    //   if (!building.image) {
    //     throw new Error('No CSV file uploaded');
    //   }

    // } catch (error) {
    //   console.error(error);
    // }
    console.log("Download is called")
  };




  const handleDeleteLayoutImage = (floorId, layoutId) => {
    console.log("entering delete")
    const updatedFloors = floors.map((floor) => {
      if (floor.id === floorId) {
        const updatedLayouts = floor.layouts.map((layout) => {
          if (layout.id === layoutId) {
            return { ...layout, image: null };
          }
          return layout;
        });
        return { ...floor, layouts: updatedLayouts };
      }
      return floor;
    });
    setFloors(updatedFloors);
  };

  return (
    <div class="wrapper">
      <div class="floor">
        <div >
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>

            <Typography class="text-amenities" variant="body1" fontWeight={500}>
              {t("addAmenities")}
            </Typography>
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
                {t("downloadCSVFormat")}

              </Button>
              <Button class="btn-upload-csv" onClick={(e) => handleCSVUpload()(e)}>u{t("uploadCSV")}</Button>

            </Box>

          </Box>
        </div>
        <div>
          <Divider class="amenities-divider" variant="middle" color="#D9D9D9" sx={{ mt: "35px", mb: 0, ml: 0 }} />
        </div>


        {floors.map((floor) => (
          <div key={floor.id}>
            <Grid item xs={12} key={floor.id}>
              <div class="floor-header"
                onClick={() => toggleFloorState(floor.id)}

              >
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                }}>

                  <Box sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexGrow: 1,
                    justifyContent: "space-between",
                  }}>

                    <Typography variant="body1" class="text-floor-name" fontWeight={400}>
                      {floor.name}
                    </Typography>
                  </Box>

                  <button
                    class={`expand-button ${floorStates.find((state) => state.id === floor.id)?.expanded
                      ? "expanded"
                      : ""
                      }`}
                  >
                    {floorStates.find((state) => state.id === floor.id)?.expanded ? <ExpandLessOutlinedIcon /> : <ExpandMoreIcon />}
                  </button>
                </Box>

              </div>
              {floorStates.find((state) => state.id === floor.id)?.expanded && (
                // Render floor details if the floor is expanded
                <div class="floor-details">

                  {
                    floor.layouts?.map((layout) => (

                      <div class="layout-container" key={layout.id}>
                        <div class="layout-content">
                          <Grid item xs={12} key={layout.id}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                flexGrow: 0,
                              }}
                            >

                              {editingLayoutId === layout.id ? (
                                <input
                                  type="text"
                                  value={newLayoutName}
                                  onChange={(e) => setNewLayoutName(e.target.value)}
                                  onBlur={() => handleLayoutNameChange(floor.id, layout.id, newLayoutName)}
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      handleLayoutNameChange(floor.id, layout.id, newLayoutName);
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
                                    setEditingLayoutId(layout.id);
                                    setNewLayoutName(layout.name);
                                  }}
                                >
                                  {layout.name}
                                </Typography>
                              )}
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
                                {layout.image ? (
                                  <div class="layout-image-container">
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexGrow: 1,
                                      }}
                                    >
                                      <Typography class="layout-image-name" variant="body1">{layout.image.name}</Typography>
                                      <IconButton
                                        class="viewIcon-layout-image"
                                        onClick={() => handleViewLayoutImage(layout.image)}
                                      >
                                        <VisibilityIcon className="visibilityIcon" />
                                      </IconButton>
                                      <IconButton
                                        class="delete-icon-layout-image"
                                        onClick={(e) => handleDeleteLayoutImage(floor.id, layout.id)}
                                      >

                                        {/* <DeleteIcon className="deleteIcon" /> */}

                                      </IconButton>

                                    </Box>
                                  </div>
                                ) : (
                                  <div class="button-container">
                                    <Button
                                      class="amenity-image-btn"
                                      id={`layout-image-input-button-${floor.id}-${layout.id}`}
                                      key={`layout-image-input-button-${floor.id}-${layout.id}`}
                                      onClick={(e) => handleLayoutImageUpload(floor.id, layout.id)(e)}>
                                      {/* <label htmlFor={`layout-image-input-${floor.id}-${layout.id}`}> */}
                                      {t("uploadLayoutImage")}
                                      {/* </label> */}
                                    </Button>
                                  </div>
                                )}

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
                            </Box>
                            <Grid container spacing={2} class="main-grid">
                              <Grid item xs={6} md={4}>
                                <Typography variant="body1" class="header-text" fontWeight={500}>
                                  {t("amenity")}
                                </Typography>
                              </Grid>
                              <Grid item xs={6} md={3}>
                                <Typography variant="body1" class="header-text" fontWeight={500}>
                                  {t("number")}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid container spacing={2} class="amenity-container">

                              {layout.amenities.map((amenity) => (

                                <Grid
                                  container
                                  spacing={2}
                                  key={amenity.id}
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
                                      <FormControl fullWidth sx={{ border: "none" }}>
                                        <Select
                                          variant="filled"
                                          labelId="amenity-type"
                                          id="amenity-type"
                                          key="amenity-type"
                                          value={amenity.type || "Select an option"}
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
                                              paddingTop: "0px !important",
                                              backgroundColor: "#EDEDED !important",
                                              borderRadius: "20px",
                                            },
                                            "&.MuiFormControl-root": {
                                              width: "fit-content",
                                            },
                                          }}
                                          onChange={(e) =>
                                            handleAmenityTypeChange(
                                              floor.id,
                                              layout.id,
                                              amenity.id,
                                              e.target.value
                                            )
                                          }
                                        >

                                          {availableAmenityOptions.map((option) => (
                                            <MenuItem
                                              key={option}
                                              value={option}
                                              disabled={
                                                option !== "Other" &&
                                                isAmenityOptionSelected(layout, option)
                                              }
                                            >
                                              {option}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                        {(amenityErrors[`${floor.id}-${layout.id}-${amenity.id}`] &&
                                          <Typography
                                            variant="body2"
                                            class="error-text"
                                          >
                                            {amenityErrors[`${floor.id}-${layout.id}-${amenity.id}`]
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

                                        id={`amenity-count-${floor.id}-${layout.id}-${amenity.id}`}
                                        key={`amenity-count-${floor.id}-${layout.id}-${amenity.id}`}
                                        type="number"
                                        value={String(amenity.count).padStart(2, '0')} sx={{
                                          "&.MuiInputBase-input,.MuiInput-input": {
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
                                          "&.MuiInputBase-root,.MuiFilledInput-root,.MuiSelect-root": {
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
                                            floor.id,
                                            layout.id,
                                            amenity.id,
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
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexGrow: 1,
                                      }}
                                    >
                                      {amenity.image ? (
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            flexGrow: 0,
                                          }}>
                                          <Typography class="layout-image-name" variant="body1">{amenity.image.name}</Typography>
                                          <IconButton
                                            class='delete-icon-layout-image'
                                            onClick={handleDeleteAmenityImage(floor.id, layout.id, amenity.id)}
                                          >
                                            {/* <DeleteIcon className="deleteIcon" /> */}
                                          </IconButton>
                                        </Box>
                                      ) : (
                                        <div class="button-container">
                                          <Box
                                            sx={{
                                              display: "flex",
                                              alignItems: "center",
                                              flexGrow: 1,
                                            }}>
                                            <Button
                                              class="amenity-image-btn"
                                              color="primary"
                                              id={`amenity-image-input-button-${floor.id}-${layout.id}-${amenity.id}`}
                                              key={`amenity-image-input-button-${floor.id}-${layout.id}-${amenity.id}`}
                                              onClick={(e) => handleAmenityImageUpload(floor.id, layout.id, amenity.id)(e)}>
                                              {/* <label htmlFor={`amenity-image-input-${floor.id}-${layout.id}-${amenity.id}`}> */}
                                              {t("uploadImage")}
                                              {/* </label> */}
                                            </Button>
                                          </Box>
                                        </div>
                                      )}
                                    </Box>
                                  </Grid>
                                  <Grid item xs={6} md={2}>

                                    <Typography
                                      variant="body2"
                                      class="remove-text"
                                      onClick={() => handleDeleteAmenity(floor.id, layout.id, amenity.id)}
                                    >
                                      {t("remove")}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              ))}
                            </Grid>
                            <div class="add-btn-container">
                              <Button
                                class="add-btn"
                                variant="contained"
                                color="primary"
                                onClick={() => handleAddAmenity(floor.id, layout.id)}
                              >
                                {t("addMore")}
                              </Button>
                            </div>
                          </Grid>
                        </div>
                        {(amenityErrors[`${floor.id}-${layout.id}`] &&
                          <Typography
                            variant="body2"
                            class="error-text"
                          >
                            {amenityErrors[`${floor.id}-${layout.id}`]
                            }

                          </Typography>
                        )}
                      </div>

                    ))
                  }


                  <div class="add-btn-container">
                    <Button
                      class="add-layout-btn"
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddLayout(floor.id)}
                    >
                      {t("addLayout")}
                    </Button>
                  </div>
                </div>


              )}
              <Divider class="floor-divider" variant="middle" color="#D9D9D9" sx={{ mt: 4, mb: 1, ml: 0 }} />

            </Grid>
          </div>
        ))}

        {/* <div class="final-button-container">
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
            <Button class="button-cancel">Cancel</Button>
            <Button variant="contained" color="primary" class="button-next">
              Next
            </Button>
          </Box>
        </div> */}
      </div>
    </div>
  );
}