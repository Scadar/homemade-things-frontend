import { Box } from "@mui/system";
import React from "react";
import { useAppSelector } from "../../hooks/redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import ModalChangeName from "./modalWindowProfile/ModalChangeName";
import ModalChangeEmail from "./modalWindowProfile/ModalChangeEmail";
import ModalChangePhone from "./modalWindowProfile/ModalChangePhone";
import ModalChangeBirthday from "./modalWindowProfile/ModalChangeBirthday";
import Button from "@mui/material/Button";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [openModalName, setOpenModalName] = React.useState(false);
  const handleOpenModalName = () => setOpenModalName(true);
  const handleCloseModalName = () => setOpenModalName(false);

  const [openModalEmail, setOpenModalEmail] = React.useState(false);
  const handleOpenModalEmail = () => setOpenModalEmail(true);
  const handleCloseModalEmail = () => setOpenModalEmail(false);

  const [openModalPhone, setOpenModalPhone] = React.useState(false);
  const handleOpenModalPhone = () => setOpenModalPhone(true);
  const handleCloseModalPhone = () => setOpenModalPhone(false);

  const [openModalBirthday, setOpenModalBirthday] = React.useState(false);
  const handleOpenModalBirthday = () => setOpenModalBirthday(true);
  const handleCloseModalBirthday = () => setOpenModalBirthday(false);

  const [userFio, setUserFio] = React.useState({});
  const handleSaveUserFio = (UserFio) => {
    setUserFio(UserFio);
  };

  const [gender, setGender] = React.useState("");

  const [userAvatar, setUserAvatar] = React.useState("");

  const inputFileRef = React.useRef(null);

  const handleChangeImage = (e) => {
    const file = e.target.files;

    const userImage = window.URL.createObjectURL(new Blob(file));
    setUserAvatar(userImage);
  };

  React.useEffect(() => {
    inputFileRef.current.addEventListener("change", handleChangeImage);
  }, []);

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };
  // const noInformation = "Не указано";

  const Input = styled("input")({
    display: "none",
  });

  return (
    <>
      <Box sx={{ display: "flex", marginBottom: "10px" }}>
        <Box>
          <Avatar
            alt="Remy Sharp"
            src={
              !userAvatar
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWcV-n4M3RSxnC8G7lIteNs3VltOndR97Nxg&usqp=CAU"
                : userAvatar
            }
            sx={{ width: 100, height: 100 }}
          />
          <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="icon-button-file">
              <Input
                ref={inputFileRef}
                accept="image/*"
                id="icon-button-file"
                type="file"
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <DriveFolderUploadIcon
                  sx={{ marginLeft: "70px", width: 20, height: 20 }}
                  color="secondary"
                />
              </IconButton>
            </label>
          </Stack>
        </Box>
        <Box
          sx={{
            marginLeft: "15px",
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Typography variant="h4" sx={{ paddingBottom: "25px" }}>
            Не указано
          </Typography>
          <Box
            style={{ paddingBottom: "25px" }}
            sx={{ "& > :not(style)": { m: 1 } }}
          >
            <Fab
              size="small"
              color="secondary"
              aria-label="edit"
              onClick={handleOpenModalName}
            >
              <EditIcon />
            </Fab>
          </Box>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            sx={{ height: "40px", weight: "50px", marginLeft: "auto" }}
          >
            Войти как продавец
          </Button>
        </Box>
      </Box>
      <ModalChangeName
        openModalName={openModalName}
        handleCloseModalName={handleCloseModalName}
        handleSaveUserFio={handleSaveUserFio}
      />
      <ModalChangeEmail
        openModalEmail={openModalEmail}
        handleCloseModalEmail={handleCloseModalEmail}
      />
      <ModalChangePhone
        openModalPhone={openModalPhone}
        handleCloseModalPhone={handleCloseModalPhone}
      />
      <ModalChangeBirthday
        openModalBirthday={openModalBirthday}
        handleCloseModalBirthday={handleCloseModalBirthday}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between ",
          flexWrap: "wrap",
        }}
      >
        <Card sx={{ width: 345, height: "260px", marginTop: "25px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              src="https://mui.com/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Box sx={{ display: "flex" }}>
                <Typography variant="h6">Ваш Email:</Typography>
                <ModeEditOutlineIcon
                  onClick={handleOpenModalEmail}
                  color="secondary"
                />
              </Box>

              <Typography variant="h6" sx={{ paddingBottom: "25px" }}>
                {user?.email && user.email}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ width: 345, height: "260px", marginTop: "25px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              src="https://images.unsplash.com/photo-1523371683773-affcb4a2e39e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="green iguana"
            />
            <CardContent>
              <Box sx={{ display: "flex" }}>
                <Typography variant="h6">Телефон</Typography>
                <ModeEditOutlineIcon
                  onClick={handleOpenModalPhone}
                  color="secondary"
                />
              </Box>
              <Typography variant="h6" sx={{ paddingBottom: "25px" }}>
                Не указано
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ width: 345, height: "260px", marginTop: "25px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              src="https://images.unsplash.com/photo-1531956531700-dc0ee0f1f9a5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmlydGhkYXl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="green iguana"
            />
            <CardContent>
              <Box sx={{ display: "flex" }}>
                <Typography variant="h6">Дата рождения</Typography>
                <ModeEditOutlineIcon
                  onClick={handleOpenModalBirthday}
                  color="secondary"
                />
              </Box>
              <Typography variant="h6" sx={{ paddingBottom: "25px" }}>
                Не указано
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ width: 345, height: "260px", marginTop: "25px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              src="https://mui.com/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <FormControl sx={{ marginLeft: "auto" }} component="fieldset">
                <FormLabel component="legend">Пол</FormLabel>
                <RadioGroup
                  aria-label="Пол"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={gender}
                  onChange={handleChangeGender}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Муж."
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Жен."
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </>
  );
};

export default Profile;
