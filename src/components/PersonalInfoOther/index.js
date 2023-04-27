/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import PersonalDataOther from './PersonalDataOther';
import PersonalInfoItemOther from './PersonalInfoItemOther';
import './index.css'
import {Button} from "@mui/material";

const PersonalInfoOther = ({profileData, followHandler, unfollowHandler, iffollowed}) => {
    const profile = profileData
    const [followed, setFollowed] = useState(iffollowed);
    console.log("iffollowed"+iffollowed);
  console.log("followed" + followed);


  const handleFollow = async () => {

    if (followed) {
      unfollowHandler(profile.username)
    } else {
      followHandler(profile.username, profile.country)
      // console.log("follow" + profile.username + profile.country)
    }
    setFollowed(!followed);
  };

  useEffect(() => {
    setFollowed(iffollowed)
    console.log(followed);
  }, [iffollowed]);



  return (
    <div className={`sidebar`}>

      <div>
        <div className={`pt-5 d-flex justify-content-center`}>
          <img
            className={`rounded-circle`}
            src={profile.avatar}
            width={"100px"}
            height={`100px`}
          />
        </div>
        <div className={`pt-2 d-flex justify-content-center`}>


        
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
            {profile && <h3>{profile.country}</h3>}
           
          
          </div>

          <div className={`p-4 sidebar-card mb-2`}>
            {PersonalDataOther.map((data) => {
              return (
                <PersonalInfoItemOther
                profileData={profileData}
                  key={data._id}
                  info={data}
                />
              );
            })}
          </div>


      </div>

    </div>
  );
};

export default PersonalInfoOther;
