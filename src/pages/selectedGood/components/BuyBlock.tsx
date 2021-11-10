import React, { FC } from "react";
import { Box, Button, Typography } from "@mui/material";
import { flexStyles } from "../../../utils/styleUtils";

const BuyBlock: FC = () => {
    return (
        <Box sx={ { ml: 20 } }>
            <Typography variant="h4" sx={ { fontWeight: 800, fontSize: 35 } }>
                22 425 руб.
            </Typography>
            <Typography variant="h6" sx={ { color: "darkgray", fontSize: 15 } }>
                Цена без скидки: 27 430 руб.
            </Typography>
            <Box sx={ { mt: 3 } }>
                <Typography variant="h6" sx={ { fontSize: 18 } }>
                    Выберите цвет: синий
                </Typography>
                <Box sx={ { ...flexStyles("center", "space-between"), mt: 2 } }>
                    <Box sx={ {
                        "&:hover": {
                            border: 2,
                            borderColor: "primary.main",
                            cursor: "pointer"

                        }
                    } }>
                        <img style={ { height: "70px", width: "70px" } }
                             src="https://images.wbstatic.net/c246x328/new/26560000/26568682-1.jpg">
                        </img>
                    </Box>
                    <Box sx={ {
                        "&:hover": {
                            border: 2,
                            borderColor: "primary.main",
                            cursor: "pointer"

                        }
                    } }>
                        <img style={ { height: "70px", width: "70px" } }
                             src="https://images.wbstatic.net/c246x328/new/26560000/26568686-6.jpg">
                        </img>
                    </Box>
                    <Box sx={ {
                        "&:hover": {
                            border: 2,
                            borderColor: "primary.main",
                            cursor: "pointer"

                        }
                    } }>
                        <img style={ { height: "70px", width: "70px" } }
                             src="https://images.wbstatic.net/c246x328/new/26560000/26568684-1.jpg">
                        </img>
                    </Box>
                </Box>
            </Box>
            <Box sx={ { mt: 3 } }>
                <Button variant="contained" color="primary" size="large" sx={ { width: 300, height: 50 } }>
                    Добавить в корзину
                </Button>
            </Box>
            <Box sx={ { mt: 3 } }>
                <Typography variant="h6" sx={ { color: "darkgray", fontSize: 15 } }>
                    Доставка: 12-14 ноября
                </Typography>
                <Typography variant="h6" sx={ { color: "darkgray", fontSize: 15 } }>
                    Склад отгрузки: склад CustomThings
                </Typography>
                <Typography variant="h6" sx={ { color: "darkgray", fontSize: 15 } }>
                    Продавец:
                    CustomThings
                </Typography>
            </Box>
            <Box>
                <Box sx={ { mt: 5 } }>
                    <Typography variant="h6" sx={ { fontWeight: 800, fontSize: 17 } }>
                        Предложения от других продавцов
                    </Typography>
                    <Box sx={ {} }>
                        <Typography variant="h6" sx={ { fontWeight: 800, fontSize: 18, mt: 2 } }>
                            23 311 руб.
                        </Typography>
                        <Typography variant="h6" sx={ { color: "darkgray", fontSize: 15 } }>
                            Доставка: 13-15 ноября
                        </Typography>
                        <Typography variant="h6" sx={ { color: "darkgray", fontSize: 15 } }>
                            Продавец: SezaroCustom
                        </Typography>
                    </Box>
                </Box>
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    sx={ { mt: 1 } }
                >
                    В корзину
                </Button>
            </Box>
        </Box>
    );
};

export default BuyBlock;