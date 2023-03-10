import styled from "styled-components";
import { useEffect } from "react";
import Loader from "../../components/Main_Components/Loader";
import { useAppSelector, useAppDispatch } from "../../store";
import { fetchContacts } from "../../features/contactsSlice";
import Error from "../../components/Main_Components/Error/index";


const Contact: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, contacts, location, error } = useAppSelector(
    (store) => store.contacts
  );
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <Wrapper>
      <Tittle>Contacts</Tittle>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <Error error={error} />
          ) : (
            <>
              <ListStyled>
                {contacts.map((el:string[]) => {
                  return (
                    <ItemStyled key={el[0]}>
                      <SpanStyled>{el[0]} : </SpanStyled>
                      <SpanStyled>{el[1]}</SpanStyled>
                    </ItemStyled>
                  );
                })}
              </ListStyled>{" "}
              <>
                <SpanStyled>Locations : </SpanStyled>
                <ListStyled>
                {location.map((el) => {
                  return (
                    <ItemStyled key={"location" + el}>
                      <SpanStyled>{el[0]} : </SpanStyled>
                      <SpanStyled>{el[1]} : </SpanStyled>
                    </ItemStyled>
                  );
                })}
                </ListStyled>
                
              </>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div({
  width: "100%",
  color: "#fff",
  minHeight: " 70vh",
  background: "rgba(49, 47, 48, 0.8)",

  padding: "30px",
  borderRadius: "5px",
  boxShadow: "7px 10px 5px #fa5f064d",
});
const Tittle = styled.h3({
  color: "#FF6B0B",
});
const ListStyled = styled.ul({
  listStyle: "none",
  padding: "0",
});
const ItemStyled = styled.li({
  padding: "5px",
});
const SpanStyled = styled.span({
  margin: "10px",
});
export default Contact;
