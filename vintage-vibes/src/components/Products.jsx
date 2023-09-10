import React from 'react'

function Products({ items }) {
  return (
    <>
      {
       items.map((item) => {
        return <div>
          <h2>{item.title}</h2>
          <img src={item.image} alt="" />
        </div>
       })
      }
    </>
  )
}

export default Products;
