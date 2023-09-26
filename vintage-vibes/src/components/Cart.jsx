import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";


function Cart({setCartId}) {
  const [savedKeys, setSavedKeys] = useState([]);
  const navigate = useNavigate();

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

  console.log(savedKeys)
  console.log({...localStorage})

  function placeOrder() {
    for(let i = 0; i <= savedKeys.length; i++) {
      console.log(savedKeys[i])
     const key = `${savedKeys[i]}`;
     localStorage.removeItem(key);
    }
    localStorage.removeItem("cartIdArr");
    setCartId([])
    return navigate("/completed")
  }

  return (
    <div>
      <Link to="/">Home</Link> 
      {
        savedKeys.length === 0 ? null : <button onClick={placeOrder} to="/completed">Place Order</button>
      }
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