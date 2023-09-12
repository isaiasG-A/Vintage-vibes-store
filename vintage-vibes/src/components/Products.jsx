import React, { useState } from 'react'
import { Link } from "react-router-dom";

function Products({ items, getItemId, setCategory }) {
  const [searchTerm, setSearchTerm] = useState(" ");

  function itemMatch(item, text) {
    return(
      item.title.toLowerCase().includes(text.toLowerCase())
    )
  }

  const filteredItems = items.filter((item) => itemMatch(item, searchTerm));
  const displayItem = searchTerm.length ? filteredItems : items;

  return (
    <>
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
          return <div key={item.id}>
            <h2>{item.title}</h2>
            <Link onClick={() => getItemId(item.id)} to="/details"><img src={item.image} alt="" /></Link>
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
