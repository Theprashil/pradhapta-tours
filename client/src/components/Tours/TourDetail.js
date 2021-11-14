import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedTour,
  removeSelectedTour,
} from "../../redux/actions/tourActions";

const TourDetail = () => {
  const dispatch = useDispatch();
  const tour = useSelector((state) => state.tour);
  const { image, name, difficulty, price, summary } = tour;
  console.log(tour);

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
  }, [tourID]);

  return (
    <div className="ui grid container">
      {Object.keys(tour).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider"></div>
            <div className="middle aligned row">
              <div className="column lp">
                <img alt={name} className="ui fluid image" src={image} />
              </div>
              <div className="column rp">
                <h1>{name}</h1>
                <h2>
                  <a className="ui teal tag label">${price}</a>
                </h2>
                <h3 className="ui brown block header">{difficulty}</h3>
                <p>{summary}</p>
                <div className="ui vertical animated button" tabIndex="0">
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetail;
