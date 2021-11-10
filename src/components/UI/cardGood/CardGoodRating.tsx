import React, { FC } from "react";
import { Rating, Stack, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";

type CardGoodRatingProps = {}

const CardGoodRating: FC<CardGoodRatingProps> = () => {
    return (
        <Stack direction={ "row" } spacing={ 1 }>
            <Rating
                value={ 4.5 }
                precision={ 0.1 }
                readOnly
                sx={ {
                    color: red[300],
                    fontSize: 20
                } }
            />
            <Typography
                sx={ {
                    color: grey[600],
                    fontSize: 15
                } }
            >
                672 отзыва
            </Typography>
        </Stack>
    );
};

export default CardGoodRating;