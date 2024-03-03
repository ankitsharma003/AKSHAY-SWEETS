import { Navbar } from './components/Navbar/Navbar';
import './App.css';
import { Shop} from './Pages/Shop'
import { Footer } from './components/Footer/Footer';
import { Route, Routes,BrowserRouter } from 'react-router-dom';
import { Offers } from './components/Offers/Offers';
import { LoginSignup } from './Pages/loginsignup/LoginSignup';
import Product from './Pages/Product';
import { Cart } from './Pages/Cart';
import { useEffect } from 'react';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
   <Navbar/>
   <Routes>
   <Route path='/' element={<Shop/>}/>
   <Route path='/Offers' element={<Offers/>}/>
   <Route path='/LoginSignup' element={<LoginSignup/>}/>
   <Route path='/Product' element={<Product/>}/>
   <Route path='/Product/:productId' element={<Product/>}/>
   <Route path='/Cart' element={<Cart/>}/>
   </Routes>

   <Footer/>
   </BrowserRouter>
   
    </div>
    
  );
}

export default App;
