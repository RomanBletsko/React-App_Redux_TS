import styled from "styled-components";
import Tittle from "../../components/Main_Components/Tittle";

const FAQ: React.FC = () => {
  const faq: string[][] = [
    ["Quality", "Our burgers are the best!"],
    ["Price", "Our price is the lowest!"],
    ["Our Service", "Our service is the fastest in the world!"],
  ];
  return (
    <Wrapper>
      <Tittle text="FAQ" />
      <ListStyled>
        {faq.map((el) => {
          return (
            <ItemStyled key={el[0]}>
              <SpanStyled>{el[0]} : </SpanStyled>
              <SpanStyled>{el[1]}</SpanStyled>
            </ItemStyled>
          );
        })}
      </ListStyled>
    </Wrapper>
  );
};
const Wrapper = styled.div({
  width: "100%",
  color: "#fff",
  background: "rgba(49, 47, 48, 0.8)",
  padding: "30px",
  borderRadius: "5px",
  boxShadow: "7px 10px 5px #fa5f064d",
});

const ListStyled = styled.ul({
  listStyle: "none",
  overflow: "auto",
  boxSizing: "border-box",
  height: "90%",
  color: "#fff",
  textAlign: "left",
});
const ItemStyled = styled.li({
  padding: "5px",
  width: "100%",
});
const SpanStyled = styled.span({});
export default FAQ;