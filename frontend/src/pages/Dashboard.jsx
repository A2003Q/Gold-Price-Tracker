import  { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import InnerNav from '../components/InnerNav';
import Currency from '../components/Currency';
import DashboardData from '../components/DashboardData';
import { useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';

import asset1 from "../assets/images/asset1.jpg"
import asset2 from "../assets/images/asset2.jpg"
import AssetData from '../components/AssetData';
import { Link } from 'react-router-dom';


function Dashboard() {
    //     const assets =[
    //     {id:1, pic : asset1 , category :"Ring" , karat : 24 , weight :21 , PurchasePrice : 900 , CurrentValue :1200 , profitOrLose :300},
    //     {id:2, pic : asset2 , category :"Ring" , karat : 24 , weight :21 , PurchasePrice : 900 , CurrentValue :1200 , profitOrLose :300},
    //     {id:3, pic : asset2 , category :"Ring" , karat : 24 , weight :21 , PurchasePrice : 900 , CurrentValue :1200 , profitOrLose :300},
    //     {id:4, pic : asset2 , category :"Ring" , karat : 24 , weight :21 , PurchasePrice : 900 , CurrentValue :1200 , profitOrLose :300},
    //     {id:5, pic : asset2 , category :"Ring" , karat : 24 , weight :21 , PurchasePrice : 900 , CurrentValue :1200 , profitOrLose :300},
    //     {id:6, pic : asset2 , category :"Ring" , karat : 24 , weight :21 , PurchasePrice : 900 , CurrentValue :1200 , profitOrLose :300},
    //     {id:7, pic : asset2 , category :"Ring" , karat : 24 , weight :21 , PurchasePrice : 900 , CurrentValue :1200 , profitOrLose :300},
    // ]

    const handleAssetDelete = (id) => {
    setAssets(prevAssets => prevAssets.filter(asset => asset.id !== id));
};
    const [assets, setAssets] = useState([]);
    const [loadingAssets, setLoadingAssets] = useState(true);

    useEffect(() => {
    fetch("http://127.0.0.1:8000/api/assets", {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
    .then(data => {
        setAssets(data.assets);
        setLoadingAssets(false);
        console.log(data);
    })
    .catch(err => {
        console.error(err);
        setLoadingAssets(false);
    });
}, []);


// if (loadingAssets) {
//     return <p className="text-center text-white">Loading assets...</p>;
// }


    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentAssets = assets.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(assets.length / itemsPerPage);
    console.log(currentAssets);


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
        { icon :<i className="fa-solid fa-basket-shopping"></i> , bg:"section" , color:"accent" ,shadow:"accent",  title:"Total Assets" , number :27},
        { icon :<i className="fa-solid fa-chart-line"></i> , bg:"section" , color:"accent" ,shadow:"accent",  title:"Total Profit" , number: currency === "JOD" ? "JOD 9,880" : "USD 9,880"},
        { icon :<i className="fa-solid fa-coins"></i> , bg:"section" , color:"accent" ,shadow:"accent",  title:"Total Weight" , number :'167 g'}
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
    { karat: 24, price: currency === "JOD" ? prices["24k_price_jod"] : prices["24k_price_usd"] },
    { karat: 21, price: currency === "JOD" ? prices["21k_price_jod"] : prices["21k_price_usd"] },
    { karat: 18, price: currency === "JOD" ? prices["18k_price_jod"] : prices["18k_price_usd"] },
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
                    <span className='text-white font-bold text-2xl flex gap-2'><i className="text-accent text-3xl fa-solid fa-chart-column"> </i>
                        Current Gold Prices</span>

                    <span className='text-secondary/90 font-light'>Per gram</span>
                </div>

                <div className='flex flex-col md:flex-row gap-10 px-9 mt-10'>


                    {karats.map((karat)=>(
                        <div key={karat.karat} className='bg-primary rounded-2xl p-3 w-full md:w-7xl flex justify-between items-center h-full'>
                            <span className='text-secondary/90 font-light'>{karat.karat}K</span>
                            <span className='font-bold text-accent'><span>{currency === "JOD" ? `JOD` : `USD`} </span> {karat.price}</span>
                        </div>
                    ))}

                </div>
                </div>
            </div>

            <div className="app-container mb-20">
                <div className='flex justify-between items-center h-7 mt-10 '>
                    <span className='text-white text-xl font-bold hidden md:block'>Your Gold Assets</span>
                    <button className='cursor-pointer bg-accent hover:bg-accent/80 transition px-4 w-full md:w-70 font-bold py-2 rounded-lg text-section'>
                        <Link to='/add-asset'> + Add You Assets </Link>
                    </button>
                </div>



                <div className='grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-5 mt-15'>


                    {currentAssets.map((asset) => (

                    <AssetData
    key={asset.id}
    id={asset.id}
    category={asset.category}
    currency={currency}
    pic={asset.image}
    karat={asset.karat}
    weight={asset.weight}
    CurrentValue={currency === "JOD" ? asset.calculation.current_value_jod : asset.calculation.current_value_usd}
    profitOrLose={currency === "JOD" ? asset.calculation.profit_loss_jod : asset.calculation.profit_loss_usd}
    PurchasePrice={asset.purchase_price}
    onDelete={handleAssetDelete}
/>

                ))}

                </div>
                <div className="flex justify-center items-center gap-3 mt-10">

                {/* Previous */}
                <button
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-primary text-white rounded disabled:opacity-50"
                >
                    ←
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => (
                    <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 rounded ${
                        currentPage === index + 1
                        ? "bg-accent text-section"
                        : "bg-primary text-white"
                    }`}
                    >
                    {index + 1}
                    </button>
                ))}

                {/* Next */}
                <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-primary text-white rounded disabled:opacity-50"
                >
                    →
                </button>

                </div>
            </div>


            </>
    );
}

export default Dashboard;
