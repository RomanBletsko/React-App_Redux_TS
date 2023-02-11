import styled from "styled-components";

function Ingredient({ name, price }) {
  return (
    <PriceItem>
      {name}: {price} ₴
    </PriceItem>
  );
}
const PriceItem = styled.li({
  padding: "10px",
  color: "#fff",
});
export default Ingredient;
