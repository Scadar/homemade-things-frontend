import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const ModalChangePhone = ({ openModalPhone, handleCloseModalPhone }) => {
  return (
    <Modal
      open={openModalPhone}
      onClose={handleCloseModalPhone}
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
        <Typography
          sx={{ fontWeight: "bold", fontSize: "30px" }}
          id="modal-modal-title"
          variant="h5"
          component="h2"
        >
          Тут будет добавление телефона
        </Typography>

        <Stack spacing={2} direction="row" sx={{ marginTop: "15px" }}>
          <Button size="large" color="secondary" variant="contained">
            Сохранить
          </Button>
          <Button
            onClick={handleCloseModalPhone}
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

export default ModalChangePhone;
