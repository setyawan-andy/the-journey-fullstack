import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

const Content = ({search, item, press}) => {

    const [state] = useContext(UserContext);

    const [marked, setMarked] = useState([]);
    const [alert, setAlert] = useState(false);

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
                `/getmark/${state.user.id}/${item.id}`
            );
            setMarked(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };


    //store article
    const [article, setArticle] = useState([]);
    // const [numOfelem, setNumOfEle] = useState(4);

    //get article from database
    const getArticles = async () => {
        try {
            const response = await API.get("/articles");
            //store to state
            setArticle(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    // const loadMore = () => {
    //     setNumOfEle(numOfelem + numOfelem);
    // }

    // const slice = article.slice(0, numOfelem);

    useEffect(() => {
        getArticles();
        getMark();
    }, []);

    // console.log(slice);
  return (
      <>
        {alert ? 
        <div className='mx-4 container w-2/5 mb-3 px-5 py-4 bg-green-100 rounded-md'
            onClick={() => setAlert(false)}
        >
            <h2 className='text-xl text-green-500'>Bookmark Added !</h2>
        </div>
        : null
        }
        <div className="container mb-10 grid grid-cols-2 md:grid-cols-4 gap-7 relative">
            {article?.filter((item) => {
                if(search === ""){
                    return item
                } else if (item.title.toLowerCase().includes(search.toLowerCase())){
                    return item
                } else if (item.description.toLowerCase().includes(search.toLowerCase())){
                    return item
                }
            }).map(item => (
            
            <div className="rounded-md shadow-md flex flex-col gap-4 relative pb-5"> 
                <img src={item.image} alt="content"/>
                <button className="absolute right-2 top-2"
                    onClick={() => setMark(item.id)}
                >
                <img src="../assets/bookmark.svg" alt="bookmark" 
                    onClick={() => setAlert(true)}
                />
                </button>
                <h2 className="px-5 font-roboto font-semibold">{item.title}</h2>
                <p className="px-5 font-roboto font-thin text-lightGrey">{item.createdAt}</p>
                <Link to={"/article/" + item.id}>    
                <p className="px-5 font-roboto text-grey" dangerouslySetInnerHTML={{__html:item.description.substring(0,250) + " ..."}}></p>
                </Link>
            </div>
            
            ))}
        </div>

        {/* <button 
            className="container mb-5 p-4 rounded-md flex justify-center items-center text-center w-9/12 bg-blue text-white"
            onClick={() => loadMore()}
        >
            Load More ...
        </button> */}
</>
  )
}

export default Content