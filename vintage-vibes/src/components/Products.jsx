import React, { useState } from 'react'
import { Link } from "react-router-dom";

function Products({ items, getItemId }) {
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
