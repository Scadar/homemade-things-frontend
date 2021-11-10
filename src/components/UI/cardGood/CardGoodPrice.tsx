import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import { priceFormat } from "../../../utils/priceFormat";
import StrikethroughText from "../StrikethroughText";

type CardGoodPriceProps = {
    price: number
    discount: number
}

const CardGoodPrice: FC<CardGoodPriceProps> = ({ price, discount }) => {
    return (
        <Box>
            <Typography
                component={ "span" }
                sx={ {
                    color: theme => theme.palette.error.light,
                    fontWeight: 500,
                    fontSize: 20,
                    mr: 2
                } }
            >
                { priceFormat(price * (1 - (discount / 100))) }
            </Typography>
            <StrikethroughText
                component={ "span" }
                text={ priceFormat(price) }
                variant={ "caption" }
            />
        </Box>
    );
};

export default CardGoodPrice;