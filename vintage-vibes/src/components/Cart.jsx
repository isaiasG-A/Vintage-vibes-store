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
    console.log(updatedArr)
    setCartId(updatedArr)
    console.log(updatedKeys)
    return  localStorage.setItem('cartIdArr', JSON.stringify(updatedArr));
  }

  return (
    <div>
      <Link to="/">Home</Link> 
      {
        savedKeys.length === 0 ? null : <button onClick={placeOrder} to="/completed">Place Order</button>
      }
      {
       keys.map((num, index) => {
        const cartData = JSON.parse(localStorage.getItem(`${num}`));
        return (
          <div>
            <h2>{cartData.title}</h2>
            <img src={cartData.image} alt="" />
            <h5>Quantity:{quantity[index]}</h5>
            <button onClick={() => addingItem(`${num}`, cartData)}>+</button>
            <button onClick={() => deletingItem(num)}>-</button>
            <h5>${cartData.price}</h5>
            <button onClick={() => deleteItem(num)}>Remove</button>
          </div>
        )
       })
      }
    </div>
  )
}

export default Cart