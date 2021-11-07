import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";

const ModalChangeName = ({
  openModalName,
  handleCloseModalName,
  handleSaveUserFio,
}) => {
  const [userFio, setUserFio] = React.useState({
    surname: "",
    name: "",
    patronymic: "",
  });
  return (
    <Modal
      open={openModalName}
      onClose={handleCloseModalName}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 350,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: "10px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ fontWeight: "bold", fontSize: "30px" }}
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            Изменение ФИО
          </Typography>
          <CancelIcon
            onClick={handleCloseModalName}
            color="secondary"
            cursor="pointer"
          />
        </Box>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            maxWidth: "100%",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            size="large"
            color="secondary"
            id="fullWidth"
            label="Фамилия"
            variant="outlined"
            onChange={(e) =>
              setUserFio({ ...userFio, surname: e.target.value })
            }
          />
          <TextField
            size="large"
            color="secondary"
            id="outlined-basic"
            label="Имя"
            variant="outlined"
            onChange={(e) => setUserFio({ ...userFio, name: e.target.value })}
          />
          <TextField
            color="secondary"
            id="outlined-basic"
            label="Отчество"
            variant="outlined"
            onChange={(e) =>
              setUserFio({ ...userFio, patronymic: e.target.value })
            }
          />
        </Box>
        <Stack spacing={2} direction="row" sx={{ marginTop: "15px" }}>
          <Button
            onClick={() => {
              handleSaveUserFio(userFio);
              if (userFio.name && userFio.surname) {
                handleCloseModalName();
              }
            }}
            size="large"
            color="secondary"
            variant="contained"
          >
            Сохранить
          </Button>
          <Button
            onClick={handleCloseModalName}
            size="large"
            color="secondary"
            variant="contained"
          >
            Отменить
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalChangeName;
