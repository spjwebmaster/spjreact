import React, { Component, useState, useEffect, Suspense } from "react";
import { Outlet, Link } from "react-router-dom";
import Header from  "./Header";
import Footer from  "./Footer";

import ScrollToTop from "react-scroll-to-top";
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const Banner = React.lazy(() => import("./Shared/Banner"));

function Bread(props){
  const breadcrumbs = useBreadcrumbs();
  const menu = props.menu;
  

  return (
    <div className={`navbar breadcrumb bg-light me-auto mb-2 mb-lg-0`}>
      <ul className="navbar-nav">
        {breadcrumbs.map(({ breadcrumb }) => {

            
            const name = breadcrumb.props.children;
            
            let menuTitleNode = menu.filter(t=>t.attributes.url == breadcrumb.key);
            let menuTitle = (menuTitleNode.length? menuTitleNode[0].attributes.title: name);
            

            return(
              <li className="nav-item" key={breadcrumb.key}>
                <a className="nav-link" href={breadcrumb.key}>
                  {menuTitle}
                </a> 
              </li>
            ) 
          })}
      </ul>
    </div>
  )
}

const Layout = (props) => {
  const  menu = props.menu;
  let params = useParams();
  let location = useLocation();
  let pathFull = location.pathname.replaceAll("/", "");
  const [menuOpen, setMenuOpen] = useState(false)

  if(pathFull==""){
    pathFull="home";
  }
  
  const menuclick = function(){
    setMenuOpen(!menuOpen);
  }

  return (
    <div className={`wrapper ${pathFull}`}>
      <Header menu={menu} page={props.page} menuopen={menuOpen} menuclick={menuclick} />
      <Suspense fallback={<p>loading...</p>}>
       <Banner />
     </Suspense>
      
      <div className="wrapper mt-4 container">
        <Bread menu={menu} />
        <Outlet menu={menu} />
      </div>
      <ScrollToTop smooth />
      <Footer menu={menu} page={props.page} />
     
    </div>
  )
};

export default Layout;