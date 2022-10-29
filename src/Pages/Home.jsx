import React from 'react';
import NavBar from '../Components/NavBar';
import Announcements from '../Components/Announcements'
// import Slider from '../Components/Slider'
import Categories from '../Components/Categories';
import Products from '../Components/Products';
import Newsletter from '../Components/Newsletter';
import Footer from '../Components/Footer';
import NextSlider from '../Components/NextSlider';

const Home = () => {
  return (
    <div>
      <Announcements />
      <NavBar />
      <NextSlider />
      {/* <Slider /> */}
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home