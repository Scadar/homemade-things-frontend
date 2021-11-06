import React, { FC } from "react";
import { Avatar, Button, Divider, Menu, MenuItem, Typography } from "@mui/material";
import faceImage from "../../../static/images/face.png";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { logout } from "../../../store/slices/auth";
import { useHistory } from "react-router-dom";

const ProfileButton: FC = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const history = useHistory();
    const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const closeMenu = () => {
        setAnchorEl(null);
    };

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth);

    return (
        <>
            <Button
                color="inherit"
                sx={ { textTransform: "none" } }
                id="profile-button"
                aria-controls="profile-menu"
                aria-haspopup="true"
                aria-expanded={ open ? "true" : undefined }
                onClick={ openMenu }
            >
                <Divider
                    orientation={ "vertical" }
                    flexItem
                    sx={ {
                        m: theme => theme.spacing(0, 0.5)
                    } }
                />
                <Avatar
                    src={ faceImage }
                    sx={ {
                        width: 24,
                        height: 24,
                        m: theme => theme.spacing(0, 0.5)
                    } }
                />
                <Typography
                    sx={ {
                        fontWeight: 500,
                        color: theme => theme.appPalette.mainColor
                    } }
                >
                    { user?.username }
                </Typography>
            </Button>
            <Menu
                id="profile-menu"
                anchorEl={ anchorEl }
                open={ open }
                onClose={ closeMenu }
                MenuListProps={ {
                    "aria-labelledby": "profile-button"
                } }
            >
                <MenuItem onClick={ () => history.push("/profile") }>Profile</MenuItem>
                <MenuItem onClick={ closeMenu }>My account</MenuItem>
                <MenuItem onClick={ () => dispatch(logout()) }>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default ProfileButton;