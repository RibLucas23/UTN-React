import React from 'react'

export default function Carousel(items) {

   return (
      <div className="carousel rounded-box">
         {items.map(item => {
            <div className="carousel-item">
               <h1>{item.name}</h1>
               <img
                  src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                  alt="Burger" />
            </div>
         })}
         {/* <div className="carousel-item">
            <img
               src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
               alt="Burger" />
         </div> */}

      </div>
   )
}
