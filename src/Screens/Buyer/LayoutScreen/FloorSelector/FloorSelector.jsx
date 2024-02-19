// import mainImage from '../../Images/main.jpg';
// import mainImage from '../../Images/build_5.jpg'
import React, { useState, useEffect, useRef } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import './FloorSelector.css'

const ImageMap = ({ floors, numberOfFloors, mainImage, onSelect, selectedFloor, role }) => {
    const [hoveredArea, setHoveredArea] = useState(null);
    const [selectedArea, setSelectedArea] = useState(selectedFloor);
    const [imageHeight, setImageHeight] = useState(null);
    const [imageWidth, setImageWidth] = useState(null);
    const imgRef = useRef(null);


    const handleClickOfFloor = (areaName) => {
        console.log("selected floor is ", areaName);
        setSelectedArea(areaName);
        onSelect(areaName);
    }

    // const numberOfFloors = 3; // Change this to the number of floors you want to divide the image into
    useEffect(() => {
        setSelectedArea(selectedFloor);
    }, [selectedFloor]);
    useEffect(() => {

        // Replace 'your-image.jpg' with the path to your image
        imgRef.current = new Image();
        imgRef.current.src = mainImage; // Assign the image path directly

        imgRef.current.onload = () => {
            setImageHeight(imgRef.current.naturalHeight); // Set the image height
            setImageWidth(imgRef.current.naturalWidth);

        };
    }, []);

    // Calculate the floor height based on the image's natural height and the number of floors
    const floorHeight = 250 ? 250 / numberOfFloors : 'auto';

    // Calculate the floor width based on the image's natural width and the number of floors
    const floorWidth = imageWidth ? imageWidth / numberOfFloors : 'auto';

    // Generate dynamic floor coordinates as rectangles

    const copiedFloors = [...floors];

    // Modify the copiedFloors array to generate floorCoordinates
    const floorCoordinates = copiedFloors.sort((a, b) => a.FloorName.localeCompare(b.FloorName)).slice().reverse().map((floor, index) => {
        const startX = 0;
        const endX = imageWidth;
        const startY = index * floorHeight;
        const endY = startY + floorHeight;

        return {
            name: floor.FloorName,
            coords: [startX, startY, endX, endY],
        };
    });
    console.log("floorCoordinates", floorCoordinates)
    console.log("Number of floors", numberOfFloors)


    const styles = {
        container: {
            position: 'relative',
        },
        img: {
            width: '100%',
            height: '250px',
            objectFit: 'cover',
        },
        area: {
            cursor: 'pointer',
        },
        shadedArea: {
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            pointerEvents: 'none',
            zIndex: 1,
        },
        selectedArea: {
            position: 'absolute',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            pointerEvents: 'none',
            zIndex: 1,
        }
    };

    const [popupVisible, setPopupVisible] = useState(false);
    const [popupContent, setPopupContent] = useState(null);

    const handleHover = (areaName) => {
        setHoveredArea(areaName);
        console.log("Hovered Area", areaName)

        // Find the floor object by its name
        const hoveredFloor = floors.find((floor) => floor.FloorName === areaName);

        if (hoveredFloor) {
            // Create popup content based on the floor's units
            const unitsContent =
                <div>
                    <Typography className="hover-typo" sx={{ fontWeight: '600' }}>{areaName}</Typography>
                    {
                        hoveredFloor.apartments?.
                        sort((a, b) => a.ApartmentName.localeCompare(b.ApartmentName)).
                        map((unit) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'center'
                                }}>
                                <div class="circles"
                                style={{
                                  backgroundColor:
                                    unit.Status === 'Under Option'
                                      ? 'orange'
                                      : unit.Status === 'Available'
                                      ? 'green'
                                      : 'red',
                                }}
                                />
                                <span class="circle-text-inside-hover">
                                    {unit.ApartmentName}
                                </span>
                            </Box>

                        ))}
                </div>

            // Set the popup content and display it
            setPopupContent(unitsContent);
            setPopupVisible(true);
        } else {
            // Hide the popup if no floor is hovered
            setPopupVisible(false);
        }
    };

    return (
        <div className="main-wrapper">
            <div className="main">
                <Paper elevation={3}>
                    <div style={styles.container}>
                        {/* Add an ID to the image element */}
                        <img
                            src={mainImage}
                            alt="Image Map"
                            useMap="#image-map"
                            style={{ ...styles.img }}
                            id="image-map"
                        />

                        <map name="image-map">
                            {floorCoordinates.map((floor) => (
                                <area
                                    key={floor.name}
                                    shape="rect" // Change shape to "rect"
                                    coords={floor.coords.join(',')} // Join the rectangular coordinates
                                    alt={floor.name}
                                    onMouseOver={() => {
                                        if (role === 'select') {
                                            handleHover(floor.name);
                                        }
                                    }}
                                    onMouseOut={() => {
                                        if (role === 'select') {
                                            handleHover(null);
                                        }
                                    }}
                                    onClick={() => {
                                        if (role === 'select') {
                                            handleClickOfFloor(floor.name);
                                        }
                                    }}
                                />
                            ))}
                        </map>
                        {popupVisible && (
                            <div class="hover-wrapper" >
                                {popupContent}
                            </div>
                        )}
                        {hoveredArea && (
                            <div
                                style={{
                                    ...styles.shadedArea,
                                    top: `${floorCoordinates.find(
                                        (floor) => floor.name === hoveredArea
                                    ).coords[1]}px`, // Use top coordinate
                                    left: '0', // Fixed to the left
                                    width: '100%', // Set the width to the image width
                                    height: `${floorCoordinates.find(
                                        (floor) => floor.name === hoveredArea
                                    ).coords[3] - floorCoordinates.find(
                                        (floor) => floor.name === hoveredArea
                                    ).coords[1]}px`,
                                }}
                            />
                        )}
                        {selectedArea && (
                            <div
                                style={{
                                    ...styles.selectedArea,
                                    top: `${floorCoordinates.find(
                                        (floor) => floor.name === selectedArea
                                    ).coords[1]}px`, // Use top coordinate
                                    left: '0', // Fixed to the left
                                    width: '100%', // Set the width to the image width
                                    height: `${floorCoordinates.find(
                                        (floor) => floor.name === selectedArea
                                    ).coords[3] - floorCoordinates.find(
                                        (floor) => floor.name === selectedArea
                                    ).coords[1]}px`,
                                }}
                            />
                        )}


                    </div>
                </Paper>
            </div>
        </div>
    );
};

export default ImageMap;
