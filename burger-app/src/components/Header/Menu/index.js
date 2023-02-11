import styled from "styled-components";
import Button from "./Button";

function Menu() {
  const menuItems = ["Home", "Orders", "Contacts", "FAQ"];
  return (
    <MenuList>
      {menuItems.map((element) => {
        return <Button key={element + "-menu-items"}>{element}</Button>;
      })}
    </MenuList>
  );
}
const MenuList = styled.ul({
  padding: 0,
  listStyle: "none",
  display: "flex",
  gap: "10px",
});

export default Menu;
