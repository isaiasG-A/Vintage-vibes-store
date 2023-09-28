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
    <div className='container'>
      <Link  class="btn btn-outline-primary btn-lg mb-4 col-2" to="/">Home</Link> 
      <div className="row row-cols-2 row-cols-md-2 g-3 mt-2">
        <div className='container-sm mb-5'>
          <div className="card h-90">
              <h6 className="card-text pt-2">Category: {item.category}</h6>
              <h5 className="card-title">{item.title}</h5>
              <img className="img-fluid pb-5 "style={{width: "75%", margin: "0 auto"}}  src={item.image} alt="" />
              <div className='card-body'>
              <p className="card-text"> {item.description}</p>
              <h5 className="card-text">${item.price}</h5>
            </div>
            {
          savedUser !== "undefined" ? <button  class="btn btn-outline-success" style={{margin: "7px auto 8%", height: "8vh", width: "14vw"}} onClick={() => itemSetUp(`${item.id}`, item)}>Add to Cart</button> : null
        }
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default ProductDetails