import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../lib/responsive";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({
    height: "25vh",
  })}
`;
const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: grey;
  cursor: pointer;
`;

const CategoryItem = ({ types, current }) => {
  const { t } = useTranslation();

  return (
    <>
      {types.map((item) => (
        <Container key={item._id} title={item.title}>
          <Link to={`/products/${current}/filtered?type=${item.title}`}>
            <Image src={item.img} />
            <Info>
              <Button>{t("SHOP NOW")}</Button>
            </Info>
          </Link>
        </Container>
      ))}
    </>
  );
};

export default CategoryItem;
