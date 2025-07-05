import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Auth/Login';
import Signin from './Auth/Signin';
import App from './App/App';

//eval is evil >:(
window.eval = function () {
  throw new Error("The function eval() is not allowed");
};

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
