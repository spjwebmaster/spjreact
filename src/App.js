import React, { Component, useState, useEffect } from "react";
import {
  Routes, 
  Route, 
  Link,
  useLocation,
  useNavigate,
  useParams,
  BrowserRouter,
} from "react-router-dom";
import Layout from './Components/Layout';
import Home from './Pages/Home';
import News from './Pages/News/News';
import Events from './Pages/News/Events';
import About from './Pages/About/About';
import Staff from './Pages/About/Staff';
import Foundation from './Pages/About/Foundation';
import NotFound from './Pages/NotFound';
import "./App.css";

function App() {

  const [menu, setMenu] = useState([]);
  useEffect(() => {
    // code to run on component mount

    fetch('/jsonapi/menu_items/main')
        .then(response=>response.json())
        .then(data => {
            //console.log("menu data", data);
            setMenu(data.data);
           
          })
    
  }, []);

  return (
    <div className="reactApp">
     
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout menu={menu} />}>
          <Route path="*" element={<NotFound />} />
          
          <Route index element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:title" element={<News />} />
          <Route path="/news/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/staff" element={<Staff />} />
          <Route path="/about/foundation" element={<Foundation />} />
          <Route path="/about/foundation/:page" element={<Foundation />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
