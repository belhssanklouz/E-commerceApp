import styled from "styled-components"
import { ShoppingBasket,SearchOutlined,FavoriteBorderOutlined } from "@material-ui/icons"
import { Link } from "react-router-dom"

const Info = styled.div`
opacity:0;
width:100%;
height:100%;
position:absolute;
top:0;
left:0;
background-color:rgba(0,0,0,0.2);
display:flex;
align-items:center;
justify-content:center;
z-index:3;
`

const Container = styled.div`
flex:1;
margin:5px;
min-width:280px;
height:250px;
display:flex;
align-items:center;
justify-content:center;
background-color:#f5fbfd;
position:relative;
&:hover ${Info} {
    opacity:1;
    transition:all 0.5s ease;
    cursor:pointer;
}
`
const Circle = styled.div`
width:200px;
height:200px;
border-radius:50%;
background-color:white;
position:absolute;
`
const Image = styled.img`
height:75%;
z-index:2;`

const Icon = styled.div`
width:40px;
height:40px;
border-radius:50%;
background-color:white;
display:flex;
align-items:center;
justify-content:center;
margin:10px;

&:hover{
    background-color:#e9f5f5;
    transform: scale(1.1);
    transition:all 0.5s ease;
}`

const ProductItem = ({item}) => {
  return (
    <Container>
        <Circle />
        <Image src={item.img} />
        <Info>
            <Icon>
                <ShoppingBasket />
            </Icon>
            <Link to={`/product/${item._id}`}>
            <Icon>
                <SearchOutlined />
            </Icon>
            </Link>
            <Icon>
                <FavoriteBorderOutlined />
            </Icon>
        </Info>
    </Container>
  )
}

export default ProductItem