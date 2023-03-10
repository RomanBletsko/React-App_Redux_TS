import styled from "styled-components";
import Logo from "./Logo";
import Menu from "./Menu";

const  Header: React.FC = () => {
  return (
    <HeaderStyled>
      <Logo />
      <Tittle> Best Burger App</Tittle>
      <Menu />
    </HeaderStyled>
  );
}

const HeaderStyled = styled.section({
  width: "100%",
  height: "100px",
  background: "rgba(49, 47, 48, 0.8)",
  padding: "0 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "5px",
  boxShadow: "7px 10px 5px #fa5f064d",
});
const Tittle = styled.h2({
  color: "#FF6B0B",
  fontSize: "36px",
});

export default Header;
