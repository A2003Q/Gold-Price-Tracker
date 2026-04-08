import React, { useContext } from 'react'
import { CurrencyContext } from '../context/CurrencyContext'

function Currency({bgColor}) {
    const {currency,setCurrency} = useContext(CurrencyContext);
    return (
        <div className='flex justify-end '>
            <div className={`rounded-3xl w-50 h-10 bg-${bgColor} grid grid-cols-2 overflow-hidden outline-none`}>
                <button onClick={()=>setCurrency('USD')}
                className={currency === 'USD' ? 'currencyChoosen': 'currency'}>
                    USD
                </button>
                <button onClick={()=>setCurrency('JOD')}
                className={currency==="JOD" ? 'currencyChoosen' : 'currency'}>JOD</button>
            </div>
        </div>
    )
}

export default Currency