
import React from "react";
import { useState } from "react";

import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { deleteVideoComment, updateVideoComment } from "../../utils/fetchFromAPI";

const VideoComment = ({ oneComment, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(oneComment.commentContent);

  // console.log("video comment got comments: ", comments);
  const username = localStorage.getItem("username");
  console.log("current user name: ", username);

  const deleteCommentClickHandler = () => {
    const cid = oneComment._id;
    console.log("click handle with cid: ", cid);
    onDelete(oneComment._id);
    const response = deleteVideoComment(cid);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedComment(oneComment.commentContent);
  };

  const handleInputChange = (event) => {
    setEditedComment(event.target.value);
  };

  const handleSubmitClick = () => {
    // Update the comment and toggle editing state
    setIsEditing(false);
    oneComment.commentContent = editedComment;
    const response = updateVideoComment(oneComment._id, editedComment);
    onUpdate(oneComment._id, editedComment);
  };

  return (
    <div>
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
          <div class="col-md-9">
            <div class="card">
              <div class="card-body">
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editedComment}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p class="card-text">{oneComment.commentContent}</p>
                )}
              </div>
            </div>
          </div>
          <div class="col-md-1 d-flex flex-column">
            {username === oneComment.userName && (
              <>
                {isEditing ? (
                  <>
                    <Button style={{innerHeight:"50%"}} onClick={handleSubmitClick}>Submit</Button>
                    <br></br>
                    <Button style={{outerHeight:"50%"}} onClick={handleCancelClick}>Cancel</Button>
                  </>
                ) : (
                  <>
                  <Button style={{innerHeight:"50%"}} onClick={handleEditClick}>Edit</Button>
                  <br></br>
                  <Button style={{outerHeight:"50%"}} onClick={deleteCommentClickHandler}>X</Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComment;
