import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from './Components/HomePage/Homepage';
import AboutPage from './Components/AboutPage/AboutPage';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import { createContext, useState } from 'react';

export const Context = createContext();
function App() {
  const [cartItemArr, setCartItemArr] = useState(new Map());
  const [adminAccess, setAdminAccess] = useState(null)

    return(
      <Context.Provider value={[cartItemArr, setCartItemArr, adminAccess, setAdminAccess]}>
        <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage/>}/> 
            <Route path='/About' element={<AboutPage/>}/>
            {
              adminAccess === null ? <></> :
              <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
            }
          </Routes>
        </BrowserRouter>
        </>
      </Context.Provider>
    )
}

export default App;
