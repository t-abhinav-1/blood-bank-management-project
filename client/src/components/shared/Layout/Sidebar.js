import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../styles/Layout.css";
//import { userMenu } from "./Menus/UserMenu";
import Hospitals from "./../../../pages/Dashboard/Hospitals";
import HomePage from "./../../../pages/HomePage";

const Sidebar = () => {
  //GET USER STATE
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {user?.role === "organization" && (
            <>
              <div className={`menu-item ${location.pathname === "/blood-banks" && "active"}`}>
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/blood-banks">Blood Banks</Link>
              </div>
              <div className={`menu-item ${location.pathname === "/hospital" && "active"}`}>
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/hospital">Hospitals</Link>
              </div>
              <div className={`menu-item ${location.pathname === "/organization" && "active"}`}>
                <i className="fa-solid fa-hospital"></i>
                <Link to="/organization">Other Organizations</Link>
              </div>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <div className={`menu-item ${location.pathname === "/donor-list" && "active"}`}>
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/donor-list">Donor List</Link>
              </div>
              <div className={`menu-item ${location.pathname === "/hospital-list" && "active"}`}>
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/hospital-list">Hospital List</Link>
              </div>
              <div className={`menu-item ${location.pathname === "/org-list" && "active"}`}>
                <i className="fa-solid fa-hospital"></i>
                <Link to="/org-list">Organization List</Link>
              </div>
              <div className={`menu-item ${location.pathname === "/bloodBanks" && "active"}`}>
                <i className="fa-solid fa-hospital"></i>
                <Link to="/bloodBanks">Blood Bank List</Link>
              </div>
            </>
          )}

          {user?.role === "hospital" && (
            <>
              <div className={`menu-item ${location.pathname === "/blood-banks" && "active"}`}>
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/blood-banks">Blood Banks</Link>
              </div>
              <div className={`menu-item ${location.pathname === "/organization" && "active"}`}>
                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                <Link to="/organization">Organizations</Link>
              </div>
              {/* <div className={`menu-item ${location.pathname === "/consumer" && "active"}`}>
                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                <Link to="/consumer">Consumers</Link>
              </div> */}
            </>
          )}
          {user?.role === "donor" && (
            <>
              <div className={`menu-item ${location.pathname === "/hospital" && "active"}`}>
                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                <Link to="/hospital">Nearby Hospitals</Link>
              </div>

              <div className={`menu-item ${location.pathname === "/organization" && "active"}`}>
                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                <Link to="/organization">Join Organization</Link>
              </div>

              <div className={`menu-item ${location.pathname === "/blood-banks" && "active"}`}>
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/blood-banks">Nearby Blood Banks</Link>
              </div>

              {/* <div className={`menu-item ${location.pathname === "/donation" && "active"}`}>
                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                <Link to="/donation">Your Donation</Link>
              </div> */}
            </>
          )}

          {user?.role === "bloodBank" && (
            <>
              <div className={`menu-item ${location.pathname === "/donors" && "active"}`}>
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/donors">Donors</Link>
              </div>
              <div className={`menu-item ${location.pathname === "/hospital" && "active"}`}>
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/hospital">Hospitals</Link>
              </div>
              <div className={`menu-item ${location.pathname === "/organization" && "active"}`}>
                <i className="fa-solid fa-hospital"></i>
                <Link to="/organization">Organizations</Link>
              </div>
            </>
          )}

          {/* {userMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <div className={`menu-item ${isActive && "active"}`} key={menu.name}>
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
