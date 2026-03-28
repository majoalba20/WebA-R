import Navbar from "../components/layout/Navbar";
import Banner from "../components/home/Banner";
import BeforeAfter from "../components/home/BeforeAfter";

function Home() {
  return (
    <>
      <Navbar/>
      <main>
        <Banner/>
        <BeforeAfter/>
      </main>
    </>
  );
}

export default Home;