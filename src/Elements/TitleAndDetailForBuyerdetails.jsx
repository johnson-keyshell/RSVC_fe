import { Box, Typography } from '@mui/material'
import React from 'react'

function TitleAndDetailForBuyerdetails({ title, value }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography class='amenity-type'>{title}</Typography>
            <Typography class='amenity-type-content-se'>{value}</Typography>
        </Box>
    )
}

export default TitleAndDetailForBuyerdetails