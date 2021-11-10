import React, { FC } from "react";
import { goodsApi } from "../../services/goodsService";
import { Grid } from "@mui/material";
import CardGood from "../../components/UI/cardGood/CardGood";
import Loader from "../../components/UI/Loader";

const UserGoods: FC = () => {

    const { data: goods, isLoading } = goodsApi.useFetchGetGoodsQuery();

    if (isLoading) {
        return <Loader/>;
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
                                goodId={ good.id! }
                                title={ good.title }
                                price={ good.price }
                                discount={ good.discount }
                                goodImages={ good.goodImages }
                                asOwner={ true }
                            />
                        </Grid>
                    );
                })
            }
        </Grid>
    );
};

export default UserGoods;