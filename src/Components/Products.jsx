import { useState,useEffect } from "react"
import styled from "styled-components"
import ProductItem from "./ProductItem"
import { publicRequest } from "../requestMethods";
import Preloading from "./Preloading";

const Container = styled.div`
display:flex;
padding:20px;
flex-wrap:wrap;
justify-content:space-between;
transition : 1s ease-in-out;
`
const Products = ({cat,filters,sort}) => {

  const [products,setProducts] = useState([])
  const [filterProducts,setFilterProducts] = useState([])
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const getProducts  = async() =>{
      setLoading(true)
      setTimeout(function(){
        return 0 
      },3000)
      try {
        const ress = await publicRequest.get(cat ? `/products/getallproducts?=category=${cat}` :
        "/products/getallproducts")
        setProducts(ress.data);
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    getProducts();
  }, [cat])
  
  useEffect(()=>{
    cat && setFilterProducts(products.filter(product=>Object.entries(filters).every(([key,value])=>product[key].includes(value))))
  },[cat,filters,products])

  useEffect(() => {
    if(sort==='newest'){
      setFilterProducts(prev=>[...prev].sort((a,b)=>a.createdAt-b.createdAt))
    }
    else if(sort==='asc'){
      setFilterProducts(prev=>[...prev].sort((a,b)=>a.price-b.price))
    }
    else{
      setFilterProducts(prev=>[...prev].sort((a,b)=>b.price-a.price))
    }
  }, [sort])
  

  return (
    <Container>
        { loading ? <Preloading />  : cat ? filterProducts.map(item=>(
            <ProductItem item={item} key={item._id}/>
        )):products.map(item=>(
          <ProductItem  item={item} key={item._id}/>
      ))}
    </Container>
  )
}

export default Products