import React, { useState, useEffect, useContext } from 'react';
import { API } from '../../config/api';
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';

const CreatedContent = () => {

    const [articles, setArticles] = useState([]);
    const [state] = useContext(UserContext);

    const getArticleUser = async () => {
      try {
        const response = await API.get(`/article-user/${state.user.id}`);
        //store data
        setArticles(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getArticleUser();
    }, [])

    console.log(articles);

  return (
    <div>

      {articles.length === 0 ? (
        <div className='font-semibold text-center justify-center items-center'>
            No Articles yet !
        </div>
      ): (
        <div className="container mb-10 grid grid-cols-2 md:grid-cols-4 gap-7 relative">
        {articles?.map((item, index) => (
          <div key={index} className="rounded-md shadow-md flex flex-col gap-4 relative pb-5"> 
              <img src={item.image} alt="content1"/>
              <button className="absolute right-2 top-2"><img src="../assets/bookmark.svg" alt="bookmark" /></button>
              <h2 className="px-5 font-roboto font-semibold">{item.title}</h2>
              <p className="px-5 font-roboto font-thin text-lightGrey">{item.createdAt} {state.user.fullName}</p>
              <Link to={"/article/" + item.id}>
              <p className="px-5 font-roboto text-grey" dangerouslySetInnerHTML={{__html:item.description.substring(0,250) + " ..."}}></p>
              </Link>
          </div>
        ))}
        </div>
      )}
    </div>
  )
}

export default CreatedContent