import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppBarUser from '../components/AppBarUser';
import DetailContent from '../components/card/DetailContent';
import { API } from '../config/api';

const DetailPage = () => {

  let { id } = useParams();
  const [article, setArticle] = useState({});
  const [creator, setCreator] = useState({});

  const getArticle = async (id) => {
    try {
      const response = await API.get("/article/" + id);

      setArticle(response.data.data);
      setCreator(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticle(id);
  }, []);

  return (
    <div>
        <AppBarUser />

        <div className='container mt-20'>
            <div className='flex flex-1 gap-4 flex-col items-start md:flex-row md:justify-between md:items-center'>
                <h1 className='font-roboto text-5xl font-semibold'>{article.title}</h1>
                <h2 className='font-roboto text-xl font-medium'>{creator.fullName}</h2>
            </div>
            <div className='font-roboto text-lightBlue text-lg mt-6'>
            {article.createdAt}
            </div>
        </div>
        
        <DetailContent image={article.image} description={article.description}/>
    </div>
  )
}

export default DetailPage