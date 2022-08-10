import { Outlet, Link } from "react-router-dom";
import Header from  "./Header";
import Footer from  "./Footer";
import Banner from "./Banner";
import ScrollToTop from "react-scroll-to-top";
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function Bread(props){
  const breadcrumbs = useBreadcrumbs();
  const menu = props.menu;

  return (
    <div className="navbar breadcrumb bg-light me-auto mb-2 mb-lg-0">
      <ul className="navbar-nav">
        {breadcrumbs.map(({ breadcrumb }) => {

            
            const name = breadcrumb.props.children;
            
            let menuTitleNode = menu.filter(t=>t.attributes.url == breadcrumb.key);
            let menuTitle = (menuTitleNode.length? menuTitleNode[0].attributes.title: name);
            
            console.log("bread: ", breadcrumb.key, name, menuTitleNode[0]);
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
  //console.log("layout", menu);

  
  return (
    <div className="wrapper">
      <Header menu={menu} />
      <Banner />
      <div className="wrapper mt-4 container">
        <Bread menu={menu} />
      <Outlet menu={menu} />
      </div>
      <ScrollToTop smooth />
      <Footer menu={menu} />
     
    </div>
  )
};

export default Layout;