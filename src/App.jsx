import { useEffect } from "react";
import Lenis from "lenis";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GiftFinder from "./components/GiftFinder/GiftFinder";
import Gifter from "./pages/gifter";

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gift-finder" element={<Gifter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
