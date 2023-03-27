import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./workoutDetails.css";
import { UserContext } from "../App";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { set } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { db } from "../firebase/config";
import { Button, Typography, Box, Paper } from "@mui/material";
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Swal from 'sweetalert2'

function WorkoutDetails() {
    const location = useLocation();

    const { userProgress, userValues, conectedUser, ApiWorkouts } =
        useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const date = new Date();
    const fullDate = `${date.getFullYear()}-${date.getMonth() + 1
        }-${date.getDate()}`;
    // const fullDate = `2023-12-05`;
    const [workoutProgress, setWorkoutProgress] = useState([]);
    //START OF THE USE EFFECT
    const [realTimeUser, setRealTimeUser] = useState([]);
    const [workoutDetails, setWorkoutDetails] = useState({});
    console.log(userProgress);
    console.log(userValues);
    console.log(conectedUser);
    console.log(
        userProgress.find(
            (item) => userValues[conectedUser].userName == item.userName
        )
    );
    useEffect(() => {
        const tempUser = userProgress.find(
            (item) => userValues[conectedUser].userName == item.userName
        );
        setRealTimeUser(tempUser);
        setWorkoutProgress(tempUser);
        setWorkoutDetails(location.state?.singleWorkout);
        // console.log(tempUser)
        // console.log(realTimeUser);
    }, []);

    // console.log(realTimeUser?.userName);
    // console.log(realTimeUser?.userName);
    // console.log(process.env.REACT_APP_API_KEY);

    //TIMRER PROPERTIES

    const [time, setTime] = useState(10);
    const [key, setKey] = useState(0);
    const [timerIsPlaying, setTimerIsPlaying] = useState(false);
    const renderTime = ({ remainingTime, elapsedTime }) => {
        if (remainingTime === 0 && time === 10) {
            // setTime(20)
            setKey((prevKey) => prevKey + 1);
            setTimerIsPlaying(false);
            return <div className="timer">Now Rest</div>;
        }

        return (
            <div className="timer">
                {/* {console.log(elapsedTime)} */}
                <div className="text">Remaining</div>
                <div className="value">{remainingTime}</div>
                <div className="text">seconds</div>
            </div>
        );
    };

    function AddWorkoutProgress() {
        let workoutIndex = workoutProgress?.progress.findIndex(
            (workout) => workout.date === fullDate
        );
        if (workoutIndex != -1) {
            const tempArray = workoutProgress;
            if (
                !tempArray?.progress[workoutIndex].workouts.includes(workoutDetails)
            ) {
                tempArray?.progress[workoutIndex].workouts.push(workoutDetails);
                setWorkoutProgress({ ...tempArray });
            }
        } else {
            const tempArray = workoutProgress;
            tempArray.progress.push({
                date: fullDate,
                workouts: [workoutDetails],
            });
            setWorkoutProgress({ ...tempArray });
        }
    }
    const UpdateUserProgress = async (id) => {
        AddWorkoutProgress();
        const userDoc = doc(db, "Progress", id);
        const newFields = { progress: workoutProgress.progress };
        await updateDoc(userDoc, newFields);
        console.log(newFields);
    };

    return (
        <div style={{ minHeight: "100vh" }}>
            <Paper sx={{ m: 8, p: 3 }} elevation={10} >
                <Typography variant="h3" sx={{ p: 2 }}>Single Workout:</Typography>

                <Typography variant="h4" color="secondary.dark" sx={{ fontWeight: 600 }}>{workoutDetails?.name}</Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button color="secondary" variant="contained" sx={{ m: 2, borderRadius: 5 }}> {workoutDetails?.difficulty}</Button>
                    <Button color="secondary" variant="contained" sx={{ m: 2, borderRadius: 5 }}> {workoutDetails?.equipment}</Button>
                    <Button color="secondary" variant="contained" sx={{ m: 2, borderRadius: 5 }}> {workoutDetails?.muscle}</Button>
                    <Button color="secondary" variant="contained" sx={{ m: 2, borderRadius: 5 }}> {workoutDetails?.type}</Button>
                </Box >
                <Box sx={{ p: 3 }}>
                    <Typography>{workoutDetails?.instructions}</Typography>
                </Box >

                <div>
                    <Typography variant="h5" color="primary.dark" sx={{ p: 5 }}>
                        Countdown Circle Timer:
                    </Typography>
                    <div className="timer-wrapper">
                        <CountdownCircleTimer
                            isPlaying={timerIsPlaying}
                            key={key}
                            duration={time}
                            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                            colorsTime={[10, 6, 3, 0]}
                            onComplete={() => ({ shouldRepeat: true, delay: 3 })}
                        >
                            {renderTime}
                        </CountdownCircleTimer>
                    </div>
                    <Box sx={{ m: 4 }}>
                        <Button
                            color="primary"
                            variant="outlined"
                            sx={{ m: 1 }}
                            onClick={() => setTimerIsPlaying(true)}
                        >
                            start
                        </Button>
                        <Button
                            color="primary"
                            variant="outlined"
                            sx={{ m: 1 }}
                            onClick={() => setTimerIsPlaying(false)}
                        >
                            pause
                        </Button>
                        <Button
                            color="primary"
                            variant="outlined"
                            sx={{ m: 1 }}
                            onClick={() => setKey((prevKey) => prevKey + 1)}
                        >
                            Restart Timer
                        </Button>
                        <p className="info">
                            Change component properties in the code filed on the right to try
                            difference functionalities
                        </p>
                        {/* <button onClick(())>stop</button> */}
                    </Box>
                </div>

                <div>
                    {isLoading ? (
                        <p> loading</p>
                    ) : (
                        <>
                            <Button
                                color="primary"
                                variant="contained"
                                sx={{ m: 4 }}
                                onClick={() => {
                                    UpdateUserProgress(workoutProgress.id)
                                    Swal.fire({
                                        position: 'middle',
                                        icon: 'success',
                                        title: 'Your work has been saved',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }}
                            >
                                Done
                            </Button>
                            {console.log(workoutProgress)}
                            {console.log(
                                workoutProgress?.progress?.findIndex(
                                    (workout) => workout.date === fullDate
                                )
                            )}

                        </>
                    )}
                </div>
            </Paper>

        </div>
    );
}

export default WorkoutDetails;
