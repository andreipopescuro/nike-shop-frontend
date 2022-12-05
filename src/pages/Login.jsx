import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile, tablet } from "../lib/responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://c.static-nike.com/a/images/w_1920,c_limit/mdbgldn6yg1gg88jomci/image.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "85%" })}
  ${tablet({ width: "55%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: black;
    cursor: not-allowed;
  }
  ${mobile({ padding: "5px" })}
`;

const Linkk = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, errorMessage } = useSelector(
    (state) => state.user
  );

  const handleClick = async (e) => {
    e.preventDefault();
    await login(dispatch, { username, password });
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            autoComplete="true"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            autoComplete="true"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>{errorMessage}</Error>}
          <Link to="/register">
            <Linkk>CREATE A NEW ACCOUNT</Linkk>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
