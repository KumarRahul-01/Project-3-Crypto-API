import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../API/AxiosInstance";
import { EndPoints } from "../API/EndPoints";
import imageCompression from "browser-image-compression";
import Footer from "../Layouts/Footer";
import "./Home.css"; // Import the custom CSS file

const EditProfile = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    number: "",
    dob: "",
    profileImage: "",
  });
  const [image, setImage] = useState(null);
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
          setFormData(response.data);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (image) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      try {
        const compressedImage = await imageCompression(image, options);
        const base64Image = await convertBase64(compressedImage);
        formData.profileImage = base64Image;

        console.log("Updating profile with image:", formData);
        await AxiosInstance.put(
          `${EndPoints.editProfile}/${storedUser.id}`,
          formData
        );
        navigate("/profile");
      } catch (error) {
        console.error(
          "Profile update failed with image:",
          error.response || error
        );
        alert("Profile update failed");
      }
    } else {
      try {
        console.log("Updating profile without image:", formData);
        await AxiosInstance.put(
          `${EndPoints.editProfile}/${storedUser.id}`,
          formData
        );
        navigate("/profile");
      } catch (error) {
        console.error(
          "Profile update failed without image:",
          error.response || error
        );
        alert("Profile update failed");
      }
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
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
              to="/profile"
              style={{
                color: "red",
                textDecoration: "none",
                paddingLeft: "900px",
              }}
            >
              Close X
            </Link>
            <h3 className="text-center">Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  ID
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="number" className="form-label">
                  Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="profileImage" className="form-label">
                  Profile Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleImageChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
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

export default EditProfile;
