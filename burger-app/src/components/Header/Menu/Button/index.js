import "./style.css";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function MenuButton({ children }) {
  return (
    <ItemStyled>
      <NavLink
        className={({ isActive }) => (isActive ? "btnActive" : "menuBtn")}
        to={children === "Home" ? "React/" : children.toLowerCase()}>
        {children.toUpperCase()}
      </NavLink>
    </ItemStyled>
  );
}
const ItemStyled = styled.li({
  margin: "0 5px",
});
export default MenuButton;
