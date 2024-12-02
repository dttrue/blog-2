import Sidebar from "@/components/sidebar/Sidebar";
import { FaLaptop } from "react-icons/fa";
import NavLinks from "@/components/navigation/NavLinks";

export default function DashboardLayout({ children }) {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <div className="w-full">
          <div className="navbar bg-gray-800">
            <div className="flex-none">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-outline text-white border-white hover:bg-white hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2 text-2xl font-bold text-blue-500 hover:text-blue-600 flex items-center space-x-2 transition duration-200">
              <FaLaptop className="text-blue-500 hover:text-blue-600 h-8 w-8 transition duration-200" />
              <span className="tracking-wide">Coding Laptops HQ</span>
            </div>
            <div className="flex-none">
              <div className="menu menu-horizontal p-0">
                {/* Navbar menu content here */}
                <NavLinks />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="pt-4">{children}</div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
