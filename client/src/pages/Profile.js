import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { API } from '../config/api';
import AppBarUser from '../components/AppBarUser';
import CreatedContent from '../components/card/CreatedContent';
import defaultProfile from "../assets/profile.svg";


const Profile = () => {

  const [profile, setProfile] = useState({});
  const [state] = useContext(UserContext);

  //fetching profile data
  const getProfile = async () => {
    try {
      const response = await API.get("/profile");
      //store data
      setProfile(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
        <AppBarUser />

        <div className='container mt-20'>
            <h1 className='font-roboto text-5xl font-semibold'>Profile</h1>
        </div>
        <div className='container mt-10 mb-16 flex flex-col gap-7 justify-center items-center'>
            <img src={profile?.image ? profile.image : defaultProfile } className="rounded-2xl" width="200" height="200" alt="profile" />
            <div className='font-roboto flex flex-col gap-2 justify-center items-center'>
                <h2 className='font-bold text-2xl'>{state.user.fullName}</h2>
                <h3 className='text-lg font-light'>{state.user.email}</h3>
            </div>
        </div>

        <CreatedContent />

    </div>
  )
}

export default Profile