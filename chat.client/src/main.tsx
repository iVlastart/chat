import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Auth/Login';
import Signin from './Auth/Signin';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='signin' element={<Signin/>}/>
    </Routes>
  </BrowserRouter>
)
