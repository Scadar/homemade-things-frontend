import React, { FC, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { userApi } from "../../../services/userService";
import { useAppSelector } from "../../../hooks/redux";
import { useSnackbar } from "notistack";
import { IUser } from "../../../models/userModel";
import { authApi } from "../../../services/authService";
import CheckIcon from "@mui/icons-material/Check";

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
    const [firstName, setFirstName] = useState(getFirstNameByUser(user));
    const [lastName, setLastName] = useState(getLastNameByUser(user));
    const { enqueueSnackbar } = useSnackbar();
    const [updateFirstName, { isLoading: updateFirstNameIsLoading }] = userApi.useFetchUpdateFirstnameMutation();
    const [updateLastName, { isLoading: updateLastNameIsLoading }] = userApi.useFetchUpdateLastnameMutation();
    const [refreshUser, { isLoading: refreshLoading }] = authApi.useFetchRefreshMutation();

    const onClickUpdateFirstName = () => {
        updateFirstName({ firstName })
        .unwrap()
        .then(() => {
            refreshUser()
            .unwrap()
            .then(() => {
                enqueueSnackbar("Имя успешно обновлено", { variant: "success" });
            });
        });
    };

    const onClickUpdateLastName = () => {
        updateLastName({ lastName })
        .unwrap()
        .then(() => {
            refreshUser()
            .unwrap()
            .then(() => {
                enqueueSnackbar("Фамилия успешно обновлена", { variant: "success" });
            });
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
                    <Box>
                        <IconButton
                            disabled={ user!.lastName === lastName || updateLastNameIsLoading || refreshLoading }
                            onClick={ onClickUpdateLastName }
                        >
                            <CheckIcon/>
                        </IconButton>
                    </Box>
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
                    <Box>
                        <IconButton
                            disabled={ user!.firstName === firstName || updateFirstNameIsLoading || refreshLoading }
                            onClick={ onClickUpdateFirstName }
                        >
                            <CheckIcon/>
                        </IconButton>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};

export default ModalContentName;