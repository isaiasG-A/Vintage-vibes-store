import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function ProductDetails({ itemId, savedUser,setCartId, cartId }) {
  const [item, setItem] = useState({});

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${itemId}`)
        const result = await response.json();
        setItem(result);

      } catch(error) {
        console.error(error)
      }
    }
    getProduct()
  }, [])

  function itemSetUp(key, val) {
    const updateKeys = [...cartId, key]
    setCartId(updateKeys);
    localStorage.setItem('cartIdArr', JSON.stringify(updateKeys));
    localStorage.setItem(`${key}`, JSON.stringify(val)); 
  }

  return (
    <div>
      <h4>Category: {item.category}</h4>
      <h2>{item.title}</h2>
      <img src={item.image} alt="" />
      <h3> {item.description}</h3>
      <h5>${item.price}</h5>
      {
        savedUser !== "undefined" ? <button onClick={() => itemSetUp(`${item.id}`, item)}>Add to Cart</button> : null
      }
      <Link to="/">Home</Link> 
    </div>
  )
}

export default ProductDetails