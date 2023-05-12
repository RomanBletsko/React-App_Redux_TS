import styled from "styled-components";
import Loader from "../Loader";
import Ingredient from "./Ingredient";
import Error from "../Error";
import { useAppSelector } from "../../../store";
import { PricesType } from "../../../features/priceSlice";
import Tittle from "../Tittle";
import { media } from "../../../Utils/Responsive";

const Prices: React.FC = () => {
  const { prices, loading, error } = useAppSelector((store) => store.ingredients);
  return (
    <Wraper>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <Error error={error} />
          ) : (
            <Div>
              <Tittle text="Our prices" />
              <PricesList>
                {prices.map((element:PricesType) => (
                  <Ingredient
                    name={element.name}
                    price={element.price}
                    key={element.name + "Price"}
                  />
                ))}
              </PricesList>
            </Div>
          )}
        </>
      )}
    </Wraper>
  );
}
const Wraper = styled.div`
  color: #fff;
  ${media.phone}{
    display: none;
  }
`;
const Div = styled.div({
  textAlign: "center",
  paddingTop: "50px",
  
});

const PricesList = styled.ul({
  margin: "0 0 0 30px",
  listStyle: "none",
  padding: "0",
  textAlign: "start",
});

export default Prices;
