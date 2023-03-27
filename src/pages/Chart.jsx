import { ResponsiveBar } from "@nivo/bar";
import { useState } from "react";
import { data } from "./ChartData";
import { UserContext } from "../App";
import React, { useContext } from "react";
import { useEffect } from "react";
import ContextData from "../components/ContextData";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { BoxLegendSvg } from '@nivo/legends'

export default function Chart() {
  const { userProgress, userValues, conectedUser, ApiWorkouts } =
    useContext(UserContext);
  const [dataUser, setDataUser] = useState([]);
  const [DataProgressUser, setDataProgressUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stepBar, setStepBar] = useState(true);
  const date = new Date();
  const fullDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  let dt;

  useEffect(() => {
    setIsLoading(true);

    console.log(userProgress, userValues, conectedUser, "this");
    const tempUser = userProgress.find(
      (item) => userValues[conectedUser].userName == item.userName
    );
    setDataProgressUser(tempUser?.progress);
    dt = tempUser?.progress;
    console.log("this is", dt);
    StepBar(dt);
    GetMuch(dt, "2023");
    setIsLoading(false);
    console.log(conectedUser, "1", userProgress, "2", userValues, "3");

    // asd
  }, [conectedUser, userProgress, userValues]);
  console.log(DataProgressUser);
  // dsf
  function StepBar(dt) {
    const tempArr = dt.find((item) => (item.date = fullDate));
    if (!tempArr?.workouts.length) {
      setStepBar(0);
    } else {
      console.log(tempArr, "this");
      setStepBar(tempArr?.workouts.length);
    }
    if (tempArr?.workouts.length > 7) {
      setStepBar(7);
    }
  }

  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let muscles = [
    "abdominals",
    "abductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];
  let list = [];
  const [monthGraph, setMonthGraph] = useState([]);
  //   const [ter,setTer]=useState()
  function GetMuch(arr, year) {
    const MMM = dataUser;
    months.forEach((month) => {
      let graph = {};
      muscles.forEach((muc) => {
        console.log(arr);
        const filteredByDate = filterByDate(arr, year, month);
        const numOfTimes = filterByType(filteredByDate, muc);
        graph.date = `${year}-${month}`;
        graph[muc] = numOfTimes;
        console.log(list);
      });
      list.push(graph);
      MMM.push(graph);
      setDataUser(MMM);
    });
  }
  // console.log(dataUser);

  function filterByDate(arr, year, month) {
    const tempArr = arr?.filter((item) => {
      const date = item.date.split("-");
      return date[1] == month && date[0] == year;
    });
    console.log(arr);
    return tempArr;
  }
  function filterByType(arr, muscleType) {
    const MuscleType = arr?.map((item) =>
      item.workouts.filter((item) => item.muscle == muscleType)
    );
    let sum = 0;
    for (let i = 0; i < MuscleType?.length; i++) {
      sum = sum + MuscleType[i]?.length;
    }
    console.log(sum);
    return sum;
  }
  let height = (dataUser.length * 5) / 2;
  let symbolSize = 20;
  // console.log(data);
  // console.log(list);
  // console.log(dataUser + "asd")

  // function ExdercisesByMuscle (){
  //     for (keys === DataProgressUser.workouts) {
  //         return DataProgressUser.workouts.muscle("").length
  //     }
  // }
  const steps = [
    "great start",
    "5 more ",
    "you got it",
    "3 left",
    "almost 1",
    "the last one",
    "no pain no gain",
  ];

 

  return (
    <div style={{ height: `${height}vw`, width: "100vw", maxHeight: "90vh" }}>
      {/* <p>{getMonthToChart}</p> */}

      {!userProgress[conectedUser].progress ? (
        <h1>You have not done any progress yet</h1>
      ) : (
        <>
          {isLoading ? (
            <Typography sm={{ p: 16 }}>Loading</Typography>
          ) : (
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  padding: "5vw",
                }}
              >
                <Stepper
                  activeStep={stepBar}
                  alternativeLabel
                  sx={{ width: "80%" }}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel color="white">{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              {/* {console.log(monthGraph)} */}
              <Typography
                variant="h3"
                color="primary.dark"
                marginBottom={"2vw"}
              >
                Monthly workouts by muscle:
              </Typography>
              <ResponsiveBar
                // asd
                data={dataUser}
                keys={[
                  "abdominals",
                  "abductors",
                  "biceps",
                  "calves",
                  "chest",
                  "forearms",
                  "glutes",
                  "hamstrings",
                  "lats",
                  "lower_back",
                  "middle_back",
                  "neck",
                  "quadriceps",
                  "traps",
                  "triceps",
                ]}
              
                  

                indexBy="date"
                margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
                padding={0.3}
                groupMode="stacked"
                layout="horizontal"
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={{ scheme: "paired" }}
                borderColor={{
                  from: "color",
                  modifiers: [["darker", 1.6]],
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Date of exercise",
                  legendPosition: "middle",
                  legendOffset: 32,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "",
                  legendPosition: "middle",
                  legendOffset: -30,
                }}
                labelSkipWidth={"12rem"}
                labelSkipHeight={"12rem"}
                labelTextColor={{
                  from: "color",
                  modifiers: [["darker", 1.6]],
                }}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={function (e) {
                  return (
                    e.id +
                    ": " +
                    e.formattedValue +
                    " in country: " +
                    e.indexValue
                  );
                }}
                legends={[
                  {
                    dataFrom: "keys",
                    anchor: "top",
                    direction: "row",
                    // wrap: "wrap",
                    justify: true,
                    translateX: -26,
                    translateY: -38,
                    itemsSpacing: 0,
                    itemWidth: 63,
                    itemHeight: 35,
                    itemDirection: "top-to-bottom",
                    itemOpacity: 0.85,
                    symbolSize: `${symbolSize}`,
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemOpacity: 1,
                        },
                      },
                      
                    ],
                  },
                ]}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
