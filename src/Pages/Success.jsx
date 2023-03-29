import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { publicRequest } from '../requestMethods';
import {useSelector} from "react-redux";


const Success = () => {
    const location = useLocation();
    const data = location.state.stripeData;
    const cart = location.state.cart
    const [orderId, setOrderId] = useState(null);
    const {currentUser} = useSelector(state=>state.user)

    useEffect(() => {
      const addOrder = async() =>{
        try {
            const res = await publicRequest.post('/orders/addorder',{
              user:currentUser ? 
              {
                _id:currentUser._id,
                fullname:currentUser.fullname || data.billing_details.name,
                avatar:currentUser.avatar,
                email:currentUser.email,
                phone:currentUser.phone,
                username:currentUser.username,
                createdAt:currentUser.createdAt
              } : {
                fullname:data.billing_details.name,
              },
              userType:currentUser ? "User" : "Guest",
              products: cart.products.map((item) => ({
                productId: item._id,
                productImg:item.img,
                productName:item.title,
                quantity: item.quantity,
                price:item.price,
                total:item.quantity*item.price,
                size:item.size,
                color:item.color
              })),
              paymentMethod:data.payment_method_details,
              amount: cart.total,
              address: data.billing_details.address,
            });
            setOrderId(res.data._id);
        } catch (error) {
            console.log(error)
        }
      }
      addOrder()
    }, [cart,data,currentUser])
    
  return (
    <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {orderId
      ? `Order has been created successfully. Your order number is ${orderId}`
      : `Successfull. Your order is being prepared...`}
    <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
  </div>
  )
}

export default Success