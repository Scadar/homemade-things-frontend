import { Box } from "@mui/system";
import React, { FC, useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ProfileModal from "./modalWindowProfile/ProfileModal";
import ProfileCard, { ProfileCardProps } from "./profileCard/ProfileCard";
import SexCard from "./profileCard/SexCard";
import UserCard from "./profileCard/UserCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IUser } from "../../models/userModel";
import { flexStyles } from "../../utils/styleUtils";
import { userApi } from "../../services/userService";
import { Role, useRoleManager } from "../../utils/roleUtils";
import { useSnackbar } from "notistack";
import { logout } from "../../store/slices/auth";

export type ProfileModalType = "birthday" | "email" | "name" | "phone"

const getFullName = (user: IUser | null): string => {
    if (!user) {
        return "Аноним";
    }

    const { firstName, lastName } = user;

    if (firstName && lastName) {
        return lastName + " " + firstName;
    }

    if (lastName) {
        return lastName;
    }

    if (firstName) {
        return firstName;
    }

    return "Аноним";
};

const Profile: FC = () => {

    const [addSellerRole, { isLoading: addSellerRoleLoading }] = userApi.useFetchAddSellerRoleMutation();
    const hasAnyRole = useRoleManager();
    const { user } = useAppSelector(state => state.auth);
    const [modal, setModal] = useState<ProfileModalType | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();

    const onClickAddSellerRole = () => {
        addSellerRole()
        .unwrap()
        .then(() => {
            enqueueSnackbar("Роль успешно добавлена, перезайдите в аккаунт", { variant: "success" });
            dispatch(logout());
        });
    };

    const cards: ProfileCardProps[] = useMemo(() => {
        return [
            {
                title: "Ваш Email",
                src: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
                openModal: () => setModal("email"),
                children: <UserCard/>
            },
            {
                title: "Ваш Телефон",
                src: "https://images.unsplash.com/photo-1523371683773-affcb4a2e39e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                openModal: () => setModal("phone"),
                children: "Не указано"
            },
            {
                title: "Ваша дата рождения",
                src: "https://images.unsplash.com/photo-1531956531700-dc0ee0f1f9a5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmlydGhkYXl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                openModal: () => setModal("birthday"),
                children: "Не указано"
            },
            {
                title: "Ваш пол",
                src: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
                children: <SexCard/>
            }
        ];
    }, []);

    return (
        <>
            <Box
                sx={ {
                    ...flexStyles("center", "space-between")
                } }
            >
                <Box
                    sx={ {
                        ...flexStyles("center")
                    } }
                >
                    <Box sx={ { position: "relative", mr: 4 } }>
                        <Avatar
                            alt="Remy Sharp"
                            src={ "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWcV-n4M3RSxnC8G7lIteNs3VltOndR97Nxg&usqp=CAU" }
                            sx={ { width: 100, height: 100 } }
                        />
                        <IconButton
                            sx={ {
                                position: "absolute",
                                bottom: -15,
                                right: -25,
                                color: theme => theme.palette.primary.main
                            } }
                        >
                            <DriveFolderUploadIcon/>
                        </IconButton>
                        <IconButton
                            sx={ {
                                position: "absolute",
                                top: -15,
                                right: -25,
                                color: theme => theme.palette.primary.main
                            } }
                            onClick={ () => setModal("name") }
                        >
                            <EditIcon/>
                        </IconButton>
                    </Box>
                    <Typography variant="h4" sx={ { paddingBottom: "25px" } }>
                        { getFullName(user) }
                    </Typography>
                </Box>

                {
                    hasAnyRole([Role.ROLE_SELLER]) ?
                        <Typography>
                            Вы уже продавец
                        </Typography>
                        :
                        <Button
                            size="large"
                            color="secondary"
                            variant="contained"
                            sx={ {
                                height: theme => theme.spacing(5),
                                ml: "auto"
                            } }
                            disabled={ addSellerRoleLoading }
                            onClick={ onClickAddSellerRole }
                        >
                            Войти как продавец
                        </Button>
                }

            </Box>

            <Box
                sx={ {
                    display: "flex",
                    justifyContent: "space-between ",
                    flexWrap: "wrap"
                } }
            >
                {
                    cards.map(card => (
                        <ProfileCard
                            key={ card.title }
                            src={ card.src }
                            title={ card.title }
                            openModal={ card.openModal }
                        >
                            { card.children }
                        </ProfileCard>
                    ))
                }
            </Box>
            {
                modal && <ProfileModal type={ modal } setType={ setModal }/>
            }
        </>
    );
};

export default Profile;
