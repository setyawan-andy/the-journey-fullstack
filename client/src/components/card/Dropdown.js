import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserContext } from '../../context/userContext';
import { Link, useHistory } from 'react-router-dom';
import { API } from '../../config/api';
import defaultProfile from "../../assets/profile.svg";

const Dropdown = () => {

    const [profile, setProfile] = useState({});
    const [state, dispatch] = useContext(UserContext);

    let history = useHistory();

    const getProfile = async () => {
        try {
          const response = await API.get("/profile");
          //store data
          setProfile(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };

    const logout = () => {
        console.log(state);
        dispatch({
            type: "LOGOUT",
        });
        history.push("/auth");
    };

    useEffect(() => {
        getProfile();
      }, []);

  return (
    <div className='w-30 text-right top-16'>
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm">
                <img src={profile?.image ? profile.image : defaultProfile } alt="profile" width="50" height="50" />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="trasition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="px-1 py-1">
                        <Menu.Item
                            as={Link}
                            to="/profile"
                        >   
                            {({ active }) => (
                                <button
                                    className={`${
                                        active ? 'bg-slate-100 text-blue' : 'text-gray-900'
                                    } group flex rounded-md items-center w-full px-2 py-2 font-semibold font-roboto`}
                                >
                                    <img src="../assets/user.svg" alt="user" className='w-5 h-5 mr-5'/>
                                    Profile
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item
                            as={Link}
                            to="/add-article"
                        >
                            {({ active }) => (
                                <button
                                    className={`${
                                        active ? 'bg-slate-100 text-blue' : 'text-gray-900'
                                    } group flex rounded-md items-center w-full px-2 py-2 font-semibold font-roboto`}
                                >
                                    <img src="../assets/write.svg" alt="write" className='w-5 h-5 mr-5'/>
                                    New Journey
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item
                            as={Link}
                            to="/bookmark"
                        >
                            {({ active }) => (
                                <button
                                    className={`${
                                        active ? 'bg-slate-100 text-blue' : 'text-gray-900'
                                    } group flex rounded-md items-center w-full px-2 py-2 font-semibold font-roboto`}
                                >
                                    <img src="../assets/bookmark2.svg" alt="bookmark" className='w-5 h-5 mr-5'/>
                                    Bookmark
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                    <div className='px-1 py-1'>
                        <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active ? 'bg-slate-100 text-blue' : 'text-gray-900'
                                        } group flex rounded-md items-center w-full px-2 py-2 font-semibold font-roboto`}
                                        onClick={logout}
                                    >
                                        <img src="../assets/logout.svg" alt="logout" className='w-5 h-5 ml-1 mr-4'/>
                                        Logout
                                    </button>
                                )}
                            </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    </div>
  )
}

export default Dropdown