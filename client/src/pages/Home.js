import React, { useState } from 'react';
import AppBarUser from '../components/AppBarUser';
import Content from '../components/card/Content';

const Home = () => {

    const [search, setSearch] = useState("");

  return (
    <div>
        <AppBarUser />

        <div className='container mt-20'>
            <h1 className='font-roboto text-5xl font-semibold'>Journey</h1>
            <div className='mt-7 px-10 mb-10'>
                <form action="" className='flex flex-1 font-roboto hover:shadow-md'>
                    <input type="text" placeholder='Find Journey' className='bg-white w-9/12 md:w-11/12 p-4 rounded-tl-md rounded-bl-md focus:outline-none focus:shadow-md'
                       onChange={e => {
                        setSearch(e.target.value)
                    }} 
                    />
                    <button className='bg-blue w-3/12 md:w-1/12 p-4 text-center rounded-tr-md rounded-br-md text-white'
                        
                    >
                        Search
                    </button>
                </form>
            </div>
        </div>

        <Content search={search}/>
    </div>
  )
}

export default Home