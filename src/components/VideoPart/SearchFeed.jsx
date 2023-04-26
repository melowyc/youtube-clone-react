import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../../utils/fetchFromAPI";
import { profileRoute } from "../../utils/APIRoutes";
import Videos from "./Videos";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();
  const [likes, setLikes] = useState([]);
  const [loginStatus, setLoginStatus] = useState("true");
  const username = localStorage.getItem("username");
  const userType = localStorage.getItem("userType");

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
      console.log("add" + videoId)
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
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
    if (username != null) {
      fetchLikedData(username);
    } else {
      //no login
    }
  }, [searchTerm]);
  useEffect(() => {
    if (!username) {
      setLoginStatus("false");
    }

  }, [localStorage.getItem("username")]);

  return (
    <Box p={2} minHeight="95vh">
      <Typography variant="h4" fontWeight={900} color="white" mb={3} ml={{ sm: "100px" }}>
        Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex">
        <Box sx={{ mr: { sm: '100px' } }} />
        {<Videos videos={videos}
          loginStatus={loginStatus}
          addLikedVideo={addLikedVideo}
          removeLikedVideo={removeLikedVideo}
          likes={likes} />}
      </Box>
    </Box>
  );
};

export default SearchFeed;
