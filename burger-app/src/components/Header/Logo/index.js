import styled from "styled-components";
import image from "./img/logo1.png";

function Logo() {
  return (
    <LogoWraper>
      <a href="">
        <img src={image} alt="Logo" />
      </a>
    </LogoWraper>
  );
}

const LogoWraper = styled.div`
  a {
    img:hover {
      scale: 120%;
    }
  }
`;
export default Logo;
