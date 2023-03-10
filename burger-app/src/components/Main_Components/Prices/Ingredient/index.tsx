import React from "react";
import styled from "styled-components";

interface IngredientProps{
  name: string,
  price: number,
}

const Ingredient: React.FC<IngredientProps> = ({ name, price }) => {
  
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
