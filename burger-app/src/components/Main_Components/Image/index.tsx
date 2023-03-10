import styled from "styled-components";

interface ImageProps{
  name:string
}
const Image: React.FC<ImageProps> = ({ name }) => {
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
