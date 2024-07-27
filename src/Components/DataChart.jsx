import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import { showSingleProduct } from "../Utils/API";
import Footer from "../Layouts/Footer";
import "./Home.css"; // Import the custom CSS file

const DataChart = () => {
  const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle("mobile-nav-active");
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["charts", id],
    queryFn: () => showSingleProduct(id),
    staleTime: 1000 * 60 * 5,
  });

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

    return () => {
      window.removeEventListener("load", toggleBackToTop);
      window.removeEventListener("scroll", toggleBackToTop);
    };
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.error("Error fetching data:", isError);
    return <p>Error fetching data...</p>;
  }

  if (!data || !data.history || !data.details) {
    console.warn("No data available for the given ID:", id);
    return <p>No data available.</p>;
  }

  const formattedData = data.history.map((entry) => ({
    x: new Date(entry.time),
    y: parseFloat(entry.priceUsd),
  }));

  const options = {
    chart: {
      type: "line",
      height: 550,
    },
    xaxis: {
      type: "datetime",
    },
  };

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
                  src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/letter-c-logo-design-template-701037c7446ea8e41848e54bafad8cac_screen.jpg?ts=1639894400"
                  alt="Logo"
                  className="img-fluid rounded-circle mb-2"
                />
                <h1 className="text-light">Crypto Coin</h1>
              </div>
              <nav id="navbar" className="nav-menu navbar mb-3">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link to="/" className="nav-link scrollto">
                      <i className="bx bx-home"></i> <span>Home</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link scrollto active">
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
          <div className="container mt-3 p-1">
            <Link
              to="/dashboard"
              style={{
                color: "red",
                textDecoration: "none",
                paddingLeft: "1000px",
              }}
            >
              Close X
            </Link>
            <Chart
              options={options}
              series={[{ data: formattedData }]}
              type="line"
              height={350}
            />
            <div className="flex items-center">
              <div className="row">
                <div className="col-1">
                  <img
                    src={`https://cryptologos.cc/logos/${data.details.id.toLowerCase()}-${data.details.symbol.toLowerCase()}-logo.png?v=014`}
                    alt={data.details.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "path/to/fallback-image.png";
                    }}
                    style={{
                      width: "45px",
                      height: "45px",
                      marginRight: "10px",
                    }}
                    className="rounded-full"
                  />
                </div>
                <div className="col-8" >
                  <h1 style={{color: "dark"}}>{data.details.name}</h1>
                </div>
                <div className="col-3">
                  <button
                    className="btn btn-success"
                    style={{ marginRight: "5px" }}
                  >
                    Buy
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "5px" }}
                  >
                    Sell
                  </button>
                </div>
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#B2BEB5" }}>
              <div className="col-6">
                <p>Supply:</p>
              </div>
              <div className="col-6 text-end">
                ${parseFloat(data.details.supply).toFixed(2)}
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#B2BEB5" }}>
              <div className="col-6">
                <p>Max Supply:</p>
              </div>
              <div className="col-6 text-end">
                ${parseFloat(data.details.maxSupply).toFixed(2)}
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#B2BEB5" }}>
              <div className="col-6">
                <p>Market Cap (USD):</p>
              </div>
              <div className="col-6 text-end">
                ${parseFloat(data.details.marketCapUsd).toFixed(2)}
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#B2BEB5" }}>
              <div className="col-6">
                <p>Volume (USD 24Hr.):</p>
              </div>
              <div className="col-6 text-end">
                ${parseFloat(data.details.volumeUsd24Hr).toFixed(2)}
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#B2BEB5" }}>
              <div className="col-6">
                <p>Price (USD):</p>
              </div>
              <div className="col-6 text-end">
                ${parseFloat(data.details.priceUsd).toFixed(2)}
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#B2BEB5" }}>
              <div className="col-6">
                <p>Exchange Change % (USD 24Hr.):</p>
              </div>
              <div className="col-6 text-end">
                ${parseFloat(data.details.changePercent24Hr).toFixed(2)}
              </div>
            </div>
            <div className="row" style={{ backgroundColor: "#B2BEB5" }}>
              <div className="col-6">
                <p>V Wap (24Hr.):</p>
              </div>
              <div className="col-6 text-end">
                ${parseFloat(data.details.vwap24Hr).toFixed(2)}
              </div>
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

export default DataChart;
