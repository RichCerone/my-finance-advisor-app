import NavBar from './components/common/NavBar';
import LoginBox from './components/login/LoginBox';
import Footer from './components/common/Footer';

function App() {
  return (
    <div>
      <NavBar appName="My Finance Advisor"/>
      <LoginBox/>
      <Footer content="Developed By: Rich Cerone" />
    </div>
  );
}

export default App;
