import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";

import Products from './components/Products';
import ProductDetails from './components/ProductDetails';

function App() {
const [items, getItems] = useState([]);  
const [itemId, getItemId] = useState();

useEffect(() => {

async function fetchItems() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const result = await response.json()
    
    getItems(result)
  } catch(error) {
    console.log(error)
    }
  }
  fetchItems();
},[])

  return (
    <>
    <Routes>
      <Route path='/' element={<Products items={items} getItemId={getItemId}/>}/>
      <Route path='/details' element={<ProductDetails itemId={itemId}/>} />
    </Routes>
    </>
  )
}

export default App
