import styled from "styled-components";
import { useState, useEffect } from "react";
import { getOrders } from "../../Utils/Apis";
import Loader from "../../components/Main/Loader";
import { Button } from "@mui/material";

const style = {
  margin: "5px",
  backgroundColor: "#ff6b0b",
  display: "flex",
  justifyContent: "center",
  width: "70px",
  height: "30px",
};
const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState();
  const [orderIndex, setOrderIndex] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  useEffect(() => {
    const responce = async () => {
      setLoading(true);
      try {
        const { data } = await getOrders();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    responce();
  }, []);
  const validatin = (index) => {
    if (!orders[index].orderName) {
      return false;
    } else if (!orders[index].orderPhone) {
      return false;
    } else if (!orders[index].orderPrice) {
      return false;
    } else if (!orders[index].orderAddress) {
      return false;
    } else if (!orders[index].orderProducts) {
      return false;
    }

    return true;
  };
  const openDetails = (event) => {
    if (validatin(+event.target.dataset.index)) {
      setOrderIndex(+event.target.dataset.index);
      setDetailsOpen(true);
    }
  };
  const closeDetails = (event) => {
    setOrderIndex(+event.target.dataset.index);
    setDetailsOpen(false);
  };

  return (
    <Wrapper>
      <Tittle>Orders</Tittle>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ListStyled>
            {orders.map((order, index) => {
              return (
                <ItemStyled key={order._id}>
                  <ItemTittle
                    className={
                      index === orderIndex && detailsOpen ? "active" : null
                    }>
                    {order.orderName}
                  </ItemTittle>
                  <span>price: {order.orderPrice} ₴</span>

                  {index === orderIndex && detailsOpen ? (
                    <>
                      <Button
                        style={style}
                        variant="contained"
                        data-index={index}
                        onClick={closeDetails}>
                        Close
                      </Button>
                    </>
                  ) : (
                    <Button
                      style={style}
                      variant="contained"
                      data-index={index}
                      onClick={openDetails}>
                      Details
                    </Button>
                  )}

                  {index === orderIndex && detailsOpen ? (
                    <BoxDetailStyled>
                      <div>
                        <IngredientStyled>Customer Contacts</IngredientStyled>
                        <p>phone: {order.orderPhone}</p>
                        <p>address: {order.orderAddress}</p>
                      </div>
                      <div>
                        <IngredientStyled>Ingradients</IngredientStyled>
                        {Object.entries(order.orderProducts).map((el) => {
                          return (
                            <div key={order._id + el[0]}>
                              <span>{el[0]} : </span>
                              <span>{el[1]} ,</span>
                            </div>
                          );
                        })}
                      </div>
                    </BoxDetailStyled>
                  ) : null}
                </ItemStyled>
              );
            })}
          </ListStyled>
        </>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div({
  width: "100%",
  padding: "30px",
  height: " 70vh",
  background: "rgba(49, 47, 48, 0.8)",
  borderRadius: "5px",
  boxShadow: "7px 10px 5px #fa5f064d",
});
const BoxDetailStyled = styled.div({
  display: "flex",
  justifyContent: "space-between",
  padding: "5px",
  width: "50%",
  background: "#ddd",
  color: "#000",
  minHeight: "80px",
  borderRadius: "5px",
});

const Tittle = styled.h3({
  color: "#FF6B0B",
});
const ItemTittle = styled.span`
  margin: 0 10px;
  color: ${(props) => (props.className === "active" ? "#ff6b0b" : "#fff")};
  text-decoration: ${(props) =>
    props.className === "active" ? "underline" : "none"};
`;
const IngredientStyled = styled.h4({
  margin: "5px 0",
});
const ListStyled = styled.ul({
  listStyle: "none",
  overflow: "auto",
  boxSizing: "border-box",
  height: "90%",
  color: "#fff",
  textAlign: "left",
  background: "rgba(100, 100, 100, 0.4)",
  borderRadius: "5px",
});
const ItemStyled = styled.li({
  padding: "5px",
  width: "80%",
});

export default Orders;
