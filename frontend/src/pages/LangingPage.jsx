import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import GoldPriceSection from '../components/GoldPriceSection'
import CoinsSection from '../components/CoinsSection'
import BarsSection from '../components/BarsSection'
import CallActionSection from '../components/CallActionSection'
import Footer from '../components/Footer'


function LangingPage() {
    return (
        <>
            <Navbar/>
            <main>
                <HeroSection/>
                <GoldPriceSection/>
                <CoinsSection/>
                <BarsSection/>
                <CallActionSection/>
            </main>
            <Footer/>
        </>
    )
}

export default LangingPage