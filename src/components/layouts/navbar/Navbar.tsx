import React, { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import NavbarSearch from "./NavbarSearch";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import ProfileButton from "./ProfileButton";
import { flexStyles } from "../../../utils/styleUtils";
import { useColorMode } from "../../../ColorModeContextProvider";

type HeaderProps = {
    setSideBarIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const controls = [
    { Icon: AddCircleRoundedIcon },
    { Icon: NotificationsNoneRoundedIcon }
];

const Navbar: FC<HeaderProps> = ({ setSideBarIsOpen }) => {

    const { toggleColorMode } = useColorMode();

    return (
        <Box
            sx={ {
                ...flexStyles("center", "space-between"),
                width: "100%",
                padding: theme => theme.spacing(2, 3),
                position: "relative"
            } }
        >
            <Box
                sx={ {
                    ...flexStyles("center"),
                    flexGrow: 1
                } }
            >
                <NotesRoundedIcon
                    sx={ {
                        color: theme => theme.appPalette.mainColor,
                        cursor: "pointer"
                    } }
                    onClick={ () => setSideBarIsOpen(prevState => !prevState) }
                />
                <Typography
                    variant="h5"
                    sx={ {
                        margin: theme => theme.spacing(0, 3),
                        fontWeight: "500",
                        color: theme => theme.appPalette.mainColor
                    } }
                >
                    Homemade Things
                </Typography>
                <NavbarSearch/>
            </Box>
            <Box sx={ flexStyles("center") }>
                <IconButton size="small" onClick={ toggleColorMode } sx={ { color: theme => theme.appPalette.mainColor } }>
                    <DarkModeOutlinedIcon/>
                </IconButton>
                {
                    controls.map((value, i) => {
                        const Icon = value.Icon;
                        return (
                            <IconButton size="small" key={ i }>
                                <Icon sx={ { color: theme => theme.appPalette.mainColor } }/>
                            </IconButton>
                        );
                    })
                }
                <ProfileButton/>
            </Box>
        </Box>
    );
};

export default Navbar;