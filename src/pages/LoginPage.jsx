import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

import { Typography, Button, TextField, Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

function LoginPage() {
  const [click, setClick] = useState(false);
  const { userValues, conectedUser, setConectedUser, isOnline, setIsOnline } =
    useContext(UserContext);
  const navigate = useNavigate();
  const UpdateUser = async (id) => {
    const userDoc = doc(db, "User", id);
    const newFields = { isOnline: true };
    await updateDoc(userDoc, newFields);
    console.log(newFields);
  };

  function Validation(userName, password) {
    setClick(true);
    console.log(userValues.length);
    console.log(isOnline);

    for (let i = 0; i < userValues.length; i++) {
      if (
        userName.value === userValues[i].userName &&
        password.value === userValues[i].password
      ) {
        navigate("/");
        UpdateUser(userValues[i].id);
        setConectedUser(i);
        setIsOnline(true);
      }
    }
  }

  return (
    <Box sx={{ display: "inline-flex", flexDirection: "column", m: 4}}>
      <Typography align="center" color="primary" variant="h3">
        Log in
      </Typography>
      <Typography
        align="center"
        color="primary"
        variant="subtitle1"
        sx={{ p: 2 }}
      >
        Enter your username and password:
      </Typography>
      <TextField
        sx={{ m: 2 }}
        placeholder="User name"
        id="userName"
        color="primary"
        align="center"
        
        label="User name"
      ></TextField>
      <TextField
        sx={{ m: 2 }}
        placeholder="Password"
        id="password"
        color="primary"
        align="center"
        label="Password"
      ></TextField>
      <Button
        color="primary"
        size="large"
        variant="contained"
        sx={{ m: 3, p: 1 }}
        onClick={() => {
          Validation(
            document.getElementById("userName"),
            document.getElementById("password")
          );
        }}
      >
        Log in
      </Button>
      <br />
      {click && !isOnline && (
        <Typography align="center" color="error" variant="variant">
          Your user name or password are incorrect
        </Typography>
      )}
    </Box>
  );
}
export default LoginPage;
