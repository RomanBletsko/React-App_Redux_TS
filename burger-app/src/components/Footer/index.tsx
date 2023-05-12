import styled from "styled-components";


const  Footer: React.FC = () => {
  return (
    <FooterStyled> 
    </FooterStyled>
  );
}

const FooterStyled = styled.section({
  width: "100%",
  maxHeight: "50px",
  background: "rgba(49, 47, 48, 0.8)",
  padding: "0 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "5px",
  boxShadow: "7px 10px 5px #fa5f064d",
});

export default Footer;
