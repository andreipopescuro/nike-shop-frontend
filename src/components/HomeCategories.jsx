import styled from "styled-components";
import CategoryItem from "./HomeCategoryItem";
import { mobile, tablet } from "../lib/responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({
    padding: "0px",
    flexDirection: "column",
  })}
  ${tablet({
    padding: "0px",
  })}
`;
const Category = ({ categories, current }) => {
  return (
    <Container>
      {categories.map(
        (category, i) =>
          category.title === current && (
            <CategoryItem
              types={category.articleType}
              key={i}
              current={current}
            />
          )
      )}
    </Container>
  );
};

export default Category;
