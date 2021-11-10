import React, { FC } from "react";
import { Box, Typography } from "@mui/material";

type CardGoodDiscountProps = {
    discount: number
}

const CardGoodDiscount: FC<CardGoodDiscountProps> = ({discount}) => {
    return (
        <Box
            sx={ {
                position: "absolute",
                left: 10,
                top: 10,
                backgroundColor: theme => theme.palette.error.light,
                borderRadius: theme => theme.spacing(1.5),
                paddingX: 1,
                paddingY: 0.5
            } }
        >
            <Typography
                sx={ {
                    color: "#fff",
                    fontSize: 14
                } }
            >
                -{ discount }%
            </Typography>
        </Box>
    );
};

export default CardGoodDiscount;