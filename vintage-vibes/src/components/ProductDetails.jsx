import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function ProductDetails({ itemId }) {
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

  return (
    <div>
      <h4>Category: {item.category}</h4>
      <h2>{item.title}</h2>
      <img src={item.image} alt="" />
      <h3> {item.description}</h3>
      <h5>${item.price}</h5>
      {
        savedUser !== "undefined" ? <button>Add to Cart</button> : null
      }
      <Link onClick={() => setItem({})} to="/">Home</Link> 
    </div>
  )
}

export default ProductDetails