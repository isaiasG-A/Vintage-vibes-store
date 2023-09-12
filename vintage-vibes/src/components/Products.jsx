import React from 'react'
import { Link } from "react-router-dom";

function Products({ items, getItemId }) {
  return (
    <>
      {
       items.map((item) => {
        return <div key={item.id}>
          <h2>{item.title}</h2>
          <Link onClick={() => getItemId(item.id)} to="/details"><img src={item.image} alt="" /></Link>
        </div>
       })
      }
    </>
  )
}

export default Products;
