import { SearchRounded, ShoppingCartOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addProduct } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../lib/requestMethods";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 320px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e3e3e3;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: wheat;
  position: absolute;
`;
const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  transition: all 0.5s;
  &:hover {
    background-color: aliceblue;
    transform: scale(1.1);
  }
`;

const Product = ({ product }) => {
  let userId = useSelector((state) => state.user?.currentUser?._id);
  let username = useSelector((state) => state.user?.currentUser?.username);
  const total = useSelector((state) => state.cart?.total);
  const cartQuantity = useSelector((state) => state.cart?.quantity);
  const dispatch = useDispatch();
  const handleAddCart = async ({ product }) => {
    dispatch(addProduct({ ...product, quantity: 1 }));

    if (userId) {
      await userRequest.post("/cart", {
        userId: userId,
        username: username,
        products: { ...product, quantity: 1 },
        total: total + product.price,
        quantity: cartQuantity + 1,
      });
    }
  };
  return (
    <Container>
      <Circle />
      <Image src={product.img} />
      <Info>
        <Icon onClick={() => handleAddCart({ product })}>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${product._id}`}>
            <SearchRounded />
          </Link>
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
