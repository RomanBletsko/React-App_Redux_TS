import styled from "styled-components";
import { useEffect } from "react";
import Loader from "../../components/Main_Components/Loader";
import { useAppSelector, useAppDispatch } from "../../store";
import { fetchContacts } from "../../features/contactsSlice";
import Error from "../../components/Main_Components/Error/index";
import  CallIcon  from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Map from "../../components/Main_Components/Maps/index"
import Tittle from "../../components/Main_Components/Tittle";
import { media } from "../../Utils/Responsive";

const Contact: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, contacts, error } = useAppSelector(
    (store) => store.contacts
  );
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const [fB, inst, , phone, email, worktime ]= contacts
  return (
    <Wrapper>
      <Tittle text="Contacts" />
      {loading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <Error error={error} />
          ) : (
            <>
              <ListStyled>
                    <ItemStyled >
                      <SpanStyled>{worktime[0]} : </SpanStyled>
                      <SpanStyled>{worktime[1]}</SpanStyled>
                    </ItemStyled>
              </ListStyled>
              <div>
              <LinkStyled href={`mailto:${email[1]}`}>
                <EmailIcon />
                <span> {email[1]}</span>
              </LinkStyled>
              <LinkStyled href={`tel:${phone[1]}`}>
                <CallIcon />
                <span> {phone[1]}</span>
              </LinkStyled>
              <LinkStyled href={fB[1]}>
                <FacebookIcon />
              </LinkStyled>
              <LinkStyled href={inst[1]}>
                <InstagramIcon />
              </LinkStyled>
              </div>
              <Map   />
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  color: #fff;
  background: rgba(49, 47, 48, 0.8);
  padding: 30px;
  border-radius: 5px;
  box-shadow: 7px 10px 5px #fa5f064d;
  ${media.phone}{
    
    border-radius: 5px;
    padding: 30px 10px 0;
    box-shadow: none;
  }
  
`;

const ListStyled = styled.ul({
  listStyle: "none",
  padding: "0",
});
const ItemStyled = styled.li({
  padding: "5px",
});
const LinkStyled = styled.a({
  display: "inline-block",
  verticalAlign: "center",
  color: "#fff",
  textDecoration: "none",
  margin: "5px",
  '&:hover': {
    color:"#FF6B0B",
  }
})
const SpanStyled = styled.span({
  margin: "10px",
});
export default Contact;
