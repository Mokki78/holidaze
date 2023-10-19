import './App.css';
import { Routes, Route } from "react-router-dom";
import { NavBar } from "../src/components/Navbar";
import { Container } from "react-bootstrap";
import { Admin } from "../src/pages/Admin";
import { Home } from "../src/pages/Home";
import { Profile } from "./pages/Customer";
import { SingleVenue } from "../src/pages/SingleVenue";



function Header() {
  return (
    <>
    <div>
      <NavBar />
    </div>
    </>
  )
}



function App() {
  return (
   <>
   <Container>
   
     <Header />
   <Routes>
     <Route path="/" index element={<Home />} />
     <Route path="/singlevenue/:id"  element={<SingleVenue />} />
     <Route path="/profile"  element={<Profile />} />
     <Route path="/admin" element={<Admin />} />
    
   </Routes>

   </Container>
   </>
  );
}

export default App;
