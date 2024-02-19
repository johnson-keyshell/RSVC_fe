import React from "react";
import { Typography, Paper } from "@mui/material";

function NothingFound() {
  return (
    <Paper
      style={{
        padding: '16px',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius:'20px'
      }}
    >
      <img
        className="w-50"
        src="https://user-images.githubusercontent.com/925062/41967273-88b42470-7a01-11e8-8328-51e4f5b894f1.png"
        alt="Creative Placeholder"
      />
      {/* <Typography variant="h6" style={{ marginTop: '16px' }}>
        Nothing Found at this point of time!!!
      </Typography> */}
    </Paper>
  );
}

export default NothingFound;
