import styled from "styled-components";
import Loader from "../Loader";
import SingleControl from "./singleControl";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  changingAmountOfIngredients,
  clearOrder,
} from "../../../features/burgerSlice";
import Error from "../Error";
import Tittle from "../Tittle";
import { media } from "../../../Utils/Responsive";
import { PricesType } from "../../../features/priceSlice";


interface IngredientDetailsType{
  action: string,
  ingredient: string,
  ingredientPrice: number ,
}

const Controls: React.FC = () => {
  const { loading, prices, error } = useAppSelector(
    (store) => store.ingredients
  );
  const { quantitie } = useAppSelector((store) => store.burger);
  const dispatch = useAppDispatch();
  const findPrice = (ingredient:string):number | undefined => {
      return prices.find((element) => element.name === ingredient)?.price
  };
  const updateBurger = (event:any) => {
    const data = event.target.dataset
    if (data["action"]) {
      const price =  findPrice(data["ingredient"]) || 0;
      const ingredientDetails:IngredientDetailsType = {
        action: data["action"],
        ingredient: data["ingredient"],
        ingredientPrice: price,
      };
      dispatch(changingAmountOfIngredients(ingredientDetails));
    }
  };
  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <Error error={error} />
          ) : (
            <Div>
              <Tittle text="Controls" />
              {}
              <ControlsList >
                {prices.map((element:PricesType) => {
                  return (
                    <ControlsItem key={element.name + "Item"}>
                      <SingleControl
                        name={element.name}
                        quantitie={quantitie[element.name]}
                        updateBurger={updateBurger}
                        price={element.price}
                        
                      />
                    </ControlsItem>
                  );
                })}
              </ControlsList>
              <ClearBtn onClick={() => dispatch(clearOrder())}>Clear</ClearBtn>
            </Div>
          )}
        </>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div({});
const Div = styled.div`
  text-align: center;
  padding-top: 50px;
  ${media.phone}{
    padding-top: 10px;
  }
`;
const ControlsList = styled.ul({
  margin: " 20px",
  listStyle: "none",
  padding: "0",
  textAlign: "start",
  
});

const ControlsItem = styled.li({
  margin: "7px 0",
});
const ClearBtn = styled.button`
  font-size: 16px;
  margin-bottom: 30px;
  background: #ff6b0b;
  font-weight: 700;
  border-radius: 5px;
  border: none;
  padding: 5px 15px;
  &:hover {
    scale: 110%;
  }
`;
export default Controls;
