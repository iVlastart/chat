import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Auth/Login';
import Signin from './Auth/Signin';
import App from './App/App';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      {/*Auth routes*/}
      <Route path='login' element={<Login/>}/>
      <Route path='signin' element={<Signin/>}/>

      {/*App routes*/}
      <Route path='' element={<App/>}/>
    </Routes>
  </BrowserRouter>
)
