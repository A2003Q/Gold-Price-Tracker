import React from 'react'


function Form({title , desc ,children ,buttonText , onSubmit}) {
  return (
    <>
        <form  onSubmit={onSubmit}
            className='border border-secondary/50 rounded-lg px-5 py-4 shadow shadow-secondary shadow-md'>
            <div className='flex flex-col items-center justify-center '>
                <h4 className='text-white font-bold text-2xl'>{title}</h4>
                <p className='text-secondary font-light'>{desc}</p>
            </div>

            <div className='mt-5'>

                {children}
            </div>

            <button type='submit' className='w-full bg-accent p-2 mt-8 rounded-xl cursor-pointer hover:bg-accent/80 transition hover:shadow hover:shadow-accent/30 hover:shadow-lg focus:bg-section focus:text-accent' >
                {buttonText}
            </button>
        </form>

    </>
  )
}

export default Form
