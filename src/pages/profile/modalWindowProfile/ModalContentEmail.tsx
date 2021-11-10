import React, { FC } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const ModalContentEmail: FC = () => {
    return (
        <div>
            <Box
                component="form"
                sx={ {
                    "& > :not(style)": { m: 1, width: "25ch" },
                    maxWidth: "100%"
                } }
                noValidate
                autoComplete="off"
            >
                <TextField
                    fullWidth
                    size="medium"
                    color="primary"
                    id="fullWidth"
                    label="Укажите новый Email"
                    variant="outlined"
                />
            </Box>
        </div>
    );
};

export default ModalContentEmail;