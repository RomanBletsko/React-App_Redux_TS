import styled from "styled-components";

const NotFound = () => {
  return (
    <Wrapper>
      <span>Not Found</span>
    </Wrapper>
  );
};
const Wrapper = styled.div({
  width: "100%",
  color: "#fff",
  height: " 70vh",
  background: "rgba(49, 47, 48, 0.8)",
  padding: "0",
  borderRadius: "5px",
  boxShadow: "7px 10px 5px #fa5f064d",
});
export default NotFound;
