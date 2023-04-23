import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const VideoComment = ({ comments }) => {
  console.log("video comment got comments: ", comments);
  return (
    <div>
      {comments.map((oneComment) => (
        <div>
          <Link to={`/`}>
            <Typography variant="body1" color="#000" fontWeight="bold" p={2}>
              {oneComment.userName}
            </Typography>
          </Link>
          <Typography variant={{ sm: "body1", md: "body1" }} p={6} color="#000">
            {oneComment.commentContent}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default VideoComment;
