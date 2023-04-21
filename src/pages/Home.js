import React, {useState} from 'react';
import {Box} from "@mui/material";

import Exercises from '../components/Exercises';
import SearchExercises from '../components/SearchExercises';
import IndexHeader from 'components/IndexHeader';
import Feed from "components/VideoPart/Feed"



const Home = () => {
    const [exercises, setExercises] = useState([]);
    const [bodyPart, setBodyPart] = useState('all');

    return (
        <Box>

            {/* <IndexHeader /> */}
            {/* <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} /> */}
            {/* <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} /> */}
            <Feed/>

        </Box>
    
    );
};

export default Home