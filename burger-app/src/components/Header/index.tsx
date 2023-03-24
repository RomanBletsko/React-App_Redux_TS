import styled from "styled-components";
import { media } from "../../Utils/Responsive";
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

const HeaderStyled = styled.section`
  width: 100%;
  height: 100px;
  background: rgba(49, 47, 48, 0.8);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  box-shadow: 7px 10px 5px #fa5f064d;
  ${media.tablet} {
    justify-content: space-around;
  };
  
`;
const Tittle = styled.h2`
  color: #FF6B0B;
  font-size: 36px;
  font-weight: 700;
  ${media.tablet}{
    display: none ;
    
  }
`;

export default Header;
