import { Link, useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
// import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { prodStatss,updateProd } from "../../redux/apiCalls";

export default function Product() {
    const [inputs,setInputs] = useState({})
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
    const handleClick = (e) =>{
        e.preventDefault();
        dispatch(updateProd(inputs,id))
    }

  return (
             <div className="product">
               <div className="productTitleContainer">
                 <h1 className="productTitle">Product</h1>
                 <Link to="/newproduct">
                   <button className="productAddButton">Create</button>
                 </Link>
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
                               <option value="yes">Yes</option>
                               <option value="no">No</option>
                           </select>
                           
                       </div>
                       <div className="productFormRight">
                           <div className="productUpload">
                               <img src={filtredProd?.img} alt="" className="productUploadImg" />
                               <label for="file">
                                   <Publish/>
                               </label>
                               <input type="file" id="file" style={{display:"none"}} />
                           </div>
                           <button onClick={handleClick} className="productButton">Update</button>
                       </div>
                   </form>
               </div>
             </div>
  );
}
