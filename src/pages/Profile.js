import React, {useEffect, useState} from 'react'
import ProfileSidebar from '../components/ProfileSidebar'
import ProfileDashboard from '../components/ProfileDashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {profileRoute, getUser} from "../utils/APIRoutes";
import { useDispatch } from 'react-redux';
import { updateProfile } from '../utils/profile-reducer';


const Profile = () => {
    const local_username = localStorage.getItem('username');
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null)
    const [country, setCountry] = useState(null)
    const [login, setLogin] = useState(false)

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
            dispatch(updateProfile(data))
        } catch (e) {
            console.log(e);
        }
    };

    const fetchUserCountry = async (username) => {
        try {
            const response = await fetch(getUser + '/' + username, { mode: 'cors' });
            const data = await response.json();
            console.log("local response" + response);
            console.log(response);
            console.log("local data" + data);
            console.log(data);
            console.log("country data"+data.userType);
            localStorage.setItem("userType", data.userType);
            setCountry(data.country);
            console.log("localdata.country"+data.country)
            dispatch(updateProfile({country: data.country}))
        } catch (e) {
            console.log(e);
        }
    }
  useEffect(() => {
    if (!local_username) {
      setProfile({});
      setLogin(false);
    } else {
      console.log("local username:", local_username);
      setLogin(true);
      fetchUserProfile(local_username);
      fetchUserCountry(local_username);
    }
    console.log("localProfile" + profile)
  }, [local_username]);

  return (
    <div className={`container border border-light border-2 page-bg`}>
        <div className={`row`}>
            <div className={`col-5 col-xl-5 col-xxl-5 p-0`}>
                  {country && profile && <ProfileSidebar login={login} country={country} />}
            </div>
            <div className={`col d-none d-xl-block p-0`}>

                  {country && profile && <ProfileDashboard login={login} />}
            </div>
        </div>
    </div>
  );
};

export default Profile;
