import logo from './logo.svg';
import './App.css';
import { Landing, Error, Register, ProtectedRoute} from "./pages";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {AddJobs, AllJobs, Stats, Profile, SharedLayout} from '../src/pages/dashboard'
function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path = "/" element={
                  <ProtectedRoute>
                      <SharedLayout/>
                  </ProtectedRoute>
                  }>
                  <Route index element={<Stats/>}/>
                  <Route path="all-jobs" element={<AllJobs/>}/>
                  <Route path="add-jobs" element={<AddJobs/>}/>
                  <Route path="profile" element={<Profile/>}/>
              </Route>
              {/*<Route path='/' element={<div>dashboard</div>}/>*/}
              <Route path='/register' element={<Register/>}/>
              <Route path='/landing' element={<Landing/>}/>
              <Route path='*' element={<Error/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
