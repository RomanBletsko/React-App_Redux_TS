import styled from "styled-components";

interface ErrorProps{
  error: string,
}
const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <Div>
      <h3>{error} !!!</h3>
    </Div>
  );
};
const Div = styled.div({
  color: "#fff",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
export default Error;
