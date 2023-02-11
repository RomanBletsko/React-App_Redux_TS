import styled from "styled-components";
import { useState, useEffect } from "react";
import { getContacts } from "../../Utils/Apis";
import Loader from "../../components/Main/Loader";

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState();
  const [location, setLocation] = useState();
  useEffect(() => {
    const responce = async () => {
      setLoading(true);
      try {
        const { data } = await getContacts();
        const contacts = await Object.entries(data[0]);
        contacts.splice(0, 2);
        const local = contacts.splice(5, 1);
        setLocation(Object.entries(local[0]));
        setContact(contacts);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    responce();
  }, []);
  console.log(location);
  return (
    <Wrapper>
      <Tittle>Contacts</Tittle>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ListStyled>
            {contact.map((el) => {
              return (
                <ItemStyled key={el[0]}>
                  <SpanStyled>{el[0]} : </SpanStyled>
                  <SpanStyled>{el[1]}</SpanStyled>
                </ItemStyled>
              );
            })}
          </ListStyled>{" "}
          <>
            <SpanStyled>{location[0][1]} : </SpanStyled>
            {Object.entries(location[1][1]).map((el) => {
              return (
                <div key={"location" + el}>
                  <SpanStyled>{el[0]} : </SpanStyled>
                  <SpanStyled>{el[1]} : </SpanStyled>
                </div>
              );
            })}
          </>
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
