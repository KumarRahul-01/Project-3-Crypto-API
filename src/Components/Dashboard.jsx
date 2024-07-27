import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { trendingProducts } from "../Utils/API";
import Footer from "../Layouts/Footer";
import "./Home.css"; // Import the custom CSS file

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle("mobile-nav-active");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allProducts"],
    queryFn: trendingProducts,
    staleTime: 60000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

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
                  id="logo"
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
              <input
                type="text"
                value={search}
                onChange={handleChange}
                className="form-control"
                placeholder="Search..."
                style={{ width: "220px" }}
              />
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
            <div
              className="table-container"
              style={{
                height: "700px",
                overflowY: "auto",
                border: "2px solid",
                position: "relative",
              }}
            >
              <table className="table table-striped">
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#0000FF",
                    color: "white",
                    zIndex: 1,
                  }}
                >
                  <tr>
                    <th style={{ border: "2px solid", width: "100px" }}>
                      Logo
                    </th>
                    <th style={{ border: "2px solid", width: "300px" }}>
                      Name
                    </th>
                    <th style={{ border: "2px solid", width: "180px" }}>
                      Max Exchange
                    </th>
                    <th style={{ border: "2px solid", width: "130px" }}>
                      $ Price
                    </th>
                    <th style={{ border: "2px solid", width: "100px" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((coin) => (
                    <tr key={coin.id}>
                      <td>
                        <Link to={`/data/${coin.id}`}>
                          <img
                            src={`https://cryptologos.cc/logos/${coin.id.toLowerCase()}-${coin.symbol.toLowerCase()}-logo.png?v=014`}
                            alt={coin.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "";
                            }}
                            style={{
                              width: "40px",
                              height: "45px",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                          {!coin.imageUrl}
                        </Link>
                      </td>
                      <td style={{ fontSize: "16px" }}>
                        <Link to={`/data/${coin.id}`}>{coin.name}</Link>
                      </td>
                      <td style={{ fontSize: "16px" }}>
                        $ {parseFloat(coin.volumeUsd24Hr).toFixed(2)}
                      </td>
                      <td style={{ fontSize: "16px" }}>
                        $ {parseFloat(coin.priceUsd).toFixed(2)}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn"
                            style={{
                              fontSize: "20px",
                              backgroundColor: "Green",
                              color: "white",
                              marginRight: "5px",
                            }}
                          >
                            Buy
                          </button>
                          <button
                            className="btn me-1"
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              fontSize: "20px",
                              marginLeft: "5px",
                            }}
                          >
                            Sell
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default Dashboard;
