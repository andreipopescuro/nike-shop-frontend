import { Done, SentimentVerySatisfied } from "@mui/icons-material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userRequest } from "../lib/requestMethods";
// import { publicRequest, userRequest } from "../lib/requestMethods";
import { runFireworks } from "../lib/utils";
import { deleteCart } from "../redux/cartSlice";
// import { deleteCart } from "../redux/cartSlice";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f4fc8a;
`;

const Wrapper = styled.div`
  width: 350px;
  background-color: #222b2b;
  border-radius: 10px;
  box-shadow: 0 0 4px 2px black;
  padding: 30px;
`;
const ThankYou = styled.div`
  color: gold !important;
`;
const SuccesWrapper = styled.div`
  color: green;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 6px;
`;

const Button = styled.button`
  padding: 6px 10px;
  color: white;
  background-color: black;
  font-family: inherit;
  font-size: 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    color: black;
    background-color: white;
    scale: 1.1;
    transition: all 0.5s;
  }
`;
const Para = styled.div`
  margin: 40px 0px;
  font-size: 20px;
  color: grey;
`;

const Succes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.currentUser);
  useEffect(() => {
    runFireworks();
    const resetCart = async () => {
      try {
        if (user) {
          await userRequest.delete(`/cart/${user._id}`);
          dispatch(deleteCart());
        } else {
          dispatch(deleteCart());
        }
      } catch (error) {}
    };
    resetCart();
  }, []);
  return (
    <Container>
      <Wrapper>
        <SentimentVerySatisfied style={{ color: "white", fontSize: 32 }} />
        <SuccesWrapper>
          <ThankYou>Thank you for your order !</ThankYou>
          <Done />
        </SuccesWrapper>
        <Para>Check you email inbox for the recipt.</Para>
        <Buttons>
          {user && (
            <Link to={`/dashboard/${user._id}`}>
              <Button>Review your order</Button>
            </Link>
          )}
          <Link to="/">
            <Button>Back to home page</Button>
          </Link>
        </Buttons>
      </Wrapper>
    </Container>
  );
};

export default Succes;
