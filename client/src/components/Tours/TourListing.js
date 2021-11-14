import axios from "../../api/axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToursToStore } from "../../redux/actions/tourActions";
import TourComponent from "./TourComponent";

const TourListing = () => {
  const dispatch = useDispatch();
  const tours = useSelector((state) => state);

  async function fetchTours() {
    const res = await axios.get("/tours");
    dispatch(setToursToStore(res.data.tours));
  }

  useEffect(() => {
    fetchTours();
  }, []);

  console.log(tours);
  return <div className="ui grid container">{<TourComponent />}</div>;
};

export default TourListing;
