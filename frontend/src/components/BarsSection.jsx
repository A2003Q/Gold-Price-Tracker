import bars from '../assets/images/bars.png';
import miniStar from '../assets/images/smallStar.svg';
import  { useContext, useState , useEffect } from 'react'
import { CurrencyContext } from '../context/CurrencyContext'
import Loading from './Loading';


function BarsSection() {
      const {currency} = useContext(CurrencyContext);

      const [gram , setGram]=useState(1);

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
    return <Loading/>;
  }

  if (!prices) {
    return <p className="text-center text-red-500">Failed to load prices</p>;
  }

  const pricePerGram =
  currency === "JOD"
    ? prices["24k_price_jod"]
    : prices["24k_price_usd"];

  return (
    <>
    <section id='bar' className='mt-20 py-16 scroll-mt-20 bg-section rounded-4xl md:rounded-6xl relative'>
      {/* shape  */}
        <img src={miniStar}  className='hidden md:block absolute top-5 right-90 animate-ping'
          width={300} height={300} alt="" />
        <img src={miniStar}  className='hidden md:block absolute bottom-5 left-90 animate-ping'
          width={100} height={100} alt="" />


      <div className='app-container'>
          <h1 className='section-header'>Live <span className='text-accent'>Gold</span> Prices</h1>
          <p className='section-description mt-3 md:mt-4'>Real-time market rates updated every minute</p>


          <div className='mt-10'>
            <form className="max-w-sm ">
              <select  value={gram} onChange={(e)=>setGram(e.target.value)}
              id="" className="block w-full px-3 py-2.5 bg-primary   text-heading text-sm rounded-xl  text-secondary focus:border border-accent/20">
                <option >Choose a weight in gram</option>
                <option value="1">1 gram</option>
                <option value="5">5 gram</option>
                <option value="10">10 gram</option>
                <option value="50">50 gram</option>
                <option value="200">200 gram</option>
                <option value="250">250 gram</option>
                <option value="500">500 gram</option>
                <option value="1000">1000 gram</option>
              </select>
            </form>

            <div className=' w-auto  border-secondary rounded-md mt-7 p-7 grid grid-cols-1 gap-10 md:gap-1 md:grid-cols-2 justify-between md:justify-evenly'>
              <img  className='w-full md:w-80 drop-shadow-accent/90 drop-shadow-2xl'
              src={bars} alt="bars" width={200} height={200} />
              <div>
                <div className='flex justify-between md:justify-evenly'>
                  <span className='text-secondary font-light'>Weight</span>
                  <span className='text-white font-bold'>{gram}g</span>
                </div>
                <hr className='mt-2 text-secondary' />
                <div className='flex justify-between md:justify-evenly mt-9'>
                  <span className='text-secondary font-light'>Karat</span>
                  <span className='text-white font-bold'>24k</span>
                </div>
                <hr className='mt-2 text-secondary' />
                <div className='flex justify-between md:justify-evenly mt-9'>
                  <span className='text-secondary font-light'>Price</span>
                  <span className='text-accent font-bold'>{currency} {(pricePerGram * gram).toFixed(2)}</span>
                </div>
                <hr className='mt-2 text-secondary' />
              </div>

            </div>

          </div>
      </div>
    </section>
    </>
  )
}

export default BarsSection
