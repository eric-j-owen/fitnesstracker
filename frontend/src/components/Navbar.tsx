import { Link } from "react-router-dom";
import { useAuth } from "../api/auth/useAuth";
import Logout from "./Logout";
import { FaChevronDown } from "react-icons/fa";

export default function Navbar() {
  const { isAuthenticated, isError, user } = useAuth();

  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/dashboard" className="btn btn-ghost text-xl">
          tracker
        </Link>
      </div>
      <div className="flex-none">
        {isAuthenticated && !isError ? (
          <div className="flex items-center gap-10">
            <div className="flex items-center">
              <div className=" dropdown dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 btn btn-ghost"
                >
                  <span className="">Welcome {user?.firstName}</span>
                  <FaChevronDown />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-lg "
                >
                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li>
                    <Logout />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link className="btn btn-outline btn-sm" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary btn-sm" to="/register">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
