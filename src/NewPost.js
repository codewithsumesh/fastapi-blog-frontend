import React,{useState} from "react";
import './NewPost.css'

const Base_URL ='http://localhost:8000/'

function NewPost(){
    
    const [image, setImage] = useState(null)
    const [creator, setCreator] = useState('')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const handleImageUpload =(e) =>{
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
    }
    //React automatically creates an event object when the user changes the input (for example, selects a file).
    //So if the user clicks Choose File and selects photo.jpg, React internally does something like:
    //const e = {
    //target: {
    //  files: [selectedFile]}}
    const handleCreate =(e) =>{      //user clicks create this function ran
        e?.preventDefault()          //stop the browser from refreshing the page after form submitted

        const formData = new FormData()  //create an empty parcel//temp js object
        formData.append('image',image)   //put selected image into the parcel

        const requestOptions = {         //preparing the request
            method :'POST',
            body:formData          //attached
        }    
        fetch(Base_URL + 'post/image',requestOptions) //only the image is uploaded
        .then(response => {
            if(response.ok){
                return response.json()
            }
            throw response
        })
        .then(data =>{
            createPost(data.filename) //new function with parameter//server return image url
        })
        .catch(error=> {
            console.log(error);
        })
        .finally(()=>{              
            setImage(null)               //reset react state
            document.getElementById('fileInput').value =null //clear the file picker,will not appear on screen
        })
    }
    const createPost = (imageUrl) =>{   //parameter passed above as data.filename
        const json_string = JSON.stringify({     //create json
            'image_url': imageUrl,
            'title': title,
            'content':text,
            'creator':creator

        })
        const requestOptions ={
            method: 'POST',
            headers: new Headers({
                'Content-Type':'application/json'  //tell fast api " im sending json" //lable of the parcel
            }),
            body :json_string   //attached
        }
        fetch(Base_URL+ 'post',requestOptions)   //calls //saves the blog into db
        .then(response =>{
            if(response.ok){
                return response.json
            }
            throw response
        })
        .then(data =>{
            window.location.reload()
            window.scrollTo(0,0)
        })
        .catch(error => {
            console.log(error)
        })
    }
    return(
        <div className="newpost_content">
            <div className="newpost_image">    
                <input type ="file" id ="fileInput" onChange={handleImageUpload} />    
            </div>
            <div className="newpost_creator">
                <input className="newpost_creator" type="text" id="creator_input"
                    placeholder="Creator" onChange ={(event)=> setCreator(event.target.value)}
                    value={creator} />
            </div>
            <div className="newpost_title">                                       
                <input className="newpost_title" type = "text" id="title_input"   //id unique for one element//class can be shared by many elements
                placeholder="Title" onChange={(event) => setTitle(event.target.value)}
                value={title}/>
            </div>
            <div className="newpost_text">
                <textarea className="newpost_text" row= '10' id="content_input"
                placeholder="Content" onChange={(event) => setText(event.target.value)} ////onChange tells the user is selected this file
                value={text}/>
            </div>
            <div>
                <button className="create_button" onClick={handleCreate} >Create</button>
            </div>
        </div>
    )
}

export default NewPost       /*let app js use NewPost*/