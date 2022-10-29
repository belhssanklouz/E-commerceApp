import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { userRequest } from '../requestMethods';
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
            const res = userRequest.post('/addorder',{
              userId: currentUser._id,
              products: cart.products.map((item) => ({
                productId: item._id,
                quantity: item._quantity,
              })),
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
    
    console.log(location)
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