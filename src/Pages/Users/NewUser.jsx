import { Add } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onError, onLoading } from "../../actions/userActions";

export default function NewUser() {
  const [open, setOpen] = React.useState(false);
  const { loading, error, token } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [userData, setUserData] = React.useState({
    UserName: "",
    Password: "",
    FatherLastName: "",
    MotherLastName: "",
    Name: "",
    Email: "",
    PhoneNumber: "",
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(onLoading());
      const input = {
        Body: {
          ...userData,
          Tenant: null,
          Metadata: null,
          Roles: [ { "Id": 2, "Name": "Usuario Tradicional" } ]
        },
      };
      const response = await axios.post(
        "https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/RegisterUserRole",
        input,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.data.IsOK) handleClose();
      dispatch(onError(response.data?.Messages));
    } catch (error) {
      console.log(error);
      dispatch(onError(error.message));
    }
  };

  return (
    <>
      <Button
        size="small"
        variant="contained"
        disableElevation
        startIcon={<Add />}
        onClick={handleClickOpen}
      >
        Nuevo
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Nuevo usuario</DialogTitle>
        <DialogContent>
          {error ? (
            <Alert severity="error" sx={{ my: 2 }}>
              {error}
            </Alert>
          ) : null}
          <form id="user-form" onSubmit={handleSubmit}>
            <TextField
              size="small"
              label="Username"
              name="UserName"
              margin="dense"
              fullWidth
              required
              onChange={handleChange}
              value={userData.UserName}
            />
            <TextField
              size="small"
              label="Name"
              name="Name"
              margin="dense"
              fullWidth
              required
              onChange={handleChange}
              value={userData.Name}
            />
            <TextField
              size="small"
              label="FatherLastName"
              name="FatherLastName"
              margin="dense"
              fullWidth
              required
              onChange={handleChange}
              value={userData.FatherLastName}
            />
            <TextField
              size="small"
              label="MotherLastName"
              name="MotherLastName"
              margin="dense"
              fullWidth
              onChange={handleChange}
              value={userData.MotherLastName}
            />
            <TextField
              size="small"
              label="Email"
              name="Email"
              required
              margin="dense"
              fullWidth
              onChange={handleChange}
              value={userData.Email}
            />
            <TextField
              size="small"
              label="PhoneNumber"
              name="PhoneNumber"
              margin="dense"
              fullWidth
              onChange={handleChange}
              value={userData.PhoneNumber}
            />
            <TextField
              size="small"
              label="Password"
              name="Password"
              margin="dense"
              fullWidth
              required
              onChange={handleChange}
              value={userData.Password}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            form="user-form"
            type="submit"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
