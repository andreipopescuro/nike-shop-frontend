import {
  Facebook,
  GitHub,
  Instagram,
  MailOutline,
  Phone,
  Room,
} from "@mui/icons-material";
import { mobile, tablet } from "../lib/responsive";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
  ${tablet({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 20px;
`;

const Logo = styled.h1``;
const SocialContainer = styled.div`
  display: flex;
  gap: 10px;
  ${mobile({ justifyContent: "center" })}
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #${(props) => props.bg};
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 20px;
`;
const Footer = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Left>
        <Logo>NIKE</Logo>
        <SocialContainer>
          <SocialIcon bg="d8ab70">
            <Facebook />
          </SocialIcon>
          <SocialIcon bg="d13c3c">
            <Instagram />
          </SocialIcon>
          <SocialIcon bg="ed95db">
            <GitHub />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>{t("Useful links")}</Title>
        <List>
          <ListItem>
            <Link to="/"> {t("Home")} </Link>
          </ListItem>
          <ListItem>
            <Link to="/cart">{t("Cart")}</Link>
          </ListItem>
          <ListItem>{t("My account")}</ListItem>
          <ListItem>{t("Order tracking")}</ListItem>
          <ListItem>{t("Wish list")}</ListItem>
          <ListItem>{t("Terms")}</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room />
          102 Arch St. Rosedale, NY 11422
        </ContactItem>
        <ContactItem>
          <Phone />
          +01 234 567 890
        </ContactItem>
        <ContactItem>
          <MailOutline />
          site@example.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
