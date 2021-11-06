import React, { FC } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

declare module "@mui/material/styles" {
    interface Theme {
        appPalette: {
            container: string
            mainColor: string
            contentSection: string
        };
    }

    interface ThemeOptions {
        appPalette?: {
            container: string
            mainColor: string
            contentSection: string
        };
    }
}

type ColorModeContextType = {
    toggleColorMode: () => void
    mode: "dark" | "light"
}

export const ColorModeContext = React.createContext<ColorModeContextType>({
    toggleColorMode: () => {},
    mode: "light"
});

export const useColorMode = () => React.useContext(ColorModeContext);

const ColorModeContextProvider: FC = ({ children }) => {

    const [mode, setMode] = React.useState<"light" | "dark">("light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
            },
            mode
        }),
        [mode]
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                appPalette: {
                    container: "#f3f6fd",
                    mainColor: "#1f1c2e",
                    contentSection: "#fff"
                }
            }),
        []
    );

    return (
        <ColorModeContext.Provider value={ colorMode }>
            <ThemeProvider theme={ theme }>{ children }</ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default ColorModeContextProvider;

