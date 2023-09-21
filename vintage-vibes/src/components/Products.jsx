import React, { useState } from 'react'
import { Link } from "react-router-dom";

function Products({ items, getItemId, setCategory, savedUser, logout, accessToken, cartId, setCartId }) {
  const [searchTerm, setSearchTerm] = useState(" ");

  function itemMatch(item, text) {
    return(
      item.title.toLowerCase().includes(text.toLowerCase())
    )
  }

  function itemSetUp(key, val) {
    setCartId([...cartId, key])
    localStorage.setItem(`${key}`, JSON.stringify(val))
    return localStorage.setItem('cartIdArr', JSON.stringify(cartId));
    
  }

  const filteredItems = items.filter((item) => itemMatch(item, searchTerm));
  const displayItem = searchTerm.length ? filteredItems : items;

  return (
    <>
    <button onClick={() => localStorage.clear()}>Clear</button>
      {
        accessToken !== "undefined" ? <button onClick={() => logout()}>Logout</button> : <Link to="/login">Login</Link>
      }
      {
         accessToken !== "undefined" ? <Link to="/cart">Cart</Link> : null
      }
      {
        savedUser !== "undefined" ? <h2>Hello, {savedUser}</h2>  : null
      }
      <form>
        <label>
          Search Item:
          <input 
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
      </form>
      <div>
        <button onClick={() => setCategory("")}>All</button>
        <button onClick={() => setCategory("/category/men's clothing")}>Men's Clothing</button>
        <button onClick={() => setCategory("/category/women's clothing")}>Women's Clothing</button>
        <button onClick={() => setCategory("/category/jewelery")}>Jewelery</button>
        <button onClick={() => setCategory("/category/electronics")}>Electronics</button>
      </div>
      {
        displayItem.map((item) => {
          const id = item.id;
          const title = item.title;
          const image = item.image;

          return <div key={id}>
            <h2>{title}</h2>
            <Link onClick={() => getItemId(id)} to="/details"><img src={image} alt="" /></Link>
            {
              savedUser !== "undefined" ? <button onClick={() => itemSetUp(`${id}`, item)}>Add to Cart</button> : null
            }
          </div>
        })
      }




      {/* {
       items.map((item) => {
        return <div key={item.id}>
          <h2>{item.title}</h2>
          <Link onClick={() => getItemId(item.id)} to="/details"><img src={item.image} alt="" /></Link>
        </div>
       })
      } */}
    </>
  )
}

export default Products;
