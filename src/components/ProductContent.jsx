import {
  ArrowBack,
  ArrowForward,
  FavoriteBorderOutlined,
  ShoppingCart,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { publicRequest, userRequest } from "../lib/requestMethods";
import { addProduct } from "../redux/cartSlice";
import { useTranslation } from "react-i18next";
import RS from "./RecommendedSlider";
import { mobile, sl, tablet, between } from "../lib/responsive";

const Container = styled.div`
  min-height: 80vh;
  background-color: rgba(64, 90, 130, 0.392);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  ${mobile({
    padding: "80px 10px",
    rowGap: "30px",
  })}
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  width: 23vw;
  height: 23vw;
  border-radius: 20px;
  box-shadow: 0 0 4px;
`;
const Information = styled.div`
  flex: 1;
  ${sl({
    padding: "20px",
  })}
`;
const Title = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;
const Description = styled.div``;

const Price = styled.div`
  font-weight: 700;
  font-size: 32px;
  margin: 20px 0px;
  ${mobile({
    fontSize: "18px",
    margin: "",
  })}
`;

const Amount = styled.span``;
const H1 = styled.h1`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0;
  margin-bottom: 10px;
  color: whitesmoke;
  ${mobile({
    fontSize: "18px",
  })}
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 40px;
  ${mobile({
    marginBottom: "20px",
  })}
`;
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const Add = styled.button`
  display: flex;
  cursor: pointer;
  align-items: center;
  background-color: transparent;
  gap: 10px;
  font-size: 20px;
  padding: 8px;
  &:hover {
    background-color: black;
    color: white;
  }
  ${sl({
    fontSize: "14px",
    padding: "4px",
  })}
`;

const Favorite = styled.span`
  cursor: pointer;
`;

const RecommandedProducts = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  width: 33%;
  height: 100%;
  padding: 20px;
  ${sl({
    width: "100%",
  })}
`;

const ProductContent = () => {
  const { t } = useTranslation();

  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  let userId = useSelector((state) => state.user?.currentUser?._id);
  let username = useSelector((state) => state.user?.currentUser?.username);
  const cartQuantity = useSelector((state) => state.cart?.quantity);

  const total = useSelector((state) => state.cart?.total);
  const dispatch = useDispatch();

  const [product, setItem] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);

  const productId = location.pathname.split("/").slice(-1).toString();

  useEffect(() => {
    const getItem = async () => {
      const response = await publicRequest.get(
        `/categories/find?itemId=${productId}`
      );
      const data = await response.data;
      setItem(data);
    };
    const getRecommended = async () => {
      const response = await publicRequest.get(
        `/categories/recommended?itemId=${productId}`
      );
      const data = await response.data;
      setRecommended(data);
    };
    getItem();
    getRecommended();
  }, [productId]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleAddCart = async () => {
    dispatch(addProduct({ ...product[0], quantity }));
    if (userId) {
      await userRequest.post("/cart", {
        userId: userId,
        username: username,
        products: { ...product[0], quantity: quantity },
        total: total + product[0].price * quantity,
        quantity: cartQuantity + 1,
      });
    }
  };
  return (
    <>
      {product[0] && (
        <Container>
          <ImgContainer>
            <Image src={product[0].img} />
          </ImgContainer>
          <Information>
            <Title>{product[0].title}</Title>
            <Description>{product[0].desc}</Description>
            <Price>{product[0].price}$</Price>
            <CountContainer>
              <ArrowBack onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <ArrowForward onClick={() => handleQuantity("inc")} />
            </CountContainer>
            <AddContainer>
              <Add onClick={() => handleAddCart()}>
                {t("ADD TO CART")}
                <ShoppingCart />
              </Add>
              <Favorite>
                <FavoriteBorderOutlined />
              </Favorite>
            </AddContainer>
          </Information>
          <RecommandedProducts className="rec">
            <H1>You may also like</H1>
            <RS recommended={recommended} />
          </RecommandedProducts>
        </Container>
      )}
    </>
  );
};

export default ProductContent;
