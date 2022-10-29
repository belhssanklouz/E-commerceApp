import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { sliderItems } from '../data'
import './NextSlider.css'
import { mobile } from '../responsive'

const SliderContainer = styled.div`
width:100%;
display:flex;
overflow:hidden;
${mobile({
    display:"flex",
    height:"90vh",
    flexDirection:"column",
    flexWrap:"wrap",
    alignItems:"center;",
    justifyContent:"center",
    alignContent:"center"})}`
    
const Slider = styled.div`

display:flex;
align-items:center;
justify-content:start;
padding: 10px 0px;
height:80vh;
border-radius:20px;
margin:10px;
cursor:pointer;
color:white;
flex:1;
background-image:url("${props=>props.img}");
background-color:#${props=>props.color};
background-size:cover;
background-position:center center;
background-repeat:no-repeat;
position:relative;
transition:all 0.7s ease-in-out;
filter:blur(4px);
${props=>props.active && "flex:10;filter: blur(0px);background-size: contain;background-position: right;" }
${mobile({
    width:"90vw",
    borderRadius:"20px",
    margin:"10px",
    cursor:'pointer',
    color:'white',
    flex:"1.5",
    backgroundSize:"cover",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    position:"relative",
    transition:"all 0.7s ease-in-out",
    filter:"blur(4px)"
})}
${props=>props.active && mobile({flex:"10",filter:'blur(0px)',backgroundSize:'contain',backgroundPosition:'top left'})}
`
const InfoContainer = styled.div`
padding:0px 20px;
position:absolute;
${props=>props.active && mobile({
    textAlign:'center',
    position:"absolute",
    top:'40%'
})}
margin:0;
opacity:0;
${props=>props.active && "opacity:1;transition:opacity 0.3s ease-in 0.4s"}
`


const Title = styled.h3`
font-size:clamp(1rem,4.8vw,5rem);
background-color:black;
background-image:linear-gradient(-225deg, black 0% , #dfe9f3 100%);
-webkit-background-clip:text;
background-clip:text;
-webkit-text-fill-color:transparent;
`
const Desc = styled.p`
margin:50px 0px;
font-size:18px;
font-weight:500;
letter-spacing:3px;
text-transform : uppercase;
color:black
`
const Button = styled.button`
    padding:10px;
    font-size:20px;
    background-color:transparent;
    cursor:pointer
`

const SliderItem = (props) => {
    const {title,desc,id,img,color,active,onClick} = props;
    return (
        <Slider key={id} img={img} color={color} onClick={onClick} active={active} >
        <InfoContainer active={active}>
            <Title>{title}</Title>
            <Desc>{desc}</Desc>
            <Button>Show Now</Button>
        </InfoContainer>
        </Slider>
    )
}

const NextSlider = () => {

    const [data,setData] = useState([...sliderItems])



    const activeHandler = (id) =>{

        setData(data.map(item=>{
            item.active=false;
            return item;
        }))

        setData(data.map(item=>{
            if(id===item.id){
                return {
                    ...item,active:!item.active
                }
            }
            return item;
        }))
    }
  return (
    <SliderContainer>
        {data?.map((item)=>(
        <SliderItem key={item.id} title={item.title} desc = {item.desc } active={item.active} id={item.id} color={item.bg} img={item.img} onClick={()=>activeHandler(item.id)} />
        // <Slider key={item.id} img={item.img} color={item.bg} onClick={()=>activeHandler(item.id)} active={item.active} className={item.active ? "" : ""}>
        // <InfoContainer active={item.active}>
        //     <Title>{item.title}</Title>
        //     <Desc>{item.desc}</Desc>
        //     <Button>Show Now</Button>
        // </InfoContainer>
        // </Slider>
        
        ))}
    </SliderContainer>
  )
}

export default NextSlider