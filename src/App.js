import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/pages/Home.js';
import PageNotFound from './components/pages/404.js';
import SignIn from './components/pages/SignIn.js';
import Layout from './components/layouts/Layout.js';
import './App.css';
import Lectures from './components/pages/Letures';
import Teacher from './components/pages/Teacher.js';



function App() {
{ /* const [token, setToken] = useState();
  if(!token){
    return <SignINForm1 setToken={setToken} />
  }*/}
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='*' element={<PageNotFound />}/>
        <Route path='/lectures' element={<Lectures/>}/>
        <Route path='/teacher' element={<Teacher/>}/>
      </Routes>
    </Layout>
    </BrowserRouter>
    );
}

export default App;
