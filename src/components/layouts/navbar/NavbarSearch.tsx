import React, { FC } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { flexSpaceBetween, standardShadow } from "../../../utils/styleUtils";

const NavbarSearch: FC = () => {

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <Paper
            component="form"
            elevation={ 0 }
            sx={ {
                maxWidth: 480,
                height: 40,
                borderRadius: theme => theme.spacing(2.5),
                pr: theme => theme.spacing(1.5),
                ...flexSpaceBetween,
                ...standardShadow,
                width: "100%"
            } }
            onSubmit={ onSearch }
        >
            <InputBase
                sx={ { ml: 2, flex: 1 } }
                placeholder="Search"
                inputProps={ { "aria-label": "search tasks" } }
            />
            <IconButton
                type="submit"
                aria-label="search"
                size={ "small" }
                sx={ { color: theme => theme.appPalette.mainColor } }
            >
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
};

export default NavbarSearch;