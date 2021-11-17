import Announcements from "../components/Announcements.jsx";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  selectedTour,
  removeSelectedTour,
  addToCart,
} from "../redux/actions/tourActions";
import axios from "../api/axios";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
`;

const ImgContainer = styled.div``;

const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  padding: 0px 50px;
  margin-top: 3rem;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 40px;
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 18px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const TourDetails = styled.div`
  margin: 2rem 0px;
  /* margin-top: 2rem; */

  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Subtitle = styled.span`
  font-size: 26px;
  font-weight: bold;
  margin: 1rem 0rem;
`;

const TourItem = styled.span`
  margin-top: -1px;
  margin: 10px;
  font-size: 17px;
`;

function Tour() {
  const dispatch = useDispatch();
  const tour = useSelector((state) => state.tour);

  const { tourID } = useParams();
  async function getTourDetail() {
    const res = await axios.get(`/tours/${tourID}`);
    dispatch(selectedTour(res.data.tour));
  }

  useEffect(() => {
    if (tourID && tourID !== "") getTourDetail();
    return () => {
      dispatch(removeSelectedTour());
    };
     // eslint-disable-next-line
  }, [dispatch]);

  return (
    <Container>
      <Announcements />
      <NavBar />
      {Object.keys(tour).length === 0 ? (
        <div>Loading....</div>
      ) : (
        <Wrapper>
          <ImgContainer>
            <Image src={tour.images} />
          </ImgContainer>
          <InfoContainer>
            <Title>{tour.name}</Title>
            <Desc>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
              amet purus gravida quis blandit. Quam pellentesque nec nam aliquam
              sem et tortor consequat id. Pulvinar proin gravida hendrerit
              lectus a. Pellentesque adipiscing commodo elit at imperdiet. Vitae
              suscipit tellus mauris a diam. Amet commodo nulla facilisi nullam
              vehicula ipsum a arcu cursus. Id diam maecenas ultricies mi eget
              mauris pharetra. Quis enim lobortis scelerisque fermentum dui
              faucibus in. Purus ut faucibus pulvinar elementum integer enim.
              Arcu cursus vitae congue mauris. Tellus molestie nunc non blandit
              massa. Maecenas accumsan lacus vel facilisis volutpat. Ullamcorper
              velit sed ullamcorper morbi tincidunt ornare massa eget egestas.
              Posuere lorem ipsum dolor sit.
            </Desc>

            <Desc>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
              amet purus gravida quis blandit. Quam pellentesque nec nam aliquam
              sem et tortor consequat id. Pulvinar proin gravida hendrerit
              lectus a. Pellentesque adipiscing commodo elit at imperdiet. Vitae
              suscipit tellus mauris a diam. Amet commodo nulla facilisi nullam
              vehicula ipsum a arcu cursus. Id diam maecenas ultricies mi eget
              mauris pharetra. Quis enim lobortis scelerisque fermentum dui
              faucibus in. Purus ut faucibus pulvinar elementum integer enim.
              Arcu cursus vitae congue mauris. Tellus molestie nunc non blandit
              massa. Maecenas accumsan lacus vel facilisis volutpat. Ullamcorper
              velit sed ullamcorper morbi tincidunt ornare massa eget egestas.
              Posuere lorem ipsum dolor sit.
            </Desc>

            <TourDetails>
              <Subtitle>Package Details</Subtitle>
              <TourItem>
                <b>Tour ID: </b> {tour._id}
              </TourItem>
              <TourItem>
                <b>Tour Duration: </b> {tour.duration} days
              </TourItem>
              <TourItem>
                <b>Difficulty:</b> {tour.difficulty}
              </TourItem>
              <TourItem>
                <b>Max Group Memebers: </b> {tour.maxGroupSize}
              </TourItem>
              <TourItem>
                <b>Ratings: </b> {tour.ratingsAverage}
              </TourItem>
              <TourItem>
                <b>Price: </b> {tour.price}
              </TourItem>
              <TourItem>
                <b>Stops: </b> {tour.stops} stops
              </TourItem>
              <TourItem>
                <b>Location: </b> {tour.location}
              </TourItem>
              <TourItem>
                <b>Start Date: </b> {tour.startDates}
              </TourItem>
            </TourDetails>

            <AddContainer>
              <Link
                to="/carts"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button
                  onClick={() => {
                    dispatch(addToCart(tour));
                  }}
                >
                  BOOK NOW
                </Button>
              </Link>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
      <Footer />
    </Container>
  );
}

export default Tour;
