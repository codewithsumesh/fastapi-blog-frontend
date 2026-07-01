import React,{useState,useEffect} from "react";
import './post.css'

const Base_URL = 'http://localhost:8000/'

function Post({post}){   //Post react Component  post-(one blogg post data)->prop(app.js=>parent)data passed into the component

    const [imageUrl, setImageUrl]= useState('')

    useEffect(()=>{
        setImageUrl(Base_URL + post.image_url)
    },[])

    const handleDelete = (event) =>{
        event?.preventDefault()

        const requestOptions ={
            method:'DELETE'
        }
        fetch(Base_URL+ 'post/'+post.id,requestOptions)
        .then(response =>{
            if(response.ok){
                window.location.reload()
            }
            throw response
        })
        .catch(error =>{
            console.log(error)
        })
    }

    return(                         // what we gonna display in screen
        <div className="post">
            <img 
            className="post_image"  src={imageUrl}/>
            <div className="post_content">
                <div className="post_title">{post.title}</div>
                <div className="post_creator">{post.creator}</div>
                <div className="post_text">{post.content}</div>
                <div className="post_delete"><button onClick={handleDelete}>Delete Post</button></div>
            </div>
        </div>
    )

}
export default Post    //let app js use Post