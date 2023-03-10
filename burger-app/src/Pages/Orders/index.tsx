import styled from "styled-components";
import { useState, useEffect } from "react";
import Loader from "../../components/Main_Components/Loader";
import { Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store";
import { fetchOrderList, OrderInfoI } from "../../features/orderListSlice";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./style.css";
import Error from "../../components/Main_Components/Error/index";

const style = {
  margin: "5px",
  backgroundColor: "#ff6b0b",
  display: "flex",
  justifyContent: "center",
  width: "70px",
  height: "30px",
  color: "#fff",
};

const Orders: React.FC = () => {
  
  const [orderIndex, setOrderIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const dispatch = useAppDispatch();
  const { orderList, loading, pageNumbers, error } = useAppSelector(
    (store) => store.orderList
  );
  useEffect(() => {
    dispatch(fetchOrderList());
  }, [dispatch]);
  const validatin = (index:number) => {
    const orders:OrderInfoI[] = orderList[pageNumber];
    if (
      !orders[index].orderName ||
      !orders[index].orderPhone ||
      !orders[index].orderPrice ||
      !orders[index].orderAddress ||
      !orders[index].orderProducts
    ) {
      return false;
    }

    return true;
  };
  const handleFunc = (obj:any, page:number) => {
    setPageNumber(page - 1);
  };
  const openDetails = (event:any) => {
    if (validatin(+event.target.dataset.index)) {
      setOrderIndex(+event.target.dataset.index);
      setDetailsOpen(true);
    }
  };
  const closeDetails = (event:any) => {
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
          {error ? (
            <Error error={error} />
          ) : (
            <>
              <ListStyled>
                {orderList[pageNumber].map((order:OrderInfoI, index) => {
                  return (
                    <ItemStyled 
                    key={order._id}
                    >
                      <ItemTittle
                        className={
                          index === orderIndex && detailsOpen ? "active" : ""
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
                            onClick={closeDetails}
                            >
                            Close
                          </Button>
                        </>
                      ) : (
                        <Button
                          style={style}
                          variant="contained"
                          data-index={index}
                          onClick={openDetails}
                          >
                          Details
                        </Button>
                      )}

                      {index === orderIndex && detailsOpen ? (
                        <BoxDetailStyled>
                          <div>
                            <IngredientStyled>Order details</IngredientStyled>
                            <p>phone: {order.orderPhone}</p>
                            <p>address: {order.orderAddress}</p>
                            <p>
                              Fast delivery: {order.orderFast ? "Yes" : "No"}
                            </p>
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
              <PaginationHolder>
                <Stack spacing={2}>
                  <Pagination
                    className="pagination"
                    count={pageNumbers}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleFunc}
                  />
                </Stack>
              </PaginationHolder>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div({
  color: "#fff",
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
  height: "85%",
  color: "#fff",
  textAlign: "left",
  background: "rgba(100, 100, 100, 0.4)",
  borderRadius: "5px",
});
const ItemStyled = styled.li({
  padding: "5px",
  width: "80%",
});
const PaginationHolder = styled.div({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  padding: "5px",
});
export default Orders;
