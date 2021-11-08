import React, { FC } from "react";
import { goodsApi } from "../services/goodsService";
import { Box, Grid, Skeleton } from "@mui/material";
import { flexStyles } from "../utils/styleUtils";
import CardGood from "../components/UI/CardGood";

const UserGoods: FC = () => {

    const { data: goods, isLoading } = goodsApi.useFetchGetGoodsQuery();

    if (isLoading) {
        return (
            <Box sx={ { ...flexStyles("center", "center"), flexWrap: "wrap" } }>
                { [...new Array(8)].map((_, index) =>
                    <Skeleton
                        key={ index }
                        animation={ "wave" }
                        variant="rectangular"
                        width={ "20%" }
                        height={ 400 }
                        sx={ {
                            mb: 7,
                            ml: 7,
                            borderRadius: 4
                        } }
                    />
                ) }
            </Box>
        );
    }

    return (
        <Grid
            container
            spacing={ 3 }
            wrap={ "wrap" }
            justifyContent={ "center" }
            sx={ {
                my: 3
            } }
        >
            {
                goods!.map(good => {
                    return (
                        <Grid item key={ good.id }>
                            <CardGood
                                title={ good.title }
                                price={ good.price }
                                discount={ good.discount }
                                goodImages={ good.goodImages }
                            />
                        </Grid>
                    );
                })
            }
        </Grid>
    );
};

export default UserGoods;