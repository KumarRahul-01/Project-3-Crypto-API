import axios from "axios";

const Base_URL = "https://api.coincap.io/v2";
const User_API_URL = "https://my-vercel-api-2fao.vercel.app";

export const trendingProducts = async () => {
  try {
    const response = await axios.get(`${Base_URL}/assets`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching trending products:", error);
    throw error;
  }
};

export const showSingleProduct = async (id) => {
  try {
    const response = await axios.get(`${Base_URL}/assets/${id}`);
    const historyResponse = await axios.get(`${Base_URL}/assets/${id}/history?interval=d1`);
    return {
      details: response.data.data,
      history: historyResponse.data.data,
    };
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${User_API_URL}/login`, { email, password });
    const user = response.data;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${User_API_URL}/signup`, userData);
    if (response.status === 201) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await axios.put(`${User_API_URL}/editprofile/${userData.id}`, userData);
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error during updating user:", error);
    throw error;
  }
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem("user");
};
