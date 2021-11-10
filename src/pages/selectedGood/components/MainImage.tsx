import React, { FC } from "react";
import { Box } from "@mui/material";

const MainImage: FC = () => {
    return (
        <Box>
            <img style={ { height: "700px" } } src="https://images.wbstatic.net/big/new/26560000/26568682-1.jpg">
            </img>
        </Box>
    );
};

export default MainImage;