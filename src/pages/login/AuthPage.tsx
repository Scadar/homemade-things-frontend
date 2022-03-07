import React, { FC, useState } from "react";
import { Box, Button, Paper } from "@mui/material";
import backgroundImage from "../../static/images/login-background.png";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const containerFormStyle = {
  height: "100%",
  position: "absolute",
  top: 0,
  transition: "all 0.6s ease-in-out",
} as const;

const overlayPanelStyle = {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  position: "absolute",
  textAlign: "center",
  top: "0",
  transition: "transform 0.6s ease-in-out",
  width: "50%",
} as const;

export const buttonStyle = {
  backgroundColor: "#0367a6",
  backgroundImage: "linear-gradient(90deg, #0367a6 0%, #008997 74%)",
  borderRadius: "30px",
  border: "1px solid #0367a6",
  color: "#fff",
  cursor: "pointer",
  fontSize: "0.8rem",
  fontWeight: "bold",
  letterSpacing: "0.1rem",
  padding: "0.7rem 4rem",
  textTransform: "uppercase",
  transition: "transform 80ms ease-in",
} as const;

const AuthPage: FC = () => {
  const [type, setType] = useState<"signIn" | "signUp">("signIn");

  return (
    <Box
      sx={{
        background: `url(${backgroundImage})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "grid",
        height: "100vh",
        placeItems: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          backgroundColor: "#fff",
          borderRadius: (theme) => theme.spacing(2),
          height: "420px",
          maxWidth: "758px",
          overflow: "hidden",
          position: "relative",
          width: "100%",
        }}
      >
        <Box
          sx={
            type === "signUp"
              ? {
                  width: "50%",
                  left: 0,
                  animation: "show 0.6s",
                  opacity: 1,
                  transform: "translateX(100%)",
                  zIndex: 5,
                  ...containerFormStyle,
                }
              : {
                  left: 0,
                  opacity: 0,
                  width: "50%",
                  zIndex: 1,
                  ...containerFormStyle,
                }
          }
        >
          <RegisterForm />
        </Box>
        <Box
          sx={{
            transform: type === "signUp" ? "translateX(100%)" : undefined,
            left: 0,
            width: "50%",
            zIndex: 2,
            ...containerFormStyle,
          }}
        >
          <LoginForm />
        </Box>

        <Box
          sx={{
            transform: type === "signUp" ? "translateX(-100%)" : undefined,
            height: "100%",
            left: "50%",
            overflow: "hidden",
            position: "absolute",
            top: "0",
            transition: "transform 0.6s ease-in-out",
            width: "50%",
            zIndex: 100,
          }}
        >
          <Box
            sx={{
              transform:
                type === "signUp" ? "translateX(50%)" : "translateX(0)",
              background: `url(${backgroundImage})`,
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "100%",
              left: "-100%",
              position: "relative",
              transition: "transform 0.6s ease-in-out",
              width: "200%",
            }}
          >
            <Box
              sx={{
                transform:
                  type === "signUp" ? "translateX(0)" : "translateX(-20%)",
                ...overlayPanelStyle,
              }}
            >
              <Button sx={buttonStyle} onClick={() => setType("signIn")}>
                Sign In
              </Button>
            </Box>
            <Box
              sx={{
                transform:
                  type === "signUp" ? "translateX(20%)" : "translateX(0)",
                ...overlayPanelStyle,
                right: 0,
              }}
            >
              <Button sx={buttonStyle} onClick={() => setType("signUp")}>
                Sign Up
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthPage;
