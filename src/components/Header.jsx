import React from "react";
import { NavLink } from "react-router-dom";
// header component
function Header() {
  return (
    <>
      <header className="w-100">
        <div className="logo">
          <img src="medtory-logo.jpeg" width={"20%"} alt="" />
        </div>
        <div className="logged username">welcome spandana</div>
      </header>
      {/* nabbar  */}
      <nav className="navbars">
        <ul className="navitem">
         <NavLink to="/"><li className="nav-item">Add Item</li></NavLink> 
         <NavLink to='/displaydata'><li className="nav-item">View Item</li></NavLink> 
         <NavLink to='/reorderlevel'><li className="nav-item">Notification</li></NavLink> 

        </ul>
      </nav>
    </>
  );
}

export default Header;
