import gold  from '../assets/images/gold.png'
import miniStar from '../assets/images/smallStar.svg'
import MainFeatures from './MainFeatures'
function HeroSection() {
  return (
    <>
    <section id='home' className='app-container pt-24 pb-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>

        {/* left content  */}
        <div className='flex space-y-9 flex-col relative'>

          {/* shape  */}
          <img src={miniStar}  className='hidden md:block absolute bottom-0 right-30 animate-ping'
          width={150} height={150} alt="" />
          <img src={miniStar}  className='hidden md:block absolute top-0 right-0 animate-ping'
          width={150} height={150} alt="" />

          <h1 className='section-header font-bold leading-tight'>
            Track Gold Prices & Calculate Your <span className='text-accent' >Profit</span> Instantly
          </h1>

          <p className='section-description'>
            Manage your gold assets intelligently. Track live gold prices, calculate profits in real-time, and make informed investment decisions with our premium platform.
          </p>

          <button className='btn-primary '> 
            <span>Start Tracking Your Gold</span> <i class="text-2xl fa-solid fa-arrow-right-long"></i>
          </button>

          <MainFeatures/>
        </div>

        {/* right image  */}
        
        <img  className=' drop-shadow-accent/80 drop-shadow-2xl '
        src={gold} alt="gold" />

        {/* shape  */}
          <img src={miniStar}  className='hidden md:block absolute bottom-20 right-30 animate-ping'
          width={100} height={100} alt="" />
          <img src={miniStar}  className='hidden md:block absolute top-20 right-20 animate-ping'
          width={150} height={150} alt="" />

      </div>
    </section>
    </>
  )
}

export default HeroSection