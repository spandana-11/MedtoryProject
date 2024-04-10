import React from 'react'
import Additem from './components/Additem'
import 'bootstrap/dist/css/bootstrap.css';
import Displaydata from './components/Displaydata';
import { Routes,Route } from 'react-router-dom';
import Reorderlevel from './components/Reorderlevel';


function App() {
  return (
    <div>

    {/* <Additem/> */}
    {/* <Displaydata/> */}
    <Routes>
      <Route path='/' element={<Additem/>}/>
      <Route path='/displaydata' element={<Displaydata/>}/>
      <Route path='/reorderlevel' element={<Reorderlevel/>}/>
      
    </Routes>
    
    </div>
  )
}

export default App