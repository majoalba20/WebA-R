import "../App.css"
import { lazy, Suspense } from 'react';
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Banner from "../components/home/Banner";
import BeforeAfter from "../components/home/BeforeAfter";
import Renovations from "../components/home/Renovations";
import About from "../components/home/About";
import Reviews from "../components/home/Reviews";
import Videos from "../components/home/VideoTimeline";
import WhatsAppButton from "../components/home/WhatsAppButton";

const Portfolio3D = lazy(() => import('../components/projects3D/Portfolio3D'));

function Home() {
  return (
    <>
      <Navbar/>
      <main>
        <Banner/>
        <BeforeAfter/>
        <Renovations/>
        <Suspense fallback={<div className="py-12 text-center text-gray-400 text-sm font-light">Cargando experiencia 3D...</div>}>
          <Portfolio3D />
        </Suspense>
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