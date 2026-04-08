import React from 'react'
import Logo from '../components/Logo';
function InnerNav({name , letters}) {
  return (
    <>
    <nav className='   bg-primary/80 backdrop-blur-sm fixed h-17 w-full z-50'>
                <div className='app-container h-16 flex justify-between items-center'>
                    <Logo/>
                    <div className='flex justify-between gap-2 md:gap-9'>
                        <div className='h-10 bg-primary md:bg-section rounded-lg w-auto gap-3 pr-3 text-white font-light   flex items-center justify-between' >
                            <span className='h-full bg-accent w-full md:w-auto rounded-lg uppercase text-section flex items-center p-2'>{letters}</span>
                            <span className='hidden md:block capitalize'>{name}</span>
                        </div>
                        <button className='text-secondary/70 font-extralight cursor-pointer hover:text-secondary transition'><span><i class="fa-solid fa-arrow-right-from-bracket"></i></span> Logout</button>
                    </div>
                </div>
        </nav>
    </>
  )
}

export default InnerNav