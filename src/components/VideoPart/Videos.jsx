import React from "react";
import { Stack, Box } from "@mui/material";

import ChannelCard from "./ChannelCard";
import Loader from "./Loader";
import VideoCard from "./VideoCard";

const Videos = ({ videos, direction, loginStatus, addLikedVideo, removeLikedVideo, likes }) => {
    if (!videos?.length) return <Loader />;
    console.log(likes)
    console.log(videos)

    return (
        <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
            {videos.map((item, idx) => (
                <Box key={idx}>
                    {item.id.videoId && <VideoCard video={item} 
                        loginStatus={loginStatus}
                        addLikedVideo={addLikedVideo}
                        removeLikedVideo={removeLikedVideo}
                        liked={(likes.filter((val, id) => val.videoId === item.id.videoId)).length > 0} />
                    }
        

                    {item.id.channelId && <ChannelCard channelDetail={item} />}
                </Box>
            ))}
        </Stack>
    );
}

export default Videos;
