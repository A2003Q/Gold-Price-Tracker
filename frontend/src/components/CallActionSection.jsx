import React from 'react'
import { Link } from 'react-router-dom'

function CallActionSection() {
  return (
    <>
    <section className=' py-20'>
      <div className=' bg-accent py-24'>
          <div className='app-container flex justify-center items-center flex-col space-y-4'>
            <h3 className='text-2xl font-bold text-section'>Ready to Start Tracking Your Gold Assets?</h3>
            <p className='text-section'>Join thousands of investors who trust GoldTrack for their gold portfolio management</p>
            <button className='btn-primary-call mt-9 '>
            <Link to='/login'><span>Start Tracking Your Gold</span></Link> <i class="text-2xl fa-solid fa-arrow-right-long"></i>
          </button>
          </div>

      </div>
    </section>
    </>
  )
}

export default CallActionSection
