/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonalDataOther from './PersonalDataOther';
import PersonalInfoItemOther from './PersonalInfoItemOther';
import './index.css'
import {FiEdit} from "react-icons/fi";
import {Button} from "@mui/material";
import {MdOutlineDriveFolderUpload} from "react-icons/md";
import {profileRoute, getUser} from "../../utils/APIRoutes";
import {useDispatch, useSelector} from "react-redux";
import { updateProfile } from '../../utils/profile-reducer';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import storage from '../../utils/firebaseConfig';

const defaultFile = "/images/avatar/profile.png";
const PersonalInfoOther = ({profileData, followHandler, unfollowHandler, follow, login, country_}) => {
    const dispatch = useDispatch()
    const profile = profileData
    const [profile_, setProfile_] = useState(profile)
    const [edit, setEdit] = useState(false)
    const [country, setCountry] = useState(country_)
    const [url, setUrl] = useState(profile.avatar)
    const [avatarFile, setAvatarFile] = useState();
    const [followed, setFollowed] = useState(follow);

  const handleFollow = async () => {

    if (followed) {
      unfollowHandler(profile.username)
    } else {
      followHandler(profile.username, profile.country)
      console.log("follow" + profile.username + profile.country)
    }
    setFollowed(!followed);
  };

  useEffect(() => {
    // if ((follows.filter((val, id) => val.username === profile.username)).length > 0) {
    //   setFollowed(true)
    // }
    console.log("if followed"+follow)
  }, []);




  return (
    <div className={`sidebar`}>

      <div>
        <div className={`pt-5 d-flex justify-content-center`}>
          <img
            className={`rounded-circle`}
            src={url}
            width={"100px"}
            height={`100px`}
          />
        </div>
        <div className={`pt-2 d-flex justify-content-center`}>


          {/* {followed && <Button variant="contained" onClick={handleFollow}>UNFOLLOW</Button>}
          {!followed && <Button variant="contained" onClick={handleFollow}>FOLLOW</Button>}
 */}
          <Button
            sx={{ ml: '21px', fontSize: "30px", textTransform: 'capitalize' }}
            onClick={handleFollow}
            variant="contained"
          >
            {followed && "UNFOLLOW"}
            {!followed && "FOLLOW"}
          </Button>

        </div>

        

          <div className={`d-flex justify-content-center mt-2`}>
            {profile && <h2>{profile.username}</h2>}
          </div>


          <div className={`d-flex justify-content-center`}>
            {profile && <h3>{country}</h3>}
           
          
          </div>

          <div className={`p-4 sidebar-card mb-2`}>
            {PersonalDataOther.map((data) => {
              return (
                <PersonalInfoItemOther
                profileData={profileData}
                  key={data._id}
                  info={data}
                  edit={edit}
                  setProfile={setProfile_}
                />
              );
            })}
          </div>


      </div>

    </div>
  );
};

export default PersonalInfoOther;
