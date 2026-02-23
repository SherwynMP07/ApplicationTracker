import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {default as Register} from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
function App(){
    return (
        <>
        <ToastContainer />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element= {<Register />} />
                <Route path="/dashboard" element={ <PrivateRoute> <Dashboard /></PrivateRoute> } />
            </Routes>
        </BrowserRouter>
        </>
    )
}
export default App;