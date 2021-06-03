import React from "react";
import "./Card.css";

const Card = ({ card }) => {
  const { image, suit, value } = card;

  return (
    <div className="Card">
      <img src={image} alt={`${value} of ${suit}`} />
    </div>
  );
};
export default Card;
