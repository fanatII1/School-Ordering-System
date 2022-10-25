import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from './Components/HomePage/Homepage';
import AboutPage from './Components/AboutPage/AboutPage';

function App() {

    return(
        <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage/>}/> 
            <Route path='/About' element={<AboutPage/>}/>
          </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;
