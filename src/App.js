import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Add from "./components/admin/Add";
import Admin from "./components/admin/Admin";
import Update from "./components/admin/Update";
import Dashboard from "./components/Dashboard";
import Detail from "./components/Detail";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Register from "./components/Register";
import './style.css'
import AddImage from './components/admin/AddImage';
import { API } from "./utils/api";
import axios from "axios";

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      navigate('/login');
    } else {
      setUser(JSON.parse(localStorage.getItem('user')).user)
    }

    getTopDestination();
    getTrendingDestination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTopDestination = () => {
    axios.get(API + '/v1/destination/type/top')
      .then(res => {
        setTopDestination(res.data);
      })
  }


  const [topDestination, setTopDestination] = useState([]);

  const getTrendingDestination = () => {
    axios.get(API + '/v1/destination/type/trending')
      .then(res => {
        setTrendingDestination(res.data);
      })
  }


  const [trendingDestination, setTrendingDestination] = useState([]);

  const [user, setUser] = useState()
  return (
    <div>
      <Navigation user={user} setUser={setUser} setTrendingDestination={setTrendingDestination} setTopDestination={setTopDestination} />
      <Routes>
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        <Route path="/detail/:slug" element={<Detail user={user} topDestination={topDestination} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard trendingDestination={trendingDestination} topDestination={topDestination} />} />
        {/* For admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/update/:slug" element={<Update />} />
        <Route path="/add-image/:slug" element={<AddImage />} />
        <Route path="/add-destination" element={<Add />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
