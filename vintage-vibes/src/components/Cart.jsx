import React  from 'react'

function Cart({ getCartId }) {
  const local = {...localStorage}

  return (
    <div>
      {
       getCartId.map((num) => {
        const cartData = JSON.parse(localStorage.getItem(`${num}`));
        return (
          <div>
            <h2>{cartData.title}</h2>
            <img src={cartData.image} alt="" />
            <h5>${cartData.price}</h5>
          </div>
        )
       })
      }
    </div>
  )
}


export default Cart