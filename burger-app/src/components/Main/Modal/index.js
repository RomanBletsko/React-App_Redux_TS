import styled from "styled-components";

import OrderDetails from "../OrderDeteils";

const Modal = ({
  modalActive,
  cancel,
  ingredients,
  quantities,
  totalPrice,
  clearBurger,
}) => {
  return (
    <Wrapper className={modalActive ? "active" : ""}>
      <ContentConteiner className={modalActive ? "activeCont" : ""}>
        <OrderDetails
          ingredients={ingredients}
          quantities={quantities}
          totalPrice={totalPrice}
          clearBurger={clearBurger}
          cancel={cancel}
        />
        <BoxStyled>
          <form></form>
        </BoxStyled>
      </ContentConteiner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(150, 150, 150, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  transform: ${(props) =>
    props.className === "active" ? "scale(1)" : "scale(0)"};
`;
const ContentConteiner = styled.div`
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  padding-bottom: 20px;
  justify-content: end;
  align-items: center;
  flex-direction: column;

  border-radius: 20px;
  border: 1px solid #000;
  transform: ${(props) =>
    props.className === "activeCont" ? "scale(1)" : "scale(0)"};
  transition: 0.5s;
  background: #fff;
`;

const BoxStyled = styled.div({});

export default Modal;
