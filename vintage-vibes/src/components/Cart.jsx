import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

function Cart() {
  const [savedKeys, setSavedKeys] = useState([]);
  
  useEffect(() => {
    // Load data from localStorage on component mount
    const savedData = JSON.parse(localStorage.getItem('cartIdArr')) || [];
    setSavedKeys(savedData);
  }, []);


  //const getCartId = JSON.parse(localStorage.getItem('cartIdArr'));

  // console.log(it)

  function deleteItem(key) {
    console.log(key)
    // localStorage.removeItem(`${key}`);
    // let idArr = [...getCartId]
    // delete idArr.key

    // return localStorage.setItem("cartIdArr", JSON.stringify(idArr))
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