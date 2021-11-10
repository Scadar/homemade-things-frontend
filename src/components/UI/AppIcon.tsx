import React, { FC } from "react";
import { IconButton, IconButtonProps, SvgIconProps, SvgIconTypeMap, Tooltip, TooltipProps } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type AppIconProps = {
    tooltipTitle?: string
    onClick?: () => void
    iconProps?: SvgIconProps
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string }
    tooltipProps?: TooltipProps
    iconButtonProps?: IconButtonProps
}

const AppIcon: FC<AppIconProps> = ({
                                       tooltipTitle,
                                       onClick,
                                       Icon,
                                       iconProps,
                                       tooltipProps,
                                       iconButtonProps
                                   }) => {

    if (tooltipTitle) {
        return (
            <Tooltip title={ tooltipTitle } { ...tooltipProps }>
                <IconButton onClick={ onClick } { ...iconButtonProps }>
                    <Icon { ...iconProps }/>
                </IconButton>
            </Tooltip>
        );
    }

    return (
        <IconButton onClick={ onClick } { ...iconButtonProps }>
            <Icon { ...iconProps }/>
        </IconButton>
    );
};

export default AppIcon;