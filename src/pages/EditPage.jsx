import { React, useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./SignUp.css";
import { UserContext } from "../App";
import { useNavigate } from "react-router";
import { db } from "../firebase/config";
import { styled } from "@mui/material/styles";

import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { async } from "q";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Progress } from "rsuite";

function EditPage() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newVerifyPassword, setNewVeifyPassword] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newHeight, setNewHeight] = useState();
  const [newWeight, setNewWeight] = useState();
  const [newDifficulty, setNewDifficulty] = useState("");
  const [newExerciseType, setNewExerciseType] = useState("");
  const [newMuscleGroup, setNewMuscleGroup] = useState("");
  const [newGoal, setNewGoal] = useState("");
  

  const {
    userValues,
    userIndex,
    conectedUser,
    setIsOnline,
    userProgress
  } = useContext(UserContext);

  const checkUserName = () => {
    for (let i = 0; i < userValues.length; i++) {
        if(i!==conectedUser){
      if (userValues[i].userName === newUserName.trim()) {
        return false;
      }
    }
    }
    if (newUserName.trim().length > 3) {
      return true;
    }
    return false;
  };
  const checkFirstName = () => {
    if (newFirstName.trim().length > 3) {
      return true;
    }
    return false;
  };
  const checkLastName = () => {
    if (newLastName.trim().length > 3) {
      return true;
    }
    return false;
  };
  const checkPassword = () => {
    if (newPassword.trim().length > 3) {
      return true;
    }
    return false;
  };
  const checkVerifyPassword = () => {
    if (newVerifyPassword !== newPassword) {
      return false;
    }
    return true;
  };
  const checkDate = () => {
    if (newDate) {
      return true;
    }
    return false;
  };
  const checkEmail = () => {
    if (newEmail) {
      return true;
    }
    return false;
  };
  const checkDiffuculty = () => {
    if (newDifficulty) {
      return true;
    }
    return false;
  };
  const checkWeight = () => {
    if (newWeight) {
      return true;
    }
    return false;
  };
  const checkAll = () => {
    return (
      checkUserName() &&
      checkFirstName() &&
      checkLastName() &&
      checkPassword() &&
      checkVerifyPassword() &&
      checkDate() &&
      checkEmail() &&
      checkDiffuculty()
    );
  };
  const updateUser = async () => {
    console.log(userValues[conectedUser].id);
    setClick(true);
if(checkAll()){
const userDoc=doc(db,"User",userValues[conectedUser].id)
const newFields={userName: newUserName,
  firstName: newFirstName,
  lastName: newLastName,
  password: newPassword,
  verifyPassword: newVerifyPassword,
  date: newDate,
  email: newEmail,
  gender: newGender,
  weight: newWeight,
  difficulty: newDifficulty,
  exerciseType: newExerciseType,
  muscleGroup: newMuscleGroup,
  height: newHeight,
  goal: newGoal,
}
await updateDoc(userDoc,newFields)
 navigate('/')

}
}
// const [confirm,setConfirm]=useState(false);
const [deleteclick,setDeleteClick]=useState(false);


const deleteUser=async(confirm)=>{
    setDeleteClick(true)
    if(confirm===1){
    const userDoc=doc(db,"User",userValues[conectedUser]?.id)
    await deleteDoc(userDoc)
    const progressDoc=doc(db,"Progress",userProgress[conectedUser]?.id)
    await deleteDoc(progressDoc)
    setIsOnline(false);
    navigate("/")
    }
    else if(confirm===2){
        setDeleteClick(false)
    }
}
const ErrorTypography = styled(Typography)({
    color: "red",
  });

  return (
    <Paper elevation={8} sx={{ m: 4 }}>
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          justifyItems: "center",
          m: 2,
          mt: 4,
        }}
      >
        <Typography variant="h2" color="primary.dark" sm={{ p: 2 }}>
          Edit detailes:
        </Typography>

        <TextField
           defaultValue={userValues[conectedUser].userName}
          sx={{ m: 1 }}
          placeholder="User name"
          color="primary"
          align="center"
          label="User Name"
          onChange={(event) => {
            setNewUserName(event.target.value);
          }}
        />
        {click && !checkUserName() && (
          <ErrorTypography>User name is required</ErrorTypography>
        )}

        <TextField
          defaultValue={userValues[conectedUser].firstName}
          sx={{ m: 1 }}
          placeholder="First name"
          color="primary"
          align="center"
          label="First Name"
          onChange={(event) => {
            setNewFirstName(event.target.value);
          }}
        />
        {click && !checkFirstName() && (
          <ErrorTypography>First name is required</ErrorTypography>
        )}

        <TextField
        defaultValue={userValues[conectedUser].lastName}
          sx={{ m: 1 }}
          color="primary"
          align="center"
          label="Last name"
          onChange={(event) => {
            setNewLastName(event.target.value);
          }}
        />
        {click && !checkLastName() && (
          <ErrorTypography>Last name is required</ErrorTypography>
        )}

        <TextField
        defaultValue={userValues[conectedUser].password}
          placeholder="Password"
          sx={{ m: 1 }}
          color="primary"
          align="center"
          label="Password"
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
        />
        {click && !checkPassword() && (
          <ErrorTypography>Password name is required</ErrorTypography>
        )}
        <TextField
        defaultValue={userValues[conectedUser].verifyPassword}
          placeholder="Verify password"
          sx={{ m: 1 }}
          color="primary"
          align="center"
          label="Verify password"
          onChange={(event) => {
            setNewVeifyPassword(event.target.value);
          }}
        />
        {click && !checkVerifyPassword() && (
          <ErrorTypography>Password does not match</ErrorTypography>
        )}

        <TextField
        defaultValue={userValues[conectedUser].date}
          type="date"
          sx={{ m: 1 }}
          color="primary"
          onChange={(event) => {
            setNewDate(event.target.value);
          }}
        />
        {click && !checkDate() && (
          <ErrorTypography>Date is required</ErrorTypography>
        )}

        <TextField
        defaultValue={userValues[conectedUser].email}
          sx={{ m: 1 }}
          color="primary"
          placeholder="E-mail"
          label="E-mail"
          onChange={(event) => {
            setNewEmail(event.target.value);
          }}
        />
        {click && !checkEmail() && (
          <ErrorTypography>E-mail is required</ErrorTypography>
        )}
        <Box>
          <input
            type="radio"
            id="Male"
            name="gender"
            value="Male"
            onChange={(event) => {
              setNewGender(event.target.value);
            }}
          />
          <Typography variant="p" color="primary" sx={{ p: 2 }} htmlFor="Male">
            Male
          </Typography>

          <input
            type="radio"
            id="Female"
            name="gender"
            value="Female"
            onChange={(event) => {
              setNewGender(event.target.value);
            }}
          />
          <Typography
            variant="p"
            color="primary"
            sx={{ p: 2 }}
            htmlFor="Female"
          >
            Female
          </Typography>
        </Box>

        <TextField
        defaultValue={userValues[conectedUser].height}
          placeholder="Height cm"
          label="Height cm"
          sx={{ m: 1 }}
          color="primary"
          onChange={(event) => {
            setNewHeight(event.target.value);
          }}
        />
        <TextField
        defaultValue={userValues[conectedUser].weight}
          placeholder="Weight KG"
          label="Weight KG"
          sx={{ m: 1 }}
          color="primary"
          onChange={(event) => {
            setNewWeight(event.target.value);
          }}
        />
        {click && !checkWeight() && (
          <ErrorTypography>Weight is required</ErrorTypography>
        )}
        <Typography variant="h6" color="primary">
          Chose the difficulty level of the exercise:{" "}
        </Typography>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Difficulty</InputLabel>
          <Select
          defaultValue={userValues[conectedUser].difficulty}
            sx={{ m: 1 }}
            placeholder="Difficulty"
            onChange={(event) => {
              setNewDifficulty(event.target.value);
            }}
          >
            <MenuItem color="primary" value="none">
              None
            </MenuItem>
            <MenuItem color="primary" value="beginner">
              beginner
            </MenuItem>
            <MenuItem color="primary" value="intermediate">
              intermediate
            </MenuItem>
            <MenuItem color="primary" value="expert">
              expert
            </MenuItem>
          </Select>
        </FormControl>
        {click && !checkDiffuculty() && (
          <ErrorTypography>Difficulty is required</ErrorTypography>
        )}

        <Typography
          variant="h6"
          color="primary"
          name="exercise-type"
          className="exercise type"
        >
          Chose the exercise type:
        </Typography>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Exercise type</InputLabel>
          <Select
            name="exercise-type"
            onChange={(event) => {
              setNewExerciseType(event.target.value);
            }}
          >
            <MenuItem value="cardio">cardio</MenuItem>
            <MenuItem value="olympic_weightlifting">
              olympic_weightlifting
            </MenuItem>
            <MenuItem value="plyometrics">plyometrics</MenuItem>
            <MenuItem value="powerlifting">powerlifting</MenuItem>
            <MenuItem value="strength">strength</MenuItem>
            <MenuItem value="stretching">stretching</MenuItem>
            <MenuItem value="strongman">strongman</MenuItem>
          </Select>
        </FormControl>

        <Typography
          variant="h6"
          color="primary"
          name="muscle-group"
          className="exercise type"
        >
          Chose muscle group targeted by the exercise:
        </Typography>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Muscle type</InputLabel>
          <Select
          defaultValue={userValues[conectedUser].muscleGroup}
            name="muscle-group"
            label="choose a muscle"
            onChange={(event) => {
              setNewMuscleGroup(event.target.value);
            }}
          >
            <MenuItem value="abdominals">abdominals</MenuItem>
            <MenuItem value="abductors">abductors</MenuItem>
            <MenuItem value="adductors">adductors</MenuItem>
            <MenuItem value="biceps">biceps</MenuItem>
            <MenuItem value="calves">calves</MenuItem>
            <MenuItem value="chest">chest</MenuItem>
            <MenuItem value="forearms">forearms</MenuItem>
            <MenuItem value="glutes">glutes</MenuItem>
            <MenuItem value="hamstrings">hamstrings</MenuItem>
            <MenuItem value="lats">lats</MenuItem>
            <MenuItem value="lowerback ">lowerback </MenuItem>
            <MenuItem value="middleback ">middleback </MenuItem>
            <MenuItem value="neck ">neck </MenuItem>
            <MenuItem value="quadriceps ">quadriceps </MenuItem>
            <MenuItem value="traps ">traps </MenuItem>
            <MenuItem value="triceps ">triceps </MenuItem>
          </Select>
        </FormControl>
        <br />
        <TextField
          placeholder="Goal"
          sx={{ m: 4 }}
          onChange={(event) => {
            setNewGoal(event.target.value);
          }}
        />
        <br />
        <Button
          color="success"
          variant="contained"
          sx={{ m: 4 }}
          onClick={() => updateUser()}
          className="button-sign"
        >
          Approve
        </Button>


        <Button
          color="error"
          variant="contained"
          className="left button-delete"
          onClick={() => deleteUser(0)}
        >
          Delelte user
        </Button>
        {deleteclick && <p>Are you sure you want to delete your user?</p>}
        {deleteclick && (
          <Button
            color="primary"
            variant="outlined"
            size="small"
            sx={{ m: 1 }}
            onClick={() => deleteUser(1)}
          >
            Yes
          </Button>
        )}
        {deleteclick && (
          <Button
            color="primary"
            variant="outlined"
            size="small"
            sx={{ m: 1 }}
            onClick={() => deleteUser(2)}
          >
            No
          </Button>
        )}
      </Box>
    </Paper>
  );
}
export default EditPage;
