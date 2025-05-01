import { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  
  UserIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import axios from "axios";

const navigation = [
  
  { name: "Profile", to: "/profile", icon: UserIcon },
  { name: "Kirim Pengaduan", to: "/pengaduan", icon: DocumentTextIcon },
  {
    name: "Manajemen Pengaduan",
    to: "/manajemen",
    icon: ClipboardDocumentListIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        return;
      }

      try {
        const response = await axios.get("https://layanan-pengaduan-be.vercel.app/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gray-800 text-white fixed h-full transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-auto max-w-full object-contain"
            />
            {sidebarOpen && <span className="font-bold text-xl">Pengaduan</span>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-full hover:bg-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {sidebarOpen ? (
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>

        <div className="py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? "bg-gray-900 text-white border-l-4 border-indigo-500"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "flex items-center px-4 py-3 text-sm font-medium transition-colors"
                )
              }
            >
              <item.icon
                className={`${sidebarOpen ? "mr-3" : "mx-auto"} h-6 w-6`}
              />
              {sidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </div>

        <div className="absolute bottom-0 w-full border-t border-gray-700 p-4">
          <Menu as="div" className="relative">
            <MenuButton
              as="button"
              className="flex items-center w-full text-left focus:outline-none"
            >
              <div className="flex items-center space-x-3">
                <img
                  className="h-10 w-10 rounded-full bg-gray-500"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                />
                {sidebarOpen && user && (
                  <div className="flex-shrink-0">
                    <div className="text-sm font-medium">{user.username}</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </div>
                )}
              </div>
              {sidebarOpen && (
                <svg
                  className="h-5 w-5 ml-auto text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </MenuButton>
            <MenuItems className="absolute bottom-14 left-0 z-50 w-56 origin-bottom-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
              <MenuItem>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Your Profile
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Settings
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <a
                    onClick={() => logout()}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                    )}
                  >
                    Sign out
                  </a>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`${
          sidebarOpen ? "ml-40" : "ml-20"
        } flex-1 transition-all duration-300`}
      >
        {/* Your content goes here */}
      </div>
    </div>
  );
};

export default Navbar;
