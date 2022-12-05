import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Badge from "@mui/material/Badge";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { mobile, sl } from "../lib/responsive";
import { tablet } from "../lib/responsive";
import { between } from "../lib/responsive";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { deleteCart } from "../redux/cartSlice";

import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import FetchProductsHook from "../lib/fetchProductsHook";
import { Backspace } from "@mui/icons-material";

const Container = styled.div`
  height: 60px;
  ${mobile({
    height: "50px",
  })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({
    padding: "0px 0px",
    height: "100%",
  })}
  ${tablet({
    padding: "0px 8px",
    height: "100%",
  })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SerchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-left: 25px;
  width: 300px;
  ${tablet({
    width: "200px",
  })}
  ${between({
    display: "none",
  })}
`;

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-family: inherit;
`;

const Center = styled.div`
  flex: 1;
`;

const Logo = styled.div``;

const ImgWrapper = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  height: 100%;
  object-fit: contain;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({
    justifyContent: "center",
    padding: "10px",
  })}
  ${tablet({
    justifyContent: "end",
  })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({
    fontSize: "12px",
    marginLeft: "10px",
  })}
`;

const UserWrapper = styled.div`
  text-transform: capitalize;
  flex: 1;
  text-align: right;
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
  ${sl({
    gap: "5px",
  })}
  ${between({
    flexDirection: "column",
  })}
`;
const NoUserWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  ${mobile({
    flex: "2",
    justifyContent: "center",
  })}
`;

const Logout = styled.div`
  color: orangered;
  cursor: pointer;
`;

const User = styled.div`
  position: relative;
  color: teal;
`;

const Language = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Selected = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 0 4px black;
  &:before {
    content: "";
    display: block;
    width: 30px;
    height: 30px;
    background-image: url(${(props) => props.url});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  &:hover {
    display: block;
  }
`;

const InputWrapper = styled.div`
  border: 1px solid grey;
  border-radius: 4px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Item = styled.div`
  padding: 16px;
  height: 120px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 2px;
  &:hover {
    background-color: hsl(0, 0%, 6.2745098039215685%);
  }
`;

const ResultWrapper = styled.div`
  background-color: #323131;
  color: white;
  position: absolute;
  top: 140%;
  left: 0;
  z-index: 10;
  width: 200%;
  max-height: 400px;
  border-radius: 6px;
  overflow-y: auto;
  ${sl({
    left: "-50px  ",
  })}
`;

const ItemImgWrapper = styled.div`
  width: 60px;
`;
const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const ItemDescWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const ItemTitleInfo = styled.div`
  color: grey;
`;
const ItemTitle = styled.div``;
const ItemPriceInfo = styled.div`
  color: grey;
`;
const ItemPrice = styled.div``;

const Navbar = () => {
  const { data } = FetchProductsHook();
  const [searched, setSearched] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const handleLogout = async () => {
    try {
      localStorage.removeItem("persist:root");
      dispatch(logoutUser());
      dispatch(deleteCart());
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const [results, setResults] = useState([]);
  const products = data;

  const handleInput = (e) => {
    setSearched((prev) => (prev = e.target.value));
  };

  useEffect(() => {
    if (searched.trim().toLowerCase() !== "") {
      const filter = products.filter((item) =>
        item.title.toLowerCase().includes(searched.trim())
      );
      if (filter.length > 0) {
        setResults(filter);
      } else {
        setResults("Nothing");
      }
    } else {
      setResults([]);
    }
  }, [searched]);

  const handleNavigateProduct = () => {
    setSearched("");
  };

  return (
    <Container className="cont">
      <Wrapper>
        <Left>
          <Language>
            <Selected
              url={
                "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/383px-Flag_of_the_United_Kingdom.svg.png"
              }
              onClick={() => i18next.changeLanguage("en")}
              title="EN"
            ></Selected>
            <Selected
              title="RO"
              url={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/383px-Flag_of_Romania.svg.png"
              }
              onClick={() => i18next.changeLanguage("ro")}
            ></Selected>
          </Language>
          <SerchContainer>
            <InputWrapper>
              <Input
                placeholder="Search for a product"
                onChange={handleInput}
                value={searched}
              />
              {searched ? (
                <Backspace
                  style={{ color: "gray", fontSize: 20, cursor: "pointer" }}
                  onClick={() => setSearched("")}
                ></Backspace>
              ) : (
                <SearchOutlinedIcon style={{ color: "gray", fontSize: 20 }} />
              )}
            </InputWrapper>
            <ResultWrapper>
              {results !== "Nothing" ? (
                results.map((item) => (
                  <Link to={`/product/${item._id}`} key={item._id}>
                    <Item
                      onClick={handleNavigateProduct}
                      className="result-item"
                    >
                      <ItemImgWrapper>
                        <ItemImg src={item.img} />
                      </ItemImgWrapper>
                      <ItemDescWrapper>
                        <ItemTitleInfo>Denumire produs</ItemTitleInfo>
                        <ItemTitle>{item.title}</ItemTitle>
                      </ItemDescWrapper>
                      <ItemDescWrapper>
                        <ItemPriceInfo>Pret</ItemPriceInfo>
                        <ItemPrice>$ {item.price}</ItemPrice>
                      </ItemDescWrapper>
                    </Item>
                  </Link>
                ))
              ) : (
                <Item className="result-item">
                  {t("Your search does not match")}
                </Item>
              )}
            </ResultWrapper>
          </SerchContainer>
        </Left>
        <Center>
          <Link to="/">
            <Logo>
              <ImgWrapper>
                <Img src="https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg" />
              </ImgWrapper>
            </Logo>
          </Link>
        </Center>
        <Right>
          {user ? (
            <UserWrapper>
              <User>
                <Link to={`/dashboard/${user._id}`}>{t("Profile")}</Link>
              </User>
              <Logout onClick={handleLogout}>{t("Logout")}</Logout>
            </UserWrapper>
          ) : (
            <NoUserWrapper>
              <MenuItem>
                <Link to="/login">{t("LOGIN")}</Link>
              </MenuItem>
            </NoUserWrapper>
          )}
          <MenuItem>
            <Link to="/cart">
              <Badge badgeContent={quantity} color="primary">
                <AddShoppingCartIcon color="action" />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
