import NavBar from "./components/common/NavBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginBox from "./components/login/LoginBox";
import Footer from "./components/common/Footer";
import Menu from "./components/menu/Menu";

/**
 * Main app.
 */
function App() {
  return (
    <div>
      <NavBar appName="My Finance Advisor" appIcon="bi bi-coin"/>
      <div className="mt-3"></div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginBox />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>  
      </BrowserRouter>
      <Footer content="Developed By: Rich Cerone" />    
    </div>
    
  );
}

export default App;
