
import "./index.css";
import backgrounImg from "./assets/bg.jpg";

import styled from "styled-components";
import { Header, Footer} from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contact, FAQ, NotFound, Orders, Main } from "./Pages";

const BurgerApp:React.FC=()=> {

  return (
    <Body>
      <BodyWrapper>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route id="1" path="React-App_Redux_TS/" element={<Main />} />
            <Route id="2" path="/orders" element={<Orders />} />
            <Route id="3" path="/contacts" element={<Contact />} />
            <Route id="4" path="/faq" element={<FAQ />} />
            <Route id="5" path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </BodyWrapper>
    </Body>
  );
}
const Body = styled.div({
  width: "100%",
  minHeight: "100vh",
  backgroundImage: `url(${backgrounImg})`,
  backgroundSize: "cover",
});

const BodyWrapper = styled.div({
  margin: "0 auto",
  maxWidth: "1211px",
  minHeight:"100vh",
  padding: "20px",
  display: "grid",
  gridTemplateRows: "100px auto 50px",
  gap: "20px",
 
});
export default BurgerApp;
