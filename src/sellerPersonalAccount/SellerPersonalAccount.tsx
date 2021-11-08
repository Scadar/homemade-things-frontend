import React, { FC, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Tooltip } from "@mui/material";
import AddGood from "./AddGood";
import UserGoods from "./UserGoods";

const SellerPersonalAccount: FC = () => {

    const [addGoodOpen, setAddGoodOpen] = useState(false);

    return (
        <Box>
            <Tooltip title={ "Добавить товар" }>
                <IconButton onClick={ () => setAddGoodOpen(prev => !prev) }>
                    <AddIcon sx={ { color: theme => theme.appPalette.mainColor } }/>
                </IconButton>
            </Tooltip>

            {
                addGoodOpen &&
                <AddGood/>
            }

            <UserGoods/>
        </Box>
    );
};

export default SellerPersonalAccount;