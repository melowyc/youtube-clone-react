import React, { useEffect, useState } from "react";
import PersonalInfoOther from './PersonalInfoOther/index'
import '../App.css'
import { profileRoute } from "../utils/APIRoutes";

const ProfileSidebarOther = ({profileData, login, country}) => {
  const [follows, setFollows] = useState(profileData.follows);
  const local_username = localStorage.getItem("username");
  const [follow, setFollow] = useState(false);

  const fetchFollowData = async (username) => {
    try {
      const response = await fetch(profileRoute + '/' + username, { mode: 'cors' });
      const data = await response.json();
      setFollows(data.follows);
      console.log("fetch follows"+username)
      console.log(follows)
      const follow = await (follows.filter((val, id) => val.username === profileData.username)).length > 0
      setFollow(follow)
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


  }, []);




  return (
    <PersonalInfoOther className={`page-bg`} profileData={profileData} 
    followHandler={followHandler}
    unfollowHandler={unfollowHandler}
      follow={follow}
    login={login} country_={country}/>
  )
}

export default ProfileSidebarOther