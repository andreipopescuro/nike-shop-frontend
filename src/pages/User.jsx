import {
  ExpandCircleDown,
  KeyboardArrowDownOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { userRequest } from "../lib/requestMethods";
import { useTranslation } from "react-i18next";
import { sl } from "../lib/responsive";
import TimeAgo from "timeago-react";
const Message = styled.div`
  margin-top: 16px;
  color: ${(props) => props.color};
`;

const Status = styled.div`
  color: ${(props) =>
    props.status === "pending"
      ? "blue"
      : props.status === "canceled"
      ? "orangered"
      : "green"};
  font-weight: bold;
`;

const Container = styled.div`
  min-height: 80vh;
  display: flex;
  ${sl({
    flexDirection: "column-reverse",
  })}
`;

const Bar = styled.div`
  ${sl({
    flexDirection: "column",
  })}
`;

const Expand = styled.div`
  width: fit-content;
  cursor: pointer;
  text-align: center;
  background-color: transparent;
  transition: 0.5s;
  margin: 0 20px;

  &:hover {
    color: black;
  }
`;

const Products = styled.div`
  display: none;
`;
const ForgotPassText = styled.div`
  font-size: 20px;
  margin: 10px 16px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 6px;
  &:hover {
    background-color: rgba(92, 88, 88, 0.5);
  }
`;

const FormWrapper = styled.div`
  padding: 20px;
`;

const Sts = styled.div`
  ${sl({
    gap: "4px",
  })}
`;

const User = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const ID = location.pathname.split("/")[2];
  const username = useSelector((state) => state?.user?.currentUser?.username);
  const userId = useSelector((state) => state.user?.currentUser?._id);

  if (ID !== userId) {
    window.location.href = "/";
  }

  const [orders, setOrders] = useState([]);

  const [status, setStatus] = useState();

  const [activeForm, setActiveForm] = useState(false);
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [attempt, setAttempt] = useState("");

  useEffect(() => {
    const getOrders = async () => {
      const orders = await userRequest.get(`/orders/${userId}`);
      setOrders(orders.data);
      setStatus("");
    };
    getOrders();
  }, [status]);

  console.log(orders);

  const handleChange = async (e) => {
    e.preventDefault();
    if (pass === confirm) {
      await userRequest
        .post(`/users/${userId}`, {
          password: pass,
        })
        .then(() => {
          setAttempt("You have successfully changed your password!");
          setConfirm("");
          setPass("");
        });
    } else {
      setAttempt("Password does not match!");
      setPass("");
      setConfirm("");
    }
  };

  const handleActiveForm = () => {
    setActiveForm(!activeForm);
  };

  const handleExpand = (e) => {
    let currentProductsContainer =
      e.target.parentElement.parentElement.parentElement.parentElement
        .nextElementSibling;

    if (currentProductsContainer === null) {
      currentProductsContainer =
        e.target.parentElement.parentElement.parentElement.nextElementSibling;
    }
    if (currentProductsContainer?.id === "active") {
      currentProductsContainer.id = "";
    } else {
      currentProductsContainer.id = "active";
    }
  };

  const handleCancelOrder = async (id) => {
    await userRequest
      .put(`/orders/changeStatus/${userId}/${id}`)
      .then((resp) => setStatus(resp.data.status));
  };
  return (
    <>
      <Navbar />

      <Container className="container">
        <div className="orders-wrapper">
          <div className="title">{t("Orders")}</div>
          <div className="content">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div className="order" key={order._id}>
                  <Bar className="bar">
                    <div className="id">
                      <div className="property">ID:</div>
                      <div className="value"> {order._id}</div>
                    </div>
                    <Sts className="status">
                      <div className="property">Status: </div>
                      <Status className="value" status={order.status}>
                        {t(order.status)}
                      </Status>
                      <Expand>
                        <ExpandCircleDown
                          onClick={handleExpand}
                          style={{ fontSize: 32 }}
                        />
                      </Expand>
                      <div className="cancel-order-wrapper">
                        <button
                          disabled={order.status !== "pending"}
                          className="cancel-button"
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          {t("Cancel")}
                        </button>
                      </div>
                    </Sts>
                  </Bar>

                  <Products className="products">
                    {order.products.map((product) => (
                      <div className="product" key={product._id}>
                        <div className="info-product">
                          <div className="img-container">
                            <img src={product.img} className="img" alt="" />
                          </div>
                          <div className="product-title fl">
                            <div className="headtype">{t("Product")}</div>
                            <div className="val">{product.title}</div>
                          </div>
                          <div className="product-price fl">
                            <div className="headtype">{t("Price")}</div>
                            <div className="val">$ {product.price}</div>
                          </div>
                          <div className="product-quantity fl">
                            <div className="headtype">{t("Quantity")}</div>
                            <div className="val">{product.quantity}</div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="info-total">
                      <div className="total-products">
                        {t("Products")}: {order.quantity}
                      </div>
                      <div className="total">Total: $ {order.total}</div>
                    </div>
                  </Products>
                  <div className="date">
                    <TimeAgo datetime={order.createdAt} />
                  </div>
                </div>
              ))
            ) : (
              <div>{t("You dont have orders yet.")}</div>
            )}
          </div>
        </div>
        <div className="account-wrapper">
          <div className="title">{t("Account")}</div>
          <div className="username" style={{ textAlign: "center" }}>
            {username}
          </div>
          <ForgotPassText onClick={handleActiveForm}>
            {t("Change password")}?
            <KeyboardArrowDownOutlined />
          </ForgotPassText>
          <FormWrapper className={activeForm ? "active" : "inactive"}>
            <form>
              <div className="input-section">
                <label htmlFor="password">{t("New password")}</label>
                <input
                  type="password"
                  id="password"
                  autoComplete="true"
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                  name="password"
                  minLength="6"
                />
              </div>
              <div className="input-section">
                <label htmlFor="confirmPassword">
                  {t("Confirm new password")}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  autoComplete="true"
                  onChange={(e) => setConfirm(e.target.value)}
                  value={confirm}
                />
              </div>
              <div className="confirm-btn" onClick={handleChange}>
                <button className="change-pass-btn">{t("Confirm")}</button>
              </div>
              <Message
                color={attempt.includes("successfully") ? "green" : "red"}
              >
                {attempt}
              </Message>
            </form>
          </FormWrapper>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default User;
