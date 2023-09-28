import React, { useState, useEffect } from 'react'
import { Link, json, useNavigate } from "react-router-dom";


function Cart({setCartId, cartId}) {
  const [savedKeys, setSavedKeys] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('cartIdArr')) || [];
    setSavedKeys(savedData);
  }, [cartId]);

  const nonDuplicates = savedKeys => savedKeys.filter((item, index) => savedKeys.indexOf(item) === index)
   const keys = nonDuplicates(savedKeys); 
  
  useEffect(() => {
    const initialQuantities = keys.map((num) => {
    const duplicatedKeys = savedKeys.filter((item) => item === num);
    return duplicatedKeys.length;
    });
    setQuantity(initialQuantities);
  }, [savedKeys,cartId]);

  function deleteItem(key) {
    const updatedKeys = savedKeys.filter(num => num != key)
    setSavedKeys(updatedKeys);
    localStorage.setItem('cartIdArr', JSON.stringify(updatedKeys));
    return localStorage.removeItem(`${key}`);
  }

  function placeOrder() {
    for(let i = 0; i <= savedKeys.length; i++) {
     const key = `${savedKeys[i]}`;
     localStorage.removeItem(key);
    }
    localStorage.removeItem("cartIdArr");
    setCartId([])
    return navigate("/completed")
  }

  function addingItem(key, val) {
    const updateKeys = [...cartId, key]
    setCartId(updateKeys);
    localStorage.setItem('cartIdArr', JSON.stringify(updateKeys));
    return localStorage.setItem(`${key}`, JSON.stringify(val));
  }

  function deletingItem(num) {
    let updatedKeys = [];

    if(savedKeys.includes(num)) {
      updatedKeys = savedKeys.filter(id => id === num)
      updatedKeys.pop()
    } else {
      null
    }
    let newArr = savedKeys.filter(id => id !== num)
    const updatedArr = newArr.concat(updatedKeys).sort();
    setCartId(updatedArr)
    return  localStorage.setItem('cartIdArr', JSON.stringify(updatedArr));
  }

  return (
    <div>
      <Link className='btn btn-outline-primary btn-lg mb-5 col-2' to="/">Home</Link> 
      {
        savedKeys.length === 0 ? null : <button className='btn btn-outline-success btn-lg mb-5  ms-3 col-2'  onClick={placeOrder} to="/completed">Place Order</button>
      }
      {
       keys.map((num, index) => {
        const cartData = JSON.parse(localStorage.getItem(`${num}`));
        return (
          <div className="row row-cols-2 row-cols-md-2 g-3" key={cartData.id}>
            <div className='container-sm mb-5' style={{width: "50%"}}>
              <div className="card h-90 pt-4">
              <h5 className="card-title">{cartData.title}</h5>
              <img className="img-fluid pb-3 "style={{width: "75%", margin: "0 auto"}}src={cartData.image} alt="" />
                <div className="card-body">
                  <h5 className="card-text pb-3">${cartData.price}</h5>
                  <h5 className="card-text pt-3">Quantity: {quantity[index]}</h5>
                  <button className="btn btn-info me-2" style={{height: "6vh", width: "5vw"}} onClick={() => addingItem(`${num}`, cartData)}>+</button>
                  <button className="btn btn-secondary" style={{height: "6vh", width: "5vw"}}  onClick={() => deletingItem(num)}>-</button>
                </div>
                <button className="btn btn-danger " style={{margin: "7px auto 8%", height: "8vh", width: "14vw"}} onClick={() => deleteItem(num)}>Remove</button>
              </div>
            </div>
          </div>
        )
       })
      }
    </div>
  )
}

export default Cart