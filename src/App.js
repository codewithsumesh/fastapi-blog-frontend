import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from 'react';
import Post from './post';   /*.js is optional since its react .css is mandatory*/
import NewPost from './NewPost';

const Base_URL = 'https://fastapi-blog-backend-iu3q.onrender.com/'

function App() {

  const[posts, setPosts] = useState([])   //create memory

  useEffect(() => {                       //runs after page starts
    fetch(Base_URL + 'post/all')          //sends http get request
        .then((response) => {             //runs when fast api replies
            const json = response.json()  //covert response body into javascripts objects//promise-->parsing json also take time 
            console.log(json);            //print the promise (array)
            if (response.ok){             //check request success
               return json                //pass the promise to next.then()
            }
            throw response;               // if response 404 500 stop execution and send error to .catch()
        })
        .then((data) => {                 //now promise finished
            return data.reverse();        //reverse array
        })
        .then((data) => {
            setPosts(data);               //store reversed data in array //react automatically redraws
        })
        .catch((error) => {               //if anythings fails ..like server issue
            console.log(error);
            alert(error);
        });
}, []);

  return (
    <div className="App">
     <div className='blog_title'>Open City Blog</div>
     <div className='app_posts'>
      {
        posts.map((post) =>(             //component post created//later setPosts(data) update the Posts so data in  posts
          <Post post ={post} />          // Post function Caller //created our own html-like tag // resue them anywhere//{each post}  
        ))
      }
     </div>
     <div className='new_post'>
          <NewPost />
     </div>
    </div>
  );
}

export default App;
