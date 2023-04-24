import React, {useEffect, useState} from 'react'
import ProfileSidebarOther from '../components/ProfileSidebarOther'
import ProfileDashboardOther from '../components/ProfileDashboardOther'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {profileRoute, getUser} from "../utils/APIRoutes";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const ProfileOther = () => {
    const local_username = localStorage.getItem('username');
    const { currentUsername } = useParams();
    const dispatch = useDispatch();
    const [profile, setProfile] = useState({})
    const [country, setCountry] = useState(null)
    const [login, setLogin] = useState(false)
    const navigate = useNavigate();

    const fetchUserProfile = async (username) => {
        try {
            const response = await fetch(profileRoute + '/' + username, { mode: 'cors' });
            const data = await response.json();
            setProfile(data);
          console.log(response.url)
          console.log("local response" + response);
          console.log(response);
          console.log("local data" + data);
          console.log(data);
          console.log("local profile" + profile);
          console.log(profile);

          
        } catch (e) {
            console.log(e);
        }
    };

    const fetchUserCountry = async (username) => {
        try {
            const response = await fetch(getUser + '/' + username, { mode: 'cors' });
            const data = await response.json();
            setCountry(data.country);
            console.log(data.country)
        } catch (e) {
            console.log(e);
        }
    }
  useEffect(() => {
    fetchUserProfile(currentUsername);
    console.log('currentUserProfile'+profile)
    console.log(profile)
    fetchUserCountry(currentUsername);
    // if (!profile.username) {
    //   console.log("No that other user, redirect to home page!")
    //   navigate("/");
    // }
    if (local_username === currentUsername){
        
        navigate("/profile");
    }
  }, [local_username]);

  return (
    <div className={`container border border-light border-2 page-bg`}>
        <div className={`row`}>
            <div className={`col-5 col-xl-5 col-xxl-5 p-0`}>
                  {country && profile && <ProfileSidebarOther profileData = {profile}/>}
            </div>
            <div className={`col d-none d-xl-block p-0`}>

          {country && profile && <ProfileDashboardOther profileData={profile} login={login} />}
            </div>
        </div>
    </div>
  );
};

export default ProfileOther;
