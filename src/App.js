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
import Conferences from './Pages/Conferences';
import News from './Pages/News/News';
import Events from './Pages/News/Events';
import Ethics from './Pages/Ethics/Ethics';
import About from './Pages/About/About';
import Staff from './Pages/About/Staff';
import Foundation from './Pages/About/Foundation';
import NotFound from './Pages/NotFound';
import Search from './Pages/Search';
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
          <Route path="/search" element={<Search />} />
          <Route path="/conferences" element={<Conferences />} />
          <Route path="/search/:term" element={<Search />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:title" element={<News />} />
          <Route path="/news/events" element={<Events />} />

          <Route path="/news/events/:event" element={<Events />} />
          <Route path="/ethics" element={<Ethics />} />
          <Route path="/ethics/:page/*" element={<Ethics />} />
          <Route path="/about" element={<About menu={menu} />} />
          <Route path="/about/:page/*" element={<About menu={menu} />} />
          <Route path="/about/spj/staff" element={<Staff  menu={menu}/>} />
          
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
