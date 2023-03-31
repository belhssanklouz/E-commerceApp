import { Add, Remove } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"
import Announcements from "../Components/Announcements"
import Footer from "../Components/Footer"
import NavBar from "../Components/NavBar"
import Newsletter from "../Components/Newsletter"
import { mobile } from "../responsive"
import { publicRequest } from "../requestMethods"
import { useDispatch } from "react-redux"
import { addProduct } from "../redux/reducers/cartReducer"

const Container =styled.div`

`

const Wrapper =styled.div`
    padding:50px;
    display:flex;
    ${mobile({padding:'10px',flexDirection:"column"})}
`

const ImgContainer =styled.div`
flex:1;

`

const Image =styled.img`
width:100%;
height:90vh;
object-fit:cover;
${mobile({height:'40vh'})}
`

const InfoContainer =styled.div`
flex:1;
padding: 0px 50px;
${mobile({padding:'10px'})}
`

const Title =styled.h1`
font-weight:200;
`

const Desc =styled.p`
margin:20px 0px;
`

const Price =styled.span`
font-weight:100;
font-size:40px;
${mobile({display:'flex',justifyContent:'center'})}
`
const FilterContainer = styled.div`
    width:50%;
    margin:30px 0px;
    display:flex;
    justify-content:space-between;
    ${mobile({width:'100%'})}
`
const Filter = styled.div`
display:flex;
align-items:center;
`

const FilterTitle = styled.span`
font-size:20px;
font-weight:200;
`

const FilterColor = styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${props=>props.color};
    margin:0px 5px;
    cursor:pointer;
    ${props=>props.selectedd === props.color && "border:2px solid black; transition:all 0.1s ease;"}
`

const FilterSize = styled.select`
    margin-left:10px;
    padding:5px;
`

const FilterSizeOption = styled.option`

`
const AddContainer= styled.div`
display:flex;
align-items:center;
width:50%;
justify-content:space-between;
${mobile({width:'100%'})}`
const AmountContainer= styled.div`
display:flex;
align-items:center;
font-weight:700;
`
const Amount = styled.span`
width:30px;
height:30px;
border :1px solid teal;
border-radius:10px;
display:flex;
align-items:center;
justify-content:center;
margin:0px 5px;`
const Button= styled.button`
background-color:white;
padding:15px;
border:2px solid teal;
cursor:pointer;
font-weight:500
&:hover{
    background-color:lightgray;
    transition:all 0.5s ease-in-out;
}
`




const Product = () => {
    const dispatch = useDispatch();
    const [product,setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [color,setColor] = useState("");
    const [size, setSize] = useState("");
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    useEffect(()=>{
        const getProduct =  async() =>{
            try {
                const product = await publicRequest.get('/products/find/'+id)
            setProduct(product.data)
            } catch (error) {
                console.log(error)
            }
            
        }
        getProduct();
    },[id])
    const handleQuantity = (type) =>{
        if(type==="plus"){
            setQuantity(prev=>prev+1)
        }
        else{
            setQuantity(prev=>prev>1 ? prev-1 : prev)
        }
    }
    const handleClick = (e) =>{
        //updateCart
        e.preventDefault();
        dispatch(addProduct({...product,quantity,size,color }));
    }
    return (
    <Container>
        <NavBar />
        <Announcements />
        <Wrapper>
            <ImgContainer>
                <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>{product.desc}</Desc>
                <Price>$ {product.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        {product.color?.map(c=>(
                            <FilterColor selectedd={color} color={c} key={c} onClick={()=>setColor(c)}/>
                        ))}
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={(e)=>setSize(e.target.value)}>
                            {product.size?.map(size=>(    
                            <FilterSizeOption key={size}>{size}</FilterSizeOption>
                            ))}
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <Remove onClick={()=>handleQuantity('minus')}/>
                        <Amount>{quantity}</Amount>
                        <Add onClick={()=>handleQuantity("plus")}/>
                    </AmountContainer>
                    <Button onClick={handleClick}>Add To Cart</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default Product