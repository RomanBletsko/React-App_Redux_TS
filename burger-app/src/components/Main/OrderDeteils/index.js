// import { borderBottom } from "@mui/system";
import styled from "styled-components";
import Image from "../Image";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationRules } from "../../../Utils/Validation/validations";
import { SignupSchema } from "../../../Utils/Validation/validationShema";
import { createOrder } from "../../../Utils/Apis";
import { Button, Stack } from "@mui/material";
import Loader from "../Loader";

const style = {
  backgroundColor: "Black",
  display: "flex",
  justifyContent: "center",
  width: "160px",
  height: "50px",
};

const OrderDetails = ({ quantities, totalPrice, clearBurger, cancel }) => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [orderCreateStatus, setOrderCreateStatus] = useState(false);
  const [sendOrderStatus, setSendOrderStatus] = useState(false);

  const burgerComponents = Object.entries(quantities).filter((el) => el[1]);

  const orderWindowClesed = () => {
    cancel();
    setSendOrderStatus(false);
    setOrderCreateStatus(false);
  };
  const handleOrder = async (data) => {
    const {
      name: orderName,
      phone: orderPhone,
      email: orderEmail,
      address: orderAddress,
    } = data;
    const orderData = {
      orderName,
      orderPhone: orderPhone,
      orderEmail: orderEmail,
      orderFast: checked,
      orderAddress: orderAddress,
      orderProducts: Object.fromEntries(burgerComponents),
      orderPrice: totalPrice,
    };

    try {
      setLoading(true);
      setOrderCreateStatus(true);
      await createOrder(orderData);
      setLoading(false);
      setSendOrderStatus(true);
      clearBurger();
    } catch (error) {
      setLoading(false);
      setSendOrderStatus(false);
      console.error(error);
    }
  };
  // console.log(error);
  return (
    <WrapperStyled>
      {orderCreateStatus ? (
        <>
          {loading ? (
            <Loader />
          ) : (
            <StatusBox>
              <TittleStyled className={sendOrderStatus ? "done" : null}>
                {sendOrderStatus
                  ? "Order successfully created!"
                  : "Something went wrong!"}
              </TittleStyled>

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
          <TittleStyled>Burger price: {totalPrice} ₴ </TittleStyled>
          <OrderListStyled>
            {burgerComponents.map((element) => {
              return (
                <OrderItemStyled
                  key={element[0] + "_Order_Item"}
                  name={element[0]}>
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
