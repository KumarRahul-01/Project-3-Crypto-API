import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { trendingProducts } from "../Utils/API";
import Footer from "../Layouts/Footer";
import "./Home.css"; // Import the custom CSS file

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isLoading, isError } = useQuery({
    queryKey: ["allProducts"],
    queryFn: trendingProducts,
    staleTime: 60000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle("mobile-nav-active");
  };

  const scrollto = (el) => {
    const element = document.querySelector(el);
    const headerOffset = 70; // Adjust this value based on your header height
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const backToTop = document.querySelector(".back-to-top");

    const toggleBackToTop = () => {
      if (window.scrollY > 100) {
        backToTop.classList.add("active");
      } else {
        backToTop.classList.remove("active");
      }
    };

    window.addEventListener("load", toggleBackToTop);
    window.addEventListener("scroll", toggleBackToTop);

    const handleScrollTo = (e) => {
      if (e.target.classList.contains("scrollto")) {
        e.preventDefault();
        const hash = e.target.hash;

        if (document.querySelector(hash)) {
          if (document.body.classList.contains("mobile-nav-active")) {
            document.body.classList.remove("mobile-nav-active");
            const navbarToggle = document.querySelector(".mobile-nav-toggle");
            navbarToggle.classList.toggle("bi-list");
            navbarToggle.classList.toggle("bi-x");
          }
          scrollto(hash);
        }
      }
    };

    document.addEventListener("click", handleScrollTo);

    return () => {
      window.removeEventListener("load", toggleBackToTop);
      window.removeEventListener("scroll", toggleBackToTop);
      document.removeEventListener("click", handleScrollTo);
    };
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data...</p>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div
          className={`sidebar col-lg-3 col-md-4 ${isSidebarOpen ? "open" : ""}`}
        >
          <div className="p-3">
            <div className="d-flex flex-column align-items-center">
              <div className="profile mb-3">
                <img
                  src="/Logo.png"
                  alt="Logo"
                  className="img-fluid rounded-circle mb-2"
                />
                <h1 className="text-light">Crypto Coin</h1>
              </div>
              <nav id="navbar" className="nav-menu navbar mb-3">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link to="/" className="nav-link scrollto active">
                      <i className="bx bx-home"></i> <span>Home</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link scrollto">
                      <i className="bx bx-category"></i> <span>Dashboard</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link scrollto">
                      <i className="bx bx-user"></i> <span>Profile</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <Footer />
          </div>
        </div>
        {/* Sidebar */}
        <div className="col-lg-9 col-md-8">
          <div className="d-lg-none">
            <i
              className="bi bi-list mobile-nav-toggle"
              onClick={toggleSidebar}
            ></i>
          </div>
          <div className="container mt-3 p-1 text-center">
            <img
              src="/Logo.png"
              alt="Logo"
              className="img-fluid mb-3"
              style={{ maxHeight: "300px" }}
            />
            <h1>Welcome to Crypto Coin</h1>
            <div className="mt-3">
              <Link to="/login">
                <button className="btn btn-primary me-2">Log In</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
};

export default Home;
