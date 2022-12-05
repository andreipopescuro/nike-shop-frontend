import styled from "styled-components";
import Footer from "../components/Footer";
import Main from "../components/ProductsMain";
import Navbar from "../components/Navbar";

const Container = styled.div``;

const ProductList = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  return (
    <Container>
      <Navbar />
      <Main />
      <Footer />
    </Container>
  );
};

export default ProductList;
