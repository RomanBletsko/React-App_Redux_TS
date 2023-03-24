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
import { PricesType } from "../../features/priceSlice"
import { PayloadAction } from "@reduxjs/toolkit";
import { media } from "../../Utils/Responsive";

const Main:React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredient()).then((responce:PayloadAction<PricesType[]>) => {
      const data = responce.payload;
      const quantitie = data.reduce(
        (acc, curr) => ({ [curr.name]: 0, ...acc }),
        {}
      );
      dispatch(addQuantitie(quantitie));
    });
  }, [dispatch]);



  return (
    <Wrapper>
      <Prices />
      <Burger
      />
      <Controls
      />
      <Modal
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 15% 70% 15%;
  // height:  80%;
  background: rgba(49, 47, 48, 0.8);
  text-align: center;
  padding: 0;
  border-radius: 5px;
  box-shadow: 7px 10px 5px #fa5f064d;
  ${media.tablet}{
    grid-template-columns: 170px auto 170px;
  }
  ${media.phone}{
    grid-template-rows: 60% 40% ;
    grid-template-columns: 100%;
  }
`;

export default Main;
