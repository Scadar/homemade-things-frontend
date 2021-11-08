import React, { FC } from "react";
import { Box, Button, Card, CardContent, CardMedia, Rating, Stack, Typography } from "@mui/material";
import { IGoodImages } from "../../models/goodModel";
import emptyImg from "../../static/images/empty_img.png";
import { baseUrl } from "../../services/config/query";
import { priceFormat } from "../../utils/priceFormat";
import StrikethroughText from "./StrikethroughText";
import { grey, red } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { flexStyles } from "../../utils/styleUtils";

type CardGoodProps = {
    title: string;
    price: number;
    discount: number;
    goodImages?: IGoodImages[]
}

const CardGood: FC<CardGoodProps> = ({ goodImages, price, discount, title }) => {
    return (
        <Card
            sx={ {
                width: 350,
                border: "none",
                position: "relative",
                overflow: "visible"
            } }
            variant={ "outlined" }
        >
            <CardMedia
                sx={ {
                    cursor: "pointer",
                    borderRadius: theme => theme.spacing(1),
                } }
                component="img"
                height="300"
                image={ goodImages ? goodImages.length > 0 ? baseUrl + "/img/" + goodImages[0].path : emptyImg : emptyImg }
                alt="green iguana"
            />
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
            <CardContent>
                <Box sx={ { ...flexStyles("center", "space-between") } }>
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
                    <FavoriteBorderIcon
                        sx={ {
                            cursor: "pointer",
                            fontSize: 28
                        } }
                    />
                </Box>
                <Typography variant={ "body1" } fontWeight={ 400 } sx={ { my: 1 } }>
                    { title }
                </Typography>
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
                <Button
                    sx={ { mt: 2.5 } }
                    variant={ "contained" }
                >
                    В корзину
                </Button>
            </CardContent>
        </Card>
    );
};

export default CardGood;