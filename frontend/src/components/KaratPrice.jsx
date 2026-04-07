import { useContext } from 'react'
import { CurrencyContext } from '../context/CurrencyContext'
import pic from '../assets/images/goldCard.png'

function KaratPrice({karat , price}) {
    const {currency} = useContext(CurrencyContext);
return (
    <div className='karat'>
        <div className='flex justify-between'>
            <span className='text-3xl text-secondary'>{karat}K</span>
            <img src={pic} width={100} height={100} alt="gold" />
        </div>
        <div className='font-extrabold text-accent text-4xl'> <span>{currency === "JOD" ? `JOD` : `USD`}</span> {price}</div>
        <span className='text-secondary text-sm'>per gram</span>
    </div>
)
}

export default KaratPrice