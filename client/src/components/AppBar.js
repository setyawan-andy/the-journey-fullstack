import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
 
const AppBar = () => {

    let history = useHistory();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenReg, setIsOpenReg] = useState(false)

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModalReg = () => {
        setIsOpenReg(true);
    };

    const closeModalReg = () => {
        setIsOpenReg(false);
    };
    

  return (
    
    <div className="bg-hero-image bg-cover pb-32">
        <nav className="container flex justify-between items-center py-4">
            <div className="py-1">
                <button
                    onClick={() => history.push("/auth")}
                >
                    <img src="../assets/logo.svg" alt="journeylogo" />
                </button>
            </div>
            <div>
                <ul className="flex flex-1 justify-end items-center gap-8">
                    <button type="button" className="btn btn-outline" onClick={openModal}>Login</button>
                    <button type="button" className="btn btn-blue" onClick={openModalReg}>Register</button>                    
                </ul>
            </div>
        </nav>

        <Login isOpen={isOpen} closeModal={closeModal}/>
        <Register isOpenReg={isOpenReg} closeModalReg={closeModalReg}/>

        <div className="container font-roboto text-white mt-24 md:text-left text-center">
            <div className="flex flex-col gap-6">
                <h1 className="text-7xl font-medium tracking-wider">The Journey</h1>
                <h1 className="text-7xl font-medium tracking-wider">you ever dreamed of.</h1>
                <p className="text-2xl font-light tracking-wider">We made a tool so you can easily keep & share your travel memories. <br />But there is a lot more</p>
            </div>
        </div>
    </div>
    
  )
}

export default AppBar