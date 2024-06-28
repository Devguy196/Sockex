import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Sock from "./components/socks";
import Footer from "./components/Footer.jsx";
import Search from "./components/Search.jsx";
import Home from "./components/Home";
import Featured from "./components/Featured";
import AddSock from "./components/AddSock";
import RequireAuth from "./hooks/RequireAuth.jsx";
import AuthContext from "./hooks/AuthContext.jsx"
function App() {
  const [data, setData] = useState([]);

  const handleDelete = async (sockId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SOCKS_API_URL}/${sockId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Sock could not be deleted!');
      }
      const updatedData = data.filter(sock => sock._id !== sockId);
      setData(updatedData);
    } catch (error) {
      console.error('Error deleting sock:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_SOCKS_API_URL);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setData(json_response);
      } catch (error) {
        console.error('Error fetching socks:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">TSE</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-sock">Add Sock</Link>
              </li>
            </ul>
            <Search setData={setData} />
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </div>
        </div>
      </nav>
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <div className="container-fluid">
          <div className="row">
          <AuthProvider>
<Routes>
    <Route exact path="/" element={<Home data={data} handleDelete={handleDelete} page={page} setPage={setPage} />} />
    <Route path="/about" element={<About />} />
    <Route path="/add" element={
    <RequireAuth>
        <AddSock />
    </RequireAuth>
    } />
    <Route path="/Login" element={<LoginForm />} />
</Routes>
</AuthProvider>
            <Featured />
            <div className='bg-yellow'>
              <Footer environment="DEVELOPMENT" />
            </div>
            <div className='bg-green'>
              <Footer environment="PRODUCTION" />
            </div>
          </div>
        </div>
      </main>
    </Router>
  );
}

export default App;
