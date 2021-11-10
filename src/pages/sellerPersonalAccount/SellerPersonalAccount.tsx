import React, { FC, useState } from "react";
import { Box, Typography } from "@mui/material";
import AddGood from "./AddGood";
import UserGoods from "./UserGoods";
import GoodControlPanel from "./GoodControlPanel";

const SellerPersonalAccount: FC = () => {

    const [addGoodOpen, setAddGoodOpen] = useState(false);

    const handleOpenAddGoodModal = () => {
        setAddGoodOpen(true);
    };

    const handleCloseAddGoodModal = () => {
        setAddGoodOpen(false);
    };

    return (
        <Box>
            <GoodControlPanel handleOpenAddGoodModal={ handleOpenAddGoodModal }/>
            <Typography variant={ "h4" }>Ваши товары</Typography>
            <UserGoods/>
            <AddGood open={ addGoodOpen } handleCloseAddGoodModal={ handleCloseAddGoodModal }/>
        </Box>
    );
};

export default SellerPersonalAccount;