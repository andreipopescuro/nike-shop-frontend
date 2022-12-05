import { SendOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../lib/responsive";

const Container = styled.div`
  height: 60vh;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 60px;
  margin-bottom: 20px;
`;
const Description = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;

  ${mobile({
    textAlign: "center",
  })}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid grey;
  ${mobile({
    width: "80%",
  })}
`;
const Input = styled.input`
  border: none;
  outline: none;
  flex: 8;
  padding-left: 20px;
`;
const Button = styled.button`
  border: none;
  background-color: teal;
  flex: 1;
  color: white;
`;
const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>
        Aboneaza-te pentru a afla primul de produsle noi
      </Description>
      <InputContainer>
        <Input placeholder="Email..." />
        <Button>
          <SendOutlined />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
