import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useCurrency } from "../../state/currencyContext";

const GigCard = ({ item }) => {
  const { currency, convertCurrency } = useCurrency();
  const convertedAmount = convertCurrency(item.price, currency);
  return (
    <Link to="/gig/123" className="link">
      <div className="gigCard">
        <img src={item.img} alt="" />
        <div className="info">
          <div className="user">
            <img src={item.pp} alt="" />
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{item.star}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              <h2>
                {currency === "USD" ? "$" : null}
                {currency === "INR" ? "₹" : null}
                {currency === "GBP" ? "£" : null}
                {convertedAmount.toFixed(2)}
                <sup>99</sup>
              </h2>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
