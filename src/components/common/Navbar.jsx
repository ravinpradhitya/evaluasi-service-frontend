import React from "react";
import { Link } from "react-router-dom";
import EvaluasiService from "../service/EvaluasiService";

function Navbar() {
  const isAuthenticated = EvaluasiService.isAuthenticated();

  const handleLogout = () => {
    const confirmDelete = window.confirm('Are you sure you want to logout this user?');
    if (confirmDelete) {
      EvaluasiService.logout();
    }
  };

  return (
    <>
      <nav>
        <ul>
          {!isAuthenticated && <li><Link to="/">English Learning App</Link></li>}
          {
            isAuthenticated && <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/exam-management">Exam Management</Link></li>
              {/* <li><Link to="/">Logout</Link></li> */}
              <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </>
          }

        </ul>
      </nav>

    </>

  );
}


export default Navbar;
