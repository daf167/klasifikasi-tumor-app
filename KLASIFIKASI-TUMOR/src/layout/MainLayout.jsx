import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />


      <div
        className="flex-grow-1 bg-light"
        style={{
          marginLeft: !isMobile && sidebarOpen ? "250px" : "0",
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
          width: "100%",
          padding: "1rem",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </button>
          <span className="text-muted d-none d-md-inline">
            Brain Tumor Detection System
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}

export default MainLayout;
