import styled from "styled-components";
import Loader from "../Loader";
import SingleControl from "./singleControl";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  changingAmountOfIngredients,
  clearOrder,
} from "../../../features/burgerSlice";
import Error from "../Error";


interface IngredientDetailsType{
  action: string,
  ingredient: string,
  ingredientPrice: number ,
}

const Controls: React.FC = () => {
  const { ingredients, loading, prices, error } = useAppSelector(
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
              <Tittle>Our prices</Tittle>
              {}
              <ControlsList >
                {ingredients.map((element:string) => {
                  return (
                    <ControlsItem key={element + "Item"}>
                      <SingleControl
                        name={element}
                        quantitie={quantitie[element]}
                        updateBurger={updateBurger}
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
const Div = styled.div({
  textAlign: "center",
  paddingTop: "50px",
});
const Tittle = styled.h3({
  color: "#FF6B0B",
});
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
  margin-bottom: 30px;
  background: #ff6b0b;
  font-weight: 800;
  border-radius: 5px;
  border: none;
  padding: 7px 15px;
  &:hover {
    scale: 120%;
  }
`;
export default Controls;