import Announcements from "../components/Announcements";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  clearCart,
  removeFromCart,
} from "../redux/actions/tourActions";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  /* background-color: teal; */
  height: 100vh;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Hr = styled.hr`
  background-color: #eee;
  border: 1px soldi lightgray;
  height: 1px;
`;

const TourItem = styled.span`
  margin: 8px;
  font-size: 17px;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

function Cart() {
  const [stripeToken, setStripeToken] = useState(null);
  let navigate = useNavigate();

  const carts = useSelector((state) => state.allTours.carts);
  const dispatch = useDispatch();
  let total_price = 0;
  for (let i = 0; i < carts.length; i++) {
    total_price += carts[i].quantity * carts[i].payload.price;
  }
  const fromEuroToCent = (amount) => amount * 100;
  const KEY =
    "pk_test_51Jx6k1Hykzx5TwTuy9Cv10wJqA8P4WXdOvU55GCbRK15iqHiJu6zwH93OW3EELeXd03538j2GkOcjZBbCeloLIZV00eeeZDebD";

  const onToken = (token) => {
    console.log(token);
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await axios.post("/payment", {
          tokenId: stripeToken.id,
          amount: total_price * 100,
        });
        dispatch(clearCart());
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
    // eslint-disable-next-line
  }, [stripeToken]);

  return (
    <div>
      <Container>
        <Announcements />
        <NavBar />
        <Wrapper>
          <Title>Your Tours</Title>
          <Top>
            <Link
              to="/"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <TopButton>CONTINUE SHOPPING</TopButton>
            </Link>
          </Top>
          <Bottom>
            <Info>
              {carts.map(({ payload, quantity }) => (
                <div key={payload._id}>
                  <Product>
                    <ProductDetail>
                      <Details>
                        <TourItem>
                          <b>Tour Name:</b> {payload.name}
                        </TourItem>
                        <TourItem>
                          <b>Tour ID: </b> {payload._id}
                        </TourItem>
                        <TourItem>
                          <b>Tour Duration: </b> {payload.duration}
                        </TourItem>
                        <TourItem>
                          <b>Tour Difficulty:</b> {payload.difficulty}
                        </TourItem>
                        <TourItem>
                          <b>Tour Members: </b> {payload.maxGroupSize}
                        </TourItem>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Add
                          onClick={() => {
                            dispatch(addToCart(payload));
                          }}
                        />
                        <ProductAmount>{quantity}</ProductAmount>
                        <Remove
                          onClick={() => {
                            dispatch(removeFromCart(payload));
                          }}
                        />
                      </ProductAmountContainer>
                      <ProductPrice>${payload.price}</ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </div>
              ))}
            </Info>

            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {total_price}</SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
                name="Pradhapta Tours"
                billingAddress
                amount={fromEuroToCent(total_price)}
                token={onToken}
                stripeKey={KEY}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            </Summary>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
    </div>
  );
}

export default Cart;
