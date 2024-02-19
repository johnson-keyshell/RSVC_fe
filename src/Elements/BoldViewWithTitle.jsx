import { Typography } from '@mui/material'
import React from 'react'

function BoldViewWithTitle({ title, text }) {
    return (
        <div>
            <div class="buildText-container">
                <Typography
                    className="txt-street"
                    variant="subtitle1"
                    sx={{
                        font: "inter",
                        fontSize: "13px",
                        fontWeight: "400",
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    className="txt-buildname"
                    variant="subtitle2"
                    sx={{
                        font: "inter",
                        fontSize: "20px",
                        fontWeight: "600",
                    }}
                >
                    {text ? (text) : ("NA")}
                </Typography>
            </div>
        </div>
    )
}

export default BoldViewWithTitle