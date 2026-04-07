import React from 'react'

function Input({lable, placeholder,type , name , error , onChange , value}) {
    return (
        <div className='flex flex-col gap-2 mt-3'>
            <label className='text-white font-bold' htmlFor={name}>{lable}</label>
            <input id={name} name={name} value={value} onChange={onChange}
            className='outline-none placeholder:text-secondary text-white bg-section text-sm rounded-xl px-3 py-1 w-96' 
            placeholder={placeholder}
            type={type} />
            {error && <p className='text-red-500 text-sm mt-0.5'>{error}</p>}
        </div>
    )
}

export default Input

export function Select({lable ,name , error , value , onChange}) {
    return (
        <div className='flex flex-col gap-2 mt-3'>
            <label className='text-white font-bold' htmlFor="name">{lable}</label>
            <select  className='outline-none placeholder:text-secondary text-white bg-section text-sm rounded-xl px-3 py-1 w-96'
            name={name} value={value} onChange={onChange}>
                <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            </select>
            {error && <p className='text-red-500 text-sm mt-0.5'>{error}</p>}
        </div>
    )
}

