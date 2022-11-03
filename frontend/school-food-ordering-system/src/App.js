import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from './Components/HomePage/Homepage';
import AboutPage from './Components/AboutPage/AboutPage';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import { createContext, useState } from 'react';

export const Context = createContext();
function App() {
  const [cartItemArr, setCartItemArr] = useState(new Map())

    return(
      <Context.Provider value={[cartItemArr, setCartItemArr]}>
        <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage/>}/> 
            <Route path='/About' element={<AboutPage/>}/>
            <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
          </Routes>
        </BrowserRouter>
        </>
      </Context.Provider>
    )
}

export default App;
