import  { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import InnerNav from '../components/InnerNav';
import Currency from '../components/Currency';
import DashboardData from '../components/DashboardData';
import { useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';

function Dashboard() {


    const [user, setUser] = useState(null);
    console.log(localStorage.getItem("user"));

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const { currency } = useContext(CurrencyContext);
    const letters = user?.name?.slice(0, 2);
    const data =[
        { icon :<i class="fa-solid fa-basket-shopping"></i> , bg:"section" , color:"accent" ,shadow:"accent",  title:"Total Assets" , number :27}, 
        { icon :<i class="fa-solid fa-chart-line"></i> , bg:"section" , color:"accent" ,shadow:"accent",  title:"Total Profit" , number: currency === "JOD" ? "JOD 9,880" : "USD 9,880"}, 
        { icon :<i class="fa-solid fa-coins"></i> , bg:"section" , color:"accent" ,shadow:"accent",  title:"Total Weight" , number :'167 g'} 
    ];



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


    const karats = [
    { karat: 24, price: prices["24k_price_usd"] },
    { karat: 21, price: prices["21k_price_usd"] },
    { karat: 18, price: prices["18k_price_usd"] },
  ];
    return (
        

            <>
            
            <InnerNav name={user?.name}  letters={letters}/>
            <div className='app-container flex justify-between items-center pt-30'>
                <div className=' text-white'>  
                    <h2 className='text-md md:text-3xl font-bold capitalize '>
                        Welcome back , {user?.name} 
                    </h2>
                </div>
                <Currency bgColor="section" />
            </div>

            
            

            <div  className='app-container flex flex-col md:flex-row justify-center items-center gap-10 p-15 '>
                {data.map((info)=>(
                    <DashboardData key={info.title} bg={info.bg}  icon={info.icon} color={info.color} shadow={info.shadow}
                    title={info.title} number={info.number}/>
                ))}
            </div>

                 

            <div className="app-container">
                <div className='p-6   bg-section w-full rounded-xl border border-secondary/50'>
                    <div className='flex justify-between items-center h-7'>
                    <span className='text-white font-bold text-2xl flex gap-2'><i class="text-accent text-3xl fa-solid fa-chart-column"> </i>
                        Current Gold Prices</span>

                    <span className='text-secondary/90 font-light'>Per gram</span>
                </div>

                <div className='flex flex-col md:flex-row gap-10 px-9 mt-10'>
            

                    {karats.map((karat)=>(
                        <div className='bg-primary rounded-2xl p-3 w-full md:w-7xl flex justify-between items-center h-full'>
                            <span className='text-secondary/90 font-light'>{karat.karat}K</span>
                            <span className='font-bold text-accent'><span>{currency === "JOD" ? `JOD` : `USD`} </span> {karat.price}</span>
                        </div>
                    ))}
                    
                </div>
                </div>
            </div>
            </>
    );
}

export default Dashboard;        