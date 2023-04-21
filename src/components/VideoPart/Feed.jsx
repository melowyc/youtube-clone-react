import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../../utils/fetchFromAPI";
import Videos from "./Videos";
import Sidebar from "./Sidebar";
import SidebarKid from "./SidebarKid";
import { profileRoute } from "../../utils/APIRoutes";

const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [videos, setVideos] = useState(null);
    const [selectedCategoryKid, setSelectedCategoryKid] = useState("Education");
    const [kidVideos, setKidVideos] = useState(null);
    const [likes, setLikes] = useState([]);
    const [loginStatus, setLoginStatus] = useState("true");
    const username = localStorage.getItem("username");
    const userType = localStorage.getItem("userType");

    const [kid, setKid] = useState(false);


    const fetchLikedData = async (username) => {
        try {
            const response = await fetch(profileRoute + '/' + username, { mode: 'cors' });
            const data = await response.json();
            setLikes(data.likes);
        } catch (e) {
            console.log(e);
        }
    };


    const addLikedVideo = async (videoId, videoTitle, channelTitle) => {
        try {
            const newLikes = [...likes,
            {
                videoId: videoId,
                videoTitle: videoTitle,
                channelTitle: channelTitle
            }];
            console.log("add"+videoId)
            setLikes(newLikes);
            const params = {
                method: 'POST',
                body: JSON.stringify(
                    {
                        username: username,
                        likes: newLikes
                    }),
                headers: { 'Content-Type': 'application/json' },
            }

            await fetch(profileRoute + '/' + username, params);
        } catch (e) {
            console.log(e);
        }
    };

    const removeLikedVideo = async (videoId) => {
        try {
            const newLikes = likes.filter((val, id) => val.videoId !== videoId);
            setLikes(newLikes);
            const params = {
                method: 'POST',
                body: JSON.stringify({ username: username, likes: newLikes }),
                headers: { 'Content-Type': 'application/json' },
            }

            await fetch(profileRoute + '/' + username, params);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setVideos(null);

        fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
            .then((data) => setVideos(data.items))
        fetchFromAPI(`search?part=snippet&q=${selectedCategoryKid}`)
            .then((data) => setKidVideos(data.items))
        if (username != null){
            fetchLikedData(username);
        } else {
            //no login
        }
        if (userType === "KID"){
            setKid(true)
        }

    }, [selectedCategory]);
  

    useEffect(() => {
        if (!username) {
            setLoginStatus("false");
        }

    }, [localStorage.getItem("username")]);
    console.log(username + userType + localStorage)
    console.log(kid)


    return (
        <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
            <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
                { kid ?
                    <SidebarKid selectedCategory={selectedCategoryKid} setSelectedCategory={setSelectedCategoryKid} />
                :
                    <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                }

                <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#000", }}>
                    Copyright © 5610 23sp GROUP 23
                </Typography>
            </Box>

            <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
                {kid ?
                    <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "black" }}>
                        {selectedCategoryKid} <span style={{ color: "#FC1503" }}>videos</span>
                    </Typography>
                    :
                    <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "black" }}>
                    {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
                    </Typography>
                }
                {kid ?
                    <Videos videos={kidVideos}
                        loginStatus={loginStatus}
                        addLikedVideo={addLikedVideo}
                        removeLikedVideo={removeLikedVideo}
                        likes={likes} />
                    :
                    <Videos videos={videos}
                        loginStatus={loginStatus}
                        addLikedVideo={addLikedVideo}
                        removeLikedVideo={removeLikedVideo}
                        likes={likes} />
                }


            </Box>
        </Stack>
    );
};

export default Feed;
