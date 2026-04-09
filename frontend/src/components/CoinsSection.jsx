import EnglishLira from '../assets/images/EnglishLira.png';
import RashadiLira from '../assets/images/RashadiLira.png'
import miniStar from '../assets/images/smallStar.svg'
import Coin from './Coin';
import { useEffect, useState } from 'react';
import { useContext } from 'react'
import { CurrencyContext } from '../context/CurrencyContext'

function CoinsSection() {

    const { currency } = useContext(CurrencyContext);
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

    const price21 = currency === "JOD" ? prices["21k_price_jod"] : prices["21k_price_usd"];
    const coins = [
    {
        title: "Rashadi Lira",
        pic: RashadiLira,
        karat: "21",
        weight: "7.2",
        currentPrice: price21 * 7.2
    },
    {
        title: "English Lira",
        pic: EnglishLira,
        karat: "21",
        weight: "8",
        currentPrice: price21 * 8
    },
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

            {coins.map((coin)=>(
                <Coin key={coin.title} pic={coin.pic}
                title={coin.title} karat={coin.karat}
                weight={coin.weight} currentPrice={coin.currentPrice} currency={currency}/>
            ))}
        </div>

    </section>
    </>
  )
}

export default CoinsSection
