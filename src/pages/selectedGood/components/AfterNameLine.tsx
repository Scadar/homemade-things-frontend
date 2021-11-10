import React, { FC } from "react";
import { flexStyles } from "../../../utils/styleUtils";
import { Box, Typography } from "@mui/material";

const AfterNameLine: FC = () => {
    return (
        <Box sx={ { ...flexStyles("center"), mt: 2 } }>
            <Typography variant="h6" sx={ { fontSize: 15, opacity: "0.5" } }>
                Артикул:
            </Typography>
            <Typography variant="h6" sx={ { fontSize: 15 } }>
                1488228
            </Typography>
            <Typography variant="h6" sx={ {
                fontSize: 15, color: "lightslategrey", ml: 2, borderBottom: 1, "&:hover": {
                    color: "red",
                    cursor: "pointer"
                }
            } }>
                106 отзывов
            </Typography>
            <Typography variant="h6" sx={ {
                fontSize: 15, opacity: "0.5", ml: 2
            } }>
                Купили более 1 600 раз
            </Typography>


        </Box>
    );
};

export default AfterNameLine;