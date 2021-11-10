import * as React from "react";
import { FC } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";

type MenuItemType = {
    title: string
    onClick: () => void
    disabled?: boolean
}

type AppMenuProps = {
    menuItems: MenuItemType[]
    triggerItem: React.ReactNode
}

const AppMenu: FC<AppMenuProps> = ({ menuItems, triggerItem }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const onOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const onCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Box
                onClick={ onOpenMenu }
            >
                { triggerItem }
            </Box>
            <Menu
                anchorEl={ anchorEl }
                open={ open }
                onClose={ onCloseMenu }
            >
                {
                    menuItems.map(menuItem => (
                        <MenuItem
                            key={ menuItem.title }
                            onClick={ menuItem.onClick }
                            disabled={menuItem.disabled}
                        >
                            { menuItem.title }
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    );
};

export default AppMenu;