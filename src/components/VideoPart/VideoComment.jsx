import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const VideoComment = ({ comments }) => {
  console.log("video comment got comments: ", comments);
  return (
    <div>
      {comments.map((oneComment) => (
        <div class="container mt-3">
          <div class="row">
            <div class="col-md-2 d-flex flex-column justify-content-center align-items-center">
              <a
                href={`/profile/${oneComment.userName}`}
                class="d-flex flex-column justify-content-center align-items-center"
              >
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  class="img-fluid rounded-circle"
                  style={{ width: "50%" }}
                  alt="profile pic"
                ></img>
              </a>
              <h6 class="text-center mt-2">
                <Link to={`/profile/${oneComment.userName}`}>
                  <Typography
                    variant="body1"
                    color="#000"
                    fontWeight="bold"
                    p={2}
                  >
                    {oneComment.userName}
                  </Typography>
                </Link>
              </h6>
            </div>
            <div class="col-md-10">
              <div
                class="card"
              >
                <div class="card-body" style={{zIndex: 1}}>
                  <p class="card-text">{oneComment.commentContent}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoComment;
