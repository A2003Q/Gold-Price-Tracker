import Currency from './Currency'
import miniStar from '../assets/images/smallStar.svg'
import KaratPrice from './KaratPrice'
import {  useEffect, useState } from 'react';
import { useContext } from 'react'
import { CurrencyContext } from '../context/CurrencyContext'



function GoldPriceSection() {

 const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/gold/live")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPrices(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // loading state
  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (!prices) {
    return <p className="text-center text-red-500">Failed to load prices</p>;
  }

  const { currency } = useContext(CurrencyContext);

const karats = [
  { karat: 24, price: currency === "JOD" ? prices["24k_price_jod"] : prices["24k_price_usd"] },
  { karat: 21, price: currency === "JOD" ? prices["21k_price_jod"] : prices["21k_price_usd"] },
  { karat: 18, price: currency === "JOD" ? prices["18k_price_jod"] : prices["18k_price_usd"] },
];

  return (
    <>
    <section id='gold' className='mt-20 py-20 scroll-mt-20 bg-section rounded-4xl md:rounded-6xl relative' >

      {/* top  */}
      <div className='app-container grid grid-cols-1 md:grid-cols-2 gap-12 p-5'>

        <div >
          <h1 className='section-header'>Live <span className='text-accent'>Gold</span> Prices</h1>
          <p className='section-description mt-3 md:mt-4'>Real-time market rates updated every minute</p>
        </div>

        <div>
           {/* shape  */}
              <img src={miniStar}  className='hidden md:block absolute top-5 right-90 animate-ping'
                width={300} height={300} alt="" />

          <Currency bgColor="primary" />
        </div>
      </div>

      {/* bottom  */}
      <div className='app-container grid grid-cols-1 md:grid-cols-3 gap-10 mt-20  '>
        {karats.map(item => (
          <KaratPrice key={item.karat} karat={item.karat} price={item.price}  currency={currency}/>
        ))}
      </div>


      {/* shape  */}
          <img src={miniStar}  className='hidden md:block absolute top-5 left-50 animate-ping'
          width={100} height={100} alt="" />
          <img src={miniStar}  className='hidden md:block absolute bottom-0 left-60 animate-ping'
          width={100} height={100} alt="" />
    </section>
    </>
  )
}

export default GoldPriceSection
