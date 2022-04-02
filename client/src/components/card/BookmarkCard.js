import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { UserContext } from '../../context/userContext';
import { API } from '../../config/api';
import { MdDelete } from "react-icons/md"

const BookmarkCard = ({item, press}) => {

    let history = useHistory();
    const [state] = useContext(UserContext);

    const [marked, setMarked] = useState([]);

    const setMark = async (id) => {
        try {
            await API.get(`/mark/${id}`);

            getMark();
            press();
            
        } catch (error) {
            console.log(error);
        }
    };

    const getMark = async () => {
        try {
            const response = await API.get(
                `/getmark/${state.user.id}/${item.article.id}`
            );
            setMarked(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMark();
    }, []);


  return (
    <div>
        
            <div className="rounded-md shadow-md flex flex-col gap-4 relative pb-5"
                
            > 
                <img src={item.image} alt="content1"/>
                <button className="absolute right-2 top-2 bg-white p-3 rounded-md"
                    onClick={() => setMark(item.article.id)}
                >
                    <MdDelete size={24}/>
                    {/* <img src="../assets/bookmark.svg" alt="bookmark" /> */}
                </button>
                <h2 className="px-5 font-roboto font-semibold">{item.article.title}</h2>
                <p className="px-5 font-roboto font-thin text-lightGrey">{item.article.createdAt} {item.article.user.fullName}</p>
                <Link to={"/article/" + item.article.id}>
                <p className="px-5 font-roboto text-grey" dangerouslySetInnerHTML={{__html:item.article.description.substring(0,250) + " ..."}}></p>
                </Link>
            </div>
        </div>

  )
}

export default BookmarkCard