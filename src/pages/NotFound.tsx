import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * Default 404 page, displayed when a user attempts to access a non-existent route.
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 not found: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 px-6 font-sans bg-[#13151f] text-[#e7e9f2]">
      <div className="text-6xl">👻</div>
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="text-lg text-[#9aa1b8]">This page drifted off the map.</p>
      <button
        onClick={() => (window.location.href = "/")}
        className="px-6 py-3 mt-4 rounded-xl font-bold text-[#0a0b11] transition-transform hover:scale-[1.02]"
        style={{ background: "linear-gradient(100deg, #a78bfa 0%, #e27fd0 48%, #22d3ee 100%)" }}
      >
        Return home
      </button>
    </div>
  );
};

export default NotFound;
