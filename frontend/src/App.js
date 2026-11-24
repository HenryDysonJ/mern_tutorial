import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import Dashboard from './screens/dashboard';
import Register from './screens/register';
import Login from './screens/login';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
