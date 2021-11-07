import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";

const ModalChangeEmail = ({ openModalEmail, handleCloseModalEmail }) => {
  return (
    <Modal
      open={openModalEmail}
      onClose={handleCloseModalEmail}
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
            Изменение Email
          </Typography>
          <CancelIcon
            onClick={handleCloseModalEmail}
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
            label="Укажите новый Email"
            variant="outlined"
          />
        </Box>
        <Stack spacing={2} direction="row" sx={{ marginTop: "15px" }}>
          <Button size="large" color="secondary" variant="contained">
            Сохранить
          </Button>
          <Button
            onClick={handleCloseModalEmail}
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

export default ModalChangeEmail;
