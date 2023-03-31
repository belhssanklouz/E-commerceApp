import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { updateUsers } from "../../redux/apiCalls";
import { getStorage,ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import app from "../../firebase";

import "./user.css";

export default function User() {
  const dispatch = useDispatch();
  const [input,setInput] = useState({});
  const [file,setFile] = useState(null);
  const [progress,setProgress] = useState(null);

  const id = useParams().userId
  const user = useSelector(state=>state.manageUsers.users).find(ele=>ele._id===id);
  // const loading = useSelector(state=>state.manageUsers.isFetching);
  const handleInput = (e) =>{
    const {name,value} = e.target;
    setInput(prev=>{
      return {...prev,[name]:value}
    })
  }

  const imgUploader = () =>{

    const storage = getStorage(app);
    const storageRef = ref(storage,new Date().getTime() + file.name)
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress + "%")
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
            default:
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         const user = {id,input:{...input,avatar:downloadURL}}; 
         dispatch(updateUsers(user))

        });
      }
    );

  }

  const handleClick = (e) =>{
    e.preventDefault();
    file ? imgUploader() :
    dispatch(updateUsers({id,input}))
  }
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user?.avatar}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user?.username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.adresse}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder={user?.username}
                  className="userUpdateInput"
                  onChange={handleInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  name="fullname"
                  type="text"
                  placeholder={user?.fullname}
                  className="userUpdateInput"
                  onChange={handleInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder={user?.email}
                  className="userUpdateInput"
                  onChange={handleInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  name="phone"
                  type="text"
                  placeholder={user?.phone}
                  className="userUpdateInput"
                  onChange={handleInput}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  name="adresse"
                  type="text"
                  placeholder={user?.adresse}
                  className="userUpdateInput"
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user?.avatar}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} name="avatar" onChange={(e)=>setFile(e.target.files[0])} />
                {progress}
              </div>
              <button className="userUpdateButton" onClick={handleClick}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
