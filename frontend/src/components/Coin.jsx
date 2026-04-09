
function Coin({pic , title , weight , karat , currentPrice , currency}) {

        // const {currency} = useContext(CurrencyContext);

  return (
    <div className='flex flex-col justify-center items-center  -space-y-7'>
        <img className='z-20' src={pic} alt="Rashadi Lira" width={150} height={150}  />
        <div className='bg-section w-full md:w-70 rounded-xl pt-10 pb-7 px-10 md:px-5'>
                    <h3 className='text-center text-3xl text-white font-medium'>{title}</h3>

                    <div className='flex flex-col gap-4 mt-6'>
                      <div className='flex justify-between'>
                        <span className='text-secondary text-sm'>Weight</span>
                        <span className='text-accent font-bold'>{weight}g</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-secondary text-sm'>Karat</span>
                        <span className='text-accent font-bold'>{karat}</span>
                      </div>
                    </div>
                    <hr  className='text-secondary m-3 '/>

                    <span className='text-secondary text-sm'>Current Price</span>
                    <div className='text-accent text-xl font-bold  mt-2'>
                      <span>{currency}</span> {currentPrice}
                    </div>

                </div>
    </div>
  )
}

export default Coin
