import React from "react";
import styled from "styled-components";
import Burger from "./Burger";
import Prices from "./Prices";
import Controls from "./Controls";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { getPrices } from "../../Utils/Apis";

const Main = () => {
  const [modalActive, setModalActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ingredientsArr, setIngredientsArr] = useState([]);
  const [prices, setPrices] = useState([]);
  const [ingredientAddingOrder, setIngredientAddingOrder] = useState([]);
  const [orderPrice, setOrderPrice] = useState("1.00");
  const [burgerCreator, setBurgerCreator] = useState({});

  useEffect(() => {
    const responce = async () => {
      setLoading(true);
      try {
        const { data } = await getPrices();

        const ingredients = data.map((ingredient) => {
          return ingredient.name;
        });
        const quantitie = data.reduce(
          (acc, curr) => ({ [curr.name]: 0, ...acc }),
          {}
        );
        setIngredientsArr(ingredients);
        setPrices(data);
        setBurgerCreator(quantitie);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    responce();
  }, []);

  const clearOrder = () => {
    const clearedBurgerCreator = {};
    for (const ingredient in burgerCreator) {
      clearedBurgerCreator[ingredient] = 0;
    }
    if (ingredientAddingOrder.length !== 0) {
      setBurgerCreator(clearedBurgerCreator);
      setIngredientAddingOrder([]);
      setOrderPrice("1.00");
    }
  };
  const findPrice = (ingredient) => {
    return prices.find((element) => element.name === ingredient).price;
  };
  const changingAmountOfIngredients = (event) => {
    const actionIngredient = event.target.dataset["ingredient"];
    const actionClicked = event.target.dataset["action"];
    const copyBurgerCreator = { ...burgerCreator };
    let newPrice = +orderPrice;
    const newIngredientAddingOrder = [...ingredientAddingOrder];
    if (actionClicked === "decrement") {
      if (!copyBurgerCreator[actionIngredient] <= 0) {
        copyBurgerCreator[actionIngredient] -= 1;
        newPrice -= findPrice(actionIngredient);
        newIngredientAddingOrder.splice(
          newIngredientAddingOrder.findLastIndex(
            (element) => element === actionIngredient
          ),
          1
        );
      }
    }
    if (actionClicked === "increment") {
      if (
        copyBurgerCreator[actionIngredient] < 5 &&
        newIngredientAddingOrder.length < 10
      ) {
        copyBurgerCreator[actionIngredient] += 1;

        newPrice += findPrice(actionIngredient);

        newIngredientAddingOrder.push(actionIngredient);
      }
    }

    setBurgerCreator(copyBurgerCreator);
    setIngredientAddingOrder(newIngredientAddingOrder);
    setOrderPrice(newPrice.toFixed(2));
  };
  const openCloseModal = () => {
    const newmodalActive = modalActive;

    setModalActive(newmodalActive ? false : true);
  };

  return (
    <Wrapper>
      <Prices ingredientsArr={prices} loading={loading} />
      <Burger
        totalPrice={orderPrice}
        ingredientAddingOrder={ingredientAddingOrder}
        loading={loading}
        openModal={openCloseModal}
      />
      <Controls
        loading={loading}
        ingredients={ingredientsArr}
        quantities={burgerCreator}
        updateBurger={changingAmountOfIngredients}
        clearAll={clearOrder}
      />
      <Modal
        modalActive={modalActive}
        cancel={openCloseModal}
        ingredients={ingredientsArr}
        quantities={burgerCreator}
        totalPrice={orderPrice}
        clearBurger={clearOrder}
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
