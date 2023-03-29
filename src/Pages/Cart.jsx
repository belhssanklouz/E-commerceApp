import { Add, Remove, Close } from '@material-ui/icons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Announcements from '../Components/Announcements'
import Footer from '../Components/Footer'
import NavBar from '../Components/NavBar'
import Newsletter from '../Components/Newsletter'
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { useEffect,useState } from 'react';
import { userRequest } from '../requestMethods';
import {useNavigate,Link} from 'react-router-dom'
import { increaseQuantity,decreaseQuantity,removeProduct } from '../redux/reducers/cartReducer';
const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``

const Wrapper = styled.div`
padding:20px;
${mobile({padding:'10px'})}`

const Title = styled.h1`
font-weight:300;
text-align:center;`

const Top = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
padding:20px;`

const TopButton = styled.button`
padding:10px;
font-weight:600;
cursor:pointer;
background-color:${props=>props.type==="filled" ? "black" : "transparent"};
border:${props=>props.type==="filled" && "none"};
color:${props=>props.type==="filled" && "white"};
`
const TopTexts = styled.div`
${mobile({display:'none'})}`
const TopText = styled.span`
text-decoration:underline;
cursor:pointer;
margin:0px 10px;
`


const Bottom = styled.div`
display:flex;
justify-content:space-between;
${mobile({flexDirection:'column'})}`
const Info = styled.div`
flex:3;
`

const Product = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
${mobile({flexDirection:'column'})}`


const ProductDetails = styled.div`
flex:2;
display:flex;

`
const Image = styled.img`
width:200px;`
const Details = styled.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;`


const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
width:20px;
height:20px;
border-radius:50%;
background-color:${props=>props.color};
`

const ProductSize = styled.span``
const PriceDetails = styled.div`
flex:1;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
${mobile({flexDirection:'row',marginBottom:"10px",justifyContent:"space-around"})}`


const ProductAmountContainer = styled.div`
display:flex;
align-items:center;
margin-bottom:20px;
${mobile({marginBottom:'0px'})}`

const ProductAmount = styled.div`
font-size:24px;
margin:5px;
${mobile({margin:'5px 15px'})}`

const ProductPrice = styled.div`
font-size:30px;
font-weight:200;`

const Hr = styled.hr`
background-color:#eee;
border:none;
height:1px;
`
const Summary = styled.div`
flex:1;
border:0.5px solid lightgray;
border-radius:10px;
padding:20px;
height:50vh;`

const SummaryTitle = styled.h1`
font-weight:200;`

const SummaryItem = styled.div`
margin:30px 0px;
display:flex;
justify-content:space-between;
font-weight:${props=>props.type==="total" &&  "500"};
font-size:${props=>props.type==="total" &&  "24px"}`

const SummaryItemText = styled.span`
`

const SummaryItemPrice = styled.span`
`
const Button = styled.button`
width:100%;
padding:10px;
background-color:black;
color:white;
font-weight:600;`

const IconContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
transition: 0.2s ease-in-out;
cursor:pointer;
&:hover{
    background: lightgray;
    border-radius: 2em;
}`



const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart) || [];
    const [stripeToken, setStripeToken] = useState(null)
    const history = useNavigate();

    const onToken = (token) =>{
        setStripeToken(token)
    }

    const deleteHandler = (id) =>{
        dispatch(removeProduct(id))
    }

    useEffect(() => {
    
        const makeRequest = async() =>{
            try {
                const res = await userRequest.post("/checkout/payment",{
                    tokenId:stripeToken.id,
                    amount:cart.total,
                })
                history('/success',{state:{
                    stripeData:res.data,
                    cart:cart}})
                
                    
            } catch (error) {
                console.log(error)
            }
            
        }
        stripeToken && makeRequest()
    }, [stripeToken,history,cart?.price])

    const increaseHandler = (id) =>{
        dispatch(increaseQuantity(id))
    }
    
    const decreaseHandler = (id) =>{
        dispatch(decreaseQuantity(id))
    }

    return (
    <Container>
        <NavBar />
        <Announcements />
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <Link to="/products">
                    <TopButton>CONTINUE SHOPPING</TopButton>
                </Link>
                    <TopTexts>
                        <TopText>
                           Shopping Bag 
                        </TopText>
                        <TopText>
                           Your Wishlist
                        </TopText>
                    </TopTexts>
                <TopButton type="filled">CHECKOUT NOW</TopButton>

            </Top>
            <Bottom>
                <Info>
                    {cart?.products?.map(prod=>(
                        <>
                        <Product>
                            <IconContainer onClick={()=>deleteHandler(prod._id)}>
                                <Close></Close>
                            </IconContainer>
                        <ProductDetails>
                            <Image src={prod.img}/>
                            <Details>
                                <ProductName><b>Product:</b>{prod.title}</ProductName>
                                <ProductId><b>ID:</b>{prod._id}</ProductId>
                                <ProductColor color= {prod.color} />
                                <ProductSize><b>Size</b> {prod.size}</ProductSize>
                            </Details>
                        </ProductDetails>
                        <PriceDetails>
                            <ProductAmountContainer>
                                <Add onClick={()=>increaseHandler(prod._id)} />
                                <ProductAmount>{prod.quantity}</ProductAmount>
                                <Remove onClick={()=>decreaseHandler(prod._id)}/>
                            </ProductAmountContainer>
                            <ProductPrice>$ {prod.quantity*prod.price}</ProductPrice>
                        </PriceDetails>
                    </Product>
                <Hr />  
                </>
                ))}
                </Info>
                <Summary>
                    <SummaryTitle>Order Summary</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>
                            SubTotal
                        </SummaryItemText>
                        <SummaryItemPrice>
                            $ {cart.total}
                        </SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>
                            Estimated Shipping
                        </SummaryItemText>
                        <SummaryItemPrice>
                            $ 5.90
                        </SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>
                            Shipping Discount
                        </SummaryItemText>
                        <SummaryItemPrice>
                            $ -5.90
                        </SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type='total'>
                        <SummaryItemText>
                            Total
                        </SummaryItemText>
                        <SummaryItemPrice>
                            $ {cart.total}
                        </SummaryItemPrice>
                    </SummaryItem>
                    <StripeCheckout 
                    name="LAMA"
                    image=""
                    billingAddress
                    shippingAddress
                    description={`your total is ${cart.total}`}
                    amount={cart.total*100}
                    stripeKey={KEY}
                    token={onToken}>
                        <Button>Checkout NOW</Button>
                    </StripeCheckout>
                </Summary>
            </Bottom>
        </Wrapper>
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default Cart