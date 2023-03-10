import React from "react";
import styled from "styled-components";
import Burger from "../../components/Main_Components/Burger";
import Prices from "../../components/Main_Components/Prices";
import Controls from "../../components/Main_Components/Controls";
import Modal from "../../components/Main_Components/Modal";
import { useEffect } from "react";
import { useAppDispatch } from "../../store";
import { fetchIngredient } from "../../features/priceSlice";
import { addQuantitie } from "../../features/burgerSlice";

const Main = () => {
  // const [modalActive, setModalActive] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [ingredientsArr, setIngredientsArr] = useState([]);
  // const [prices, setPrices] = useState([]);
  // const [ingredientAddingOrder, setIngredientAddingOrder] = useState([]);
  // const [orderPrice, setOrderPrice] = useState("1.00");
  // const [burgerCreator, setBurgerCreator] = useState({});
  const dispatch = useAppDispatch();
  // const { loading } = useSelector((store) => store.ingredients);
  // const { ingredientAddingOrder } = useSelector((store) => store.burger);

  useEffect(() => {
    dispatch(fetchIngredient()).then((responce:any) => {
      const data = responce.payload;
      const quantitie = data.reduce(
        (acc:any, curr:any) => ({ [curr.name]: 0, ...acc }),
        {}
      );
      dispatch(addQuantitie(quantitie));
    });
  }, [dispatch]);

  // const clearOrder = () => {
  // const clearedBurgerCreator = {};
  // for (const ingredient in burgerCreator) {
  //   clearedBurgerCreator[ingredient] = 0;
  // }
  // if (ingredientAddingOrder.length !== 0) {
  //   // setBurgerCreator(clearedBurgerCreator);
  //   // setIngredientAddingOrder([]);
  //   // setOrderPrice("1.00");
  // }
  // };
  // const findPrice = (ingredient) => {
  //   return prices.find((element) => element.name === ingredient).price;
  // };
  // const changingAmountOfIngredients = (event) => {
  //   const actionIngredient = event.target.dataset["ingredient"];
  //   const actionClicked = event.target.dataset["action"];
  //   const copyBurgerCreator = { ...burgerCreator };
  //   // let newPrice = +orderPrice;
  //   // // const newIngredientAddingOrder = [...ingredientAddingOrder];
  //   // if (actionClicked === "decrement") {
  //   //   if (!copyBurgerCreator[actionIngredient] <= 0) {
  //   //     // copyBurgerCreator[actionIngredient] -= 1;
  //   //     // newPrice -= findPrice(actionIngredient);
  //   //     // newIngredientAddingOrder.splice(
  //   //     //   newIngredientAddingOrder.findLastIndex(
  //   //     //     (element) => element === actionIngredient
  //   //     //   ),
  //   //     //   1
  //   //     // );
  //   //   }
  //   // }
  //   // if (actionClicked === "increment") {
  //   //   if (
  //   //     copyBurgerCreator[actionIngredient] < 5 &&
  //   //     newIngredientAddingOrder.length < 10
  //   //   ) {
  //   //     // copyBurgerCreator[actionIngredient] += 1;
  //   //     // newPrice += findPrice(actionIngredient);
  //   //     // newIngredientAddingOrder.push(actionIngredient);
  //   //   }
  //   // }

  //   // setBurgerCreator(copyBurgerCreator);
  //   // setIngredientAddingOrder(newIngredientAddingOrder);
  //   // setOrderPrice(newPrice.toFixed(2));
  // };
  // const openCloseModal = () => {
  //   const newmodalActive = modalActive;

  //   setModalActive(newmodalActive ? false : true);
  // };

  return (
    <Wrapper>
      <Prices />
      <Burger
      // totalPrice={orderPrice}
      // ingredientAddingOrder={ingredientAddingOrder}
      // loading={loading}
      // openModal={openCloseModal}
      />
      <Controls
      // quantities={burgerCreator}
      // updateBurger={changingAmountOfIngredients}
      // clearAll={clearOrder}
      />
      <Modal
      // modalActive={modalActive}
      // cancel={openCloseModal}
      // quantities={burgerCreator}
      // totalPrice={orderPrice}
      // clearBurger={clearOrder}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "15% 70% 15%",
  height: " 70vh",
  background: "rgba(49, 47, 48, 0.8)",
  textAlign: "center",
  padding: "0",
  borderRadius: "5px",
  boxShadow: "7px 10px 5px #fa5f064d",
});

export default Main;
