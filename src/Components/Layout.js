import { Outlet, Link } from "react-router-dom";
import Header from  "./Header";
import Footer from  "./Footer";
import Banner from "./Banner";
import ScrollToTop from "react-scroll-to-top";

const Layout = () => {
  return (
    <>
      <Header />
      <Banner />
      <div className="wrapper mt-4 container">
      <Outlet />
      </div>
      <ScrollToTop smooth />
      <Footer />
     
    </>
  )
};

export default Layout;