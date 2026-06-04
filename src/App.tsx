import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Account from "./pages/Account";
import Activate from "./pages/Activate";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import EULA from "./pages/EULA";
import Refund from "./pages/Refund";
import Download from "./pages/Download";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Define all routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/account" element={<Account />} />
        <Route path="/activate" element={<Activate />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/eula" element={<EULA />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/download" element={<Download />} />

        {/* IMPORTANT: DO NOT place any routes below this. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
