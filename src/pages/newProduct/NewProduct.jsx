import "./newProduct.css";
import {useState} from "react";
import {useDispatch} from 'react-redux';
import {addProd} from '../../redux/apiCalls'
import { getStorage, ref,uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"


export default function NewProduct() {
  const dispatch = useDispatch();
  const [inputs,setInputs] = useState([]);
  const [category,setCategory] = useState([]);
  const [file,setFile] = useState({});

  const handleInput = (e) =>{
    setInputs(prev=>{
      return {...prev,[e.target.name]:e.target.value}})
  }

  const handleCategory = (e) =>{
    const {value} = e.target;
    setCategory(value.split(','))
  }
  const handleClick = (e) =>{
    e.preventDefault();
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
         const product = {...inputs,category,img:downloadURL}; 
         dispatch(addProd(product))

        });
      }
    );

  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e)=>setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name='title' type="text" placeholder="Title"  onChange={handleInput}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name='desc' type="text" placeholder="Description"  onChange={handleInput}/>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name='price' type="text" placeholder="Price"  onChange={handleInput}/>
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input name='categories' type="text" placeholder="Categories"  onChange={handleCategory}/>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" selectedValue={true} onChange={handleInput} onBlur={handleInput}>
            <option value="true" selectedValue>Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
