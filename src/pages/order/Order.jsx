import './order.css'
import React, { useState }from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Chart from "../../components/chart/Chart"
import { Publish } from '@material-ui/icons'
import { orderUpdate } from '../../redux/apiCalls'



const Order = () => {
    const [inputs, setInputs] = useState({})

    const orders = useSelector(state=>state.orders.orders);
    const users = useSelector(state=>state.manageUsers.users);
    const products = useSelector(state=>state.products.products)
    const orderId = useParams().orderId;
    const dispatch = useDispatch()
    
    // const filterOrder = (orders,users) =>{
    //     let filteredOrder = orders.find(order=>order._id===orderId);
    //     const user = users.find(user=>user._id === filteredOrder?.userId);
    //     return {...filteredOrder,user}
    // }
    const filteredOrder = orders.find(order=>order._id===orderId)

    const handleInput = (e) =>{
        const {name,value} = e.target;
        setInputs(prev=>{
            return {...prev,[name]:value}
        })
    }
    console.log(inputs)
    const handleClick = () => {
        if(Object.keys(inputs).length === 0){
            return console.log("no data changes")
        }
        dispatch(orderUpdate(filteredOrder?._id,inputs))
    }
  return (
    <div className="product">
               <div className="productTitleContainer">
                 <h1 className="productTitle">Order</h1>
               </div>
               <div className="productTop">
                   <div className="orderTopLeft">
                        <div className="productInfoTop">
                           <img src={filteredOrder?.user?.avatar} alt="" className="productInfoImg" />
                           <span className="productName">{filteredOrder?.title}</span>
                       </div>
                       <div className="productInfoBottom">
                           <div className="productInfoItem">
                               <span className="productInfoKey">Fullname : </span>
                               <span className="productInfoValue">{filteredOrder?.user?.fullname}</span>
                           </div>
                           <div className="productInfoItem">
                               <span className="productInfoKey">Email : </span>
                               <span className="productInfoValue">{filteredOrder?.user?.email}</span>
                           </div>
                           <div className="productInfoItem">
                               <span className="productInfoKey">Address : </span>
                               <span className="productInfoValue">{`${filteredOrder?.address?.line1} | ${filteredOrder?.address?.city} | ${filteredOrder?.address?.postal_code}`}</span>
                           </div>
                           <div className="productInfoItem">
                               <span className="productInfoKey">Country : </span>
                               <span className="productInfoValue">{filteredOrder?.address?.country}</span>
                           </div>
                       </div>
                   </div>
                   <div className="productTopRight">
                       <div className="productInfoBottom">
                           <div className="productInfoItem">
                               <span className="productInfoKey">id:</span>
                               <span className="productInfoValue">{filteredOrder?._id}</span>
                           </div>
                           <div className="productInfoItem">
                               <span className="productInfoKey">Status:</span>
                               <select name="status" onChange={handleInput} defaultValue={filteredOrder?.status}>
                                    <option value="Pending" selected={filteredOrder?.status ==="Pending"}>Pending</option>
                                    <option value="Canceled" selected={filteredOrder?.status ==="Canceled"}>Canceled</option>
                                    <option value="Completed" selected={filteredOrder?.status ==="Completed"}>Completed</option>
                               </select>
                           </div>
                           <div className="productInfoItem">
                               <span className="productInfoKey">Date:</span>
                               <span className="productInfoValue">{filteredOrder?.creationDate}</span>
                           </div>
                       </div>
                   </div>
               </div>
               <div className="orderBody">
               <table>
                <thead>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </thead>
                <tbody>
                    {filteredOrder?.products?.map((product,index)=>(
                        <tr key={index} className='product'>
                            <td>
                                <div className='productcontainer'>
                                    <div className="productimage">
                                        <img src={product.productImg} alt="" />
                                    </div>
                                    <div className="productname">
                                        {product.productName}
                                    </div>
                                </div>
                            </td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                            <td>{product.total}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="2" className='total'></td>
                        <td>Total</td>
                        <td>{filteredOrder?.amount}</td>
                    </tr>
                </tbody>
               </table>
                    <button onClick={handleClick} className="productButton">Update</button>
               </div>
             </div>
  )
}

export default Order