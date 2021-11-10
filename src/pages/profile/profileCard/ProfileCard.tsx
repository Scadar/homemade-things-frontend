import React, { FC, ReactElement } from "react";
import { IconButton } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Card from "@mui/material/Card";
import { flexStyles } from "../../../utils/styleUtils";

export type ProfileCardProps = {
    src: string
    alt?: string
    title: string
    openModal?: () => void
    children: ReactElement | string | number
}

const ProfileCard: FC<ProfileCardProps> = ({ src, alt, title, openModal, children }) => {
    return (
        <Card sx={ {
            width: 345,
            mt: theme => theme.spacing(3)
        } }>
            <CardMedia
                component="img"
                height="140"
                src={ src }
                alt={ alt }
            />
            <CardContent>
                <Box sx={ { ...flexStyles("center", "space-between") } }>
                    <Typography variant="h6">{ title }</Typography>
                    {
                        openModal &&
                        <IconButton onClick={ openModal }>
                            <ModeEditOutlineIcon color="primary"/>
                        </IconButton>
                    }
                </Box>
                { children }
            </CardContent>
        </Card>
    );
};

export default ProfileCard;