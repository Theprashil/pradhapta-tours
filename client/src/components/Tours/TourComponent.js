import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TourComponent = () => {
  const tours = useSelector((state) => state.allTours.tours);
  const renderList = tours.map((tour) => {
    const { _id, name, image, price, difficulty } = tour;
    return (
      <div className="four wide column" key={_id}>
        <Link to={`/tour/${_id}`}>
          <div className="ui link cards">
            <div className="card">
              <div className="image">
                <img src={image} alt={name} />
              </div>
              <div className="content">
                <div className="header">{name}</div>
                <div className="meta price">$ {price}</div>
                <div className="meta">{difficulty}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });
  return <>{renderList}</>;
};

export default TourComponent;
