import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Dropdown from './card/Dropdown';


const AppBarUser = () => {

  let history = useHistory();

  return (
    <>
    <div className='shadow-lg'>
        <nav className="container flex justify-between items-center py-4">
                <div className="py-1">   
                <button onClick={() => history.push("/")}>
                    <img src="../assets/icon2.svg" alt="journeylogo" />  
                </button>
                </div>
                <div>
                    <Dropdown />
                </div>
            </nav>
        </div>        
    </>
  )
}

export default AppBarUser