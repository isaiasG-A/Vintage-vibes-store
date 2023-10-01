import React from 'react';
import { Link, useNavigate } from "react-router-dom";

function OrderCompleted() {
  const navigate = useNavigate();

  function homeNav() {
    return navigate("/");
  }
  return (
    <div className='order-completed'>
      <h1>Thank you for your Purchase!</h1>
      <button className='btn btn btn-info' onClick={homeNav}>Home</button>
    </div>
  )
}

export default OrderCompleted