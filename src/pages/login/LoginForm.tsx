import React, { FC, FormEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { AppTextField } from "../../components/UI/AppInput";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { authApi } from "../../services/authService";
import { buttonStyle } from "./AuthPage";
import DeviceDetector from "device-detector-js";
import { Device } from "../../models/userModel";
import { DeviceType } from "device-detector-js/dist/typings/device";
import { useSnackbar } from "notistack";
import { isFetchBaseQueryErrorType } from "../../utils/guardUtils";

export const formStyle = {
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "0 3rem",
  height: "100%",
  textAlign: "center",
} as const;

const getDeviceTypeByDevice = (deviceType: DeviceType | undefined): Device => {
  switch (deviceType) {
    case "desktop":
      return Device.DEVICE_TYPE_DESKTOP;
    case "tablet":
      return Device.DEVICE_TYPE_TABLET;
    case "smartphone":
      return Device.DEVICE_TYPE_ANDROID;
    default:
      return Device.DEVICE_TYPE_DESKTOP;
  }
};

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [fetchLogin, { isLoading, error }] = authApi.useFetchLoginMutation();

  useEffect(() => {
    if (error) {
      if (isFetchBaseQueryErrorType(error)) {
        if (error.status === 417) {
          enqueueSnackbar("Неверный логин или пароль", { variant: "error" });
        } else {
          enqueueSnackbar("Ошибка сервера", { variant: "error" });
        }
      }
    }
  }, [error, enqueueSnackbar]);

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse(navigator.userAgent);

    await fetchLogin({
      email,
      password,
      deviceInfo: {
        deviceId: "1",
        deviceType: getDeviceTypeByDevice(device?.device?.type),
        notificationToken: "N1",
      },
    }).unwrap();
  };

  return (
    <Box sx={formStyle} component={"form"} onSubmit={onLogin}>
      <Typography variant={"h5"} sx={{ mb: 4 }}>
        Sign In
      </Typography>
      <AppTextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="login-email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        autoComplete="email"
        size={"small"}
        sx={{ maxWidth: 400 }}
      />
      <AppTextField
        sx={{ maxWidth: 400 }}
        variant="outlined"
        margin="normal"
        size={"small"}
        fullWidth
        id="login-password"
        name="password"
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                sx={{ color: (theme) => theme.appPalette.mainColor }}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <Typography variant={"caption"} sx={{ mt: 2, mb: 4 }}>
        Forgot your password?
      </Typography>
      <Button
        type="submit"
        variant="text"
        color="primary"
        sx={buttonStyle}
        disabled={isLoading}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default LoginForm;
