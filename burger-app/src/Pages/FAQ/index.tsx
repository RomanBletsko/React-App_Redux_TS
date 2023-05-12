import styled from "styled-components";
import Tittle from "../../components/Main_Components/Tittle";
import { media } from "../../Utils/Responsive";

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
const Wrapper = styled.div`
  width: 100%;
  color: #fff;
  min-height: 100%;
  background: rgba(49, 47, 48, 0.8);
  padding: 30px;
  border-radius: 5px;
  box-shadow: 7px 10px 5px #fa5f064d;
  ${media.phone}{
    border-radius: 5px;
    padding: 30px 10px 0;
    box-shadow: none;
  }
`

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
