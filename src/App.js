import React from 'react';
import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { NavBar } from "../src/components/Navbar";
import { Container } from "react-bootstrap";
import { Admin } from "../src/pages/Admin";
import { Home } from "../src/pages/Home";
import { Profile } from "./pages/Profile";
import { SingleVenue } from "../src/pages/SingleVenue";
import { Footer } from "../src/components/Footer";
import { Login } from "../src/pages/Login";
import { Register } from "../src/pages/Register";
import { Logout } from "../src/pages/Logout";
import { LoginAdmin } from "../src/pages/Admin_login";
import { Layout } from "../src/components/Layout";
import {AdminVenues} from "../src/components/AdminVenues"




function App() {
  return (
    <>
      <Container className={styles.app}>
      <NavBar />
        <Routes>
         <Route path="/" element={<Layout />} />
          <Route index element={<Home />} />
          <Route path="/singlevenue/:id" element={<SingleVenue />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin_login" element={<LoginAdmin />} />
          <Route path="/adminvenues/:id" component={AdminVenues} />
        </Routes>
     
        <Footer />
      </Container>
    </>
  );
}

export default App;
