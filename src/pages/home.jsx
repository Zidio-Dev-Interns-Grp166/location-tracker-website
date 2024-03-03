import React from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import About from '../components/about';
import Download from '../components/download';
import MapWithTracking from '../pages/map';
import Footer from '../components/footer';

const Home = () => {
    return ( 
        <div className=''> 
            <Navbar />
            <Hero />
            <About />
            <MapWithTracking />
            <Download />
            <Footer />
        </div>
     );
}
 
export default Home;