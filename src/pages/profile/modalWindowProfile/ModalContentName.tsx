import React, { FC, useState } from "react";
import { Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { userApi } from "../../../services/userService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useSnackbar } from "notistack";
import { IUser } from "../../../models/userModel";
import { setCurrentUserFirstName, setCurrentUserLastName } from "../../../store/slices/auth";

const getFirstNameByUser = (user: IUser | null): string => {
    if (!user) {
        return "";
    }
    if (!user.firstName) {
        return "";
    }
    return user.firstName;
};

const getLastNameByUser = (user: IUser | null): string => {
    if (!user) {
        return "";
    }
    if (!user.lastName) {
        return "";
    }
    return user.lastName;
};

const ModalContentName: FC = () => {

    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const [firstName, setFirstName] = useState(getFirstNameByUser(user));
    const [lastName, setLastName] = useState(getLastNameByUser(user));
    const { enqueueSnackbar } = useSnackbar();
    const [updateFirstName, { isLoading: updateFirstNameIsLoading }] = userApi.useFetchUpdateFirstnameMutation();
    const [updateLastName, { isLoading: updateLastNameIsLoading }] = userApi.useFetchUpdateLastnameMutation();

    const onClickUpdateFirstName = () => {
        updateFirstName({ firstName })
        .unwrap()
        .then((data) => {
            enqueueSnackbar("Имя успешно обновлено", { variant: "success" });
            dispatch(setCurrentUserFirstName(data.firstName!));
        });
    };

    const onClickUpdateLastName = () => {
        updateLastName({ lastName })
        .unwrap()
        .then((data) => {
            enqueueSnackbar("Имя успешно обновлено", { variant: "success" });
            dispatch(setCurrentUserLastName(data.lastName!));
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
                <Stack spacing={ 1 } direction={ "row" }>
                    <TextField
                        fullWidth
                        size="medium"
                        color="primary"
                        label="Фамилия"
                        variant="outlined"
                        value={ lastName }
                        onChange={ e => setLastName(e.target.value) }
                    />
                    <Button
                        disabled={ user!.lastName === lastName || updateLastNameIsLoading }
                        onClick={ onClickUpdateLastName }
                    >
                        Обновить фамилию
                    </Button>
                </Stack>

                <Stack spacing={ 1 } direction={ "row" }>
                    <TextField
                        fullWidth
                        size="medium"
                        color="primary"
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