import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";


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
  
  // const nonDuplicates = savedKeys => savedKeys.filter((item, index) => savedKeys.indexOf(item) === index)
  // const keys = nonDuplicates(savedKeys); 


  useEffect(() => {
    const initialQuantities = keys.map((num) => {
    const duplicatedKeys = savedKeys.filter((item) => item === num);
    return duplicatedKeys.length;
    });
    setQuantity(initialQuantities);
  }, [savedKeys,cartId]);

  // useEffect(() => {
  // keys.map((num) => {
  //   const findDuplicates = savedK => savedK.filter((item) => item === num)
  //   const duplicatedKeys = findDuplicates(savedKeys)
  //   const quantityLog = duplicatedKeys.length;
  //   return setQuantity(quantityLog)
  //   })
  // }, []);

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
    localStorage.setItem(`${key}`, JSON.stringify(val));
    return navigate("/cart")
  }

  function deletingItem() {

  }
  return (
    <div>
      <Link to="/">Home</Link> 
      {
        savedKeys.length === 0 ? null : <button onClick={placeOrder} to="/completed">Place Order</button>
      }
      {
       keys.map((num, index) => {
        // const findDuplicates = savedKeys => savedKeys.filter((item) => item === num)
        // const duplicatedKeys = findDuplicates(savedKeys)
        // const quantity = duplicatedKeys.length;

        const cartData = JSON.parse(localStorage.getItem(`${num}`));
        return (
          <div>
            <h2>{cartData.title}</h2>
            <img src={cartData.image} alt="" />
            <h5>Quantity:{quantity[index]}</h5>
            <button onClick={() => addingItem(`${num}`, cartData)}>+</button>
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