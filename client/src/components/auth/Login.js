import React, { useContext, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from "react";
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { API } from '../../config/api';

const Login = ({closeModal, isOpen}) => {

    let history = useHistory();

    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            //config content-type
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            //data body
            const body = JSON.stringify(form);

            //insert data into database
            const response = await API.post("/login", body, config);

            //checking process
            if(response?.status === 200){
                //send data to useContext
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.data,
                });
                
                const alert = (
                    <div className='mb-3 px-5 py-4 bg-green-100 rounded-md'>
                        <h2 className='text-xl text-green-500'>Login Success!</h2>
                    </div>
                );

                setMessage(alert);

                history.push("/");     
            };
            
        } catch (error) {
            const alert = (
                    <div className='mb-3 px-5 py-4 bg-red-100 rounded-md'>
                        <h2 className='text-xl text-red-500'>Invalid email or password !</h2>
                    </div>
            );
            setMessage(alert);
            console.log(error);
        }
    };

  return (
    <>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-x-auto"
                onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center bg-black bg-opacity-70 ease-linear">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl relative">
                            <Dialog.Title
                                as="h3"
                                className="text-2xl font-bold leading-6 text-gray-900 text-center font-roboto mt-5"
                            >
                                <img src="../assets/location.svg" alt="location" className="absolute left-0 top-0"/>
                                <img src="../assets/leaf.svg" alt="leaf" className="absolute right-0 top-0"/>
                            Login
                            </Dialog.Title>
                            <div className="mt-20 mb-5 w-full px-5">
                            {message && message}
                                <form action="" className='flex flex-col gap-7' onSubmit={handleSubmit}>
                                    <div className='flex flex-col gap-3'>
                                        <label htmlFor="email" className="font-roboto text-lg font-semibold">Email</label>
                                        <input type="text" name="email" id="email" value={email} onChange={handleChange} autoComplete='off' className='bg-gray-200 p-3 rounded-md border border-gray-300 focus:outline-none'/>
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <label htmlFor="password" className="font-roboto text-lg font-semibold">Password</label>
                                        <input type="password" name="password" id="password" value={password} onChange={handleChange} autoComplete='off' className='bg-gray-200 p-3 rounded-md border border-gray-300 focus:outline-none'/>
                                    </div>
                                    <button type="submit" className='py-2 rounded-md btn-blue'>Login</button>
                                    <p className='text-center font-roboto text-gray-400'>Don't have an account ? Klik <span className='font-bold cursor-pointer'>Here</span></p>
                                </form>
                            </div>
                        </div>
                    </Transition.Child>
                </div>

            </Dialog>
        </Transition>

    </>
  )
}

export default Login