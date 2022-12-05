import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import ProductsOnMain from "./ProductOnMain";
import { useEffect, useState } from "react";
import { publicRequest } from "../lib/requestMethods";
import { useTranslation } from "react-i18next";
import { sl } from "../lib/responsive";
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const GenderController = styled.div`
  width: 100%;
  height: 70px;
  background-color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MainContentt = styled.div`
  flex: 1;
  display: flex;
  ${sl({
    flexDirection: "column",
  })}
`;

const FilterProducts = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  min-width: 150px;
  text-align: center;
  ${sl({
    flexDirection: "row",
    justifyContent: "center",
  })}
`;

const CurrentProducts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 30px;
  justify-content: space-between;
  ${sl({
    padding: "0",
    justifyContent: "center",
  })}
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  color: white;
  align-items: center;
  background-color: transparent;
  position: relative;
  &::after {
    width: 0%;
    content: "";
    background-color: white;
    border-radius: 1px;
    height: 2px;
    position: absolute;
    left: 0;
    bottom: -4px;
    transition: 0.5s;
  }
  &:hover::after {
    width: 100%;
  }
  &:hover {
    color: #c3c0c0;
  }
`;

const FilterButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  margin-bottom: 20px;
  text-align: left;
  cursor: pointer;
  &:hover {
    color: #c3c0c0;
  }
`;

const Main = () => {
  const { t } = useTranslation();

  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  const location = useLocation();
  const path = location.pathname;
  const searched = location.search;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (path.includes("filtered")) {
      const getProducts = async () => {
        const response = await publicRequest.get(
          `categories/${path}${searched}`
        );
        const data = await response.data;
        setProducts(data);
      };
      getProducts();
    } else {
      const getProducts = async () => {
        const response = await publicRequest.get(`categories/${path}`);
        const data = await response.data;
        setProducts(data);
      };
      getProducts();
    }
  }, [path, searched]);
  return (
    <Container className="dasdaasdsa">
      <GenderController>
        <Link to="/products/men">
          <Button>{t("Men")}</Button>
        </Link>
        <Link to="/products/women">
          <Button>{t("Women")}</Button>
        </Link>
        <Link to="/products/kids">
          <Button>{t("Kids")}</Button>
        </Link>
      </GenderController>
      <MainContentt>
        <FilterProducts>
          <Link
            to={
              path.includes("filtered")
                ? `${path}?type=imbracaminte`
                : `${path}/filtered?type=imbracaminte`
            }
          >
            <FilterButton name="Imbracaminte">{t("Clothing")}</FilterButton>
          </Link>
          <Link
            to={
              path.includes("filtered")
                ? `${path}?type=incaltaminte`
                : `${path}/filtered?type=incaltaminte`
            }
          >
            <FilterButton name="Incaltaminte">{t("Footwear")}</FilterButton>
          </Link>
          <Link
            to={
              path.includes("filtered")
                ? `${path}?type=accesorii`
                : `${path}/filtered?type=accesorii`
            }
          >
            <FilterButton name="Accesorii">{t("Accessory")}</FilterButton>
          </Link>
        </FilterProducts>
        <CurrentProducts>
          {products &&
            products.map((product) => (
              <ProductsOnMain product={product} key={product._id} />
            ))}
        </CurrentProducts>
      </MainContentt>
    </Container>
  );
};

export default Main;
