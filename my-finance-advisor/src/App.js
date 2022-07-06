import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginBox from "./components/login/LoginBox";
import Footer from "./components/common/Footer";
import Accounts from "./components/accounts/Accounts";

/**
 * Main app.
 */
function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginBox />} />
            <Route path="/accounts" element={<Accounts />} />
          </Routes>  
      </BrowserRouter>
      <Footer content="Developed By: Rich Cerone" />    
    </div>
    
  );
}

export default App;
