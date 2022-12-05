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
  height: 350px;
  display: flex;
  flex-direction: column;
  flex-basis: 250px;
  position: relative;
  padding: 16px;
  &:hover ${Info} {
    opacity: 1;
  }
`;
const ImgContainer = styled.div`
  width: 100%;
  height: 70%;
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Title = styled.div`
  margin: 4px 0px;
`;
const Price = styled.div`
  color: grey;
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

const ProductsOnMain = ({ product }) => {
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
      <ImgContainer>
        <Image src={product.img} />
      </ImgContainer>
      <Title>{product.title}</Title>
      <Price>$ {product.price}</Price>
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

export default ProductsOnMain;
