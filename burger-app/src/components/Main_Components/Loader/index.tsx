import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

const Loader: React.FC = () => {
  return (
    <Div>
      <ClipLoader color="#ff6b0b" />
    </Div>
  );
};
const Div = styled.div({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
export default Loader;
