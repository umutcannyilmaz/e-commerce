import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import video1 from "../videos/video1.mp4";
import styled from "styled-components";

// npm i styled-components
// import styled from "styled-components"
const Advertisement= styled.div`
 width:100%;
 height:88vh
`;

const VideoPanel = styled.video`
width:100%;
position:absolute;
z-index:-1;
height:auto;
top:0;
left:0;
`;

const Home = () => {
  return (
    <div>
      
      <Announcement />
      <Navbar />
      <Advertisement>
      <VideoPanel src={video1} autoPlay loop muted/>
      </Advertisement>
      
      <Slider />
      <Categories />
      <Products/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
