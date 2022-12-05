import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import ProductContent from "../components/ProductContent";
import RS from "../components/RecommendedSlider";

const Contaier = styled.div``;
const SingleProduct = () => {
  const user = useSelector((state) => state.user?.currentUser);

  return (
    <Contaier>
      <Navbar />
      <ProductContent />
      {!user && <Newsletter />}
      <Footer />
    </Contaier>
  );
};

export default SingleProduct;
