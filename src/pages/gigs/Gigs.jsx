import React, { useRef, useState } from "react";
import "./Gigs.scss";
import { gigs } from "../../data";
import GigCard from "../../components/gigCard/GigCard";
import { useCurrency } from "../../state/currencyContext";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const [amount, setAmount] = useState(100); // Replace with your initial amount
  const { currency, setCurrency, convertCurrency } = useCurrency();

  const handleCurrencyToggle = (e) => {
    setCurrency(e.target.value);
  };

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    console.log(minRef.current.value);
    console.log(maxRef.current.value);
  };

  return (
    <div className="gigs">
      <div className="container">
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Gigster's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
            <div className="currency-toggle">
              <label  htmlFor="currencySelect">
                Select Currency:
              </label>
              <select
                id="currencySelect"
                value={currency}
                onChange={handleCurrencyToggle}
              >
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
        </div>
        <div className="cards">
          {gigs.map((gig) => (
            <GigCard item={gig} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
