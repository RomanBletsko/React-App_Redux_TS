import styled from "styled-components";
import Loader from "../Loader";
import SingleControl from "./singleControl";

function Controls({
  ingredients,
  quantities,
  updateBurger,
  clearAll,
  loading,
}) {
  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <Div>
          <Tittle>Our prices</Tittle>
          {}
          <ControlsList>
            {ingredients.map((element) => {
              return (
                <ControlsItem key={element + "Item"}>
                  <SingleControl
                    name={element}
                    quantitie={quantities[element]}
                    updateBurger={updateBurger}
                  />
                </ControlsItem>
              );
            })}
          </ControlsList>
          <ClearBtn onClick={clearAll}>Clear</ClearBtn>
        </Div>
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
