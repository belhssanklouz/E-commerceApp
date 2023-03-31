import { useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
// import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { prodStatss,updateProd } from "../../redux/apiCalls";
import { getStorage,ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import app from "../../firebase";

export default function Product() {
    const [inputs,setInputs] = useState({});
    const [file,setFile] = useState(null)
    const [progress,setProgress] = useState(null)

    const id = useParams().productId;
    const dispatch = useDispatch();
    const prodStats = useSelector(state=>state.stats.prodStats);
    const filtredProd = useSelector(state=>state.products.products.find(prod=>prod._id===id));

    const handleInput = (e) => {
        setInputs(prev=>{
            return {...prev,[e.target.name] : e.target.value}
        })
    }

    useEffect(()=>{
        dispatch(prodStatss(id))
       
        //    setInputs({
        //     _id:id,   
        //     title:filtredProd?.title,
        //     desc:filtredProd?.desc,
        //     price:filtredProd?.price,
        //     inStock:filtredProd?.inStock,
        //     })0
      
    },[dispatch,filtredProd,id])

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
             const product = {...inputs,img:downloadURL}; 
             dispatch(updateProd(product,id))
    
            });
          }
        );
    
      }

    const handleClick = (e) =>{
        e.preventDefault();
        if(file){
            imgUploader()
        }else{
            dispatch(updateProd(inputs,id))
        } 
    }
console.log(filtredProd?.inStock)
  return (
             <div className="product">
               <div className="productTitleContainer">
                 <h1 className="productTitle">Product</h1>
               </div>
               <div className="productTop">
                   <div className="productTopLeft">
                       <Chart data={prodStats} dataKey="Sales" title="Sales Performance"/>
                   </div>
                   <div className="productTopRight">
                       <div className="productInfoTop">
                           <img src={filtredProd?.img} alt="" className="productInfoImg" />
                           <span className="productName">{filtredProd?.title}</span>
                       </div>
                       <div className="productInfoBottom">
                           <div className="productInfoItem">
                               <span className="productInfoKey">id:</span>
                               <span className="productInfoValue">{filtredProd?._id}</span>
                           </div>
                           <div className="productInfoItem">
                               <span className="productInfoKey">sales:</span>
                               <span className="productInfoValue">5123</span>
                           </div>
                           <div className="productInfoItem">
                               <span className="productInfoKey">active:</span>
                               <span className="productInfoValue">yes</span>
                           </div>
                           <div className="productInfoItem">
                               <span className="productInfoKey">in stock:</span>
                               <span className="productInfoValue">{filtredProd?.inStock ? "Yes" : "No"}</span>
                           </div>
                       </div>
                   </div>
               </div>
               <div className="productBottom">
                   <form className="productForm">
                       <div className="productFormLeft">
                           <label>Product Name</label>
                           <input type="text" name="title" placeholder={filtredProd?.title} onChange={handleInput}/>
                           <label>Product Description</label>
                           <input type="text" name='desc' placeholder={filtredProd?.desc} onChange={handleInput}/>
                           <label>Price</label>
                           <input type="text" name='price' placeholder={filtredProd?.price} onChange={handleInput}/>
                           <label>In Stock</label>
                           <select name="inStock" id="idStock" defaultValue={filtredProd?.inStock} onChange={handleInput}>
                               <option value="true" selected={filtredProd?.inStock}>Yes</option>
                               <option value="false" selected={!filtredProd?.inStock}>No</option>
                           </select>
                           
                       </div>
                       <div className="productFormRight">
                           <div className="productUpload">
                               <img src={filtredProd?.img} alt="" className="productUploadImg" />
                               <label htmlFor="file">
                                   <Publish/>
                               </label>
                               <input type="file" id="file" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])} />
                               {progress}
                           </div>
                           <button onClick={handleClick} className="productButton">Update</button>
                       </div>
                   </form>
               </div>
             </div>
  );
}
