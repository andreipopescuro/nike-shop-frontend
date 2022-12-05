import { Add, Delete, Remove } from "@mui/icons-material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { between, big, mobile, sl, tablet } from "../lib/responsive";
import { publicRequest, userRequest } from "../lib/requestMethods";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addMoreQuantity,
  deleteCart,
  deleteProduct,
  reduceMoreQuantity,
} from "../redux/cartSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "red" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  ${between({ flexDirection: "column" })}
  ${tablet({ padding: "4px" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  ${tablet({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${sl({ flexDirection: "column", alignItems: "center" })}
`;

const Image = styled.img`
  width: 200px;
  ${big({ width: "150px" })}
  ${sl({ width: "100px" })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  color: grey;
`;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${tablet({ flexDirection: "row", gap: "10px" })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${tablet({ marginBottom: "0" })}
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  /* ${mobile({ marginBottom: "20px" })} */
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    scale: 1.05;
  }
`;

const DeleteFromCart = styled.button`
  margin-top: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  background-color: #f0774b;
  border: none;
  border-radius: 4px;
  gap: 4px;
  cursor: pointer;
  color: red;
`;
const DeleteText = styled.div`
  font-size: 16px;
  color: white;
`;

const Err = styled.div``;

const Cart = () => {
  const { t } = useTranslation();

  const cart = useSelector((state) => state.cart);

  const userId = useSelector((state) => state.user?.currentUser?._id);
  const user = useSelector((state) => state.user?.currentUser);

  const [cartErr, setCartErr] = useState("");

  const dispatch = useDispatch();

  const handleCheckout = async () => {
    await userRequest
      .post("/checkout/payment", {
        userId: user?._id || "new user",
        username: user?.username || "new user",
        products: cart.products,
        quantity: cart.quantity,
        total: cart.total,
      })
      .then((resp) => {
        if (resp.data.url) {
          window.location.href = resp.data.url;
        } else {
          console.log(resp.data);
          setCartErr(resp.data);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleDeleteProduct = async (id, quantity, price) => {
    dispatch(deleteProduct({ id: id, quantity: quantity, price: price }));
    console.log(quantity);
    await publicRequest.post(`/cart/${userId}/${id}`, {
      totalToDecrease: quantity * price,
    });
  };

  const handleDeleteCart = async () => {
    dispatch(deleteCart());
    await userRequest.delete(`/cart/${userId}`);
  };

  const handleQuantity = (type, id, quantity, price) => {
    if (type === "dec") {
      if (quantity > 1) {
        dispatch(
          reduceMoreQuantity({
            id: id,
            quantity: quantity,
            price: price,
          })
        );
      }
    } else {
      dispatch(
        addMoreQuantity({
          id: id,
          quantity: quantity,
          price: price,
        })
      );
    }
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>{t("YOUR BAG")}</Title>
        <Top>
          <Link to="/">
            <TopButton>{t("CONTINUE SHOPPING")}</TopButton>
          </Link>
          <TopTexts>
            <TopText>
              {t("Products")}({cart.quantity})
            </TopText>
            <TopText>{t("Your Wishlist")} (0)</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={handleDeleteCart}>
            {t("Delete Cart")}
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products?.length > 0 ? (
              cart.products.map((product) => (
                <Product key={product._id}>
                  <ProductDetail className="cacat">
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>
                          {t("Product")}: {product.title}
                        </b>
                      </ProductName>
                      <ProductId>
                        <b>ID: {product._id}</b>
                      </ProductId>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add
                        className="cursor"
                        onClick={() =>
                          handleQuantity(
                            "inc",
                            product._id,
                            product.quantity,
                            product.price
                          )
                        }
                      />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove
                        className="cursor"
                        onClick={() =>
                          handleQuantity(
                            "dec",
                            product._id,
                            product.quantity,
                            product.price
                          )
                        }
                      />
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                    <DeleteFromCart
                      onClick={() =>
                        handleDeleteProduct(
                          product._id,
                          product.quantity,
                          product.price
                        )
                      }
                    >
                      <DeleteText>{t("Delete")}</DeleteText>
                      <Delete></Delete>
                    </DeleteFromCart>
                  </PriceDetail>
                </Product>
              ))
            ) : (
              <div>{t("Your cart is empty.")}</div>
            )}
            <Err>{cartErr}</Err>
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>{t("ORDER SUMMARY")}</SummaryTitle>
            {t("Free shipping for orders over $100")}
            <SummaryItem>
              <SummaryItemText>{t("Subtotal ")}</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>{t("Estimated Shipping")}</SummaryItemText>
              <SummaryItemPrice>$ {cart.total > 0 ? 5 : 0}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>{t("Shipping Discount")}</SummaryItemText>
              <SummaryItemPrice>$ {cart.total > 100 ? 5 : 0}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                $
                {cart.total > 0
                  ? cart.total > 100
                    ? cart.total
                    : cart.total + 5
                  : 0}
              </SummaryItemPrice>
            </SummaryItem>
            <Button onClick={() => handleCheckout()}>
              {t("CHECKOUT NOW")}
            </Button>
            {cartErr && "Try to purchase one product."}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
