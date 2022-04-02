import React, { useState, useEffect, useContext } from 'react';
import AppBarUser from '../components/AppBarUser';
import BookmarkCard from '../components/card/BookmarkCard';
import { UserContext } from '../context/userContext';
import { API } from '../config/api';

const Bookmark = () => {

    const [state] = useContext(UserContext);
    const [marked, setMarked] = useState([]);

    const getMarked = async () => {
        try {
            const response = await API.get(`/marks/${state.user.id}`);

            setMarked(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMarked();
    }, []);


  return (
    <div>
        <AppBarUser />

        <div className='container mt-20'>
            <h1 className='font-roboto text-5xl font-semibold'>Bookmark</h1>
        </div>
        {marked.length === 0 ? (
            <div className='font-roboto text-5xl font-thin container mt-24 text-center'>
                No Data Found !
            </div>
        ) : (
            <>
            <div className="container my-28 grid grid-cols-2 md:grid-cols-4 gap-7 relative">
            {marked?.map((item, index) => (
                <BookmarkCard item={item} key={index} press={getMarked}/>
            ))}
            </div>
            </>
        )}
        
    </div>
  )
}

export default Bookmark