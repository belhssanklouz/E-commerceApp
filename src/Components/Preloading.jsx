import styled,{ keyframes } from 'styled-components';
const LoadingAnimation = keyframes`
from{
    transform: translateX(-100%);
}
to{
    transform: translateX(100%);
}
`

const Container = styled.div`
display:flex;
width:100%;
flex-wrap:wrap;`

const Skeleton = styled.div`
flex:1;
background-color: rgba(0, 0, 0, 0.17);
min-width: 280px;
height: 250px;
position: relative;
overflow: hidden;
&:after{
    content: "";
    animation: ${LoadingAnimation} 1.3s infinite;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
    z-index: 1;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}
margin:5px;
`
const Preloading = () =>{
    return(
        <Container>
            {Array.from(Array(10), (i)=>{
                return <Skeleton key={i} />
            })}

        </Container>
    )
}
export default Preloading;