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
import { formStyle } from "./LoginForm";
import { buttonStyle } from "./AuthPage";
import { authApi } from "../../services/authService";
import { isFetchBaseQueryErrorType } from "../../utils/guardUtils";
import { useSnackbar } from "notistack";

const RegisterForm: FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fetchRegister, { isSuccess, error, isLoading }] =
    authApi.useFetchRegisterMutation();
  const { enqueueSnackbar } = useSnackbar();
  const onRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetchRegister({
      email,
      password,
      username,
      registerAsAdmin: false,
    }).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setEmail("");
      setPassword("");
      enqueueSnackbar("Подтвердите почту", { variant: "success" });
    }
  }, [isSuccess, enqueueSnackbar]);

  useEffect(() => {
    if (error) {
      if (isFetchBaseQueryErrorType(error)) {
        enqueueSnackbar("Ошибка сервера", { variant: "error" });
      }
    }
  }, [error, enqueueSnackbar]);

  return (
    <Box sx={formStyle} component={"form"} onSubmit={onRegister}>
      <Typography variant={"h5"} sx={{ mb: 4 }}>
        Sign Up
      </Typography>
      <AppTextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="register-username"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
        autoComplete="username"
        size={"small"}
        sx={{ maxWidth: 400 }}
      />
      <AppTextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="register-email"
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
        id="register-password"
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
                sx={{
                  color: (theme) => theme.appPalette.mainColor,
                }}
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
      <Button
        type="submit"
        variant="text"
        color="primary"
        sx={{ ...buttonStyle, mt: 4 }}
        disabled={isLoading}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default RegisterForm;
