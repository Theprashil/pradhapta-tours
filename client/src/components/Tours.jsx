import React from "react";
import { useEffect } from "react";
import axios from "../api/axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setToursToStore } from "../redux/actions/tourActions";
import { Link } from "react-router-dom";

//icons
import RoomIcon from "@mui/icons-material/Room";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FlagIcon from "@mui/icons-material/Flag";
import PersonIcon from "@mui/icons-material/Person";

const Main = styled.main`
  background-color: #f7f7f7;
  padding: 8rem 6rem;
  flex: 1;
  position: relative;
`;
const CardContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 7rem;
`;
const Card = styled.div`
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: 0.3s all;
`;
const CardHeader = styled.div`
  position: relative;
`;
const CardPicture = styled.div`
  position: relative;
  clip-path: polygon(0 0, 100% 0%, 100% 83%, 0% 98%);
  height: 19rem;
`;
const CardPictureOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  background-image: linear-gradient(to right bottom, #41977d, #19a87b);
  opacity: 0.4;
  //
`;
const Image = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;
const HeadingTer = styled.h3`
  color: black;
  text-transform: uppercase;
  font-weight: 900;
`;
const Title = styled.span`
  font-size: 30px;
  margin-left: 1rem;
`;
const DownTitle = styled.span`
  font-size: 14px;
`;
const CardDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 0.9rem;
  grid-column-gap: 2rem;
  padding: 2rem 3rem;
`;
const CardSubHeading = styled.h4`
  font-size: 0.9rem;
  text-transform: uppercase;
  font-weight: 300;
`;
const CardText = styled.p`
  grid-column: 1 / -1;
  font-size: 1rem;
  font-style: italic;
  margin-top: -1rem;
  margin-bottom: 0.75rem;
`;
const CardData = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
`;
const CardIcon = styled.svg`
  margin-right: 0.7rem;
  height: 1.5rem;
  width: 2rem;
`;
const CardFooter = styled.div`
  background-color: white;
  font-size: 1.2rem;
  display: grid;
  grid-row-gap: 1rem;
  margin: 0rem 1.8rem;
`;
const DownPara = styled.p`
  margin-bottom: -0.1rem;
`;
const CardFooterVal = styled.span`
  font-weight: 600;
`;
const CardFooterText = styled.span`
  color: #999;
  font-size: 1.2rem;
`;
const CardRatings = styled.p`
  grid-row: 2 / 3;
`;

const DetailBtn = styled.button`
  background-color: #41977d;
  color: #fff;
  border: none;
  transition: all 0.4s;
  font-weight: 400;
  grid-row: 1 / 3;
  justify-self: end;
  text-decoration: none;
  align-self: center;
  position: relative;
  padding: 1.2rem 2rem;
  border-radius: 10rem;
  text-transform: uppercase;
  cursor: pointer;
`;

function Tours() {
  const tours = useSelector((state) => state.allTours.tours);
  const dispatch = useDispatch();
  async function fetchTours() {
    const res = await axios.get("/tours");
    dispatch(setToursToStore(res.data.tours));
  }
  useEffect(() => {
    fetchTours();
    // eslint-disable-next-line
  }, []);

  return (
    <Main>
      <CardContainer>
        {tours.map((tour) => (
          <Card key ={tour._id}>
            <CardHeader >
              <CardPicture>
                <CardPictureOverlay></CardPictureOverlay>
                <Image src={tour.imageCover} />
              </CardPicture>

              <HeadingTer>
                <Title>{tour.name}</Title>
              </HeadingTer>
            </CardHeader>
            <CardDetails>
              <CardSubHeading>
                {tour.difficulty} {tour.duration} days tour
              </CardSubHeading>
              <CardText>{tour.summary} </CardText>
              <CardData>
                <CardIcon>
                  <RoomIcon />
                </CardIcon>
                <DownTitle>{tour.location}</DownTitle>
              </CardData>

              <CardData>
                <CardIcon>
                  <CalendarTodayIcon />
                </CardIcon>
                <DownTitle>{tour.startDates}</DownTitle>
              </CardData>

              <CardData>
                <CardIcon>
                  <FlagIcon />
                </CardIcon>
                <DownTitle>{tour.stops} stops</DownTitle>
              </CardData>

              <CardData>
                <CardIcon>
                  <PersonIcon />
                </CardIcon>
                <DownTitle>{tour.maxGroupSize} person</DownTitle>
              </CardData>
            </CardDetails>
            <CardFooter>
              <DownPara>
                <CardFooterVal>${tour.price}</CardFooterVal>
                <CardFooterText> per person</CardFooterText>
              </DownPara>
              <CardRatings>
                <CardFooterVal>{tour.ratingsAverage}</CardFooterVal>
                <CardFooterText>
                  {" "}
                  rating ({tour.ratingsQuantity})
                </CardFooterText>
              </CardRatings>
              <div>
                <Link
                  to={`/tour/${tour._id}`}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <DetailBtn>Details</DetailBtn>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </CardContainer>
    </Main>
  );
}

export default Tours;
