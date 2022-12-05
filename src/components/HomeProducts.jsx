import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductsEffect from "./HomeEffectProducts";
import axios from "axios";
import { sl, tablet } from "../lib/responsive";
import { publicRequest } from "../lib/requestMethods";

const Container = styled.div`
  overflow: hidden;
  ${sl({
    display: "none",
  })}
`;

const Products = ({ current }) => {
  const [products, setProducts] = useState([]);
  const [gotReq, setGotReq] = useState(false);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await publicRequest.get(
          `/categories/products/${current}/limit`
        );
        const data = await response.data;
        setProducts(data);
        setGotReq(true);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [current, gotReq]);
  return (
    <Container>
      <ProductsEffect />
      {<ProductsEffect products={products} />}
    </Container>
  );
};

export default Products;
