import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import HistoryLine from "./components/HistoryLine";
import AfterNameLine from "./components/AfterNameLine";
import MainImage from "./components/MainImage";
import BuyBlock from "./components/BuyBlock";
import AboutGood from "./components/AboutGood";
import CommentsModal from "./components/CommentsModal";
//backIcon,starIcon,like,forwardIcon

const SelectedGood: FC = () => {

    const [openModal, setOpenModal] = React.useState(false);
    const constHandleOpen = () => {
        setOpenModal(true);
    };
    return (
        <Box sx={ { p: 2 } }>
            <HistoryLine/>
            <Box sx={ { mt: 4 } }>
                <Typography variant="h4" sx={ { fontWeight: 800, fontSize: 35 } }>
                    Xiaomi кастомный / POCO X3 Pro 8/256 Gb
                </Typography>
            </Box>
            <AfterNameLine/>
            <Box sx={ { mt: 6, display: "flex" } }>
                <MainImage/>
                <BuyBlock/>
            </Box>
            <AboutGood/>
            <CommentsModal openModal={ openModal }/>
        </Box>

    );
};

export default SelectedGood;