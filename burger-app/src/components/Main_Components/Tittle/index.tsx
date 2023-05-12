import styled from "styled-components";

interface TittleProps{
text:string
}
const Tittle:React.FC<TittleProps>= ({text})=>{
return <TittleStyled>{text}</TittleStyled>
}
const TittleStyled = styled.h3({
   color: "#FF6B0B",
  fontWeight: "bold",
  fontSize:"20px"
})
export default Tittle
