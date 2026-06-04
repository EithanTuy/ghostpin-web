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
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 px-6 font-sans bg-[#f5f5f7] text-[#1d1d1f]">
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="text-lg text-[#6e6e73]">This page drifted off the map.</p>
      <button
        onClick={() => (window.location.href = "/")}
        className="px-6 py-3 mt-4 rounded-xl font-bold text-white transition-transform hover:scale-[1.02]"
        style={{ background: "#0071e3" }}
      >
        Return home
      </button>
    </div>
  );
};

export default NotFound;
