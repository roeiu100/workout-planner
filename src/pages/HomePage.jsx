// import "./Home.css";
import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router";
import { updateDoc, doc } from "@firebase/firestore";
import { db } from "../firebase/config";
import BodyParts from "./BodyParts";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box, Paper } from '@mui/material';


export default function HomePage({ UserWorkoutss, setMus, setDif, apiWork, bb, setbb }) {
  const { userValues, userIndex, conectedUser, isOnline, setIsOnline } =
    useContext(UserContext);
  const params = useParams();
  const LogOut = () => {
    navigate("/LoginPage");
    setIsOnline(false);
  };
  const navigate = useNavigate()


  return (
    <div>
      <Box >
        {isOnline && (
          <Button
            sx={{ m: 8 }}
            color="primary"
            size="large"
            variant="contained"
            onClick={() => LogOut()}
          >
            Log out
          </Button>
        )}
        {isOnline && (
          <Typography
            color="primary.dark"
            variant="h4"
            sx={{ textTransform: "capitalize" }}
          >
            Hello {userValues[conectedUser]?.firstName}
          </Typography>
        )}

      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Card sx={{ width: '80vw' }} >
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image="https://t4.ftcdn.net/jpg/03/17/72/47/240_F_317724775_qHtWjnT8YbRdFNIuq5PWsSYypRhOmalS.jpg"
              alt="gym"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                Feel Great.
                Body and Mind.
              </Typography>
              <Typography color="primary" variant="h6" >
                Choose from hundreds of workouts, healthy recipes,
                relaxing meditations, and expert articles, for a whole body and mind approach to feeling great.
                
I did a two - hour workout in the gym.
She does a 20-minute workout every morning.

<br/>
Give your upper body a workout by using handweights.
The team had a hard workout this morning.

              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Box sx={{ '& button': { m: 1 } }}>
              <div>
                {!isOnline && (<Button variant="contained" size="large" onClick={() => navigate("/FirstSignIn")}>
                  Join now
                </Button>)}
              </div>
            </Box>
          </CardActions>
        </Card>
      </Box>
      <Box>


        {isOnline && <BodyParts UserWorkoutss={UserWorkoutss} setDif={setDif} setMus={setMus} bb={bb} setbb={setbb}></BodyParts>}
      </Box>

    </div>
  );
}
