import styled from "styled-components";
import backGroundImg from "../../../assets/bg.jpg";
import { useAppSelector, useAppDispatch } from "../../../store";
import { modalActiveChange } from "../../../features/orderSlice";
import Tittle from "../Tittle";
import { media } from "../../../Utils/Responsive";
const Burger: React.FC = () => {
  const { orderPrice, ingredientAddingOrder } = useAppSelector(
    (store) => store.burger
  );
  const dispatch = useAppDispatch();
  const positionTopBun = ingredientAddingOrder.length
    ?  80 + 20 * ingredientAddingOrder.length
    :   130 
  const zIndexTopBun = ingredientAddingOrder.length + 1;
  const handleModal = () => {
    if (ingredientAddingOrder.length !== 0) {
      dispatch(modalActiveChange());
    }
  };
 

  return (
    <div>
      <Div>
        
        <BurgerWrapper>
          <TopBun
            src={require("../../../assets/products/top_bun.png")}
            alt="Top bun"
            style={{
              bottom: positionTopBun,
              zIndex: zIndexTopBun,
            }}
          />
          {!ingredientAddingOrder.length && (
            <Paragraph>Start by adding ingredients to your burger</Paragraph>
          )}

          {ingredientAddingOrder.map((product, index) => {
            return (
              <ProductIMGStyled
                key={product + index * 2}
                src={require(`../../../assets/products/${product}.png`)}
                alt={product}
                style={{
                  bottom:  65  + index * 20,
                  zIndex: index + 1,
                }}
              />
            );
          })}
          <BottomBun
            src={require("../../../assets/products/bottom_bun.png")}
            alt="Bottom bun"
          />
        </BurgerWrapper>
        <Tittle text={`Burger price: ${orderPrice} ₴`} />
        <Btn onClick={handleModal}>Checkout</Btn>
      </Div>
    </div>
  );
}
const Div = styled.div`
  margin-top: 15px;
  height: 95%;
  display: flex;
  justifyC-content: end;
  flex-direction: column;
  align-items: center;
  background-image: url(${backGroundImg});
  background-size: cover;
  border-radius: 15px;
  ${media.phone}{
    margin: 0;
    border-radius: 0;
    height: 100%;
  }
`;

const Paragraph = styled.p`
  position: absolute;
  top: 30%;
  color: #FF6B0B;
  ${media.phone}{
    top: 10%;
  }
`;
const BurgerWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: end;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  ${media.phone}{
    padding-bottom: 0px;
  }
`;
const TopBun = styled.img({
  width: "200px",
  position: "absolute",
});
const ProductIMGStyled = styled.img({
  width: "200px",
  position: "absolute",
});
const BottomBun = styled.img({
  width: "200px",
});
const Btn = styled.button`
  margin: 30px 0;
  background: #ff6b0b;
  font-weight: 700;
  border-radius: 5px;
  border: none;
  padding: 5px 15px;
  &:hover {
    scale: 120%;
  }
  ${media.phone}{
    margin: 5px 0;
  }
`;

export default Burger;
