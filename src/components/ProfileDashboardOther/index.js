/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./index.css";
import LikedVideo from "../LikedVideo";
import {FiEdit} from "react-icons/fi";
import {Button} from "@mui/material";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {planProgress} from '../../utils/APIRoutes';
import { useSelector, useDispatch } from 'react-redux';
import { initializeProgress } from '../../utils/progress-reducer';
// import { Box } from "@mui/material";
// import Videos from "../VideoPart/Videos";
// import { profileRoute } from "../../utils/APIRoutes";
// import { fetchFromAPI } from "../../utils/fetchFromAPI";

const ProfileDashboardOther = ({profileData, login}) => {
    const profile = profileData
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    const monthList = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',' November', 'December']
    const [upload, setUpload] = useState(false)
    const [file, setFile] = useState(profile.banner)

  

  const hiddenFileInput = React.useRef(null);
  const handleChange = (event) => {
    event.preventDefault();
    setFile(URL.createObjectURL(event.target.files[0]));
  };
  const handleCancel = () => {
    setFile("/images/profile-banner.jpeg");
    setUpload(false);
  };
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };


  return (
    <div className={"p-4"}>
      <div className={`row`}>
        <div className={`col d-flex justify-content-start`}>
          <h3 className={"pt-2 pb-2"}>Dashboard</h3>
        </div>
        <div className={`col d-flex justify-content-end`}>
          <h3 className={"pt-2 pb-2"}>
            {date} {monthList[month]} {year}
          </h3>
        </div>
      </div>

      <div className={`position-relative`}>
        <img src={file} className={`banner`} />
        
          <div className={`position-absolute banner-text`}>
            <h3 className={`text-white`}>
              Hello 
            </h3>
          <h1 className={`text-white`}>Welcome in {profile.username}'s Dashboard</h1>
          </div>
       

        {/* {login && !upload && (
          <FiEdit
            className={`position-absolute bottom-0`}
            onClick={() => setUpload(true)}
          />
        )} */}
      </div>

      {upload && (
        <div className={`mt-2`}>
          <div className={`d-flex justify-content-center`}>
            <Button
              variant="contained"
              onClick={handleClick}
              startIcon={<MdOutlineDriveFolderUpload />}
            >
              Upload a banner
            </Button>
            <input
              id="upload-banner"
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>

          <div className={`d-flex justify-content-center mt-2`}>
            <button
              className={"btn btn-warning mx-2"}
              onClick={() => setUpload(false)}
            >
              Confirm
            </button>
            <button
              className={"btn btn-danger mx-2"}
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={`row mt-4`}>
          <div className={'col'}>
              <LikedVideo/>
          </div>

      </div>
    </div>
  );
};

export default ProfileDashboardOther;
