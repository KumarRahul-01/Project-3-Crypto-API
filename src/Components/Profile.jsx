import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../API/AxiosInstance";
import { EndPoints } from "../API/EndPoints";
import Footer from "../Layouts/Footer";
import "./Home.css"; // Import the custom CSS file

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle("mobile-nav-active");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        try {
          const response = await AxiosInstance.get(
            `${EndPoints.profile}/${storedUser.id}`
          );
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch profile:", error.response || error);
          localStorage.removeItem("user");
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
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

  if (!user) {
    return <p>Loading...</p>;
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
                    <Link to="/" className="nav-link scrollto">
                      <i className="bx bx-home"></i> <span>Home</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link scrollto">
                      <i className="bx bx-category"></i> <span>Dashboard</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link scrollto active">
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
          <div className="container mt-3 p-5">
            <Link
              to="/dashboard"
              style={{
                color: "red",
                textDecoration: "none",
                paddingLeft: "900px",
              }}
            >
              Close X
            </Link>
            <h3 className="text-center">Profile Details</h3>
            <div className="row">
              <div className="col-6">
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="img-fluid rounded-circle mb-2"
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
              <div className="col-6">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Number:</strong> {user.number}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {user.dob}
                </p>
                <Link
                  to="/edit-profile"
                  className="btn btn-primary"
                  style={{ marginRight: "5px" }}
                >
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger"
                  style={{ marginLeft: "5px" }}
                >
                  Logout
                </button>
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

export default Profile;
