import './App.css'
import { useState, useEffect } from 'react'

import Products from './components/Products';

function App() {
const [items, getItems] = useState();  

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
      <Products items={items}/>
    </>
  )
}

export default App
