import styled from "styled-components";
import Button from "./Button";

const Menu:React.FC=()=> {
  const menuItems: string[] = ["Home", "Orders", "Contacts", "FAQ"];
  return (
    <MenuList>
      {menuItems.map((element:string) => {
        return <Button key={element + "-menu-items"}>{element}</Button>;
      })}
    </MenuList>
  );
}
const MenuList = styled.ul({
  flexBasis: "30%",
  padding: 0,
  listStyle: "none",
  display: "flex",
  justifyContent: "end",
  gap: "10px",
});

export default Menu;
