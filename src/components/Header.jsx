import React from "react";
import { NavLink } from "react-router-dom";
import { AddItemContext } from "../components/UseContext";
import { FaBell } from 'react-icons/fa';


// header component
function Header() {
  
  const getData = AddItemContext();
  const {
    reorderData,
    setReorderData,
    setNotficatonshow
  }=getData
  return (
    <>
      <header className="w-100">
        <div className="logo">
          <img src="medtory-logo.jpeg" width={"20%"} alt="" />
        </div>
        <div className="logged username">welcome spandana</div>
        <div className="nav-item" onClick={setNotficatonshow(true)}> <FaBell /> {/* Add the bell icon component */} {reorderData.length}</div> 

      </header>
      {/* nabbar  */}
      <nav className="navbars">
        <ul className="navitem">
         <NavLink to="/"><li className="nav-item">Add Item</li></NavLink> 
         <NavLink to='/displaydata'><li className="nav-item">View Item</li></NavLink> 
         

        </ul>
      </nav>
    </>
  );
}

export default Header;
