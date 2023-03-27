import "./App.css";
import Chart from "./pages/Chart";
import ContextData from "./components/ContextData";
import FirstSignIn from "./pages/FirstSignIn";
import Footer from "./pages/footer";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import WorkoutExercises from "./pages/WorkoutExercises";
import WorkoutDetails from "./pages/WorkoutDetails";
import Nowhere from "./pages/404";
import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { createContext } from "react";
import { Toolbar, Button, Box } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import axios from "axios";
import { useNavigate, } from "react-router-dom";
export const UserContext = createContext();

function App() {
  const navigate = useNavigate()
  const {
    userValues,
    setUserValues,
    conectedUser,
    setConectedUser,
    userCollectionRef,
    progressCollectionRef,
    ThisUserRef,
    isOnline,
    setIsOnline,
    ApiWorkouts,
    UserWorkouts,
    userProgress,
    setUserProgress,
    offline,
    setTakeParms, muscleForApi
  } = ContextData();
  const contextValue = {
    userValues,
    setUserValues,
    conectedUser,
    setConectedUser,
    userCollectionRef,
    progressCollectionRef,
    ThisUserRef,
    isOnline,
    setIsOnline,
    ApiWorkouts,
    UserWorkouts,
    userProgress,
    setUserProgress,
    offline,
    setTakeParms, muscleForApi
  };
  const [apiWork, setApiWork] = useState([])
  const [mus, setMus] = useState(muscleForApi)
  const [dif, setDif] = useState(userValues[conectedUser]?.difficulty.trim())



  useEffect(() => {
    PPP()
  }, [userValues])

  function PPP() {
    setMus(userValues[conectedUser]?.muscleGroup.trim())
    setDif(userValues[conectedUser]?.difficulty.trim())
  }

  const UserWorkoutss = async () => {

    if (mus || dif) {

      const options = {
        method: 'GET',
        url: `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises`,
        params: { muscle: mus, difficulty: dif },
        headers: {
          'X-RapidAPI-Key': '2e85761d3emsh297c57225455631p16cedcjsnf9b8f634604f',
          'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
        }
      };

      axios.request(options).then(function (response) {
        setApiWork(response.data)
      }).catch(function (error) {
        console.error(error);
      });
      // if (takeParams !== userValues[conectedUser]?.userName) {
      //   navigate("*")
      // }
      // console.log(takeParams);
    }
  }
  const [bb, setbb] = useState(false)
  useEffect(() => {
    UserWorkoutss()
    navigate(`/WorkoutExercises/adiva`)
  }, [bb])

  return (
    <UserContext.Provider value={contextValue}>
      <div className="App" style={{ minHeight: "100vh" }}>
        <Box>
          <Toolbar
            color="inherit"
            position="sticky"
            sx={{
              backgroundColor: "black",
              top: 0,
              width: "100vw",
            }}
          >
            <FitnessCenterIcon color="primary" />
          

            {!isOnline && (
              <Button
                LinkComponent={NavLink}
                sx={{ m: 2 }}
                size="small"
                fullWidth="true"
                color="primary"
                to="/LoginPage"
              >
                Login
              </Button>
            )}

            <Button
              LinkComponent={NavLink}
              to="/"
              sx={{ m: 2 }}
              size="small"
              fullWidth="true"
              color="primary"
            >
              Home
            </Button>

            {!isOnline && (
              <Button
                LinkComponent={NavLink}
                sx={{ m: 2 }}
                size="small"
                fullWidth="true"
                color="primary"
                to="/FirstSignIn"
              >
                Sign up
              </Button>
            )}
            {isOnline && (
              <Button
                LinkComponent={NavLink}
                sx={{ m: 2 }}
                size="small"
                fullWidth="true"
                color="primary"
                to={`/WorkoutExercises/${userValues[conectedUser]?.firstName}`}
              >
                Workout Exercises
              </Button>
            )}

             {1===0 && (
              <Button
                className="navlink"
                LinkComponent={NavLink}
                sx={{ m: 2 }}
                size="small"
                fullWidth="true"
                color="primary"
                to="/WorkoutDetails"
              >
                Workout Details
              </Button>
            )}
            {isOnline && (
              <Button
                LinkComponent={NavLink}
                sx={{ m: 2 }}
                size="small"
                fullWidth="true"
                color="primary"
                to="/Chart"
              >
                Progress Chart
              </Button>
            )}
            {isOnline && (
              <Button
                LinkComponent={NavLink}
                sx={{ m: 2 }}
                size="small"
                fullWidth="true"
                color="primary"
                to="/EditPage"
              >
                Edit Page
              </Button>
            )}
          </Toolbar>

          <div>
            <Routes>
              <Route path="/" element={<HomePage UserWorkoutss={UserWorkoutss} setDif={setDif} setMus={setMus} bb={bb} setbb={setbb} />} />
              <Route path="/LoginPage" element={<LoginPage />} />
              {isOnline &&<Route
                path="/WorkoutExercises/:userName"
                element={<WorkoutExercises UserWorkoutss={UserWorkoutss} setDif={setDif} setMus={setMus} apiWork={apiWork} />}
              />}
             <Route
                path="/WorkoutDetails/:WorkoutName"
                element={<WorkoutDetails />}
              />
              <Route path="/FirstSignIn" element={<FirstSignIn />} />
             {userProgress[conectedUser] && <Route path="/Chart" element={<Chart />} />}
              <Route path="/EditPage" element={<EditPage />} />
              <Route path="*" element={<Nowhere />} />
            </Routes>
          </div>
                <div className="blank"></div>
           <Footer className="footer" /> 
        </Box>
      </div>
    </UserContext.Provider>
  );
}

export default App;
// https://itnext.io/react-push-notifications-with-hooks-d293d36f4836
