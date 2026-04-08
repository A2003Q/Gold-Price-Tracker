import React from 'react'
import Logo from './Logo'

function Footer() {
  return (
    <>
    <footer className=' pt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 app-container p-20 gap-8 md:3'>
          <div className='flex gap-16 flex-col md:flex-row'>
              {/* logo  */}
              <Logo/>
              <p className='border-t-1 md:border-t-0 md:border-l-1 border-secondary p-3 text-secondary font-light'>
                  Monitor real-time gold prices across different karats, manage your gold assets, and track your investment performance with our premium platform.
              </p>
          </div>

          <div className='flex flex-col gap-5 justify-center items-center'>
            <span className='text-secondary font-light'>Folow Us</span>
            <div className='flex gap-5'>
              <span className='media'>
                <i className="text-2xl fa-brands fa-instagram"></i>
              </span>
              <span className='media'>
                <i className="text-2xl  fa-brands fa-whatsapp"></i>
              </span>
              <span className='media'>
                <i className="text-2xl fa-brands fa-facebook-f"></i>
              </span>
              <span className='media'>
                <i className="text-2xl  fa-brands fa-threads"></i>
              </span>
              
            </div>
          </div>
      </div>
      <div className='border border-t-1 text-secondary font-light border-secondary/60 w-full p-5 text-center '>
        © 2026 GoldTracker. All rights reserved.
      </div>
    </footer>
    </>
  )
}

export default Footer