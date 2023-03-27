import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Navigate, NavLink, useParams } from "react-router-dom";
import "./workoutExercises.css";
import { UserContext } from "../App";
import { useContext } from "react";
import { set } from "react-hook-form";
import BodyParts from "./BodyParts";
import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { Button, Typography, Box, Paper } from "@mui/material";

function WorkoutExercises({ UserWorkoutss, setMus, setDif, apiWork }) {
    const { userValues, conectedUser, ApiWorkouts, UserWorkouts, setTakeParms } =
        useContext(UserContext);

    const [difficulty, setDifficulty] = useState("");
    const [exerciseType, setExerciseType] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");

    console.log(ApiWorkouts);

    const params = useParams();
    useEffect(() => {
        setTakeParms(params.userName);
    }, []);
    return (
        <div className="all-workouts">


            <Typography variant="h6" color="primary">
                Chose the difficulty level of the exercise:{" "}
            </Typography>

      <InputLabel>Difficulty</InputLabel>
      <Select
        sx={{ m: 1, minWidth:170 }}
        placeholder="Difficulty"
        onChange={(event) => {
          setDif(event.target.value);
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

      <Typography
        variant="h6"
        color="primary"
        name="muscle-group"
        className="exercise type"
      >
        Chose muscle group targeted by the exercise:
      </Typography>
      <InputLabel>Muscle type</InputLabel>
      <Select
      sx={{minWidth:120}}
        name="muscle-group"
        label="choose a muscle"
        onChange={(event) => {
          setMus(event.target.value);
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
        <MenuItem value="lower_back">lowerback </MenuItem>
        <MenuItem value="middle_back">middleback </MenuItem>
        <MenuItem value="neck">neck </MenuItem>
        <MenuItem value="quadriceps">quadriceps </MenuItem>
        <MenuItem value="traps">traps </MenuItem>
        <MenuItem value="triceps">triceps </MenuItem>
      </Select>

            <Box sx={{ minHeight: "98vh" }}>
                <Typography variant="h3" color="primary.dark" display="block">
                    All workouts
                </Typography>
                <br />
                <Button
                    color="primary"
                    size="large"
                    variant="contained"
                    sx={{ m: 2 }}
                    onClick={() => UserWorkoutss()}
                >
                    show excrercise
                </Button>
                <br />
                <Typography varient="overline" color="primary">
                    {userValues[conectedUser]?.muscleGroup}
                </Typography>

                {apiWork?.map((workout) => (
                    <div className="single-workout">
                        <Paper sx={{ p: 3, m: 4, borderRadius: 10 }} elevation={24}>
                            <div className="workout-params">
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    sx={{ borderRadius: 5 }}
                                >
                                    {workout.name}
                                </Button>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    sx={{ borderRadius: 5 }}
                                >
                                    {" "}
                                    {workout.difficulty}
                                </Button>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    sx={{ borderRadius: 5 }}
                                >
                                    {" "}
                                    {workout.equipment}
                                </Button>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    sx={{ borderRadius: 5 }}
                                >
                                    {" "}
                                    {workout.muscle}
                                </Button>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    sx={{ borderRadius: 5 }}
                                >
                                    {" "}
                                    {workout.type}
                                </Button>
                            </div>
                            <div className="workout-instructions">
                                <Typography sx={{ m: 3 }} variant="body2"> {workout.instructions}</Typography>
                            </div>
                            <div className="workout-nav-link">
                                <Button
                                    LinkComponent={NavLink}
                                    sx={{ m: 2, width: "12vw" }}
                                    size="large"
                                    variant="contained"
                                    color="error"
                                    to={`/WorkoutDetails/${workout.name}`}
                                    state={{ singleWorkout: workout }}
                                >
                                    Start Workout
                                </Button>
                            </div>
                        </Paper>
                    </div>
                ))}
            </Box>
        </div>
    );
}

export default WorkoutExercises;
