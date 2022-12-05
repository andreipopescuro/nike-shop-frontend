import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";

const NotFoundContainer = styled.div`
  height: 50vh;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <NotFoundContainer>Sorry, page not found</NotFoundContainer>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default NotFound;
