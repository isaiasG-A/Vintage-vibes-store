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
        accessToken !== "undefined" ? <button className='btn btn-outline-danger ms-5  mb-4 col-2' onClick={() => logout()}>Logout</button> : <Link to="/login" className="login-btn btn btn-outline-primary btn-lg mb-4 col-2" disabled>Login</Link>
      }
      {
         accessToken !== "undefined" ? <Link className="btn btn-outline-info  ms-5 mb-4 col-2" to="/cart">Cart</Link> : null
      }
      {
        savedUser !== "undefined" ? <h2>Hello, {savedUser}</h2>  : null
      }
        <form className='form'>
        <div className="mb-2">
          <label className="form-label">
            Search Item:
            <input 
              className="form-control"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
          </div>
        </form>

      <div className="navbar navbar-expand-lg">
        <div className="container-fluid justify-content-center gap-1">
          <button className="btn btn-dark gap-3" onClick={() => setCategory("")}>All</button>
          <button className="btn btn-dark" onClick={() => setCategory("/category/men's clothing")}>Men's Clothing</button>
          <button className="btn btn-dark" onClick={() => setCategory("/category/women's clothing")}>Women's Clothing</button>
          <button className="btn btn-dark" onClick={() => setCategory("/category/jewelery")}>Jewelery</button>
          <button className="btn btn-dark" onClick={() => setCategory("/category/electronics")}>Electronics</button>
        </div>
      </div>
      {
        displayItem.map((item) => {
          const id = item.id;
          const title = item.title;
          const image = item.image;
          
          return <div className="row row-cols-2 row-cols-md-2 g-3" key={id}>
              <div className='container-sm mb-5'>
                <div className="card h-90">
                  <div className="card-body">
                    <h6 className="card-title">{title}</h6>
                  </div>
                  <Link onClick={() => getItemId(id)} to="/details"><img className="img-fluid pb-5 "style={{width: "61%"}} src={image} alt="" /></Link>
                  {
                  savedUser !== "undefined" ? <button class="btn btn-outline-success" style={{margin: "0 auto 8%", height: "8vh", width: "12vw"}} onClick={() => itemSetUp(`${id}`, item)}>Add to Cart</button> : null
                }
                </div>
              </div>
          </div>
        })
      }
    </div>
  )
}

export default Products;
