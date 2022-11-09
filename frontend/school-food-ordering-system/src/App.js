import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Components/HomePage/Homepage';
import AboutPage from './Components/AboutPage/AboutPage';
import UserProfile from './Components/UserProfile/UserProfile';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import { createContext, useState, useRef, useEffect } from 'react';
import {useAuth0} from '@auth0/auth0-react'

export const Context = createContext();
function App() {
  const { isAuthenticated, getAccessTokenSilently} = useAuth0();
  const [cartItemArr, setCartItemArr] = useState(new Map());
  const [adminAccess, setAdminAccess] = useState(null);
  const foodPrice = useRef([]);
  const [reRender, setReRender] = useState(1);

  //request to authorize admins route from api
  useEffect(() => {
    async function authorizeAdmins() {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch('/AdminDashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const responseData = await response.json();
        //if response indicates admin, set admin value to state
        if (responseData.adminMsg === 'admin') {
          setAdminAccess('admin');
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
      }
    }
    authorizeAdmins();
    // eslint-disable-next-line
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(()=>{
    console.log(adminAccess)
  }, [adminAccess])

  return (
    <Context.Provider value={[cartItemArr, setCartItemArr, adminAccess, setAdminAccess, foodPrice, reRender, setReRender]}>
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/Profile' element={<UserProfile />} />
            <Route path='/About' element={<AboutPage />} />
            {adminAccess === null ? <></> : <Route path='/AdminDashboard' element={<AdminDashboard />} />}
          </Routes>
        </BrowserRouter>
      </>
    </Context.Provider>
  );
}

export default App;
