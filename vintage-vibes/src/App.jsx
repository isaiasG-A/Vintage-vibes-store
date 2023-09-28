import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";

import Login from './components/Login';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import OrderCompleted from './OrderCompleted';

function App() {
const [token, setToken] = useState();
const [user, setUser] = useState();  
const [items, getItems] = useState([]);  
const [itemId, getItemId] = useState();
const [category, setCategory] = useState("");
const [cartId, setCartId] = useState([]);

localStorage.setItem('access_token', `${token}`);
localStorage.setItem('user', user);

const savedUser = localStorage.getItem('user');
const accessToken = localStorage.getItem('access_token');

useEffect(() => {

async function fetchItems() {
  try {
    const response = await fetch(`https://fakestoreapi.com/products${category}`);
    const result = await response.json()
    
    getItems(result)
  } catch(error) {
    console.log(error)
    }
  }
  fetchItems();
},[category])

  function logout() {
    localStorage.removeItem(token);
    localStorage.removeItem(user);

    location.reload();
  }

  console.log({...localStorage})

  return (
    <div className='container'>
    <Routes>
      <Route path='/' element={<Products items={items} getItemId={getItemId} setCategory={setCategory} savedUser={savedUser} logout={logout} accessToken={accessToken} setCartId={setCartId} cartId={cartId}/>}/>
      <Route path="/login" element={<Login setToken={setToken} setUser={setUser}/>}/>
      <Route path='/details' element={<ProductDetails itemId={itemId} logout={logout} savedUser={savedUser} setCartId={setCartId} cartId={cartId}/>} />
      <Route path='/cart' element={<Cart setCartId={setCartId} cartId={cartId}/>}/>
      <Route path='/completed' element={<OrderCompleted />}/>
    </Routes>
    </div>
  )
}

export default App
