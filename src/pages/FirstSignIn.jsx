import { React, useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { redirect, useNavigate } from "react-router";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
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
import { styled } from "@mui/material/styles";

function FirstSignIn() {
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
  const [newIsOnline, setNewIsOnline] = useState();
  const [newUserIndex, setNewUserIndex] = useState();

  const {
    userValues,
    setUserValues,
    userCollectionRef,
    workoutCollectionRef,
    progressCollectionRef,
    userIndex,
  } = useContext(UserContext);

  const checkUserName = () => {
    for (let i = 0; i < userValues.length; i++) {
      if (userValues[i].userName === newUserName.trim()) {
        return false;
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
    if (newWeight>40&&newWeight<200) {
      return true;
    }
    return false;
  };
  const checkHeight = () => {
    if (newHeight>40&&newHeight<230) {
      return true;
    }
    return false;
  };
  const checkMuscleGroup = () => {
    if (newMuscleGroup) {
      return true;
    }
    return false;
  };
  const checkExerciseType = () => {
    if (newExerciseType) {
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
      checkDiffuculty()&&
      checkHeight()&&
      checkWeight
    );
  };
  useEffect(()=>{
    setNewUserIndex(userValues.length)
  },[])
  const createUser = async () => {
    setClick(true);
    setNewIsOnline(false);   
    if(checkAll()){
      (await addDoc(userCollectionRef, {
        userName: newUserName,
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
        isOnline: false,
        userIndex: newUserIndex,
      }))
      await addDoc(progressCollectionRef, {
        userName: newUserName,
        progress: [],
      });

      navigate("/LoginPage");
    }
  };

  const ErrorTypography = styled(Typography)({
    color: "red",
  });

  return (
    <Paper elevation={8} sx={{ m: 10, mt: 1 }}>
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          justifyItems: "center",
          m: 2,
          mt: 4,
        }}
      >
        <Typography
          variant="h3"
          color="primary.dark"
          sx={{ alignItems: "center", flexDirection: "column" }}
          className="title"
        >
          Sign-Up
        </Typography>

        <TextField
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
          sx={{ m: 1 }}
          placeholder="First name"
          color="primary"
          align="center"
          id="firstname"
          label="First Name"
          onChange={(event) => {
            setNewFirstName(event.target.value);
          }}
        />
        {click && !checkFirstName() && (
          <ErrorTypography>First name is required</ErrorTypography>
        )}

        <TextField
          sx={{ m: 1 }}
          color="primary"
          align="center"
          label="Last name"
          onChange={(event) => {
            setNewLastName(event.target.value);
          }}
        />
        {click && !checkLastName() && (
          <ErrorTypography color="error">Last name is required</ErrorTypography>
        )}

        <TextField
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
          placeholder="Height cm"
          label="Height cm"
          sx={{ m: 1 }}
          color="primary"
          onChange={(event) => {
            setNewHeight(event.target.value);
          }}
        />
        {click && !checkHeight() && (
          <ErrorTypography>Height is required</ErrorTypography>
        )}
        <TextField
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

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Difficulty</InputLabel>
          <Select
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
          Choose the exercise type:
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
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
        <FormControl sx={{ m: 2, minWidth: 120 }}>
          <InputLabel>Muscle type</InputLabel>
          <Select
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
          onChange={(event) => {
            setNewGoal(event.target.value);
          }}
        />
        <Button
          color="primary"
          size="large"
          variant="contained"
          sx={{ m: 3, p: 1 }}
          onClick={createUser}
          className="button-sign"
        >
          Sign Up
        </Button>
        
      </Box>
    </Paper>
  );
}
export default FirstSignIn;

//

// {userIndex?.map((user, index) => {
//   return (
//     <div key={index}>
//       <h1>{user.userIndex}</h1>
//     </div>
//   );
// })}

// {userValues?.map((user, index) => {
//   return (
//     <div key={index}>
//       <h1>{user.userName}</h1>
//       <h1>{user.password}</h1>
//     </div>
//   );
// })}

// function IfExist(user){
// for(let i=0;i<userValues?.length-1;i++){
//     if(userValues[i]?.userName===user?.value){
//         console.log(userValues[i]?.userName);
//         console.log(user?.value);
//         return false;
//     }
// }
// return true;
// }
// return (
//     <form className=" form-wrapper" onSubmit={handleSubmit(onSubmit)}>
//       <div className="signUp-form">
//         <div>
//           <div className="column">
//             <h1 className="title">Sign-Up</h1>
//             <input id="user"
//               placeholder="User name"
//               {...register("userName", { required: true})}
//                 />
//             {errors.userName && <span>User name is required</span>}
//             {(!IfExist(document.getElementById("user")))&&<span>User name is not aveliable</span>}
//             <input
//               placeholder="First name"
//               type="text"
//               {...register("firstName", { required: true })}
//             />
//             {errors.firstName && <span>First name is required</span>}

//             <input
//               placeholder="Last name"
//               type="text"
//               {...register("lastName", { required: true })}
//             />
//             {errors.lastName && <span>Last name is required</span>}
//             <input
//               placeholder="Password"
//               type="password"
//               {...register("password", { required: true,minLength:4 })}
//             />
//             {errors.password && <span>Password must be at least 4 chars</span>}

//             <input
//               placeholder="Verify password"
//               type="password"
//               {...register("verifyPassword", { required: true,minLength:4 })}
//             />
//             {errors.verifyPassword && <span>Password does not match</span>}
//             <input
//               type="date"
//               {...register("date", { required: true })}
//             />
//             {errors.date && <span>Date of birth is required</span>}

//             <input
//               placeholder="E-mail"
//               type="text"
//               {...register("E_Mail", { required: true })}
//             />
//             {errors.E_Mail && <span>E-mail is required</span>}
//

//          <input type="submit" className="button-sign" value="SignUp" ></input>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }
