import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

function Cart() {
  const [savedKeys, setSavedKeys] = useState([]);
  
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('cartIdArr')) || [];
    setSavedKeys(savedData);
  }, []);

  function deleteItem(key) {
    const updatedKeys = savedKeys.filter(num => num != key)
    setSavedKeys(updatedKeys);
    localStorage.setItem('cartIdArr', JSON.stringify(updatedKeys));
    return localStorage.removeItem(`${key}`);
  }

  return (
    <div>
      <Link to="/">Home</Link> 
      {
       savedKeys.map((num) => {
        const cartData = JSON.parse(localStorage.getItem(`${num}`));
        return (
          <div>
            <h2>{cartData.title}</h2>
            <img src={cartData.image} alt="" />
            <h5>Quantity:{}</h5>
            <h5>${cartData.price}</h5>
            <button onClick={() => deleteItem(cartData.id)}>Remove</button>
          </div>
        )
       })
      }
    </div>
  )
}


export default Cart