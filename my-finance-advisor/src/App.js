import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginBox from './components/login/LoginBox';
import Footer from './components/common/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginBox />} />
          </Routes>  
      </BrowserRouter>
      <Footer content="Developed By: Rich Cerone" />    
    </div>
    
  );
}

export default App;
