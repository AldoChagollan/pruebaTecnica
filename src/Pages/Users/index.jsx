import { Search } from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import TableUsers from "./TableUsers";
import { useDispatch, useSelector } from "react-redux";
import { getSearch, onSearch } from "../../actions/userActions";
import NewUser from "./NewUser";

export default function Users() {
  const { SearchText } = useSelector((state) => state.users);
  //const [value, setValue] = React.useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(getSearch(e.target.value));
  };

  const handleSubmit = () => {
    dispatch(onSearch(SearchText));
  };

  return (
    <Container maxWidth="md" sx={{ my: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            size="small"
            placeholder="Buscar"
            name="search"
            onChange={handleChange}
            value={SearchText}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" type="submit">
                  <IconButton>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
        <NewUser />
      </Box>
      <TableUsers />
    </Container>
  );
}
