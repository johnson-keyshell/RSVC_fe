import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import "./AdditionalDetails.css";
import { useTranslation } from "react-i18next";

const AdditionalDetails = () => {

    const buildings = {
        id: "building Id",
        buildingName: "name",
        csv: null,
        thumbnail: null,
        main_image: null,
        more_images: [],
        floors: [],
        customFields: [],
        description: "",
        age: "",

    };
    const [building, setBuilding] = useState(buildings);
    const { i18n, t } = useTranslation()

    const [customFields, setCustomFields] = useState([{ description: '', value: '' }]);

    const handleAddCustomField = () => {
        const updatedBuilding = { ...building };
       
          var count = 0;
          if (!building.customFields.length) {
            count = building.customFields.length;
          }
          else {
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
          console.log(updatedBuilding)
        
        setBuilding(updatedBuilding);
        console.log(buildings)
    };

    const handleCustomFieldChange = (fieldId, field, value) => {
        // Clone the building object to make a copy
        const updatedBuilding = { ...building };
      
        // Find the index of the custom field based on its id or any other identifier
        const fieldIndex = updatedBuilding.customFields.findIndex((cf) => cf.id === fieldId);
      
        if (fieldIndex !== -1) {
          // Update the specific custom field in the cloned object
          updatedBuilding.customFields[fieldIndex][field] = value;
      
          // Update the state with the updated building object
          setBuilding(updatedBuilding);
        }
      };

   



    return (
        <div class="addtl-wrapper">
        <Box
            p={4}
            display="flex"
            flexDirection="column"
        >
            <Typography
                class="additional-head"
            >
             { t("generalDetails")}
            </Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Grid item xs={6} md={4}>
                        <Typography class="heading-for-all-additional" >
                            {t("description")}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Typography class="heading-for-all-additional" >
                            {t("ageOfBuilding")}
                        </Typography>
                    </Grid>
                </Grid>


                <Grid container spacing={3}>
                    <Grid item xs={6} md={4}>
                        <TextField
                            className='des-add-text'
                            margin="dense"
                            id="description"
                            placeholder={t("descriptionHere")}
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                          value={building.description}
                          onChange={(e) => setBuilding({ ...building, description: e.target.value })}
                          />

                    </Grid>
                    <Grid item xs={6} md={4}>
                        <TextField
                            className='des-add-text'
                            margin="dense"
                            id="age-of-building"
                            placeholder={t("enterDetailsHere")}
                            type="text"
                            fullWidth

                            rows={4}
                            variant="outlined"
                            value={building.age}
                          onChange={(e) => setBuilding({ ...building, age: e.target.value })}
                            sx={{
                                "&.MuiInputBase-input,.MuiOutlinedInput-input": {
                                    paddingBlock: "10px",
                                }
                            }}
                        />

                    </Grid>
                </Grid>



                <Divider sx={{ mt: 2, mb: 2 }} />

                <Typography class="additional-head">
                 {t("customFields")}
                </Typography>

                {building.customFields.map((CF) => (
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    className='des-add-text'
                                    // margin="dense"
                                    id={CF.id}
                                    placeholder={t("fieldNameComeshere")}
                                    type="text"
                                    fullWidth
                                    rows={4}
                                    variant="outlined"
                                    value={CF.head}
                                    onChange={(e) => handleCustomFieldChange(CF.id, 'head', e.target.value)}
                                    sx={{
                                        "&.MuiInputBase-input,.MuiOutlinedInput-input": {
                                            paddingBlock: "10px",
                                        }
                                    }}
                                />


                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    className='des-add-text'
                                    // margin="dense"
                                    id={CF.id}
                                    placeholder={t("detailsComesHere")}
                                    type="text"
                                    fullWidth

                                    rows={4}
                                    variant="outlined"
                                      value={CF.desc}
                                      onChange={(e) => handleCustomFieldChange(CF.id, 'desc', e.target.value)}
                                      sx={{
                                        "&.MuiInputBase-input,.MuiOutlinedInput-input": {
                                            paddingBlock: "10px",
                                        }
                                    }}
                                />

                            </Grid>
                        </Grid>
                        <Divider sx={{ mt: 1, mb: 2 }} />

                    </div>
                ))}

                <Button
                    class="add-btn-addtnl"
                    variant="contained"
                    color="primary"
                    onClick={()=>handleAddCustomField()}
                >
                   {t("addField")}
                </Button>

            </Grid>
        </Box>
        </div>

    );
};

export default AdditionalDetails;
