import Currency from './Currency'
import miniStar from '../assets/images/smallStar.svg'
import KaratPrice from './KaratPrice'


function GoldPriceSection() {
  
  const karats = [
  { karat: 24, price: 100.15 },
  { karat: 21, price: 89.98 },
  { karat: 18, price: 83.05 },
]

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
                    
          <Currency/>
        </div>
      </div>

      {/* bottom  */}
      <div className='app-container grid grid-cols-1 md:grid-cols-3 gap-10 mt-20  '>
        {karats.map(item => (
          <KaratPrice key={item.karat} karat={item.karat} price={item.price}  />
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