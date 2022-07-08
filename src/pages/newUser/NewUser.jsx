import { useState } from "react";
import { getStorage,ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { addusers } from "../../redux/apiCalls";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import "./newUser.css";



export default function NewUser() {
  const dispatch = useDispatch();

  const [input,setInput] = useState({})
  const [isAdmin,setIsAdmin] = useState({})
  const [file,setFile] = useState(null)


  const handleInput = (e) =>{
    const {name,value} = e.target;
    console.log(e.target)
    setInput(prev=>{
      return {...prev,[name]:value}
    })
    console.log(isAdmin)
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
         const user = {...input,avatar:downloadURL,...isAdmin}; 
         dispatch(addusers(user))

        });
      }
    );

  }
  const submitHandler = (e) =>{
    e.preventDefault();
    file ? imgUploader() : dispatch(addusers({...input,...isAdmin}))
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={submitHandler}>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" onChange={handleInput} name="username"/>
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" onChange={handleInput} name="fullname"/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" onChange={handleInput} name="email"/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" onChange={handleInput} name="password"/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" onChange={handleInput} name="phone"/>
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" onChange={handleInput} name="adresse"/>
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" onChange={handleInput} name="sexe"/>
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" onChange={handleInput} name="sexe"/>
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" onChange={handleInput} name="sexe"/>
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Admin</label>
          <select className="newUserSelect" name="isAdmin" id="active" defaultValue={false} onChange={(e)=>setIsAdmin({[e.target.name]:e.target.value =="true" ? true : false})}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e)=>setFile(e.target.files[0])}/>        
        </div>
          <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
