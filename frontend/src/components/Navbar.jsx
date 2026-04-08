import  { useState } from 'react'
import Logo from './Logo'

const links =[
  {name : "Home" , href: "#home"},
  {name : "Gold" , href: "#gold"},
  {name : "Coin" , href: "#coin"},
  {name : "Bar" , href: "#bar"},
]
function Navbar() {

  const [OpenMenuMobile , setOpenMenuMobile]=useState(false);
  
  return (
    <>
    <nav className='bg-primary/80 backdrop-blur-sm shadow-sm fixed h-16 w-full z-50'>
        <div className='app-container flex  justify-between items-center h-16'>

          {/* logo  */}
          <Logo/>

          {/* disktop links  */}
          <div className='hidden md:flex items-center space-x-8'>
            {links.map((link)=>(
              <a  key={link.name} className='nav-item '
                href={link.href}>{link.name}</a>
            ))}
          </div>

          <a href="/register" className='hidden md:block nav-btn '>Get Started</a>

          {/* mobile menu btn  */}
          <button onClick={()=>setOpenMenuMobile((prev)=>!prev)} 
          className='md:hidden text-2xl p-2 rounded-md text-white hover:text-accent transition  cursor-pointer focus:outline-none'>
            <i class="fa-solid fa-bars"></i>
          </button>

          
        </div>
          {/* Mobile Menu  */}
          {OpenMenuMobile && (
            <div className='md:hidden w-full bg-white shadow-lg rounded-b-lg px-2 pt-2 space-y-1 pb-2'>
              {links.map((link)=>(
              <a  key={link.name} className='mobile-nav-item'
                href={link.href}>{link.name}</a>
            ))}
            <a href="" className='mobile-nav-btn  '>Get Started</a>

          
            </div>
          )}
    </nav>
    </>
  )
}

export default Navbar