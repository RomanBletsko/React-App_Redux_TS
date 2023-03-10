import styled from "styled-components";
import Image from "../../Image";


interface SingleControlProps{
  name:string,
  quantitie:number,
  updateBurger:(event: any)=>void
}
const SingleControl: React.FC < SingleControlProps > = ({ name, quantitie, updateBurger}) => {
  return (
    <Div onClick={updateBurger} >
      <Decrement data-action="decrement" data-ingredient={name}>
        -
      </Decrement>
      <Counter>{quantitie}</Counter>
      <Increment data-action="increment" data-ingredient={name}>
        +
      </Increment>
      <Image name={name}></Image>
    </Div>
  );
};

const Div = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Decrement = styled.button({
  border: "1px solid #fff",
  backgroundColor: "transparent",
  color: "#fff",
  fontSize: "20px",
  borderRadius: "5px",
  padding: "0 8px",
  margin: "0 5px",
});
const Increment = styled.button({
  border: "1px solid #fff",
  backgroundColor: "transparent",
  color: "#fff",
  fontSize: "20px",
  borderRadius: "5px",
  padding: "0 6px",
  margin: "0 5px",
});
const Counter = styled.span({
  color: "#fff",
  margin: "0 10px",
});
export default SingleControl;
