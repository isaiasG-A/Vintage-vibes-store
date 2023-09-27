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
  const nonDuplicates = savedKeys => savedKeys.filter((item, index) => savedKeys.indexOf(item) === index)
  const keys = nonDuplicates(savedKeys); 

  // const findDuplicates = savedKeys => savedKeys.filter((item, index) => savedKeys.indexOf(item) !== index)
  // const duplicatedKeys = findDuplicates(savedKeys)

  return (
    <div>
      <Link to="/">Home</Link> 
      {
        savedKeys.length === 0 ? null : <button onClick={placeOrder} to="/completed">Place Order</button>
      }
      {
       keys.map((num) => {
        const findDuplicates = savedKeys => savedKeys.filter((item) => item === num)
        const duplicatedKeys = findDuplicates(savedKeys)
        const quantity = duplicatedKeys.length;

        const cartData = JSON.parse(localStorage.getItem(`${num}`));
        return (
          <div>
            <h2>{cartData.title}</h2>
            <img src={cartData.image} alt="" />
            <h5>Quantity:{quantity}</h5>
            <button>+</button>
            <button>-</button>
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