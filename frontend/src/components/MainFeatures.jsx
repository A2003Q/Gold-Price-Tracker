import React from 'react'

function MainFeatures() {
return (
    <>
    <div className='flex gap-16 '>
        <div className='icons-container'>
            <i class="fa-solid fa-shield-halved icon"></i>
            <span className='text-white' >Secure & Trusted</span>
        </div>
            <div className='icons-container'>
                <i class="fa-solid fa-arrow-trend-up icon"></i>
                <span className='text-white' >Real-Time Prices</span>
            </div>
    </div>
    </>
)
}

export default MainFeatures