import { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { tablet } from "../lib/responsive";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  background-color: rgba(0, 0, 0, 0.549);
  overflow: hidden;
  ${tablet({
    height: "50vh",
  })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease-in-out;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  ${tablet({
    height: "50vh",
  })}
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(#36454f, #818589);
  ${tablet({
    height: "50vh",
    textAlign: "center",
  })}
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1.6;
  position: relative;
  ${tablet({
    display: "none",
  })}
`;

const BlackShadow = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 333;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const InfoContainer = styled.div`
  padding: 50px;
  flex: 1;
`;

const Title = styled.h1`
  font-size: 60px;
  text-transform: capitalize;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  border-color: black;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: black;
    color: white;
    border-color: white;
  }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fafafa;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  opacity: 0.7;
  cursor: pointer;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  z-index: 2;
  ${tablet({
    width: "35px",
    height: "35px",
  })}
`;
const Slider = ({ categories, onCh }) => {
  const { t } = useTranslation();

  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  useEffect(() => {
    if (categories.length > 1) {
      onCh(categories[slideIndex].title);
    }
  }, [slideIndex, categories, onCh]);

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowBackIosIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {categories.map((slide) => (
          <Slide key={slide._id} bg={slideIndex}>
            <ImgContainer>
              <Image src={slide.img} />
              <BlackShadow />
            </ImgContainer>
            <InfoContainer>
              <Title>Nike {t(slide.title)}</Title>
              <Link to={`/products/${slide.title}`}>
                <Button>{t("Show Products")}</Button>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardIosIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
