import React, { FC, useState } from "react";
import { Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { userApi } from "../../../services/userService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useSnackbar } from "notistack";
import { IUser } from "../../../models/userModel";
import { setCurrentUserFirstName } from "../../../store/slices/auth";

const getFirstNameByUser = (user: IUser | null): string => {
    if (!user) {
        return "";
    }
    if (!user.firstName) {
        return "";
    }
    return user.firstName;
};

const ModalContentName: FC = () => {

    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const [firstName, setFirstName] = useState(getFirstNameByUser(user));
    const { enqueueSnackbar } = useSnackbar();
    const [updateFirstName, { isLoading: updateFirstNameIsLoading }] = userApi.useFetchUpdateFirstnameMutation();

    const onClickUpdateFirstName = async() => {
        await updateFirstName({ firstName })
        .unwrap()
        .then((data) => {
            enqueueSnackbar("Имя успешно обновлено", { variant: "success" });
            dispatch(setCurrentUserFirstName(data.firstName!));
        });
    };

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={ {
                mt: 1,
                minWidth: 300
            } }
        >
            <Stack spacing={ 2 } direction={ "column" }>
                <TextField
                    fullWidth
                    size="medium"
                    color="secondary"
                    label="Фамилия"
                    variant="outlined"
                />
                <Stack spacing={ 1 } direction={ "row" }>
                    <TextField
                        fullWidth
                        size="medium"
                        color="secondary"
                        label="Имя"
                        variant="outlined"
                        value={ firstName }
                        onChange={ (e) => setFirstName(e.target.value) }
                    />
                    <Button
                        disabled={ user!.firstName === firstName || updateFirstNameIsLoading }
                        onClick={ onClickUpdateFirstName }
                    >
                        Обновить имя
                    </Button>
                </Stack>

            </Stack>
        </Box>
    );
};

export default ModalContentName;