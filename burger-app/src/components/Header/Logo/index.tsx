import styled from "styled-components";
import image from "./img/logo1.png";

const Logo: React.FC = () => {
  return (
    <LogoWraper>
      <a href="/React-App_Redux_TS">
        <img src={image} alt="Logo" />
      </a>
    </LogoWraper>
  );
}

const LogoWraper = styled.div`
flex-basis: 30%;
  a {
    img:hover {
      scale: 120%;
    }
  }
`;
export default Logo;
