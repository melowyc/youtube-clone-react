import React, { useEffect, useState } from "react";
import PersonalInfoOther from './PersonalInfoOther/index'
import '../App.css'
import { profileRoute } from "../utils/APIRoutes";
import { useSelector } from 'react-redux';

const ProfileSidebarOther = ({profileData}) => {
  const profile = useSelector((state) => state.profile);
  const [follows, setFollows] = useState([]);
  console.log("localuserProfileInfo");
  console.log(profile)
  const local_username = localStorage.getItem("username");
  const [iffollowed, setIffollowed] = useState(false);

  const fetchFollowData = async (username) => {
    try {
      const response = await fetch(profileRoute + '/' + username, { mode: 'cors' });
      const data = await response.json();
      setFollows(data.follows);

      console.log("fetch follows"+username)
      console.log(data.follows)
      
      console.log(profileData.username)
      // const followw =  (data.follows.filter((val, id) => val.username === profileData.username)).length > 0
      // setIffollowed(followw)
      // console.log(followw)
      // console.log(iffollowed)
    } catch (e) {
      console.log(e);
    }
  };



  const followHandler = async (username, country) => {
    try {
      const newFollows = [...follows,
      {
        username: username,
        country: country,
      }];
      setFollows(newFollows);
      console.log("new follows:")
      console.log(newFollows)
      const params = {
        method: 'POST',
        body: JSON.stringify(
          {
            username: local_username,
            follows: newFollows
          }),
        headers: { 'Content-Type': 'application/json' },
      }
      console.log("follow handle")

      await fetch(profileRoute + '/' + local_username, params);
      console.log(local_username)
    } catch (e) {
      console.log(e);
    }
  };

  const unfollowHandler = async (username) => {
    try {
      const newFollows = follows.filter((val, id) => val.username !== username);
      setFollows(newFollows);
      const params = {
        method: 'POST',
        body: JSON.stringify({ username: local_username, follows: newFollows }),
        headers: { 'Content-Type': 'application/json' },
      }

      await fetch(profileRoute + '/' + local_username, params);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {

    if (local_username != null) {
      fetchFollowData(local_username);
    } else {
      //no login
    }

    console.log(follows)
  }, [follows]);




  return (
    <PersonalInfoOther className={`page-bg`} profileData={profileData} 
    followHandler={followHandler}
    unfollowHandler={unfollowHandler}
      iffollowed={(follows.filter((val, id) => val.username === profileData.username)).length > 0}
    />
  )
}

export default ProfileSidebarOther