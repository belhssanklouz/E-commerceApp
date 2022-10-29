import React from 'react'
import styled from 'styled-components';
import { Search,ShoppingBasket } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Container = styled.div`
height : 60px;
${mobile({height:'50px'})}
`;

const Wrapper = styled.div`
display:flex;
justify-content:space-between;
padding:10px 20px;
${mobile({padding:'10px 0px'})}
`;

const Left = styled.div`
flex:1;
display:flex;
align-items:center
`

const Language = styled.span`
    font-size:14px;
    cursor:pointer;
    ${mobile({display:'none'})}
`
const Center = styled.div`
flex:1;
text-align:center;`
const Right = styled.div`
flex:1;
display:flex;
justify-content:flex-end;
align-items:center;
${mobile({flex:2,justifyContent:'center'})}
`

const SearchContainer = styled.div`
border:1px solid lightgray;
display:flex;
align-items:center;
margin-left:25px;
padding:5px`;

const Input = styled.input`
border:none;
${mobile({width:'50px'})}

`

const Logo = styled.h1`
font-weight:bold;
${mobile({fontSize:'24px'})}

`
const MenuItem=styled.div`
font-size:14px;
cursor:pointer;
margin-left:25px;
${mobile({fontSize:"12px",marginLeft:'10px'})}`
const NavBar = () => {
    const quantity = useSelector(state=>state.cart?.quantity) || 0;
  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>En</Language>
                <SearchContainer>
                    <Input placeholder='Search'/>
                    <Search style={{color:"gray",fontSize:16}}/>
                </SearchContainer>
            </Left>
            <Center>
                <Logo>SHOP.</Logo>
            </Center>
            <Right>
                <MenuItem>Register</MenuItem>
                <MenuItem>Sign In</MenuItem>
                <Link to ="/cart">
                <MenuItem>
                    <Badge badgeContent={quantity} color="primary">
                        <ShoppingBasket color="action" />
                    </Badge>
                </MenuItem>
                </Link>
            </Right>

        </Wrapper>   
    </Container>
  )
}

export default NavBar