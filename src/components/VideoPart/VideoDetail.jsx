import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Videos from "./Videos";
import Loader from "./Loader";
import { fetchFromAPI } from "../../utils/fetchFromAPI";
import { profileRoute } from "../../utils/APIRoutes";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  const [likes, setLikes] = useState([]);
  const [loginStatus, setLoginStatus] = useState("true");
  const username = localStorage.getItem("username");

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
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#000" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#000" }} py={1} px={2} >
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }} color="#000" >
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          <Videos videos={videos} direction="column"
            loginStatus={loginStatus}
            addLikedVideo={addLikedVideo}
            removeLikedVideo={removeLikedVideo}
            likes={likes} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
