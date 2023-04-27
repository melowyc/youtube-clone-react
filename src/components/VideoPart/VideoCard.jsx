import React from 'react'
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../../utils/constants";
import { useState } from "react";

const VideoCard = ({ video: { id: { videoId }, snippet }, loginStatus, addLikedVideo, removeLikedVideo, liked }) => {
    const [like, setLike] = useState(liked);
    // console.log(videoId+like)
    const username = localStorage.getItem("username")
    // console.log(videoId+like);
    // console.log(loginStatus);
    // console.log(snippet);

    const handleLike = async () => {
        // if liked:
        // 1. frontend show a hint to unlike
        // 2. call removeLikedExercise (done)
        if (like) {
            removeLikedVideo(videoId)
        } else {
            // if unliked:
            // call addLikedExercise (done)
            addLikedVideo(videoId, snippet.title, snippet.channelTitle)
        }
        setLike(!like);
    };


    return(
    <Card sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 0 }}>
        <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
            <CardMedia image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title}
                sx={{ width: { xs: '100%', sm: '358px' }, height: 180 }}
            />
        </Link>
        <CardContent sx={{ backgroundColor: "#1E1E1E", height: '150px' }}>
            <Link to={videoId ? `/video/${videoId}` : demoVideoUrl} >
                <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
                    {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
                </Typography>
            </Link>
            <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} >
                <Typography variant="subtitle2" color="gray">
                    {snippet?.channelTitle || demoChannelTitle}
                    <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
            </Link>
                {username ?
                    <>
                        <Button
                            sx={{ ml: '21px', color: 'red', fontSize: "30px", textTransform: 'capitalize' }}
                            onClick={handleLike}
                        >
                            {like && <AiFillHeart />}
                            {!like && <AiOutlineHeart />}
                        </Button>
                    </>
                    :
                    <></>
                }
        </CardContent>

    </Card>)
};

export default VideoCard;