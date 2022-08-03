
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
import News from './Pages/News';
import About from './Pages/About/About';
import Staff from './Pages/About/Staff';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div className="reactApp">
     
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<NotFound />} />
          
          <Route index element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:title" element={<News />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/staff" element={<Staff />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
