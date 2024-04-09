import React from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, onError, onLoading } from "../../../actions/userActions";
import { Search } from "@mui/icons-material";

export default function TableUsers() {
  const { token, loading, error, users, SearchText } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getUsersApi = async () => {
      try {
        dispatch(onLoading());
        const response = await axios.post(
          "https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/GetUsers",
          {
            Body: {
              SearchText,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.IsOK) {
          dispatch(getUsers(response.data.Body));
          return;
        }
        dispatch(onError("No se encontraron resultados"));
      } catch (error) {
        console.log(error);
        dispatch(onError(error.message));
      }
    };
    getUsersApi();
  }, [SearchText]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mt: 5
        }}
      >
        <CircularProgress />
        <Typography>Cargando...</Typography>
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mt: 5
        }}
      >
        <Search />
        <Typography>No se encontraron resultados</Typography>
      </Box>
    );

  return (
    <Box sx={{ mt: 2 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>UserName</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>FatherLastName</TableCell>
              <TableCell>CreationDate</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>PhoneNumber</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((res) => (
              <TableRow key={res.Id}>
                <TableCell>{res.Username}</TableCell>
                <TableCell>{res.Name}</TableCell>
                <TableCell>{res.FatherLastName}</TableCell>
                <TableCell>{res.CreationDate}</TableCell>
                <TableCell>{res.Email}</TableCell>
                <TableCell>{res.PhoneNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
