import styled from "styled-components";
import Image from "../Image";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationRules } from "../../../Utils/Validation/validations";
import { SignupSchema } from "../../../Utils/Validation/validationShema";
import { Button, Stack } from "@mui/material";
import Loader from "../Loader";
import { useAppSelector, useAppDispatch } from "../../../store";
import { clearOrder } from "../../../features/burgerSlice";
import {
  modalActiveChange,
  createOrderStatusChange,
  sendOrderStatusChange,
  fetchOrder, 
  OrderDataI,
} from "../../../features/orderSlice";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


interface DataType{
    name: string,
    email: string,
    phone: string,
    address: string,
    isFast: boolean,
}
const style = {
  backgroundColor: "Black",
  display: "flex",
  justifyContent: "center",
  width: "160px",
  height: "50px",
};

const OrderDetails:React.FC = () => {
  const { sendOrderStatus, createOrderStatus, loading, error } = useAppSelector(
    (store) => store.order
  );
  const { quantitie, orderPrice } = useAppSelector((store) => store.burger);

  const [checked, setChecked] = useState<boolean>(false);
  const [finalOrderPrice, setFinalOrderPrice] = useState<string | undefined>();

  useEffect(() => {
    setFinalOrderPrice(checked ? (+orderPrice + 2).toFixed(2) : orderPrice);
  }, [checked, orderPrice]);

  const burgerComponents = Object.entries(quantitie).filter((el) => el[1]);
  const dispatch = useAppDispatch();
  const orderWindowClesed = () => {
    dispatch(modalActiveChange());
    dispatch(sendOrderStatusChange(false));
    dispatch(createOrderStatusChange(false));
  };
  const handleFastDelivery = () => {
    setChecked(checked ? false : true);
  };

  const handleOrder = (data:DataType) => {
    const {
      name: orderName,
      phone: orderPhone,
      email: orderEmail,
      address: orderAddress,
    } = data;

    const orderData:OrderDataI = {
      orderName: orderName,
      orderPhone: orderPhone,
      orderEmail: orderEmail,
      orderFast: checked,
      orderAddress: orderAddress,
      orderProducts: Object.fromEntries(burgerComponents),
      orderPrice: checked ? (+orderPrice + 2).toFixed(2) : orderPrice,
    };

    dispatch(fetchOrder(orderData)).then(()=>dispatch(clearOrder()));
  };

  return (
    <WrapperStyled>
      {createOrderStatus ? (
        <>
          {loading ? (
            <Loader />
          ) : (
            <StatusBox>
              <TittleStyled className={sendOrderStatus ? "done" : undefined}>
                {sendOrderStatus
                  ? "Order successfully created!"
                  : "Something went wrong!"}
              </TittleStyled>
              {error ? (
                <TittleStyled className={sendOrderStatus ? "done" : undefined}>
                  {error} !
                </TittleStyled>
              ) : null}

              <Button
                onClick={orderWindowClesed}
                style={style}
                variant="contained">
                Ok
              </Button>
            </StatusBox>
          )}
        </>
      ) : (
        <>
          <TittleStyled>Burger price: {finalOrderPrice} ₴ </TittleStyled>
          <OrderListStyled>
            {burgerComponents.map((element) => {
              return (
                <OrderItemStyled
                  key={element[0] + "_Order_Item"}
                  >
                  <Image name={element[0]} />
                  <OrderSpan>{element[0] + ":"}</OrderSpan>
                  <OrderSpan>{element[1]}</OrderSpan>
                </OrderItemStyled>
              );
            })}
          </OrderListStyled>
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              address: "",
              isFast: false,
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => handleOrder(values)}>
            {({ errors }) => (
              <FormStyled>
                <LabelStyled>
                  <FieldStyled
                    validate={validationRules.validateName}
                    type="text"
                    name="name"
                    placeholder={"name"}
                    className={errors.name ? "error" : null}
                  />
                </LabelStyled>
                <ErrorMessage name="name" />
                <br />

                <LabelStyled>
                  <FieldStyled
                    validate={validationRules.validateEmail}
                    type="email"
                    name="email"
                    placeholder={"email"}
                    className={errors.email ? "error" : null}
                  />
                </LabelStyled>
                <ErrorMessage name="email" />
                <br />
                <LabelStyled>
                  <FieldStyled
                    validate={validationRules.validatePhone}
                    type="text"
                    name="phone"
                    placeholder={"phone"}
                    className={errors.phone ? "error" : null}
                  />
                </LabelStyled>
                <ErrorMessage name="phone" />
                <br />
                <LabelStyled>
                  <FieldStyled
                    validate={validationRules.validateAddress}
                    type="text"
                    name="address"
                    placeholder="address"
                    className={errors.address ? "error" : null}
                  />
                </LabelStyled>
                <ErrorMessage name="address" />
                <br />

                <FormControlLabel
                  control={
                    <Checkbox onChange={handleFastDelivery} color="default" name="isFast"/>
                  }
                  label="Fast delivery +2.00 ₴"
                />
                <br />
                <Stack direction="row" spacing={2}>
                  <Button style={style} variant="contained" type="submit">
                    Order
                  </Button>
                  <Button
                    style={style}
                    variant="contained"
                    onClick={orderWindowClesed}>
                    Cancel
                  </Button>
                </Stack>
              </FormStyled>
            )}
          </Formik>
        </>
      )}
    </WrapperStyled>
  );
};
const StatusBox = styled.div({
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
const WrapperStyled = styled.div({
  width: "400px",
  padding: "0",
  margin: "10px 20px 20px",
});
const TittleStyled = styled.h3`
  color: ${(props) => (props.className === "done" ? "green" : "red")};
  margin: 30px;
`;
const OrderListStyled = styled.ul({
  listStyle: "none",
  padding: 0,
  margin: "5px",
});
const OrderItemStyled = styled.li({
  padding: "5px",
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid #aaa",
  alignItems: "center",
});

const LabelStyled = styled.label({
  width: "100%",
  display: "flex",
  alignItems: "center",
});

const FieldStyled = styled(Field)`
  font-family: Arial;
  height: 50px;
  border: 2px solid lightgrey;
  border-radius: 5px;
  border-color: ${(props) =>
    props.className === "error" ? "red" : "lightgrey"};
  text-indent: 10px;
  width: 100%;
`;

const FormStyled = styled(Form)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
const OrderSpan = styled.span({});
export default OrderDetails;
