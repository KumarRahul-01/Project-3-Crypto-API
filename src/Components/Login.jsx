import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../API/AxiosInstance";
import { EndPoints } from "../API/EndPoints";
import Footer from "../Layouts/Footer";
import "./Home.css"; // Import the custom CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle("mobile-nav-active");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.post(EndPoints.login, {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/profile");
    } catch (error) {
      setError("Invalid email or password");
    }
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

    return () => {
      window.removeEventListener("load", toggleBackToTop);
      window.removeEventListener("scroll", toggleBackToTop);
    };
  }, []);

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
          <div className="container mt-3 p-1">
            <Link
              to="/"
              style={{
                color: "red",
                textDecoration: "none",
                paddingLeft: "1000px",
              }}
            >
              Close X
            </Link>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <Link to="/signup" className="btn btn-link">
                Sign Up
              </Link>
            </form>
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

export default Login;
