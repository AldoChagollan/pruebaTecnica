import React from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, onError, onLoading } from "../../actions/userActions";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [show, setShow] = React.useState(false);
  const [user, setUser] = React.useState({
    Username: "",
    Password: "",
  });

  const { loading, error, token } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(onLoading());
      const response = await axios.post(
        "https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/authentication/authentication",
        {
          Body: user,
        }
      );
      if (response.data.IsOK) {
        localStorage.setItem("testToken", response.data.Body.Token);
        dispatch(loginUser(response.data.Body.Token));
        return;
      }
      dispatch(onError(response.data?.Messages || "Error"));
    } catch (error) {
      dispatch(onError(error.message || "Error"));
    }
  };

  if (token) return <Navigate to="users" />;

  return (
    <Box
      sx={{
        height: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ p: 2, width: 350 }}>
        {error ? (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        ) : null}
        <form onSubmit={handleSubmit}>
          <TextField
            size="small"
            margin="dense"
            fullWidth
            label="Username"
            name="Username"
            required
            value={user.Username}
            onChange={handleChange}
          />
          <TextField
            size="small"
            margin="dense"
            fullWidth
            label="Password"
            name="Password"
            type={show ? "text" : "password"}
            required
            value={user.Password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={() => setShow((prev) => !prev)}>
                    {show ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            size="small"
            variant="contained"
            disableElevation
            type="submit"
            fullWidth
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            Iniciar sesion
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
