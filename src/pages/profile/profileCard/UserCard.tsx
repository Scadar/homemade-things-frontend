import React, { FC } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { Typography } from "@mui/material";

const UserCard: FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    return (
        <Typography>
            { user?.email && user.email }
        </Typography>
    );
};

export default UserCard;