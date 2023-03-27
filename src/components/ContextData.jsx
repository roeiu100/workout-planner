import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useEffect } from "react";
import axios from "axios";
import { db } from "../firebase/config";
import { collection, getDocs, doc, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
export default function ContextData() {

    const navigate = useNavigate()
    const [takeParams, setTakeParms] = useState()
    //NameOfUsersArray:
    const userCollectionRef = collection(db, "User");
    //NameOfProgressArray:
    const progressCollectionRef = collection(db, "Progress");

    const [conectedUser, setConectedUser] = useState(JSON.parse(localStorage.getItem('myUser')));
    localStorage.setItem("myUser", JSON.stringify(conectedUser));

    const [isOnline, setIsOnline] = useState(JSON.parse(localStorage.getItem('online')));
    localStorage.setItem("online", JSON.stringify(isOnline));

    const [userValues, setUserValues] = useState([]);
    const [userProgress, setUserProgress] = useState([]);


    useEffect(() => {
        //Setting FireBase  data User
        const getUsers = async () => {
            const data = await getDocs(userCollectionRef);
            setUserValues(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));


        };
        getUsers();

        //Setting FireBase data Progress
        const getUsersProgress = async () => {
            const data = await getDocs(progressCollectionRef);
            setUserProgress(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsersProgress();

    }, [userCollectionRef]);




    //Api Workouts
    // const [ApiWorkouts, setApiWorkouts] = useState([]);
    // const muscleForApi = userValues[conectedUser]?.muscleGroup.trim()
    // const difficultyForApi = userValues[conectedUser]?.difficulty.trim()

    // const UserWorkouts = async () => {
    //     const options = {
    //         method: 'GET',
    //         url: `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises`,
    //         params: { muscle: muscleForApi, difficulty: difficultyForApi },
    //         headers: {
    //             'X-RapidAPI-Key': '2e85761d3emsh297c57225455631p16cedcjsnf9b8f634604f',
    //             'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
    //         }
    //     };

    //     axios.request(options).then(function (response) {
    //         console.log(response.data);
    //         setApiWorkouts(response.data)
    //     }).catch(function (error) {
    //         console.error(error);
    //     });
    //     if (takeParams !== userValues[conectedUser]?.userName) {
    //         navigate("*")
    //     }
    //     console.log(takeParams);
    // }



    function offline() {

    }
    let ImagesForApi = [
        {
            name: "abdominals",
            image:
                "https://www.ericfavre.com/lifestyle/uk/wp-content/uploads/sites/15/2021/09/approche-biomecanique-1024x1024-1.jpg",
        },
        {
            name: "abductors",
            image:
                "https://cdn.muscleandstrength.com/sites/all/themes/mnsnew/images/taxonomy/exercises/muscle-groups/full/Abductors.jpg",
        },
        {
            name: "adductors",
            image:
                "http://cloud2.golfloopy.com/wp-content/uploads/2014/09/Adductor-magnus-300x300@2x.jpg",
        },
        {
            name: "biceps",
            image:
                "https://www.shoulder-pain-explained.com/images/biceps-stretch-exercises.jpg",
        },
        {
            name: "calves",
            image:
                "https://www.sportsinjuryclinic.net/wp-content/uploads/2019/02/calf-strain800white-800x426.jpg",
        },
        {
            name: "chest",
            image:
                "https://i0.wp.com/www.fitzabout.com/wp-content/uploads/2022/04/Pectorals-Chest-Fitzabout.jpg",
        },
        {
            name: "forearms",
            image:
                "https://learnmuscles.com/wp-content/uploads/2020/12/AnteriorForearmSuperficial_Watermarked.jpg",
        },
        {
            name: "glutes",
            image:
                "https://cdn.mos.cms.futurecdn.net/umUz4ZtLxLFT4iyQ5JXXxZ-1200-80.jpg.webp",
        },
        {
            name: "hamstrings",
            image:
                "https://bodycomplete.co.uk/wp-content/uploads/2019/06/58756532_s-450x315.jpg",
        },
        {
            name: "lowerback",
            image:
                "https://images.ctfassets.net/oc83wx5cwffk/spu_article_fid38474_asset/0867c96e1bdd1c874bf1ed22694be6ee/4199-lower-back-pain-section50824719_ml.jpg",
        },
        {
            name: "middleback",
            image:
                "https://www.physio-pedia.com/images/thumb/b/b7/Latissimus-dorsi.jpg/200px-Latissimus-dorsi.jpg",
        },
        {
            name: "neck",
            image:
                "https://www.kenhub.com/thumbor/lD76cK0IXRie16Er5an8NftOt-0=/fit-in/800x1600/filters:watermark(/images/logo_url.png,-10,-10,0):background_color(FFFFFF):format(jpeg)/images/library/14150/Neck_muscles.png",
        },
        { name: "quadriceps", image: "src" },
        { name: "traps", image: "src" },
        { name: "triceps", image: "src" },
    ];
    // console.log(userProgress);



    return {
        userValues,
        setUserValues,
        ImagesForApi,
        conectedUser,
        setConectedUser,
        userCollectionRef,
        progressCollectionRef,
        isOnline, setIsOnline,
        userProgress,
        setUserProgress,
        offline,
        setTakeParms,
    };
}


