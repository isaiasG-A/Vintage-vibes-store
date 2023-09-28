import React, { useState } from 'react'
import { Link } from "react-router-dom";

function Products({ items, getItemId, setCategory, savedUser, logout, accessToken, cartId, setCartId}) {
  const [searchTerm, setSearchTerm] = useState(" ");

  function itemMatch(item, text) {
    return(
      item.title.toLowerCase().includes(text.toLowerCase())
    )
  }

  function itemSetUp(key, val) {
    const updateKeys = [...cartId, key]
    setCartId(updateKeys);
    localStorage.setItem('cartIdArr', JSON.stringify(updateKeys));
    localStorage.setItem(`${key}`, JSON.stringify(val)); 
  }

  const filteredItems = items.filter((item) => itemMatch(item, searchTerm));
  const displayItem = searchTerm.length ? filteredItems : items;

  return (
    <div>
      {
        accessToken !== "undefined" ? <button className='btn' onClick={() => logout()}>Logout</button> : <Link to="/login" class="login-btn btn btn-outline-primary d-grid gap-2 col-2 mx-auto" disabled>Login</Link>
      }
      {
         accessToken !== "undefined" ? <Link to="/cart">Cart</Link> : null
      }
      {
        savedUser !== "undefined" ? <h2>Hello, {savedUser}</h2>  : null
      }
        <form>
        <div class="mb-2">
          <label class="form-label">
            Search Item:
            <input 
              class="form-control"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
          </div>
        </form>

      <div class="navbar navbar-expand-lg">
        <div class="container-fluid justify-content-center gap-1">
          <button class="btn btn-dark gap-3" onClick={() => setCategory("")}>All</button>
          <button class="btn btn-dark" onClick={() => setCategory("/category/men's clothing")}>Men's Clothing</button>
          <button class="btn btn-dark" onClick={() => setCategory("/category/women's clothing")}>Women's Clothing</button>
          <button class="btn btn-dark" onClick={() => setCategory("/category/jewelery")}>Jewelery</button>
          <button class="btn btn-dark" onClick={() => setCategory("/category/electronics")}>Electronics</button>
        </div>
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
    </div>
  )
}

export default Products;
