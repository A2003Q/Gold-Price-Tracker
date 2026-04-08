import React from 'react'

function DashboardData({icon , title , number ,color , shadow , bg}) {
  return (
    <>
        <div className={`flex flex-col gap-5 border border-secondary/40 bg-${bg} w-full md:w-7xl px-5 py-7 rounded-xl shadow shadow-${shadow}/40 shadow-lg border-b-6 border-b-${color}/70 border-${color} hover:-translate-y-4 transition duration-200`}>
                    <div className='flex justify-start items-center gap-3'>
                        <span className={`text-${color} bg-${color}/20  p-2 rounded-xl text-2xl`}>{icon}</span>
                        <span className='text-white font-light'>{title}</span>
                    </div>
                    <span className='font-bold text-4xl text-white px-8'>{number}</span>
        </div>
    </>
  )
}

export default DashboardData