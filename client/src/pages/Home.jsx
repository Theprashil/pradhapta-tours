import React from 'react'
import Announcements from '../components/Announcements.jsx'
import Slider from '../components/Slider.jsx'
import NavBar from '../components/NavBar.jsx'
import Newsletter from '../components/NewsLetter.jsx'
import Footer from '../components/Footer.jsx'
import Tours from '../components/Tours.jsx'


function Home() {
    return (
        <div>
            <Announcements />
            <NavBar />
            <Slider />
            <Tours />
            <Newsletter/>
            <Footer/>
        </div>
    )
}

export default Home
