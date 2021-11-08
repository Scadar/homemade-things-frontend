import React, { FC } from "react";
import { Typography, TypographyProps } from "@mui/material";

type StrikethroughTextProps = TypographyProps & {
    text: string
    component: React.ElementType
}

const StrikethroughText: FC<StrikethroughTextProps> = ({ text, ...other }) => {
    return (
        <Typography
            { ...other }
            sx={ {
                whiteSpace: "pre",
                position: "relative",
                display: "inline-block",
                ":after": {
                    content: "\"\"",
                    display: "block",
                    position: "absolute",
                    left: "0",
                    top: "40%",
                    color: "red",
                    width: "100%",
                    height: "0",
                    borderBottom: "1px solid red",
                    transform: "rotate(-5deg)"
                }
            } }
        >
            { text }
        </Typography>
    );
};

export default StrikethroughText;