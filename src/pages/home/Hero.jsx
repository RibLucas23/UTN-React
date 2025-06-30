
export default function Hero() {

   return (
      <div
         className="hero min-h-lvw md:min-h-1/2 "
         style={{
            backgroundImage:
               "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
         }}
      >
         <div className="hero-overlay "></div>
         <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
               <h1 className="mb-5 text-5xl font-bold">Bienvenidos al Ecommerce UTN</h1>
               <p className="mb-5">
                  Tu lugar para encontrar productos tecnológicos, educativos y más.
                  Desarrollado por Lucas para la Universidad Tecnológica Nacional.
               </p>
               <button className="btn btn-primary">Get Started</button>
            </div>
         </div>

      </div>
   )
}
