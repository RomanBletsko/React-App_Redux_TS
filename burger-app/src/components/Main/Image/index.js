import styled from "styled-components";

const Image = ({ name }) => {
  return (
    <ImageStyled
      src={require(`../../../assets/ingredients/${name}.png`)}
      alt={name}></ImageStyled>
  );
};
const ImageStyled = styled.img({
  width: "32px",
  padding: "0",
});
export default Image;
