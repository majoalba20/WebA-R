import "../App.css"
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Banner from "../components/home/Banner";
import BeforeAfter from "../components/home/BeforeAfter";
import Renovations from "../components/home/Renovations";
import About from "../components/home/About";
import Reviews from "../components/home/Reviews";
import Videos from "../components/home/VideoTimeline";
import Portafolio3D from "../components/projects3D/Portfolio3D";
import WhatsAppButton from "../components/home/WhatsAppButton";

function Home() {
  return (
    <>
      <Navbar/>
      <main>
        <Banner/>
        <BeforeAfter/>
        <Renovations/>
        <Portafolio3D/>
        <Videos/>
        <About/>
        <Reviews/>
      </main>
      <Footer/>
      <WhatsAppButton />
    </>
  );
}

export default Home;