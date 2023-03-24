import styled from "styled-components";
import { media } from "../../../../Utils/Responsive";
import Image from "../../Image";


interface SingleControlProps{
  name:string,
  quantitie:number,
  updateBurger:(event: any)=>void
  price:number
}
const SingleControl: React.FC < SingleControlProps > = ({ name, quantitie, updateBurger, price}) => {
  return (<Wrapper> <Holder onClick={updateBurger} >
    <Decrement className=' hover:border-orange-500 hover:text-orange-500' data-action="decrement" data-ingredient={name}>
      -
    </Decrement>
    <Counter>{quantitie}</Counter>
    <Increment className=' hover:border-orange-500 hover:text-orange-500' data-action="increment" data-ingredient={name}>
      +
    </Increment>
    <Image name={name}></Image>
    
  </Holder>
  <PriceSpan>{name}:</PriceSpan>
  <PriceSpan>{price}</PriceSpan>
  </Wrapper>
   
  );
};

const Wrapper = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap:"20px",
  width:"100%"
});
const Holder = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width:"60%"
});

const Decrement = styled.button({
  border: "1px solid #fff",
  backgroundColor: "transparent",
  color: "#fff",
  fontSize: "20px",
  lineHeight: "24px",
  borderRadius: "5px",
  padding: "0 8px",
  margin: "0 5px",
});
const Increment = styled.button({
  border: "1px solid #fff",
  backgroundColor: "transparent",
  color: "#fff",
  fontSize: "20px",
  lineHeight: "24px",
  borderRadius: "5px",
  padding: "0 6px",
  margin: "0 5px",
});
const Counter = styled.span({
  color: "#fff",
  margin: "0 10px",
});
const PriceSpan = styled.span`
display:none;
color: #fff;
${media.phone}{
  display: inline;
}
`
export default SingleControl;
