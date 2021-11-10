import React, { FC } from "react";
import { flexStyles } from "../../../utils/styleUtils";
import { Box, Button, Typography } from "@mui/material";

const HistoryLine: FC = () => {
    return (
        <Box sx={ {
            ...flexStyles("center")
        } }>
            <Button
                variant="outlined"
                color="primary"
                size="large"
            >
                Назад
            </Button>

            <Typography className="child" variant="h6" sx={ {
                fontSize: 18, opacity: "0.5", ml: 2, mr: 0.3, "&:hover": {
                    opacity: "1",
                    cursor: "pointer",
                    borderBottom: 1
                }
            } }>
                Главная
            </Typography>
            <Typography sx={ { opacity: "0.5" } }>
                /
            </Typography>
            <Typography variant="h6" sx={ {
                fontSize: 18, opacity: "0.5", ml: 0.3, mr: 0.3, "&:hover": {
                    opacity: "1",
                    cursor: "pointer",
                    borderBottom: 1
                }
            } }>
                Электроника
            </Typography>
            <Typography sx={ { opacity: "0.5" } }>
                /
            </Typography>
            <Typography variant="h6" sx={ {
                fontSize: 18, opacity: "0.5", ml: 0.3, mr: 0.3, "&:hover": {
                    opacity: "1",
                    cursor: "pointer",
                    borderBottom: 1
                }
            } }>
                Смартфоны и телефоны
            </Typography>
            <Typography sx={ { opacity: "0.5" } }>
                /
            </Typography>
            <Typography variant="h6" sx={ {
                fontSize: 18, opacity: "0.5", ml: 0.3, mr: 0.3, "&:hover": {
                    opacity: "1",
                    cursor: "pointer",
                    borderBottom: 1
                }
            } }>
                Смартфоны
            </Typography>
            <Typography sx={ { opacity: "0.5" } }>
                /
            </Typography>
            <Typography variant="h6" sx={ {
                fontSize: 18, opacity: "0.5", ml: 0.3, "&:hover": {
                    opacity: "1",
                    cursor: "pointer",
                    borderBottom: 1
                }
            } }>
                Xiaomi
            </Typography>

        </Box>
    );
};

export default HistoryLine;