import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";

import Login from './components/Login';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';

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
},[])

  function logout() {
    localStorage.removeItem(token);
    localStorage.removeItem(user);

    location.reload();
  }

  console.log({...localStorage})

  return (
    <>
    <Routes>
      <Route path='/' element={<Products items={items} getItemId={getItemId} setCategory={setCategory} savedUser={savedUser} logout={logout} accessToken={accessToken} setCartId={setCartId} cartId={cartId}/>}/>
      <Route path="/login" element={<Login setToken={setToken} setUser={setUser}/>}/>
      <Route path='/details' element={<ProductDetails itemId={itemId} logout={logout}/>} />
      <Route path='/cart' element={<Cart />}/>
    </Routes>
    </>
  )
}

export default App
