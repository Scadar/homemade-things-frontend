import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import { LightTooltip } from "../../UI/LightTooltip";
import { useHistory, useLocation } from "react-router-dom";
import { flexStyles } from "../../../utils/styleUtils";
import { useColorMode } from "../../../ColorModeContextProvider";
import { useRoleManager } from "../../../utils/roleUtils";
import { routes } from "../../../routes/routes";

type SidebarProps = {
    sideBarIsOpen: boolean
}

const Sidebar: FC<SidebarProps> = ({ sideBarIsOpen }) => {
    const hasAnyRole = useRoleManager();
    const history = useHistory();
    const location = useLocation();
    const { mode } = useColorMode();
    return (
        <Box
            sx={ {
                width: sideBarIsOpen ? "170px" : "72px",
                padding: theme => theme.spacing(1, 2),
                transition: "all 0.5s ease"
            } }
        >
            <Box component={ "ul" }>
                {
                    routes.map(value => {

                        if (!(value.Icon && value.title)) {
                            return null;
                        }

                        if (!hasAnyRole(value.roles)) {
                            return null;
                        }

                        const Icon = value.Icon;
                        return (
                            <LightTooltip
                                key={ value.title! }
                                title={ value.title! }
                                placement="right"
                                disableHoverListener={ sideBarIsOpen }
                            >
                                <Box
                                    onClick={ () => history.push(value.path) }
                                    component={ "li" }
                                    sx={ {
                                        mt: theme => theme.spacing(1),
                                        overflow: "hidden"
                                    } }
                                >
                                    <Box
                                        sx={ {
                                            ...flexStyles("center"),
                                            borderRadius: 2,
                                            p: theme => theme.spacing(1),
                                            cursor: "pointer",
                                            ":hover": {
                                                background: "#dae0ec"
                                            },
                                            background: location.pathname === value.path ? "#dae0ec" : undefined
                                        } }
                                    >
                                        <Icon sx={ {
                                            color: theme => (
                                                location.pathname === value.path && mode === "dark" ?
                                                    "#1f1c2e"
                                                    :
                                                    theme.appPalette.mainColor
                                            )
                                        } }/>
                                        <Typography
                                            sx={ {
                                                ml: theme => theme.spacing(1),
                                                whiteSpace: "nowrap",
                                                transition: "0.35s",
                                                opacity: sideBarIsOpen ? 1 : 0,
                                                pointerEvents: sideBarIsOpen ? "auto" : "none",
                                                color: theme => (
                                                    location.pathname === value.path && mode === "dark" ?
                                                        "#1f1c2e"
                                                        :
                                                        theme.appPalette.mainColor
                                                )
                                            } }
                                        >
                                            { value.title }
                                        </Typography>
                                    </Box>
                                </Box>
                            </LightTooltip>
                        );
                    })
                }
            </Box>
        </Box>
    );
};

export default Sidebar;