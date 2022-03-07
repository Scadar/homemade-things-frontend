import React, { FC } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { IGoodImages } from "../../../models/goodModel";
import { flexStyles } from "../../../utils/styleUtils";
import GoodImgCarousel from "./GoodImgCarousel";
import CardGoodDiscount from "./CardGoodDiscount";
import CardGoodPrice from "./CardGoodPrice";
import CardGoodRating from "./CardGoodRating";
import CardGoodControl from "./CardGoodControl";

type CardGoodProps = {
  goodId: number;
  title: string;
  price: number;
  discount: number;
  goodImages?: IGoodImages[];
  asOwner?: boolean;
};

const CardGood: FC<CardGoodProps> = ({
  goodId,
  goodImages,
  price,
  discount,
  title,
  asOwner = false,
}) => {
  return (
    <Card
      sx={{
        width: 350,
        border: "none",
        position: "relative",
        overflow: "visible",
      }}
      variant={"outlined"}
    >
      <GoodImgCarousel images={goodImages ? goodImages : []} />

      <CardGoodDiscount discount={discount} />

      <CardContent>
        <Box sx={{ ...flexStyles("center", "space-between") }}>
          <CardGoodPrice price={price} discount={discount} />
          <CardGoodControl asOwner={asOwner} goodId={goodId} />
        </Box>

        <Typography variant={"body1"} fontWeight={400} sx={{ my: 1 }}>
          {title}
        </Typography>

        <CardGoodRating />

        {!asOwner && (
          <Button sx={{ mt: 2.5 }} variant={"contained"}>
            В корзину
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CardGood;
