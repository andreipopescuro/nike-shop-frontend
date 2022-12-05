import { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { publicRequest } from "../lib/requestMethods";
import { mobile, tablet } from "../lib/responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.556),
      rgba(255, 255, 255, 0.708)
    ),
    url("https://c4.wallpaperflare.com/wallpaper/271/975/690/nike-psychedelic-sneakers-swaggy-wallpaper-preview.jpg")
      center no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
  ${tablet({ width: "65%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 55%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  max-width: 80%;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Span = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const Register = () => {
  const [inputs, setInputs] = useState({});
  const [span, setSpan] = useState();
  const handleInput = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleRegister = async (e) => {
    console.log(inputs);
    e.preventDefault();
    try {
      await publicRequest
        .post("/auth/register", { ...inputs })
        .then((response) => {
          setInputs({});
          setSpan("success");
        });
    } catch (error) {
      setInputs({});
      setSpan("fail");
      console.log(error);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleRegister}>
          <Input
            placeholder="username"
            name="username"
            required
            onChange={handleInput}
            minLength="6"
            type="text"
            autoComplete="true"
          />
          <Input
            name="password"
            placeholder="password"
            required
            onChange={handleInput}
            minLength="6"
            type="password"
            autoComplete="true"
          />
          <Input
            placeholder="email"
            name="email"
            type="email"
            required
            onChange={handleInput}
            autoComplete="true"
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
        <Span>{span === "success" && "Succesfully created account!"}</Span>
        <Span>{span === "fail" && "An error occurred!"}</Span>
      </Wrapper>
    </Container>
  );
};

export default Register;
