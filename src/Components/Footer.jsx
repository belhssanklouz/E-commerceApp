import styled from "styled-components";
import { Facebook,Instagram, Pinterest, Twitter,LocationOn, Phone, Mail } from "@material-ui/icons";
import { mobile } from "../responsive";

const Container = styled.div`
display:flex;
${mobile({flexDirection:'column'})}
`
const Logo = styled.h1`
font-size:70px;
`
const Desc = styled.p`
margin:20px 0px;
`
const SocialContainer = styled.div`
display:flex;

`
const SocialIcon = styled.div`
width:40px;
height:40px;
border-radius:50%;
color:white;
background-color:#${props=>props.color};
display:flex;
justify-content:center;
align-items:center;
margin-right:20px;
`

const Left = styled.div`
flex:1;
display:flex;
flex-direction:column;
padding:20px;
`
const Right = styled.div`
flex:1;
padding:20px;
${mobile({backgroundColor:'#fff8f8'})}
`
const Center = styled.div`
flex:1;
padding:20px;
${mobile({display:'none'})}
`

const Title = styled.h3`
margin-bottom:30px;

`
const List = styled.ul`
margin:0;
padding:0;
list-style:none;
display:flex;
flex-wrap:wrap;

`

const ListItem = styled.li`
width:50%;
margin-bottom:10px;
`

const ContactItem = styled.div`
margin-bottom:20px;
display:flex;
align-items:center;`
const Payment = styled.img`
max-width:230px`

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>LAMA.</Logo>
            <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat magni magnam velit ducimus, corporis eum deserunt accusamus sint assumenda! Doloribus ratione atque mollitia eligendi illo pariatur autem soluta. Inventore, aliquam?</Desc>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <Facebook />
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Instagram />
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <Twitter />
                </SocialIcon>
                <SocialIcon color="E60023">
                    <Pinterest />
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>man Fashion</ListItem>
                <ListItem>Woman Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
                <ListItem>Home</ListItem>

            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem><LocationOn style={{marginRight:"10px"}}/> Rue 52 Lac 1 ,Tunis 1002</ContactItem>
            <ContactItem><Phone style={{marginRight:"10px"}}/>+216 55 660 142</ContactItem>
            <ContactItem><Mail style={{marginRight:"10px"}}/>contact@shop.tn</ContactItem>
            <Payment src="https://www.savinga.com/img/paypal.png" />
        </Right>

    </Container>
  )
}

export default Footer