import React, { FC, useState } from "react";
import { Box, Paper } from "@mui/material";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import { flexStyles } from "../../utils/styleUtils";

const Layout: FC = ({ children }) => {
    const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

    return (
        <Box
            sx={ {
                ...flexStyles("center", "center"),
                backgroundColor: theme => theme.appPalette.container,
                width: "100%",
                height: "100vh",
            } }
        >
            <Box
                sx={ {
                    ...flexStyles(undefined, undefined, "column"),
                    backgroundColor: theme => theme.appPalette.container,
                    width: "100%",
                    height: "100%",
                    maxWidth: "1800px",
                } }
            >
                <Navbar setSideBarIsOpen={ setSideBarIsOpen }/>
                <Box
                    sx={ {
                        display: "flex",
                        height: "100%",
                        padding: theme => theme.spacing(0, 3, 3, 0),
                        overflow: "hidden"
                    } }
                >
                    <Sidebar sideBarIsOpen={ sideBarIsOpen }/>
                    <Paper
                        component={ "main" }
                        elevation={ 0 }
                        sx={ {
                            flex: 2,
                            p: theme => theme.spacing(3, 3, 0, 3),
                            borderRadius: theme => theme.spacing(3),
                            overflow: "auto",
                            height: "100%"
                        } }
                    >
                        { children }
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;