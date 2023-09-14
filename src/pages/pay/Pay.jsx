import React from "react";
import { getApiBaseUrl } from "../../helper.js";

const url = getApiBaseUrl();

const Pay = () => {
  const handlePay = async () => {
    const response = await fetch(`${url}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          // Define your line items here
          { price: "price_123", quantity: 1 },
        ],
      }),
    });

    const data = await response.json();
    window.location.href = data.url;
  };

  return <button onClick={handlePay}>Pay now</button>;
};
export default Pay;
