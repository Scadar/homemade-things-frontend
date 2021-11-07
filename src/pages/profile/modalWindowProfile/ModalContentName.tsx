import React, { FC } from "react";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const ModalContentName: FC = () => {
    const [userFio, setUserFio] = React.useState({
        surname: "",
        name: "",
    });
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
                mt: 1,
                minWidth: 300
            }}
        >
            <Stack spacing={ 2 } direction={"column"}>
                <TextField
                    fullWidth
                    size="medium"
                    color="secondary"
                    label="Фамилия"
                    variant="outlined"
                    onChange={ (e) =>
                        setUserFio({ ...userFio, surname: e.target.value })
                    }
                />
                <TextField
                    fullWidth
                    size="medium"
                    color="secondary"
                    label="Имя"
                    variant="outlined"
                    onChange={ (e) => setUserFio({ ...userFio, name: e.target.value }) }
                />
            </Stack>
        </Box>
    );
};

export default ModalContentName;