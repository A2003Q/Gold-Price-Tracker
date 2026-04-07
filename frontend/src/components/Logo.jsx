import React from 'react'

function Logo() {
    return (
        <div className='flex gap-2 h-full items-center'>
            <img src="favicon.svg" alt="logo" className='h-11'/>
            <a href='\' className='font-bold text-2xl'> <span className='text-white'>Gold</span><span className='text-accent'>Tracker</span></a>
        </div>
        
    )
}

export default Logo