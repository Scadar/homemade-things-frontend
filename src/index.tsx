import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ColorModeContextProvider from "./ColorModeContextProvider";
import { SnackbarProvider } from "notistack";
import SnackbarCloseButton from "./components/UI/SnackbarCloseButton";

require("dotenv")
.config();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ store }>
            <SnackbarProvider
                action={ key => <SnackbarCloseButton myKey={ key }/> }
                maxSnack={ 3 }
                anchorOrigin={ {
                    vertical: "top",
                    horizontal: "right"
                } }
                classes={ { containerAnchorOriginTopRight: "max-z-index" } }
            >
                <BrowserRouter>
                    <ColorModeContextProvider>
                        <App/>
                    </ColorModeContextProvider>
                </BrowserRouter>
            </SnackbarProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

