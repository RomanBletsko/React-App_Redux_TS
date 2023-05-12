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
import Tittle from "../../components/Main_Components/Tittle";
import { media } from "../../Utils/Responsive";

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
      <Tittle text="Orders"></Tittle>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <Error error={error} />
          ) : (
            <BoxStyled>
              <ListStyled>
                {orderList[pageNumber].map((order:OrderInfoI, index) => {
                  return (
                    <ItemStyled 
                    key={order._id}
                    >
                      <HolderStyled>
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
                      <ItemTittle
                        className={
                          index === orderIndex && detailsOpen ? "active" : ""
                        }>
                        {order.orderName}
                      </ItemTittle>
                      <span>price: {order.orderPrice} ₴</span>
                      </HolderStyled>

                     

                      {index === orderIndex && detailsOpen ? (
                        <BoxDetailStyled>
                          <div>
                            <IngredientStyled>Order details</IngredientStyled>
                            <>
                            <SpanStyled>phone: {order.orderPhone}</SpanStyled>
                            <SpanStyled>address: {order.orderAddress}</SpanStyled>
                            <SpanStyled>
                              Fast delivery: {order.orderFast ? "Yes" : "No"}
                            </SpanStyled>
                            </>
                            
                          </div>
                          <div>
                            <IngredientStyled>Ingradients</IngredientStyled>
                            <HolderStyled>
                            {Object.entries(order.orderProducts).map((el) => {
                              return (
                                <div key={order._id + el[0]}>
                                  <span>{el[0]} : </span>
                                  <SpanStyled>{el[1]}</SpanStyled>
                                </div>
                              );
                            })}
                            </HolderStyled>
                            
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
            </BoxStyled>
          )}
        </>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  color: #fff;
  width: 100%;
  min-height:  100%;
  padding: 30px 30px 0;
  background: rgba(49, 47, 48, 0.8);
  border-radius: 5px;
  box-shadow: 7px 10px 5px #fa5f064d;
  ${media.phone}{
    border-radius: 0;
    box-shadow: none;
    padding: 30px 10px 0;
  }
`;
const BoxStyled = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "94%"
})
const BoxDetailStyled = styled.div({
  display: "flex",
  justifyContent: "space-between",
  padding: "5px",
  width: "100%",
  background: "#ddd",
  color: "#000",
  minHeight: "80px",
  borderRadius: "5px",
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
  margin: "5px 0",
  listStyle: "none",
  overflow: "auto",
  // boxSizing: "border-box",
  height: "85%",
  color: "#fff",
  textAlign: "left",
  background: "rgba(100, 100, 100, 0.4)",
  borderRadius: "5px",
});
const ItemStyled = styled.li`
  padding: 5px;
  
  ${media.phone}{
    padding: 5px 0;
    width: 100%;
  }

`;
const HolderStyled = styled.div({
  display: "flex",
  alignItems: "center",
})
const SpanStyled = styled.span({
  margin: "0 10px 0 0",
})
const PaginationHolder = styled.div({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  padding: "5px",
});
export default Orders;
