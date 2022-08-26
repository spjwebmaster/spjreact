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
import BasicPage from './Components/Shared/BasicPage';
import FAQ from './Components/Shared/FAQ';
import Conferences from './Pages/Conferences';
import News from './Pages/News/News';
import Events from './Pages/News/Events';
import Awards from './Pages/Explore/Awards/Awards';
import List from "./Components/Shared/List";
import CommunityList from "./Components/Widgets/About/CommunityList";
import Community from './Pages/About/Communities/Community';
import Webinar from "./Components/Widgets/Webinar";
import Explore from './Pages/Explore/Explore';
import About from './Pages/About/About';
import Staff from './Pages/About/Staff';
import Committees from './Pages/About/Committees';
import NewsEvents from './Pages/News/NewsEvents';
import NotFound from './Pages/NotFound';
import Search from './Pages/Search';
import Donate from './Pages/Donate';
import "./App.css";

function App() {


  const [menu, setMenu] = useState([]);
  const [page, setPage] = useState("/");
  
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
        <Route path="/" element={<Layout menu={menu} page={page} />}>
          <Route path="*" element={<NotFound />} />
          
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/conferences" element={<Conferences  menu={menu}/>} />
          <Route path="/search/:term" element={<Search />} />
          <Route path="/news" element={<News  menu={menu} />} />
          <Route path="/news/:title" element={<News   menu={menu}/>} />
          <Route path="/news/events" element={<Events  menu={menu} />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/news-events" element={<BasicPage menu={menu} />} />
          <Route path="/news/events/:event" element={<Events />} />
          <Route path="/ethics" element={<BasicPage  menu={menu} />} />
          <Route path="/ethics/:page/*" element={<BasicPage  menu={menu} />} />
          <Route path="/ethics/ethicsfaq" element={<BasicPage  menu={menu} widget={<FAQ view="ethicsfaq" />} />} />
          
          <Route path="/communities" element={<BasicPage  menu={menu} widget={<CommunityList />} />} />
          <Route path="/freelance" element={<Community  menu={menu} />} />
          <Route path="/freelance/:page" element={<BasicPage  menu={menu}  />} />

          <Route path="/international" element={<Community  menu={menu} />} />
          <Route path="/international/:page" element={<BasicPage  menu={menu} />} />

          <Route path="/awards" element={<Awards  menu={menu}/>} />
          <Route path="/awards/:category" element={<Awards  menu={menu}/>} />
          <Route path="/awards/:category/:code" element={<Awards  menu={menu}/>} />
          <Route path="/explore" element={<Explore  menu={menu}/>} />
          <Route path="/about" element={<About menu={menu} />} />
          <Route path="/about/:page/*" element={<About menu={menu} />} />
          <Route path="/about/committees" element={<Committees menu={menu} />} />
          <Route path="/about/committees/:term" element={<Committees menu={menu} />} />
          <Route path="/about/spj/staff" element={<Staff menu={menu}/>} />

          <Route path="/membership" element={<BasicPage  menu={menu}  />} />

          <Route path="/resources" element={<BasicPage  menu={menu}  />} />
          <Route path="/foi" element={<BasicPage  menu={menu}  />} />
          <Route path="/foi/:page/*" element={<BasicPage  menu={menu}  />} />
          <Route path="/diversity" element={<BasicPage  menu={menu}  />} />
          <Route path="/diversity/:page/*" element={<BasicPage  menu={menu}  />} />
          <Route path="/webinars" 
                element={<BasicPage hideSidebar menu={menu}  
                widget={<List id="webinar_list" block="block_1" include="field_thumb" />} />} />
          <Route path="/webinars/:page" element={<Webinar  menu={menu}  />} />
          
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
