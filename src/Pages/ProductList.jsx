import {  } from "@material-ui/icons"
import styled from "styled-components"
import NavBar from "../Components/NavBar"
import Announcements from "../Components/Announcements"
import Products from "../Components/Products"
import Newsletter from "../Components/Newsletter"
import Footer from "../Components/Footer"
import { mobile } from "../responsive"
import {useLocation} from 'react-router-dom';
import { useState } from "react"


const Container = styled.div`
`
const Title = styled.h1`
margin:20px;
`
const FilterContainer = styled.div`
display:flex;
justify-content:space-between;
`
const Filter = styled.div`
margin:20px;
${mobile({width:'0px 20px',display:"flex",flexDirection:"column"})}
`
const FilterText = styled.span`
font-size:20px;
font-weight:600;
margin-right:20px;
${mobile({marginRight:'0px'})}
`;


const Select = styled.select`
padding:10px;
margin-left:20px;
${mobile({margin:'10px 0px%'})}
`

const Option = styled.option`
`
const ProductList = () => {
    const location = useLocation();

    const cat = location.pathname.split('/')[2];

    const [filter,setFilter] = useState({})
    const [sort,setSort] = useState('newest')


    const handleFilters = (e) =>{
        const {value,name} = e.target;
        setFilter({...filter,[name]:value})
        
    }
  return (
    <Container>
        <NavBar />
        <Announcements />
        <Title>{cat}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>
                    Filter Products
                </FilterText>
                <Select defaultValue="Color" name="color" onChange={handleFilters}>
                    <Option disabled>Color</Option>
                    <Option>White</Option>
                    <Option>Black</Option>
                    <Option>Red</Option>
                    <Option>Blue</Option>
                    <Option>Yellow</Option>
                    <Option>Green</Option>
                </Select> 
                <Select defaultValue="Size" name="size" onChange={handleFilters}>
                    <Option disabled>Size</Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>
                    Sort Products
                </FilterText>
                <Select onChange={(e)=>setSort(e.target.value)}>
                    <Option value='newest'>Newest</Option>
                    <Option value='asc'>Price (ASC)</Option>
                    <Option value='desc'>Price (DESC)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filter} sort={sort} />
        <Newsletter/>
        <Footer />
    </Container>
  )
}

export default ProductList