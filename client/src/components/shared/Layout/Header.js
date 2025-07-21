// import React from "react";
// import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// const Header = () => {
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.clear();
//     toast.success("Logout Successfully!");
//     navigate("/login");
//   };
//   return (
//     <nav className="navbar">
//       <div className="container-fluid ">
//         <div className="navbar-brand h1">
//           <BiDonateBlood color="red" /> Blood Bank App
//         </div>
//         <ul className="navbar-nav flex-row">
//           <li className="nav-item mx-3">
//             <p className="nav-link">
//               <BiUserCircle /> Welcome {user?.name || user?.organizationName || user?.hospitalName}! &nbsp;
//               <span className="badge badge-primary bg-primary">{user?.role}</span>
//             </p>
//           </li>
//           <li className="nav-item mx-3">
//             <button className="btn btn-danger" onClick={handleLogout}>
//               Logout
//             </button>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Header;

import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  // logout handler
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid ">
          <div className="navbar-brand h1 ">
            {/* <BiDonateBlood color="red" /> Blood Bank App */}
            <Link to="/" className="nav-link">
              <BiDonateBlood color="red" /> Blood Bank App
            </Link>
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                <BiUserCircle /> Welcome {user?.name || user?.hospitalName || user?.organizationName || user?.bloodBankName}
                &nbsp;
                <span className="badge bg-primary">{user?.role === "donor" ? "Donor" : user?.role === "admin" ? "Admin" : user?.role === "hospital" ? "Hospital" : user?.role === "organization" ? "Organization" : user?.role === "bloodBank" ? "Blood Bank" : "Unknown"}</span>
              </p>
            </li>
            {location.pathname === "/" || location.pathname === "/admin"  || location.pathname === "/donorHomePage" ? (
              <li className="nav-item mx-3">
                <Link to="/analytics" className="nav-link">
                  Analytics
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-3">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
