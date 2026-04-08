import EnglishLira from '../assets/images/EnglishLira.png';
import RashadiLira from '../assets/images/RashadiLira.png'
import miniStar from '../assets/images/smallStar.svg'
import Coin from './Coin';
import { useEffect, useState } from 'react';

function CoinsSection() {

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

  const coins =[
    {title : "Rashadi Lira" , pic :RashadiLira , karat :"21" , weight :"7.2" , currentPrice :prices["21k_price_usd"] *7.2},
    {title : "English Lira" , pic :EnglishLira , karat :"21" , weight :"8" , currentPrice :prices["21k_price_usd"]*8},
  ];


  return (
    <>
    <section id='coin' className='app-container py-24 relative'>

         {/* shape  */}
                <img src={miniStar}  className='hidden md:block absolute top-20 right-50 animate-ping'
                width={100} height={100} alt="" />
                <img src={miniStar}  className='hidden md:block absolute bottom-20 right-140 animate-ping'
                width={100} height={100} alt="" />
                <img src={miniStar}  className='hidden md:block absolute top-20 right-140 animate-ping'
                width={300} height={300} alt="" />
      
        <h1 className='section-header text-center'><span className='text-accent'>Gold</span> Coins</h1>
        <p className='text-center text-secondary mt-3 md:mt-4'>Popular gold coins with calculated prices</p>

        <div className='grid grid-cols-1 md:grid-cols-2 justify-evenly mt-10 gap-10 md:gap-0'>
          {/* <div className='flex flex-col justify-center items-center  -space-y-7'>
              <img className='z-20' src={RashadiLira} alt="Rashadi Lira" width={170} height={170}  />
              <div className='bg-section w-full md:w-70 rounded-xl pt-15 pb-7 px-10 md:px-5'>
                <h3 className='text-center text-3xl text-white font-medium'>Rashadi Lira</h3>

                <div className='flex flex-col gap-4 mt-6'>
                  <div className='flex justify-between'>
                    <span className='text-secondary text-sm'>Weight</span>
                    <span className='text-accent font-bold'>7.2g</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-secondary text-sm'>Karat</span>
                    <span className='text-accent font-bold'>21</span>
                  </div>
                </div>
                <hr  className='text-secondary m-3 '/>

                <span className='text-secondary text-sm'>Current Price</span>
                <div className='text-accent text-xl font-bold  mt-2'>
                  JOD 306.36
                </div>

              </div>
          </div> */}
          {coins.map((coin)=>(
            <Coin key={coin.title} pic={coin.pic} 
            title={coin.title} karat={coin.karat}
            weight={coin.weight} currentPrice={coin.currentPrice}/>
          ))}
        </div>
      
    </section>
    </>
  )
}

export default CoinsSection